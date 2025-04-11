<template>
  <!-- Remove the default Vue logo and HelloWorld component -->
  <!-- Add router-view for displaying route components -->
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Update the global styles to match your chess app design */
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #302E2B; /* Your chess app background color */
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Optional: Add some global Tailwind-like utility classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>