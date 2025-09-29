import type { Route } from "src/types/index";
import layout from "src/components/Layout/Layout.vue";

declare module "vue-router" {
  interface RouteMeta {
    roles?: string[];
    title: string;
    icon?: string;
    itemLabel?: string;
    keepAlive?: boolean;
    isOpen?: boolean;
  }
}

const asyncRoutesChildren: Route[] = [
  {
    component: () => import("pages/dashboard/Dashboard.vue"),
    path: "/",
    name: "home",
    meta: {
      title: "router.home",
      icon: "home",
    },
  },
  {
    component: () => import("pages/Chart.vue"),
    path: "/chart",
    name: "Chart",
    meta: {
      title: "router.chart",
      icon: "insert_chart_outlined",
    },
  },
  {
    component: () => import("pages/table/FitTable.vue"),
    path: "/table",
    name: "FitTable",
    meta: {
      title: "router.talbe",
      icon: "table_view",
    },
  },

  {
    component: layout,
    path: "/permission",
    name: "Permission",
    meta: {
      title: "router.permission",
      icon: "verified_user",
      isOpen: true,
    },
    children: [
      {
        component: () => import("pages/permission/Directive.vue"),
        path: "directive",
        name: "Directive",
        meta: {
          title: "router.directive",
          icon: "how_to_reg",
          keepAlive: true,
        },
      },
      {
        component: () => import("pages/permission/Permission.vue"),
        path: "router-permission",
        name: "Permission2",
        meta: {
          title: "router.routerPermission",
          icon: "where_to_vote",
          keepAlive: true,
          roles: ["admin"],
        },
      },
    ],
  },
  {
    component: layout,
    path: "/menu1",
    name: "menu1",
    meta: {
      title: "router.menu1",
      icon: "filter_1",
      isOpen: false,
    },
    children: [
      {
        component: layout,
        path: "menu2",
        name: "menu2",
        meta: {
          title: "router.menu2",
          icon: "filter_2",
        },
        children: [
          {
            component: () => import("pages/expansion-menu/ExpansionMenu.vue"),
            path: "menu3",
            name: "menu3",
            meta: {
              title: "router.menu3",
              icon: "filter_3",
            },
          },
        ],
      },
    ],
  },
];

const asyncRootRoute: Route[] = [
  {
    component: () => import("layouts/MainLayout.vue"),
    path: "/",
    name: "index",
    redirect: "/",
    children: asyncRoutesChildren,
  },
];

export { asyncRootRoute, asyncRoutesChildren };
