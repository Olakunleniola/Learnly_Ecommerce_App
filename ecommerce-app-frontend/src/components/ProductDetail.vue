<template>
    <div class="container mx-auto p-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <img :src="product.image" alt="Product Image" class="w-full h-64 object-cover rounded-md mb-4" />
        <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <p class="text-lg font-semibold mb-6">${{ product.price }}</p>
  
        <div v-if="isAuthenticated" class="flex space-x-4">
          <button @click="editProduct" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit
          </button>
          <button @click="deleteProduct" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        product: {
          id: '',
          name: '',
          description: '',
          price: 0,
          image: '',
        },
      };
    },
    computed: {
      isAuthenticated() {
        return this.$store.state.isAuthenticated;
      },
    },
    methods: {
      async fetchProduct() {
        try {
          const response = await this.$store.dispatch('getProduct', this.$route.params.id);
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      },
      editProduct() {
        this.$router.push({ name: 'EditProduct', params: { id: this.product.id } });
      },
      async deleteProduct() {
        try {
          await this.$store.dispatch('deleteProduct', this.product.id);
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },
    },
    created() {
      this.fetchProduct();
    },
  };
</script>
  
<style scoped>

</style>
  