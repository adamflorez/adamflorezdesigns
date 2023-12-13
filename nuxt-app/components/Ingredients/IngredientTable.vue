import type loginVue from '~/pages/login.vue'; import type { userStore } from
'~/stores/user';
<template>
  <UCard class="basis-2/3">
    <UTable :columns="headers" :rows="modelValue">
      <template #cost_per_unit-data="{ row }">
        {{ USDollar.format(row.cost_per_unit) }}
      </template>
      <template #cost-data="{ row }">
        {{ USDollar.format(row.cost) }}
      </template>
    </UTable>
  </UCard>
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

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
</script>

<style lang="scss" scoped></style>
