<template>
  <div class="container mx-auto p-4 max-w-lg">
    <h1 class="text-2xl font-bold mb-4" v-if="isEdit">Edit Product</h1>
    <h1 class="text-2xl font-bold mb-4" v-else>Add Product</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Name</label>
        <input
          v-model="product.name"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea
          v-model="product.description"
          class="w-full p-2 border rounded"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Price</label>
        <input
          v-model="product.price"
          type="number"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Image URL</label>
        <input
          v-model="product.imageURL"
          type="url"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button 
        type="submit" 
        class="w-full bg-blue-500 text-white p-2 rounded"
        :class="{ 'bg-gray-400 cursor-not-allowed': isSubmitting }"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">{{ isEdit ? 'Update' : 'Add' }} Product</span>
        <span v-else>In Progress... Please wait</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: '',
        imageURL: '',
      },
      isSubmitting: false, // Track submission state
    };
  },
  computed: {
    isEdit() {
      return this.$route.name === 'EditProduct';
    },
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true; // Disable the button and change text
      try {
        if (this.isEdit) {
          await this.$store.dispatch('editProduct', {
            id: this.$route.params.id,
            productData: this.product,
          });
        } else {
          await this.$store.dispatch('addProduct', this.product);
        }
        this.$router.push('/');
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false; // Re-enable the button
      }
    },
  },
  mounted() {
    if (this.isEdit) {
      const product = this.$store.state.products.find(
        (p) => p.id === parseInt(this.$route.params.id)
      );
      this.product = { ...product };
    }
  },
};
</script>
