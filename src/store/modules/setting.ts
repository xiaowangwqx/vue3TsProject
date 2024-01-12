// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia';

let useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false,
    };
  },
});

export default useLayoutSettingStore;
