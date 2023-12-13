<template>
  <UCard class="basis-1/3">
    <template #header>
      <h2 class="text-xl text-center">Add Ingredient</h2>
    </template>
    <UForm :state="state">
      <UFormGroup label="Name">
        <UInput
          placeholder="ingredient name"
          v-model="state.name"
          class="mb-2"
        />
      </UFormGroup>
      <UFormGroup label="Description">
        <UTextarea
          placeholder="ingredient name"
          v-model="state.description"
          class="mb-2"
        />
      </UFormGroup>
      <UFormGroup label="Cost">
        <UInput
          type="number"
          placeholder="ingredient cost"
          v-model="state.cost"
          class="mb-2"
        />
      </UFormGroup>
      <UFormGroup label="Amount of units">
        <UInput
          placeholder="ingredient name"
          v-model="state.amount_of_units"
          class="mb-2"
        />
      </UFormGroup>
      <UFormGroup label="Units of Measurement">
        <USelect
          placeholder="ingredient name"
          v-model="state.unit_of_measurement"
          :options="uom"
          option-attribute="name"
        />
      </UFormGroup>
      <UButton class="mt-4" @click="addIngredient">Submit</UButton>
    </UForm>
  </UCard>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const { id } = user.value;
const emit = defineEmits(["added"]);
const state = ref({
  name: "",
  description: "",
  cost: 0,
  amount_of_units: 0,
  unit_of_measurement: "",
  user_id: id,
});

const uom = ref([
  { name: "Teaspoon", value: "tsp" },
  { name: "Tablespoon", value: "tbsp" },
  { name: "Fluid ounce", value: "fl oz" },
  { name: "Cup", value: "c" },
  { name: "Pint", value: "pt" },
  { name: "Quart", value: "qt" },
  { name: "Gallon", value: "gal" },
  { name: "Milliliter", value: "ml" },
  { name: "Liter", value: "l" },
  { name: "Pound", value: "lb" },
  { name: "Ounce", value: "oz" },
  { name: "Gram", value: "g" },
  { name: "Kilogram", value: "kg" },
  { name: "Milligram", value: "mg" },
  { name: "Pinch", value: "pinch" },
  { name: "Dash", value: "dash" },
  { name: "Stick", value: "stick" },
  { name: "Inch", value: "in" },
  { name: "Centimeter", value: "cm" },
  { name: "Millimeter", value: "mm" },
]);

const addIngredient = async () => {
  try {
    const { error } = await client
      .from("ingredients")
      .insert(state.value);
    if (error) throw error;
    emit("added");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
