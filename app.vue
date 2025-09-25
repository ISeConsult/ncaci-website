<template>
  <div>
    <div class="background-layout"></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="church-spinner">
        <div class="cross">
          <div class="cross-vertical"></div>
          <div class="cross-horizontal"></div>
        </div>
        <div class="loading-text">Loading...</div>
      </div>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const isLoading = ref(false)

// Router navigation events
const router = useRouter()
router.beforeEach(() => { isLoading.value = true })
router.afterEach(() => { 
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 29, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.church-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cross {
  position: relative;
  width: 50px;
  height: 50px;
  animation: glow 2s ease-in-out infinite alternate;
}

.cross-vertical {
  position: absolute;
  left: 50%;
  top: 0;
  width: 6px;
  height: 50px;
  background: linear-gradient(180deg, #8B4513, #D4AF37);
  transform: translateX(-50%);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.cross-horizontal {
  position: absolute;
  top: 30%;
  left: 0;
  width: 50px;
  height: 6px;
  background: linear-gradient(90deg, #8B4513, #D4AF37);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.loading-text {
  color: #8B4513;
  font-family: 'Georgia', serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  animation: fade 1.5s ease-in-out infinite alternate;
}

@keyframes glow {
  0% { 
    transform: scale(1);
    filter: brightness(1);
  }
  100% { 
    transform: scale(1.1);
    filter: brightness(1.3);
  }
}

@keyframes fade {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

/* Alternative spinning cross option - uncomment to use */
/*
.cross {
  animation: spin-cross 3s linear infinite;
}

@keyframes spin-cross {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(90deg) scale(1.05); }
  50% { transform: rotate(180deg) scale(1); }
  75% { transform: rotate(270deg) scale(1.05); }
  100% { transform: rotate(360deg) scale(1); }
}
*/
</style>