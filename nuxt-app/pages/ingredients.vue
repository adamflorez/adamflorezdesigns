<template>
  <UContainer>
    <UButton
      icon="i-heroicons-plus"
      class="mb-4"
      @click="addIngredientModal = true"
    >
      Add Ingredient
    </UButton>
    <UModal v-model="addIngredientModal">
      <IngredientsAddIngredient @added="getIngredients" />
    </UModal>
    <IngredientsIngredientTable v-model="items" />
    <!-- <IngredientsUploadReceipt /> -->
  </UContainer>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const { id } = user.value;
const addIngredientModal = ref(false);
const items = ref([]);
const getIngredients = async () => {
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
  }
};
onMounted(() => {
  getIngredients();
});
</script>

<style lang="scss" scoped></style>
