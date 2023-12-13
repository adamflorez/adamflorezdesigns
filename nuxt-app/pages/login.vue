<template>
  <NuxtLayout name="auth">
    <UCard class="bg-white max-w-md w-full rounded-lg shadow-xl">
      <template #header>
        <h2 class="text-2xl text-center">Login</h2>
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

        <UButton @click="signin" type="submit" color="blue" block>
          Log In
        </UButton>
      </UForm>
      <div class="text-red-300">{{ errorMsg }}</div>
      <div class="text-center mt-4">
        <p>
          Not a member?
          <ULink to="/register" class="font-bold hover:underline">
            Sign up</ULink
          >
        </p>
      </div>
    </UCard>
  </NuxtLayout>
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();
definePageMeta({
  layout: "auth",
});
const userData = ref({
  email: "",
  password: "",
});
const errorMsg = ref(null);

const signin = async () => {
  try {
    const { data, error } = await client.auth.signInWithPassword(
      userData.value
    );

    if (error) throw error;
    router.push("/");
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<style lang="scss" scoped></style>
