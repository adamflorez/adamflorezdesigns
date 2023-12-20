<template>
  <UCard class="basis-full">
    <template #header>
      <h2 class="text-xl text-center">Upload Receipt</h2>
    </template>
    <UForm :state="state">
      <UFormGroup name="Add Receipt">
        <UInput type="file" v-model="state.file"/>
      </UFormGroup>
      <UButton @click="uploadReceipt">Upload </UButton>
    </UForm>
  </UCard>
</template>

<script setup>
const state = ref({
  file: null,
});
const headers = new Headers();
headers.append("apikey", useRuntimeConfig().public.eden);
const formdata = new FormData();
formdata.append("language", "eng");
formdata.append("scale", "true");
formdata.append("isTable", "true");
formdata.append("OCREngine", "3");


const uploadReceipt = async () => {
  await fetch("https://api.edenai.run/v2/ocr/receipt_parser", {
    method: "POST",
    body: {
      providers: "amazon",
      language: 'en',
      file_url: state.value.file,
      fallback_providers: 'microsoft'
    },
    headers,
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((err) => console.log({ err }));
};
</script>

<style lang="scss" scoped></style>
