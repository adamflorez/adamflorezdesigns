<template>
  <NuxtLayout name="auth">
    <div class="bg-white p-12 max-w-3xl w-full rounded-lg shadow-xl">
      <h3 class="text-center text-4xl font-bold mb-8">Login</h3>
      <div class="h-[1px] w-full bg-gray-400 mb-8"></div>
      <form @submit.prevent="signin" method="post">
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
            Log In
          </button>
        </div>
      </form>
      <div class="text-red-300">{{ errorMsg }}</div>
      <div class="text-center mt-4">
        <p>
          not a member?
          <NuxtLink to="/register" class="font-bold hover:underline">
            Sign up</NuxtLink
          >
        </p>
      </div>
    </div>
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
    const { error } = await client.auth.signInWithPassword(userData.value);
    if (error) throw error;
    router.push("/");
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<style lang="scss" scoped></style>
