<template>
    <base-content class="" scrollable>
    {{  columns[0] }}
    <div class="flex justify-center">
        <div class="min-h-screen flex overflow-x-scroll py-12">

            <div v-for="column in columns" :key="column.title"
                class="rounded-borders py-3 column-width q-pa-sm">

                <div class="bg-grey-3 rounded-borders">
                    <h4 class="q-pl-sm">{{ column.title }}</h4>
                <draggable @change="doMove" v-bind="dragOptions" class="list-group q-pb-xs q-pl-xs q-pr-xs" v-model="column.tasks"   item-key="id" group="42">
                    <template #item="{element}">

                        <div class="q-pa-sm list-group-item">
                            <task-card
                            :key="element.id"
                            :task="element"
                            />

                        </div>
                    </template>
                </draggable>
                </div>
            </div>
        </div>
    </div>
    </base-content>
</template>

<script setup>
import { ref, watch } from 'vue'

import BaseContent from 'src/components/BaseContent/BaseContent.vue';
import draggable from 'vuedraggable'
import TaskCard from 'src/components/TaskCard.vue';
import { Notify } from 'quasar'

function doMove(e) {
    if (e.added === undefined) {
        return
    }
    console.log("ADDED", e.added.element)
    Notify.create('>>', e.added.element)

    // Iterer sur toutes les listes pour trouver la nouvelle position de l'élément cx
}

const dragOptions = {
        animation: 320,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
}

const columns = ref([
        {
          title: "Backlog",
          tasks: [
            {
              id: 1,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12"
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 4,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 5,
              title: "Test checkout flow",
              date: "Sep 15",
              type: "QA"
            }
          ]
        },
        {
          title: "In Progress",
          tasks: [
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 7,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 8,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            }
          ]
        },
        {
          title: "Review",
          tasks: [
            {
              id: 9,
              title: "Provide documentation on integrations",
              date: "Sep 12"
            },
            {
              id: 10,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 11,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 12,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 13,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            }
          ]
        },
        {
          title: "Done",
          tasks: [
            {
              id: 14,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 15,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 16,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            }
          ]
        }
])

</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}


.ghost {
  opacity: 0.5;
  background: #F7FAFC;
  border: 3px solid #4299e1;

}

</style>

