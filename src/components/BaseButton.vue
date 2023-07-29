<template>
  <button
    :type="type"
    class="
      w-full
      bg-primary-blue
      text-white text-[1.375rem]
      font-medium
      py-4
      rounded-xl
      border-none
      outline-none
      flex
      items-center
      justify-center
    "
    :class="{ 'disabled cursor-not-allowed': disabled || isLoading }"
    :disabled="disabled || isLoading"
  >
    <span
      v-if="isLoading"
      class="inline-flex items-center justify-center w-8 h-8"
    >
      <svg
        class="h-5 w-5 text-white animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        ></path>
      </svg>
    </span>
    <span v-else :class="{ invisible: isLoading }"><slot></slot></span>
  </button>
</template>
<script>
export default {
  props: ["type", "isLoading", "disabled"],
};
</script>

<style scoped >
button {
  transition: all 0.3s ease-in-out;
}
</style>