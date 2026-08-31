<template>
  <div class="site-layout">
    <Header />
    <main class="site-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.site-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--surface-page);
}

.site-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
