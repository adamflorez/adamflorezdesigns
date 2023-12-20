<template>
  <UContainer>
    <UButton icon="i-heroicons-plus" class="mb-4" @click="addItemModal = true">
      Add Item
    </UButton>
    <UModal v-model="addItemModal">
      <InventoryAddItem @added="getInventory" />
    </UModal>
    <InventoryTable v-model="items" />
    <!-- <IngredientsUploadReceipt /> -->
  </UContainer>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const { id } = user.value;
const addItemModal = ref(false);
const items = ref([]);
const getInventory = async () => {
  items.value = [];
  try {
    const { data, error } = await client
      .from("ingredients")
      .select()
      .eq("user_id", id);
    if (error) throw error;

    items.value = data.map((i) => {
      return { ...i, cost_per_unit: i.cost / i.amount_of_units };
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (addItemModal.value) {
      addItemModal.value = false;
    }
  }
};
onMounted(() => {
  getInventory();
});
</script>

<style lang="scss" scoped></style>
