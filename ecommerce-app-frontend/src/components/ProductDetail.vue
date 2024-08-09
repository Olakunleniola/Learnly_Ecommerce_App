<template>
    <div class="container mx-auto p-4">
        <button @click="goBack" class="mb-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
            Back
        </button>
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
            <p v-else >Login to Edit or Delete Product</p>
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
        goBack() {
            this.$router.go(-1);
        },

        fetchProduct() {
            const productId = this.$route.params.id;
            const product = this.$store.state.products.filter(product => product.id == productId);
            if (product.length > 0) {
                this.product = {...product[0], image: product[0].imageURL };
            } else {
                console.error('Product not found');
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
