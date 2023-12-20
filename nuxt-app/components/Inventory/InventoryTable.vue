import type loginVue from '~/pages/login.vue'; import type { userStore } from
'~/stores/user';
<template>
  <UCard class="md:basis-2/3">
    <UTable v-model="selected" :columns="headers" :rows="modelValue">
      <template #cost_per_unit-data="{ row }">
        {{ useFormatter().USDollar.format(row.cost_per_unit) }}
      </template>
      <template #cost-data="{ row }">
        {{ useFormatter().USDollar.format(row.cost) }}
      </template>
      <template #actions-data="{ row }">
        <UButton
          icon="i-heroicons-pencil"
          class="mr-2"
          @click="selectItem(row)"
        ></UButton>
        <UButton
          icon="i-heroicons-trash"
          color="red"
          @click="selectItem(row)"
        ></UButton>
      </template>
    </UTable>
    <template #footer v-if="selected.length > 0">
      <UButton @click="isOpen = true">Create Product</UButton>
    </template>
  </UCard>
  <UModal v-model="isOpen" fullscreen>
    <ProductsAddProduct v-model="selected" @close="isOpen = false" />
  </UModal>
  <UModal v-model="deleteModal">
    <UCard>
      <template #header> Are you sure? </template>
      This will delete the item out of the database.
      <template #footer>
        <div class="flex justify-end">
          <UButton @click="deleteModal = false" variant="ghost">Cancel</UButton>
          <UButton @click="deleteIngredient()" class="ml-3">Delete</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
const props = defineProps(["modelValue"]);
const client = useSupabaseClient();
const deleteModal = ref(false);
const headers = ref([
  { label: "Name", key: "name" },
  { label: "Cost", key: "cost" },
  { label: "Amount Of Units", key: "amount_of_units" },
  { label: "Units Of Measurements", key: "unit_of_measurement" },
  { label: "CPU", key: "cost_per_unit" },
  { label: "Actions", key: "actions" },
]);
const isOpen = ref(false);
const selected = ref([]);
const selectedDelete = ref(null);

const selectItem = (item) => {
  selectedDelete.value = item;
  deleteModal.value = true;
};
const deleteIngredient = async () => {
  await client
    .from("ingredients")
    .delete("exact")
    .eq("ingredient_id", selectedDelete.value.ingredient_id);
  deleteModal.value = false;
};
</script>

<style lang="scss" scoped></style>
