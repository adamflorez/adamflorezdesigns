<template>
  <NuxtLayout name="auth">
    <UCard class="bg-white max-w-md w-full rounded-lg shadow-xl">
      <template #header>
        <h2 class="text-2xl text-center">Register</h2>
      </template>
      <UForm method="post" :state="userData">
        <UFormGroup label="Email" class="mb-4">
          <UInput
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
            v-model="userData.email"
          />
        </UFormGroup>
        <UFormGroup label="Password" class="mb-8">
          <UInput
            placeholder="****"
            type="password"
            icon="i-heroicons-lock-closed"
            v-model="userData.password"
          />
        </UFormGroup>
        <UButton @click="signup" type="submit" color="blue" block>
          Register
        </UButton>
      </UForm>
      <div class="text-red-300">{{ errorMsg ? errorMsg : successMsg }}</div>
      <div class="text-center mt-4">
        <p>
          Already a member?
          <ULink to="/login" class="font-bold hover:underline">
            Sign in</ULink
          >
        </p>
      </div>
    </UCard>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
const client = useSupabaseClient();
const errorMsg = ref(null);
const successMsg = ref(null);
const userData = ref({
  email: "",
  password: "",
});

const signup = async () => {
  console.log(userData.value);
  try {
    const { data, error } = await client.auth.signUp(userData.value);
    if (error) throw error;
    successMsg.value = "Check your email to confirm your account.";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<style lang="scss" scoped></style>
