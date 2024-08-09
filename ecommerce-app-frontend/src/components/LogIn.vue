<template>
    <div class="container mx-auto p-4 max-w-sm">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="credentials.email"
            type="email"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full p-2 rounded text-white"
          :class="{
            'bg-blue-500 hover:bg-blue-600': !isSubmitting,
            'bg-gray-400 cursor-not-allowed': isSubmitting,
          }"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Login</span>
          <span v-else>Logging in... Please wait</span>
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        isSubmitting: false, // Track the submission state
      };
    },
    methods: {
      async submitForm() {
        this.isSubmitting = true;
        try {
          await this.$store.dispatch('login', this.credentials);
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed', error);
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  };
  </script>
  