// 大仓库
// 从pinia中引入 创建pinia的方法
import {createPinia} from 'pinia';

let pinia=createPinia();

// 对外暴露 入口文件需要安装仓库
export default pinia;