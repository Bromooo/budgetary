<template>
  <div class="progress-bar w-full bg-grey-10 h-[0.625rem] rounded-[0.625rem]">
    <div
      class="bg-primary-blue rounded-[0.625rem] progress-bar-fill"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100,
    },
  },
};
</script>

<style>
.progress-bar {
  width: 100%;
  /* height: 20px; */
  /* border: 1px solid #ccc; */
  /* background-color: #f1f1f1; */
  /* border-radius: 4px; */
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  /* background-color: #4caf50; */
  /* border-radius: 4px; */
}
</style>
