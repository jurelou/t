import { boot } from "quasar/wrappers";
import { useTagViewStore } from "src/stores/tagView";
import { SessionStorage, LoadingBar } from "quasar";
// import type { RouteLocationNormalized } from "vue-router";
import constantRoutes from "src/router/constantRoutes";
import type { RouteData } from "src/types";

// function handleKeepAlive(to: RouteLocationNormalized) {
//   if (to.matched && to.matched.length > 2) {
//     for (let i = 0; i < to.matched.length; i++) {
//       const element = to.matched[i];
//       if (element?.components?.default?.name === "Layout") {
//         to.matched.splice(i, 1);
//         handleKeepAlive(to);
//       }
//     }
//   }
// }

export default boot(({ router }) => {
  const tagViewStore = useTagViewStore();
  router.beforeEach((to, from) => {
    LoadingBar.stop();
    LoadingBar.start();

    if (to.name != null) {
      // is a public route
      for (let i = 0; i < constantRoutes.length; i++) {
        if (constantRoutes[i]?.path === to.path) {
          return;
        }
      }

      const tagViewOnSessionStorage = (SessionStorage.getItem("tagView")) as RouteData[];
      if (
        tagViewStore.getTagView.length === 0 && tagViewOnSessionStorage !== null &&
        tagViewOnSessionStorage.length !== 0
      ) {
        tagViewStore.setTagView(tagViewOnSessionStorage);
      } else if (from.fullPath !== to.fullPath) {
        tagViewStore.addTagView(to);
      }
      // handleKeepAlive(to);
    }
  });

  router.afterEach(() => {
    LoadingBar.stop();
  });
});

