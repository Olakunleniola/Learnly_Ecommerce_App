<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">E-commerce App</h1>
      <div>
        <button v-if="!isAuthenticated" @click="navigateToLogin" class="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
          Login
        </button>
        <button v-if="isAuthenticated" @click="navigateToAddProduct" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Add Product
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
  },
};
</script>
