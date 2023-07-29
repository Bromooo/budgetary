<template>
  <div class="flex w-full items-center justify-between">
    <h1>Dashboard</h1>
    <span class="cursor-pointer" @click="$store.dispatch('logout')"
      >logout</span
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>