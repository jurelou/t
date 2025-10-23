<template>
  <base-content class="q-pa-sm">
      <h3>Draggable table</h3>

  <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">

        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4 q-pa-smq-gutter-md" 
        >

      <!-- <table class="table table-striped"> -->
        <!-- <thead class="thead-dark">
          <tr> -->
            <!-- <th scope="col">Id</th>
            <th scope="col">Name</th> -->
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>

            <!-- <th scope="col">Sport</th> -->
          <!-- </tr>
        </thead> -->
            <draggable @start="drag = true" @end="drag = false" class="q-gutter-sm q-pa-sm list-group" v-model="column.tasks"  item-key="id" group="42">
                <template #item="{element}">
                    <task-card
                    :key="element.id"
                    :task="element"
                    />

                </template>
            </draggable>
      <!-- </table> -->
    </div>
    </div>
    </div>


    </base-content>
</template>

<script>
import BaseContent from 'src/components/BaseContent/BaseContent.vue';

import draggable from 'vuedraggable'
import TaskCard from 'src/components/TaskCard.vue';
export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    BaseContent
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "42",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data() {
    return {
        drag: false,
      columns: [
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
      ]
    };
  }
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;

}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>

