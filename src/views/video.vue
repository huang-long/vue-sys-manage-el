<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://ffmpeg.org/documentation.html" target="_blank">ffmpeg官方文档</a>
        ; 非安全环境(https)不可以使用
      </el-col>
    </el-row>

    <el-divider content-position="left">vedio</el-divider>
    <el-row class="mgb20">
      <el-button type="primary" @click="handleOpen">开启摄像头</el-button>
      <el-button type="primary" @click="handleClose">关闭摄像头</el-button>
      <el-button type="primary" @click="handleCapture">拍照</el-button>
      <el-button type="primary" @click="handleStartRecording">开始录制</el-button>
      <el-button type="primary" @click="handleStopRecording">停止录制</el-button>
      <el-button type="primary" @click="handleDownload">下载</el-button>
      <el-button type="primary" @click="handleDownloadFFmpeg">压缩下载</el-button>
    </el-row>
    <div style="height: 640px">
      <div class="left" style="width: 50%; float: left">
        <video ref="videoRef" width="480" height="320" controls></video>
        <canvas ref="canvasRef" width="480" height="320"></canvas>
      </div>
      <div class="right" style="width: 50%; float: right">
        <video ref="recordingVideoRef" width="480" height="320" controls></video>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="DemoVideo">
import { onBeforeMount, ref } from "vue";
import saveAs from "file-saver";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ElLoading, ElMessage } from "element-plus";

const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const recordingVideoRef = ref<HTMLVideoElement>();
let dataChunks: Blob[] = [];
let recorder: MediaRecorder;
let recordedBlob: Blob;

//访问用户媒体设备的兼容方法
const getUserMedia = (
  constraints: { video: { width: number; height: number } | boolean; audio: boolean },
  success: (stream: MediaStream) => void,
  error: (error: { message: string }) => void
) => {
  if (navigator.mediaDevices.getUserMedia) {
    //最新的标准API
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    // } else if (navigator.webkitGetUserMedia) {
    //   //webkit核心浏览器
    //   navigator.webkitGetUserMedia(constraints,success, error)
    // } else if (navigator.mozGetUserMedia) {
    //   //firfox浏览器
    //   navigator.mozGetUserMedia(constraints, success, error);
    // } else if (navigator.getUserMedia) {
    //   //旧版API
    //   navigator.getUserMedia(constraints, success, error);
  }
};

//开启摄像头
const handleOpen = () => {
  // if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
  //调用用户媒体设备, 访问摄像头
  getUserMedia(
    { video: true, audio: true },
    (stream) => {
      //将视频流设置为video元素的源
      console.log(stream);
      if (videoRef.value) {
        videoRef.value.srcObject = stream;
        videoRef.value.play();
      }
    },
    (error) => {
      console.error(`访问用户媒体设备失败:`, error);
    }
  );
  // } else {
  //   alert('不支持访问用户媒体');
  // }
};

//拍照
const handleCapture = () => {
  if (videoRef.value && canvasRef.value) {
    const context = canvasRef.value.getContext("2d");
    context?.drawImage(videoRef.value, 0, 0, 480, 320);
  }
};

//关闭摄像头
const handleClose = () => {
  if (videoRef.value) {
    const stream = videoRef.value.srcObject;
    if (stream instanceof MediaStream) {
      const tracks = stream?.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      videoRef.value.srcObject = null;
    }
  }
};

// 开始录制
function startRecording() {
  const stream = videoRef.value?.srcObject;
  if (videoRef.value && stream instanceof MediaStream) {
    recorder = new MediaRecorder(stream);
    dataChunks = [];
    recorder.ondataavailable = (event) => {
      const data = event.data;
      dataChunks.push(data);
    };
    recorder.start(1000);
    console.log(recorder.state + " start to recording .....");
  }
}

//停止录制
const handleStopRecording = () => {
  const stream = videoRef.value?.srcObject;
  if (videoRef.value && stream instanceof MediaStream && recordingVideoRef.value) {
    stream.getTracks().forEach((track) => track.stop());
    videoRef.value.srcObject = null;
    recorder.stop();

    // Play recorded video
    recordedBlob = new Blob(dataChunks, { type: "video/webm" });
    recordingVideoRef.value.src = URL.createObjectURL(recordedBlob);
    // Save download video， click the download button， you can download it
    // downloadButton.href = recordingVideoRef.value.src;
    // downloadButton.download = "RecordedVideo.webm";
  }
};

const handleStartRecording = () => {
  //开启摄像头
  // if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
  //调用用户媒体设备, 访问摄像头
  getUserMedia(
    { video: { width: 480, height: 320 }, audio: true },
    (stream) => {
      if (videoRef.value) {
        // set the stream to left video
        videoRef.value.srcObject = stream;
        videoRef.value.play();
        startRecording();
      }
    },
    (err) => {
      console.log("recording error: ", err);
    }
  );
  // } else {
  //   alert('不支持访问用户媒体');
  // }
};

const handleDownload = () => {
  const src = recordingVideoRef.value?.src;
  if (src) {
    saveAs(src, "RecordedVideo.webm");
  }
};

/**
 * 压缩并下载视频
 */
const handleDownloadFFmpeg = () => {
  //  以下是11版本代码
  const src = recordingVideoRef.value?.src;
  if (!src) {
    ElMessage.error("请先录制视频");
    return;
  }

  const loading = ElLoading.service({ text: "正在压缩视频..." });
  const ffmpeg = createFFmpeg({
    log: true,
  });
  ffmpeg.setLogger(({ type, message }) => {
    console.log(type);
    console.log(message);
  });
  ffmpeg.setProgress((progress) => {
    console.log("进度", progress);
  });
  ffmpeg
    .load()
    .then(() => {
      return fetchFile(src);
    })
    .then((videoData) => {
      return ffmpeg.FS("writeFile", "RecordedFFmpegVideo.webm", videoData);
    })
    .then(() => {
      return ffmpeg.run("-i", "RecordedFFmpegVideo.webm", "RecordedFFmpegVideo.mp4");
    })
    .then(() => {
      return ffmpeg.FS("readFile", "RecordedFFmpegVideo.mp4");
    })
    .then((data) => {
      console.log(data);
      saveAs(new Blob([data], { type: "video/mp4" }), "RecordedFFmpegVideo.mp4");
    })
    .finally(() => {
      loading.close();
    });

  // 以下是12版本代码
  // const src = recordingVideoRef.value?.src;
  // if (src) {
  //   const ffmpeg = new FFmpeg();
  //   //监听进度
  //   ffmpeg.on("progress", ({ progress, time }) => {
  //     console.log(progress);
  //     console.log(time);
  //   })
  //   //监听日志
  //   ffmpeg.on("log", ({ type, message }) => {
  //     console.log(type);
  //     console.log(message);
  //   })
  //   ffmpeg.load().then(() => {
  //     return ffmpeg.writeFile("RecordedFFmpegVideo.webm", src);
  //   }).then(() => {
  //     // 开始压缩视频
  //     // await ffmpeg.run('-i', name, '-b', '2000000', '-crf', '23', '-fs', '4194304', '-s', resolution, 'put.mp4')
  //     return ffmpeg.exec(["-i", "RecordedFFmpegVideo.webm", "RecordedFFmpegVideo.mp4"])
  //   }).then(() => {
  //     return ffmpeg.readFile("RecordedFFmpegVideo.mp4");
  //   }).then((data) => {
  //     console.log(data);
  //     saveAs(new Blob([data], { type: "video/mp4" }), "RecordedFFmpegVideo.mp4")
  //   }).catch((e)=>{
  //     console.log(e)
  //   })
  // }
};

// 退出销毁视屏数据
onBeforeMount(() => {
  const src = recordingVideoRef.value?.src;
  if (src) {
    window.URL.revokeObjectURL(src);
  }
});
</script>

<style lang="less" scoped></style>
