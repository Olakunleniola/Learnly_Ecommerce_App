<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">E-commerce App</h1>
      <div class="flex items-center space-x-2">
        <button v-if="!isAuthenticated" @click="navigateToLogin" class="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
          Login
        </button>
        <button v-if="isAuthenticated" @click="navigateToAddProduct" class="bg-green-500 text-white py-2 px-4 flex items-center rounded hover:bg-green-600">
          <i class="bi bi-box-arrow-right mr-1 font-black	"></i>
          <span class="hidden md:inline">Add Product</span>
        </button>
        <button v-if="isAuthenticated" @click="logout" class="bg-red-500 text-white py-2 px-4 flex items-center rounded hover:bg-red-600 ml-2">
          <i class="bi bi-plus-square mr-1 font-black	"></i>
          <span class="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
    <main class="flex-grow p-4">
      <router-view />
    </main>

    <footer class="bg-blue-500 text-white p-4 mt-auto">
      <p>&copy; 2024 E-commerce App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProduct' });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
