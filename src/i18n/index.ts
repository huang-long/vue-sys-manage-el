import { createI18n } from "vue-i18n";
import zh from "./lang/zh-CN";
import en from "./lang/en-US";
import { zhCn as elUIzh, en as elUIen } from "element-plus/es/locales";

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: "zh-CN",
  messages: {
    "zh-CN": { ...zh, ...elUIzh },
    "en-US": { ...en, ...elUIen },
  },
});

export { i18n };
