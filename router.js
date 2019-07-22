import Vue from "vue";
import Router from "vue-router";
import EditTableTest from "./view/EditTableTest.vue"


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "EditTableTest",
      component: EditTableTest
    },
    // {
    //   path: "/EditTable",
    //   name: "EditTable",
    //   component: EditTable
    // },
    // {
    //   path: "/CutImages",
    //   name: "CutImages",
    //   component: CutImages
    // }
  ]
});
