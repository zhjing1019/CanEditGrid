// 导入单个组件
import CanEditTable from "./component/index.js";



const components = [
    CanEditTable,
];

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

// const EgAdapter = {};

// EgAdapter.install = Vue => {
//   if (EgAdapter.install.installed) return;
//   components.map(component => {
//     Vue.component(component.name, component);
//   });
//   Vue.prototype.$EgMessage = EgMessage;
// };

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// if (typeof window !== "undefined" && window.Vue) {
//   EgAdapter.install(window.Vue);
// }

// 这里可以用es6的解构语法导入组件 大概就是这个意思 毕竟没有用插件
export {
    CanEditTable,
};
export default {
  install
};
