<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-separator vertical />
    <q-btn dense flat icon="fa-brands fa-github" href="https://github.com/york11122/quasar-admin-vue3-typescript"
      target="_blank">
      <q-tooltip>{{ 'layout.github' }}</q-tooltip>
    </q-btn>

    <q-btn dense flat :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()"
      v-if="$q.screen.gt.sm">
      <q-tooltip>{{ 'layout.fullScreen' }}</q-tooltip>
    </q-btn>

    <dark-mode />

    <q-btn dense flat icon="refresh" @click="appStore.reloadPage(200)" v-if="$q.screen.gt.sm">
      <q-tooltip>{{ 'layout.refresh' }}</q-tooltip>
    </q-btn>

    <q-btn round flat>
      <q-avatar color="primary" text-color="white">
        {{ userStore.getFirstCharacterOfUserName }}
      </q-avatar>
      <q-menu>
        <q-list dense>
          <q-item>
            <q-item-section>
              <div>
                Signed in as <br /><strong>{{ userStore.getUserName }}</strong>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable>
            <q-item-section @click="logout">Sign out</q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <q-tooltip>hello :)</q-tooltip>
    </q-btn>

  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "src/stores/user";
import DarkMode from "src/components/Toolbar/DarkMode.vue";
import { useAppStore } from "src/stores/app"

defineOptions({ name: "ToolbarItem" });

const userStore = useUserStore();
const appStore = useAppStore()

const logout = () => {
  userStore.setLogout();
};
</script>
