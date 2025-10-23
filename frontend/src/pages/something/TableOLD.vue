<template>
  <base-content padding>
    <q-card class="q-gutter-md">


    <q-card-section class="q-gutter-sm">

        <DataTable 
            v-model:filters="filters"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']"
            :value="products"
            dataKey="id"
            ref="dt"
            stripedRows
            v-model:expandedRows="expandedRows"
            tableStyle="min-width: 50rem"
            paginator
            :rows="50"
            :rowsPerPageOptions="[10,50, 100, 500]"
            resizableColumns
            columnResizeMode="fit"
            scrollable
            scrollHeight="70vh"
        >
            <!-- <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template> -->
            <template #header>
                <div class="flex">
                    <q-btn  color="primary" label="New object" @click="NewDialog = true" />
                    <q-space/>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>

                </div>

        <div class="text-end pb-4">
            <!-- <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" /> -->
        </div>

            </template>
            <template #empty> No customers found. </template>

            <template #paginatorend>
                <q-btn color="white" text-color="black" label="Standard" />
            </template>
            <template #expansion="slotProps">
                <q-timeline layout="comfortable" color="secondary">

                  <q-timeline-entry heading>
                    Historique
                  </q-timeline-entry>

                  <q-timeline-entry title="Event Title" subtitle="February 22, 1986"
                    avatar="https://cdn.quasar.dev/img/avatar2.jpg">
                    <div>
                        {{  slotProps }}
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Event Title" subtitle="February 22, 1986">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Event Title" subtitle="February 22, 1986" color="orange" icon="done_all">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>


                </q-timeline>

            </template>

            <!-- <Column expander style="width: 5rem" /> -->

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <!-- <Column header="Country" filterField="country.name" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                        <span>{{ data.country.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by country" />
                </template>
            </Column> -->
            <!-- <Column header="Agent" filterField="representative" :showFilterMenu="false" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" style="min-width: 14rem" :maxSelectedLabels="1">
                        <template #option="slotProps">
                            <div class="flex items-center gap-2">
                                <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column> -->
            <!-- <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template>
            </Column> -->
            <!-- <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary @change="filterCallback()" />
                </template>
            </Column> -->
        </DataTable>
    </q-card-section>

    </q-card>
    <q-dialog transition-show="flip-down" transition-hide="flip-up" v-model="NewDialog" backdrop-filter="blur(4px)">

        <NewFormDialog />
    </q-dialog>

  </base-content>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Button from 'primevue/button';                   // optional
import { FilterMatchMode } from '@primevue/core/api';
import IconField from 'primevue/iconfield';                   // optional
import InputIcon from 'primevue/inputicon';                   // optional
import InputText from 'primevue/inputtext';                   // optional
import Toolbar from 'primevue/toolbar';                   // optional
import Tag from 'primevue/tag';                   // optional
import BaseContent from 'src/components/BaseContent/BaseContent.vue';

import NewFormDialog from "src/components/NewFormDialog.vue";


const NewDialog = ref(false);
const expandedRows = ref({});


const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const dt = ref();

// const exportCSV = () => {
//     dt.value.exportCSV();
// };

const getSeverity = (status: string) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
}

const products = [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Black Watch',
                description: 'Product Description',
                image: 'black-watch.jpg',
                price: 72,
                category: 'Accessories',
                quantity: 61,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
            {
                id: '1003',
                code: '244wgerg2',
                name: 'Blue T-Shirt',
                description: 'Product Description',
                image: 'blue-t-shirt.jpg',
                price: 29,
                category: 'Clothing',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1004',
                code: 'h456wer53',
                name: 'Bracelet',
                description: 'Product Description',
                image: 'bracelet.jpg',
                price: 15,
                category: 'Accessories',
                quantity: 73,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1005',
                code: 'av2231fwg',
                name: 'Brown Purse',
                description: 'Product Description',
                image: 'brown-purse.jpg',
                price: 120,
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1006',
                code: 'bib36pfvm',
                name: 'Chakra Bracelet',
                description: 'Product Description',
                image: 'chakra-bracelet.jpg',
                price: 32,
                category: 'Accessories',
                quantity: 5,
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
            {
                id: '1007',
                code: 'mbvjkgip5',
                name: 'Galaxy Earrings',
                description: 'Product Description',
                image: 'galaxy-earrings.jpg',
                price: 34,
                category: 'Accessories',
                quantity: 23,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1008',
                code: 'vbb124btr',
                name: 'Game Controller',
                description: 'Product Description',
                image: 'game-controller.jpg',
                price: 99,
                category: 'Electronics',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 4
            },
            {
                id: '1009',
                code: 'cm230f032',
                name: 'Gaming Set',
                description: 'Product Description',
                image: 'gaming-set.jpg',
                price: 299,
                category: 'Electronics',
                quantity: 63,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1010',
                code: 'plb34234v',
                name: 'Gold Phone Case',
                description: 'Product Description',
                image: 'gold-phone-case.jpg',
                price: 24,
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1011',
                code: '4920nnc2d',
                name: 'Green Earbuds',
                description: 'Product Description',
                image: 'green-earbuds.jpg',
                price: 89,
                category: 'Electronics',
                quantity: 23,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1012',
                code: '250vm23cc',
                name: 'Green T-Shirt',
                description: 'Product Description',
                image: 'green-t-shirt.jpg',
                price: 49,
                category: 'Clothing',
                quantity: 74,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1013',
                code: 'fldsmn31b',
                name: 'Grey T-Shirt',
                description: 'Product Description',
                image: 'grey-t-shirt.jpg',
                price: 48,
                category: 'Clothing',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 3
            },
            {
                id: '1014',
                code: 'waas1x2as',
                name: 'Headphones',
                description: 'Product Description',
                image: 'headphones.jpg',
                price: 175,
                category: 'Electronics',
                quantity: 8,
                inventoryStatus: 'LOWSTOCK',
                rating: 5
            },
            {
                id: '1015',
                code: 'vb34btbg5',
                name: 'Light Green T-Shirt',
                description: 'Product Description',
                image: 'light-green-t-shirt.jpg',
                price: 49,
                category: 'Clothing',
                quantity: 34,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1016',
                code: 'k8l6j58jl',
                name: 'Lime Band',
                description: 'Product Description',
                image: 'lime-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 12,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1017',
                code: 'v435nn85n',
                name: 'Mini Speakers',
                description: 'Product Description',
                image: 'mini-speakers.jpg',
                price: 85,
                category: 'Clothing',
                quantity: 42,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1014',
                code: 'waas1x2as',
                name: 'Headphones',
                description: 'Product Description',
                image: 'headphones.jpg',
                price: 175,
                category: 'Electronics',
                quantity: 8,
                inventoryStatus: 'LOWSTOCK',
                rating: 5
            },
            {
                id: '1015',
                code: 'vb34btbg5',
                name: 'Light Green T-Shirt',
                description: 'Product Description',
                image: 'light-green-t-shirt.jpg',
                price: 49,
                category: 'Clothing',
                quantity: 34,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1016',
                code: 'k8l6j58jl',
                name: 'Lime Band',
                description: 'Product Description',
                image: 'lime-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 12,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1017',
                code: 'v435nn85n',
                name: 'Mini Speakers',
                description: 'Product Description',
                image: 'mini-speakers.jpg',
                price: 85,
                category: 'Clothing',
                quantity: 42,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1014',
                code: 'waas1x2as',
                name: 'Headphones',
                description: 'Product Description',
                image: 'headphones.jpg',
                price: 175,
                category: 'Electronics',
                quantity: 8,
                inventoryStatus: 'LOWSTOCK',
                rating: 5
            },
            {
                id: '1015',
                code: 'vb34btbg5',
                name: 'Light Green T-Shirt',
                description: 'Product Description',
                image: 'light-green-t-shirt.jpg',
                price: 49,
                category: 'Clothing',
                quantity: 34,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1016',
                code: 'k8l6j58jl',
                name: 'Lime Band',
                description: 'Product Description',
                image: 'lime-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 12,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1017',
                code: 'v435nn85n',
                name: 'Mini Speakers',
                description: 'Product Description',
                image: 'mini-speakers.jpg',
                price: 85,
                category: 'Clothing',
                quantity: 42,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1018',
                code: '09zx9c0zc',
                name: 'Painted Phone Case',
                description: 'Product Description',
                image: 'painted-phone-case.jpg',
                price: 56,
                category: 'Accessories',
                quantity: 41,
                inventoryStatus: 'INSTOCK',
                rating: 5
            }
        ]
// import { useUserStore } from "src/stores/user";
// import { useAppStore } from "src/stores/app"
// import { usePermission } from "src/stores/permission";
// import { ref } from "vue";
// import BaseContent from "src/components/BaseContent/BaseContent.vue";

// defineOptions({ name: "Directive" });

// const userStore = useUserStore();
// const appStore = useAppStore();
// const { hasPermission } = usePermission();

// const selectedPermission = ref<string>(userStore.getUserRoles[0] || '');
// const permissionOptions = [{ label: "super", value: "super" }, { label: "admin", value: "admin" }, { label: "user", value: "user" }]

// const handlePermissionChange = () => {
//   userStore.setUserRoles([selectedPermission.value]);
//   appStore.reloadPage(200).catch(err => console.log(err))
// }

</script>

