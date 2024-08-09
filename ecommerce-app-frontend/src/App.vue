<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-2xl font-bold">E-commerce App</h1>
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
  name: 'App',
};
</script>

<style>
  /* Additional custom styles if needed */
</style>
