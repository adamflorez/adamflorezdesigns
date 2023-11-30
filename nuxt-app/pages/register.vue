<template>
  <NuxtLayout name="auth">
    <div class="bg-white p-12 max-w-3xl w-full rounded-lg shadow-xl">
      <h3 class="text-center text-4xl font-bold mb-8">Register</h3>
      <div class="h-[1px] w-full bg-gray-400 mb-8"></div>
      <form @submit.prevent="signup" method="post">
        <div class="flex flex-col gap-6">
          <label for="email" class="font-semibold">Email Address: </label>
          <input
            id="email"
            class="p-2 rounded"
            v-model="userData.email"
            placeholder="example@gmail.com"
            required
          />
          <label for="password" class="font-semibold">Password: </label>
          <input
            class="p-2 rounded"
            id="password"
            v-model="userData.password"
            type="password"
            placeholder="**********"
            required
          />
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-700 hover:bg-blue-90 focus:ring-blue-500 rounded text-sm font-medium text-gray-300 uppercase outline-none transition duration-150 ease-in-out"
          >
            Sign up
          </button>
        </div>
      </form>
      <div>
        <p class="text-red-300">{{ errorMsg }}</p>
        <p class="text-green-300">{{ successMsg }}</p>
      </div>
      <div class="text-center mt-4">
        <p>
          already a member?
          <NuxtLink to="/login" class="font-bold hover:underline">
            Sign in</NuxtLink
          >
        </p>
      </div>
    </div>
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
