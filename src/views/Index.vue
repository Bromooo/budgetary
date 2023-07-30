<template>
  <div class="w-full bg-grey-10 min-h-screen">
    <header class="w-full bg-white mb-8">
      <div class="max-w-xl mx-auto">
        <nav class="py-5 w-[90%] mx-auto flex items-center justify-between">
          <router-link :to="{ name: 'dashboard' }">
            <img src="@/assets/icons/svg/logo.svg" alt="" />
          </router-link>
          <div class="flex items-center justify-between gap-6">
            <auto-button>
              <span>Add Expense</span>
              <span>
                <img src="@/assets/icons/svg/add.svg" alt="" />
              </span>
            </auto-button>
          </div>
        </nav>
      </div>
    </header>
    <div class="max-w-xl mx-auto w-full">
      <div class="w-[90%] mx-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AutoButton from "@/components/AutoButton.vue";
export default {
  components: { AutoButton },
};
</script>

<style>
</style>