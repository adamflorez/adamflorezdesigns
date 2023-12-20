<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <h2 class="text-xl">Add Recipe</h2>
        <UButton icon="i-heroicons-x-mark" @click="emit('close')"></UButton>
      </div>
    </template>
    <UForm :state="state">
      <UFormGroup label="Name">
        <UInput placeholder="Recipe name" v-model="state.name" class="mb-2" />
      </UFormGroup>
      <UFormGroup label="Description">
        <UTextarea
          placeholder="Recipe Description"
          v-model="state.description"
          class="mb-2"
        />
      </UFormGroup>
      <UFormGroup label="Cost">
        <UInput
          type="number"
          placeholder="Recipe cost"
          v-model="state.cost"
          class="mb-2"
        />
      </UFormGroup>
      <div class="flex gap-4 items-end mb-4">
        <UFormGroup label="Price" class="basis-1/2">
          <UInput
            type="number"
            placeholder="Recipe price"
            v-model="state.price"
            class="mb-2"
          />
        </UFormGroup>
        <UFormGroup
          label="Minimum Suggested Price (300% margin)"
          class="basis-1/2"
        >
          <UInput
            type="number"
            placeholder="Recipe price"
            v-model="suggestedPrice"
            class="mb-2"
            readonly
          />
        </UFormGroup>
        <UButton class="mb-2" @click="updatePrice">Use Suggested Price</UButton>
      </div>
      <h2>Selected Inventory</h2>
      <UTable :columns="headers" :rows="modelValue" class="h-96 border rounded">
        <template #cost_per_unit-data="{ row }">
          {{ useFormatter().USDollar.format(row.cost_per_unit) }}
        </template>
        <template #units_needed-data="{ row, index }">
          <UFormGroup label="Number of Units Needed">
            <UInput
              type="number"
              v-model="state.items[index].units_needed"
              @change="getCost"
            />
          </UFormGroup>
        </template>
        <template #units_needed_type-data="{ row, index }">
          <UFormGroup label="Unit Type">
            <USelect
              placeholder="Choose one..."
              v-model="state.items[index].uom"
              :options="uom"
              @change="getCost"
              option-attribute="name"
            />
          </UFormGroup>
        </template>
      </UTable>
      <UButton class="mt-4" @click="addRecipe">Submit</UButton>
    </UForm>
  </UCard>
</template>

<script setup>
import UOM from "../../assets/data/unitsOfMeasurement";
const client = useSupabaseClient();
const user = useSupabaseUser();
const { id } = user.value;
console.log(id);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["close"]);

const headers = ref([
  { label: "Name", key: "name" },
  { label: "CPU", key: "cost_per_unit" },
  { label: "Amount Of Units", key: "amount_of_units" },
  { label: "Unit Of Measurement", key: "unit_of_measurement" },
  { label: "Units Needed", key: "units_needed" },
  { label: "Units Needed type", key: "units_needed_type" },
]);

const state = ref({
  name: "",
  description: "",
  price: 0,
  cost: 0,
  items: props.modelValue.map((i) => {
    return { ...i, units_needed: 0, uom: i.unit_of_measurement };
  }),
});
const fromUnit = ref([]);
const unitsNeeded = ref([]);
const uom = ref(UOM);
const suggestedPrice = ref(0);

const updatePrice = () => {
  state.value.price = suggestedPrice.value;
};
const getCost = async () => {
  state.value.cost = 0;
  for (let i of state.value.items) {
    let val = useUnitConverter(i.units_needed, i.uom, i.unit_of_measurement);
    i.quantityUsed = val;
    i.unit_used = i.unit_of_measurement;
    state.value.cost += val * i.cost_per_unit;
  }
  state.value.cost = state.value.cost.toFixed(2);
  suggestedPrice.value = (state.value.cost * 3).toFixed(2);
};

const addRecipe = async () => {
  let productId = null;
  try {
    const { data, error } = await client
      .from("recipes")
      .insert({
        name: state.value.name,
        description: state.value.description,
        price: state.value.price,
        cost: state.value.cost,
        user_id: id,
      })
      .select();
    productId = data[0].product_id;
    if (error) throw error;
  } catch (err) {
    console.log("Error in adding recipe: ", err);
  } finally {
    state.value.items.forEach((i) => {
      addRecipeIngredients(productId, i);
    });
  }
};

const addRecipeIngredients = async (productId, i) => {
  console.log(i);
  const { data, error } = await client.from("recipe_ingredients").insert({
    product_id: productId,
    ingredient_id: i.ingredient_id,
    quantity_user: i.units_needed,
    unit_of_measurement: i.uom,
  });
};
</script>

<style lang="scss" scoped></style>
