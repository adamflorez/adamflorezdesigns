<template>
  <div class="min-h-screen">
    <UContainer>
      <div class="flex container mx-auto p-4 justify-between items-center">
        <div>Logo</div>
        <nav class="gap-3 flex items-center">
          <ULink to="/products">Products</ULink>
          <ULink to="/ingredients">Ingredients</ULink>
          <UButton @click="logout"> Logout </UButton>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
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

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

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
