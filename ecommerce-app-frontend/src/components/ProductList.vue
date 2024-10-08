<template>
    <div class="container mx-auto p-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full p-2 mb-4 border rounded"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="border p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
          @click="viewProduct(product.id)"
        >
          <img :src="product.imageURL" alt="" class="w-full h-48 object-cover rounded"/>
          <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-blue-500 font-bold">{{ formatCurrency(product.price) }}</p>
          <div v-if="isAuthenticated" class="mt-2 flex space-x-2">
            <button @click.stop="editProduct(product)" class="bg-yellow-500 text-white p-2 rounded">Edit</button>
            <button
              @click.stop="deleteProduct(product.id)"
              class="bg-red-500 text-white p-2 rounded"
              :class="{ 'hover:bg-red-600': !isDeleting(product.id), 'bg-gray-400 cursor-not-allowed': isDeleting(product.id) }"
              :disabled="isDeleting(product.id)"
            >
              <span v-if="!isDeleting(product.id)">Delete</span>
              <span v-else>Deleting... Please wait</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        deletingProducts: [], // Track the deletion state of products
      };
    },
    computed: {
      filteredProducts() {
        return this.$store.state.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      isAuthenticated() {
        return this.$store.state.isAuthenticated;
      },
    },
    methods: {
      formatCurrency(value) {
        return `$${value.toFixed(2)}`;
      },
      viewProduct(id) {
        this.$router.push({ name: 'ProductDetail', params: { id } });
      },
      editProduct(product) {
        this.$router.push({ name: 'EditProduct', params: { id: product.id } });
      },
      isDeleting(id) {
        return this.deletingProducts.includes(id);
      },
      async deleteProduct(id) {
        if (!this.isDeleting(id)) {
          this.deletingProducts.push(id);
          try {
            await this.$store.dispatch('deleteProduct', id);
          } catch (error) {
            console.error('Error deleting product:', error);
          } finally {
            this.deletingProducts = this.deletingProducts.filter(productId => productId !== id);
          }
        }
      },
    },
    mounted() {
      this.$store.dispatch('fetchProducts');
    },
  };
  </script>
  