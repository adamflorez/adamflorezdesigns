<template>
  <div class="min-h-screen bg-yellow-100">
    <div class="w-full bg-orange-200">
      <div class="flex container mx-auto p-4 justify-between items-center">
        <div>Logo</div>
        <nav class="gap-3 flex items-center">
          <NuxtLink>Products</NuxtLink>
          <button class="py-2 px-5 hover:bg-orange-400" @click="logout">
            Logout
          </button>
        </nav>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const router = useRouter();

const logout = async () => {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
