export default defineNuxtRouteMiddleware((to, from) => {
  // Check if running on client side
  if (process.client) {
    const authToken = localStorage.getItem('authToken');

    // If no auth token, redirect to login
    if (!authToken) {
      return navigateTo('/login');
    }
  }
});
