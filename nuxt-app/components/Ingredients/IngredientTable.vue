import type loginVue from '~/pages/login.vue'; import type { userStore } from
'~/stores/user';
<template>
  <UCard class="basis-2/3">
    <UTable v-model="selected" :columns="headers" :rows="modelValue">
      <template #cost_per_unit-data="{ row }">
        {{ useFormatter().USDollar.format(row.cost_per_unit) }}
      </template>
      <template #cost-data="{ row }">
        {{ useFormatter().USDollar.format(row.cost) }}
      </template>
    </UTable>
    <template #footer v-if="selected.length > 0">
      <UButton @click="isOpen = true">Create Product</UButton>
    </template>
  </UCard>
  <UModal v-model="isOpen" fullscreen>
    <ProductsAddProduct v-model="selected" @close="isOpen = false" />
  </UModal>
</template>

<script setup>
const props = defineProps(["modelValue"]);

const headers = ref([
  { label: "Name", key: "name" },
  { label: "Cost", key: "cost" },
  { label: "Amount Of Units", key: "amount_of_units" },
  { label: "Units Of Measurements", key: "unit_of_measurement" },
  { label: "CPU", key: "cost_per_unit" },
]);
const isOpen = ref(false);
const selected = ref([]);
console.log();
watch(selected, (val) => {
  console.log(val);
});
</script>

<style lang="scss" scoped></style>
