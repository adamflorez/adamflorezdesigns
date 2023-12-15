<template>
  <UContainer>
    <div class="flex gap-4 mb-4">
      <IngredientsAddIngredient @added="getIngredients" />
      <IngredientsIngredientTable v-model="items" />
    </div>

    <!-- <IngredientsUploadReceipt /> -->
  </UContainer>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const { id } = user.value;

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

    console.log(items.value);
  } catch (err) {
    console.error(err);
  }
};
onMounted(() => {
  getIngredients();
});
</script>

<style lang="scss" scoped></style>
