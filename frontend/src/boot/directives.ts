import { boot } from "quasar/wrappers";

import type { App, Directive } from "vue";
import { usePermission } from "src/stores/permission";


export default boot(({ app }) => {
  const { hasPermission } = usePermission();

  function updateElVisible(el: HTMLElement, permission: string[]) {
    if (!permission) {
      throw new Error(`need roles: like v-permission="['admin', 'test]"`);
    }
    if (!hasPermission(permission)) {
      el.parentElement?.removeChild(el);
    }
  }

  const permissionDirective: Directive<HTMLElement, string[]> = {
    mounted(el, binding) {
      updateElVisible(el, binding.value);
    },
    beforeUpdate(el, binding) {
      updateElVisible(el, binding.value);
    },
  };

  app.directive("permission", permissionDirective);
});

