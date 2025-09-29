import { boot } from "quasar/wrappers";
import { useRouterStore } from "src/stores/routes";
import { useUserStore } from "src/stores/user";
import constantRoutes from "src/router/constantRoutes";
import { SessionStorage } from "quasar";
import { deepClone } from "src/utils/index";
import { asyncRoutesChildren, asyncRootRoute } from "src/router/routes";
import type { RouteRecordRaw } from "vue-router";

// import { useUserAPI } from "src/api/services/user";


import type { Route } from "src/types/index"
import { usePermission } from "src/stores/permission"

function constructionRouters(router: Route[]) {
  const userStore = useUserStore();
  const { hasPermission } = usePermission()
  const temp = router.filter((item) => {
    // if no roles is setting, everyone can access
    if (!item.meta?.roles || item.meta.roles.length === 0) return true;
    // return item.meta.roles.indexOf(userStore.getUserRole as string) !== -1;
    return hasPermission(item.meta.roles)
  });

  // construct router with user permission
  temp.forEach(t => {
    if (t.children) {
      t.children = constructionRouters(t.children)
    }

  })
  return temp;
}


export default boot(({ router }) => {
  const routerStore = useRouterStore();
  const userStore = useUserStore();
  // const { me } = useUserAPI();
  router.beforeEach((to, from, next) => {
    // Simulate obtaining token

    const token = SessionStorage.getItem("access_token");
    // There is a token indicating that you have logged in
    if (token) {
      //You cannot access the login interface after logging in
      if (to.path === "/login") {
        next({ path: "/" });
      }

      // There is user authority, and the route is not empty, then let go
      if (
        userStore.getUserRoles.length > 0 &&
        routerStore.getPermissionRoutes.length
      ) {
        next();
      } else {
        if (userStore.getUserRoles.length <= 0) {
          // const { data, error } = await me();
          // if (!error.value) {
          // User()
            userStore.setUserInfo({
              // '_id': "6424f85c61c193401bd5b4d2",
              'username': "admin",
              'roles': ["admin"]
            });
          // }
        }
        console.log("haha")
        // And set the corresponding route according to the permissions
        const accessRoutes = deepClone(asyncRoutesChildren);
        if (asyncRootRoute[0] !== undefined) {
          asyncRootRoute[0].children = constructionRouters(accessRoutes);
        }
        routerStore.setRoutes(asyncRootRoute);
        // If you are prompted that addRoutes is deprecated, use the spread operator to complete the operation
        for (const item of asyncRootRoute) {
          router.addRoute(item as RouteRecordRaw);
        }
        // If addRoutes is not completed, the guard will execute it again
        next({ ...to, replace: true });
      }
    } else {
      // go to a route that does not require authorization
      if (
        constantRoutes.some((item) => {
          return item.path === to.path;
        })
      ) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  });
});
