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
      title: "Home :)",
      icon: "home",
    },
  },
  {
    component: () => import("pages/something/Table.vue"),
    path: "/tables",
    name: "Taaab",
    meta: {
      title: "tables!",
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
    component: () => import("pages/Kanboard.vue"),
    path: "/kanban",
    name: "Kanban",
    meta: {
      title: "kanban",
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
