<template>
  <UCard class="basis-1/3 mb-4 md:mb-0">
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
import UOM from "../../assets/data/unitsOfMeasurement";
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

const uom = ref(UOM);

const addIngredient = async () => {
  try {
    const { error } = await client.from("ingredients").insert(state.value);
    if (error) throw error;
    emit("added");
    state.value = {
      name: "",
      description: "",
      cost: 0,
      amount_of_units: 0,
      unit_of_measurement: "",
      user_id: id,
    };
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
