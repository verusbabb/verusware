<template>
  <div>
    <Toast />

    <div class="card">
      <Menubar :model="items">
        <template #start>
          <div class="text-2xl font-bold mr-8">
            Verus | <span class="text-indigo-500">Ware</span>
          </div>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
          <!-- Only customize root level items, let PrimeVue handle submenu items -->
          <template v-if="root">
            <router-link
              v-if="item.routerLink"
              :to="item.routerLink"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a :href="href" @click="navigate" class="flex items-center">
                <span :class="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <Badge
                  v-if="item.badge"
                  class="ml-auto"
                  :value="item.badge"
                />
                <i
                  v-if="hasSubmenu"
                  class="pi pi-angle-down ml-2"
                ></i>
              </a>
            </router-link>
            <a 
              v-else 
              v-ripple 
              class="flex items-center p-0" 
              v-bind="props.action" 
              style="padding: 0 !important;"
            >
              <span :class="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
              <Badge
                v-if="item.badge"
                class="ml-2"
                :value="item.badge"
              />
              <i
                v-if="hasSubmenu"
                class="pi pi-angle-down ml-2"
              ></i>
            </a>
          </template>
          <!-- Let PrimeVue handle submenu items with default template -->
          <template v-else>
            <a v-ripple v-bind="props.action">
              <span :class="item.icon"></span>
              <span>{{ item.label }}</span>
            </a>
          </template>
        </template>
        <template #end>
          <Button
            label="DB Connection Check"
            icon="pi pi-heart"
            @click="handleHealthCheck"
            :loading="isCheckingHealth"
            :disabled="isCheckingHealth"
            text
            severity="secondary"
            class="db-check-button"
          />
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import {
    Badge,
    Button,
    Menubar,
    Toast,
  } from "primevue";
  import { useHealthStore } from "@/stores/health";

  const healthStore = useHealthStore();
  const isCheckingHealth = ref(false);

  const handleHealthCheck = async () => {
    console.log('Health Check clicked');
    isCheckingHealth.value = true;
    try {
      await healthStore.checkHealthWithToast();
    } finally {
      isCheckingHealth.value = false;
    }
  };

  const items = ref([
    {
      label: "Home",
      icon: "pi pi-home",
      routerLink: "/",
    },
    {
      label: "Things",
      icon: "pi pi-pencil",
      routerLink: "/blog",
    },
    {
      label: "Projects",
      icon: "pi pi-graduation-cap",
      badge: 3,
      items: [
        {
          label: "Coming Soon",
          icon: "pi pi-check",
        },
        {
          label: "Coming Soon",
          icon: "pi pi-check",
        },
        {
          label: "Coming Soon",
          icon: "pi pi-check",
        },
      ],
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      routerLink: "/",
    },
  ]);
</script>

<style scoped>
  /* Force equal spacing between all menu items - only on desktop */
  @media (min-width: 1024px) {
    :deep(.p-menubar-root-list) {
      display: flex !important;
      gap: 1.5rem !important;
      align-items: center;
    }
  }

  :deep(.p-menubar-root-list > li) {
    margin: 0 !important;
    padding: 0 !important;
    flex-shrink: 0;
  }

  :deep(.p-menubar-root-list > li > a),
  :deep(.p-menubar-root-list > li > .p-menubar-button),
  :deep(.p-menubar-root-list > li > button),
  :deep(.p-menubar-root-list > li > a.p-menubar-button-link) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin: 0 !important;
  }

  /* Specifically target items with submenus that use props.action */
  :deep(.p-menubar-root-list > li.p-menubar-item > a) {
    padding: 0 !important;
  }

  /* Add top and bottom padding to the Menubar */
  :deep(.p-menubar) {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  /* Style submenu icons - green checkmark */
  :deep(.p-submenu-list .pi) {
    color: #10b981 !important; /* green-500 */
  }

  /* Hide button label on mobile, show icon only */
  .db-check-button :deep(.p-button-label) {
    display: none;
  }

  @media (min-width: 1024px) {
    .db-check-button :deep(.p-button-label) {
      display: inline-block;
    }
  }
</style>

