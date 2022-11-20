
import { createI18n } from 'vue-i18n';
import zh from './lang/zh-CN';
import en from './lang/en-US';
// @ts-ignore
import elUIzh from 'element-plus/dist/locale/zh-cn';
// @ts-ignore
import elUIen from 'element-plus/dist/locale/en';

const i18n = createI18n({
    allowComposition: true,
    globalInjection: true,
    legacy: false,
    locale: 'zh-CN',
    messages: {
        'zh-CN': { ...zh, ...elUIzh },
        'en-US': { ...en, ...elUIen }
    }
});

export {
    i18n
};