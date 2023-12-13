<template>
  <div class="min-h-screen">
    <UContainer>
      <div class="flex container mx-auto p-4 justify-between items-center">
        <div>Logo</div>
        <nav class="gap-3 flex items-center">
          <ULink to="/products">Products</ULink>
          <ULink to="/ingredients">Ingredients</ULink>
          <UButton @click="logout"> Logout </UButton>
        </nav>
      </div>
    </UContainer>
    <UContainer>
      <slot />
    </UContainer>
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
