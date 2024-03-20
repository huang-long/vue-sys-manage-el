export type XmlMetaInfo = {
  key?: string;
  name?: string;
  description?: string;
  version?: number;
};

export type ActModelerObj = {
  id: string;
  key?: string;
  name?: string;
  version?: string;
  createTime?: string;
  lastUpdateTime?: string;
  description?: string;
  bpmnXml?: string;
  svgXml?: string;
  metaInfo?: string;
};

// 获取Modeler详情
export function getModelerDetail(modelId: string) {
  // TODO
  console.log(modelId);
  return new Promise<{ code: number; msg: string; data: ActModelerObj | undefined }>((resolve) => {
    resolve({
      msg: "操作成功",
      code: 200,
      data: {
        id: "a61cf7f1-e3a1-11ee-aa21-aed1b8855c31",
        key: "leave",
        name: "请假",
        metaInfo: '{"name":"请假","revision":1,"description":null}',
        bpmnXml:
          '<?xml version="1.0" encoding="UTF-8"?>\n<bpmn2:definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">\n  <bpmn2:process id="leave" name="请假" isExecutable="true">\n    <bpmn2:documentation>请假测试</bpmn2:documentation>\n    <bpmn2:startEvent id="Event_0t0bht1" name="开始">\n      <bpmn2:outgoing>Flow_1uc4poo</bpmn2:outgoing>\n    </bpmn2:startEvent>\n    <bpmn2:sequenceFlow id="Flow_1uc4poo" sourceRef="Event_0t0bht1" targetRef="Activity_1tdjm96"></bpmn2:sequenceFlow>\n    <bpmn2:sequenceFlow id="Flow_1aay929" name="同意" sourceRef="Activity_1tdjm96" targetRef="Activity_1tc3fcv">\n      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${pass == \'1\'}]]></conditionExpression>\n    </bpmn2:sequenceFlow>\n    <bpmn2:endEvent id="Event_0usevul" name="结束">\n      <bpmn2:incoming>Flow_0y43iol</bpmn2:incoming>\n      <bpmn2:incoming>Flow_083sops</bpmn2:incoming>\n      <bpmn2:incoming>Flow_1c4qyru</bpmn2:incoming>\n    </bpmn2:endEvent>\n    <bpmn2:sequenceFlow id="Flow_0y43iol" name="同意" sourceRef="Activity_1tc3fcv" targetRef="Event_0usevul">\n      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${pass == \'1\'}]]></conditionExpression>\n    </bpmn2:sequenceFlow>\n    <bpmn2:userTask id="Activity_1tdjm96" name="A级审批" activiti:candidateUsers="zhangsan">\n      <bpmn2:documentation>A级审批测试</bpmn2:documentation>\n    </bpmn2:userTask>\n    <bpmn2:userTask id="Activity_1tc3fcv" name="B级审批" activiti:candidateUsers="lisi">\n      <bpmn2:documentation>B级审批测试</bpmn2:documentation>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id="Flow_083sops" name="不同意" sourceRef="Activity_1tdjm96" targetRef="Event_0usevul">\n      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${pass == \'2\'}]]></conditionExpression>\n    </bpmn2:sequenceFlow>\n    <bpmn2:sequenceFlow id="Flow_1c4qyru" name="不同意" sourceRef="Activity_1tc3fcv" targetRef="Event_0usevul">\n      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${pass == \'2\'}]]></conditionExpression>\n    </bpmn2:sequenceFlow>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_leave">\n    <bpmndi:BPMNPlane bpmnElement="leave" id="BPMNPlane_leave">\n      <bpmndi:BPMNShape bpmnElement="Event_0t0bht1" id="BPMNShape_Event_0t0bht1">\n        <omgdc:Bounds height="36.0" width="36.0" x="332.0" y="162.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Event_0usevul" id="BPMNShape_Event_0usevul">\n        <omgdc:Bounds height="36.0" width="36.0" x="892.0" y="162.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Activity_1tdjm96" id="BPMNShape_Activity_1tdjm96">\n        <omgdc:Bounds height="80.0" width="100.0" x="470.0" y="140.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Activity_1tc3fcv" id="BPMNShape_Activity_1tc3fcv">\n        <omgdc:Bounds height="80.0" width="100.0" x="680.0" y="140.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge bpmnElement="Flow_1uc4poo" id="BPMNEdge_Flow_1uc4poo">\n        <omgdi:waypoint x="368.0" y="180.0"></omgdi:waypoint>\n        <omgdi:waypoint x="470.0" y="180.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_1c4qyru" id="BPMNEdge_Flow_1c4qyru">\n        <omgdi:waypoint x="730.0" y="220.0"></omgdi:waypoint>\n        <omgdi:waypoint x="730.0" y="320.0"></omgdi:waypoint>\n        <omgdi:waypoint x="910.0" y="320.0"></omgdi:waypoint>\n        <omgdi:waypoint x="910.0" y="198.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_1aay929" id="BPMNEdge_Flow_1aay929">\n        <omgdi:waypoint x="570.0" y="180.0"></omgdi:waypoint>\n        <omgdi:waypoint x="680.0" y="180.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_083sops" id="BPMNEdge_Flow_083sops">\n        <omgdi:waypoint x="520.0" y="220.0"></omgdi:waypoint>\n        <omgdi:waypoint x="520.0" y="320.0"></omgdi:waypoint>\n        <omgdi:waypoint x="910.0" y="320.0"></omgdi:waypoint>\n        <omgdi:waypoint x="910.0" y="198.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_0y43iol" id="BPMNEdge_Flow_0y43iol">\n        <omgdi:waypoint x="780.0" y="180.0"></omgdi:waypoint>\n        <omgdi:waypoint x="892.0" y="180.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>',
      },
    });
  });
}

// 部署模型
export function updateModeler(data: ActModelerObj) {
  // TODO
  console.log(data);
  return new Promise<{ code: number; msg: string }>((resolve) => {
    resolve({
      code: 200,
      msg: "成功！",
    });
  });
}
