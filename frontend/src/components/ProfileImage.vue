<template>
  <div :class="['profile-image-wrap', sizeClass]">
    <img
      v-if="!useFallback"
      :src="src"
      :alt="alt"
      class="profile-image"
      @error="useFallback = true"
    />
    <div v-else class="profile-fallback" :aria-label="alt">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { site } from '@/content/site'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg' | 'hero'
  }>(),
  {
    src: () => site.owner.profileImage,
    alt: () => site.owner.name,
    size: 'md',
  },
)

const useFallback = ref(false)

const initials = computed(() => {
  return site.owner.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

const sizeClass = computed(() => `profile-image-wrap--${props.size}`)
</script>

<style scoped>
.profile-image-wrap {
  overflow: hidden;
  flex-shrink: 0;
}

.profile-image-wrap--sm {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
}

.profile-image-wrap--md {
  width: 9rem;
  height: 9rem;
  border-radius: 9999px;
}

.profile-image-wrap--lg {
  width: 12rem;
  height: 12rem;
  border-radius: 9999px;
}

.profile-image-wrap--hero {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.profile-image-wrap--hero .profile-image {
  object-fit: cover;
  object-position: center 15%;
}

.profile-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--brand-indigo) 0%, var(--brand-indigo-dark) 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 1.5rem;
}

.profile-image-wrap--hero .profile-fallback {
  font-size: 4rem;
  border-radius: 0;
}
</style>
