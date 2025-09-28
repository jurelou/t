import { defineStore } from "pinia";
import type { RouteLocationNormalized } from "vue-router";
import { Router as router } from "src/router/index";
import { SessionStorage } from "quasar";
import type { RouteData } from "src/types/index";
import { getFirst } from "src/utils/index";
enum removeType {
  Right,
  Left,
  Other,
}
export const useTagViewStore = defineStore("tagView", {
  state: () => ({
    tagView: [] as RouteData[],
  }),

  getters: {
    getTagView(state): RouteData[] {
      return state.tagView;
    },
  },

  actions: {
    addTagView(to: RouteLocationNormalized) {
      const tag: RouteData = {
        title: to.meta.title,
        name: to.name,
        fullPath: to.fullPath,
        icon: to.meta.icon ? to.meta.icon : '',
        keepAlive: to.meta.keepAlive ? to.meta.keepAlive : false,
        isHidden: to.meta.isHidden ? to.meta.isHidden : false,
      };

      // if (tag.isHidden) {
      //   return;
      // }

      if (getFirst(to.query)) {
        tag.title += "：" + getFirst(to.query);
      } else if (getFirst(to.params)) {
        tag.title += "：" + getFirst(to.params);
      }

      if (
        tag.title !== null &&
        tag.title !== undefined &&
        tag.fullPath !== "/" &&
        tag.fullPath.indexOf("#") === -1
      ) {
        const size = this.tagView.length;
        // When entering or refreshing the page for the first time & the current route is not the root route
        if (!size && tag.fullPath !== "/") {
          this.tagView.push(tag);
          return;
        }
        // To avoid adding tagView repeatedly. Construct an array t[] identified by fullPath
        const t = [];
        for (let i = 0; i < size; i++) {
          t.push(this.tagView[i]?.fullPath);
        }
        // If there is no current route in t[]
        if (t.indexOf(tag.fullPath) === -1) {
          this.tagView.push(tag);
        }
      }
    },

    setTagView(tagView: RouteData[]) {
      this.tagView = tagView;
    },

    removeTagViewByFullPath(fullPath: string) {
      const index = this.tagView.findIndex(
        (item) => item.fullPath === fullPath
      );
      if (index !== -1) {
        removeATagView(this, index);
      }
    },

    removeTagViewAt(index: number) {
      removeATagView(this, index);
    },

    removeTagViewOnLeft(index: number) {
      removeOnSide(this, removeType.Left, index);
    },

    removeTagViewOnRight(index: number) {
      removeOnSide(this, removeType.Right, index);
    },

    removeOtherTagView(index: number) {
      removeOnSide(this, removeType.Other, index);
    },

    removeAllTagView() {
      this.tagView = [];
      SessionStorage.set("tagView", []);
      const token = SessionStorage.getItem("access_token");
      if (token) {
        router.push({ name: "home" });
      }
    },
  },
});

/**
 * Only remove one tagView
 * @param state
 * @param payload
 */
export function removeATagView(state: any, index: any) {
  // Record removed routes
  const removedTagView = state.tagView[index].fullPath;
  state.tagView.splice(index, 1);
  // If tagView is empty
  if (state.tagView.length === 0) {
    SessionStorage.set("tagView", []);
    router.push({ name: "home" });
  } else {
    // If the last tagView is removed, the route jumps to the current last tagView
    if (
      index === state.tagView.length &&
      window.location.href.indexOf(removedTagView) !== -1
    ) {
      router.push(state.tagView[index - 1].fullPath);
      return;
    }
    // If the first tagView is removed, the route jumps to the next tagView
    if (index === 0 && window.location.href.indexOf(removedTagView) !== -1) {
      router.push(state.tagView[0].fullPath);
      return;
    }
    if (window.location.href.indexOf(removedTagView) !== -1) {
      router.push(state.tagView[index - 1].fullPath);
    }
  }
}

/**
 * Remove one side of tagView
 * @param state
 * @param payload
 */
export function removeOnSide(state: any, type: removeType, index: number) {
  switch (type) {
    case removeType.Right:
      state.tagView = state.tagView.slice(0, index + 1);
      if (state.tagView.length === 1) {
        router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length === index + 1) {
        router.push(state.tagView[index].fullPath);
      }
      break;
    case removeType.Left:
      state.tagView = state.tagView.slice(index, state.tagView.length);
      if (state.tagView.length === 1) {
        router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length <= index) {
        router.push(state.tagView[0].fullPath);
      }
      break;
    case removeType.Other:
      state.tagView = state.tagView.splice(index, 1);
      router.push(state.tagView[0].fullPath);
      break;
    default:
      break;
  }
}
