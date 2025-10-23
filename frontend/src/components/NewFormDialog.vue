<template>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Quasar</span> Framework</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-stepper
            v-model="step"
            header-nav
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="Select campaign settings"
              icon="settings"
              :done="done1"
            >
    <q-form
      @submit="onSubmit1"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-stepper-navigation>
        <q-btn label="Continue" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </q-stepper-navigation>
    </q-form>


            </q-step>

            <q-step
              :name="2"
              title="Create an ad group"
              caption="Optional"
              icon="create_new_folder"
              :done="done2"
            >
              An ad group contains one or more ads which target a shared set of keywords.

              <q-stepper-navigation>
                <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Create an ad"
              icon="add_comment"
              :done="done3"
            >
              Try out different ad text to see what brings in the most customers, and learn how to
              enhance your ads using features like ad extensions. If you run into any problems with
              your ads, find out how to tell if they're running and how to resolve approval issues.

              <q-stepper-navigation>
                <q-btn color="primary" @click="done3 = true" label="Finish" />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-section>
<!-- 
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Route } from "src/types/index"
import { QMenu, openURL } from "quasar"
import { useThemeStore } from "src/stores/theme"
import { useAppStore } from "src/stores/app"
import { storeToRefs } from "pinia"
import { ref } from 'vue'

defineOptions({ name: "NewFormDialog" })
const step = ref(1)
const done1 = ref(false)
const done2 = ref(false)
const done3 = ref(false)

const name = ref(null)
const age = ref(null)
const accept = ref(false)

// const props = defineProps<{
//   open: boolean
// }>()

// const props = withDefaults(defineProps<Props>(), {
//     myRouter: () => [] as Route[],
//     layerLevel: 0,
//     initLevel: 0,
//     duration: 150,
//     basePath: ""
// })

function onSubmit1(event: Event) {
  console.log("toto", event)
  done1.value = true
  step.value = 2
}
</script>

