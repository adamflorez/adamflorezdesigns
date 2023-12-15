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
          placeholder="Recipe name"
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
      <UFormGroup label="Price">
        <UInput
          type="number"
          placeholder="Recipe price"
          v-model="state.price"
          class="mb-2"
        />
      </UFormGroup>
      <UTable :columns="headers" :rows="modelValue">
        <template #cost_per_unit-data="{ row }">
          {{ useFormatter().USDollar.format(row.cost_per_unit) }}
        </template>
        <template #units_needed-data="{ row, index }">
          <UFormGroup label="Number of Units Needed">
            <UInput type="number" v-model="state.items[index].units_needed" />
          </UFormGroup>
        </template>
        <template #units_needed_type-data="{ row, index }">
          <UFormGroup label="Unit Type">
            <USelect
              placeholder="Choose one..."
              v-model="state.items[index].uom"
              :options="uom"
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

const addRecipe = async () => {
  const { number, fromUnit, toUnit, result, convertUnits } = useUnitConverter();

  for (let i of state.value.items) {
    (number.value = i.units_needed),
      (fromUnit.value = i.uom),
      (toUnit.value = i.unit_of_measurement),
      convertUnits();

    i.amount_of_units = i.amount_of_units -= result.value;
    console.log({ result: result.value }, { amount: i.amount_of_units });
  }

  console.log(state.value);
};
</script>

<style lang="scss" scoped></style>
