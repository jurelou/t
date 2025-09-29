<template>
  <q-drawer v-model="_modelValue" :mini="isDrawerMini" :width="230" show-if-above bordered
    :mini-to-overlay="isMiniOverlay">
    <div class="absolute-top q-pa-sm" style="height: 50px">
      <toolbar-title :title="title" style="width: 100%" :mini="isDrawerMini" />
      <q-separator spaced="sm" />
    </div>
    <base-menu style="height: calc(100% - 50px); margin-top: 50px" />
  </q-drawer>
</template>

<script lang="ts" setup>

import { ref } from "vue"
import { useToggle } from "@vueuse/shared";
import { useVModel } from "@vueuse/core";
import ToolbarTitle from "src/components/Toolbar/ToolbarTitle.vue";
import BaseMenu from "src/components/Menu/BaseMenu.vue";
import { useAppStore } from "src/stores/app"
import { storeToRefs } from "pinia"


defineOptions({ name: "Drawer" })

const props = withDefaults(defineProps<{ modelValue: boolean, title: string }>(), {
  modelValue: false,
  title: "",
});

const emit = defineEmits<{(e: "update:modelValue"): void;}>();

const _modelValue = useVModel(props, "modelValue", emit);

const isMiniOverlay = ref<boolean>(false);

const appStore = useAppStore()
const { isDrawerMini } = storeToRefs(appStore)

const toggleDrawerMini = useToggle(isDrawerMini);

const toggleDrawer = () => {
  if (isDrawerMini.value) {
    toggleDrawerMini(false)
  } else {
      toggleDrawerMini(true)
    }
}



defineExpose({
  toggleDrawer,
  toggleDrawerMini
})

</script>
