<template>
  <div class="progress-bar w-full bg-grey-10 h-[0.625rem] rounded-[0.625rem]">
    <div
      class="rounded-[0.625rem] progress-bar-fill w-0"
      :class="[getColor]"
      :style="{ width: `${wdth}%` }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wdth: 0,
    };
  },
  props: {
    progress: {
      type: Number,
      required: true,
      // validator: (value) => value >= 0 && value <= 100,
    },
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.progress);
      this.wdth = this.progress;
    }, 100);
  },
  watch: {
    progress() {
      // console.log(this.progress);
      this.wdth = this.progress;
    },
  },
  computed: {
    getColor() {
      // var percentage = this.getPercentage(spent, budget);
      // Ensure the percentage is within the range [0, 100]
      this.wdth = Math.min(Math.max(this.wdth, 0), 100);

      // Define the color thresholds and corresponding colors
      const thresholds = [25, 50, 75];
      const colors = [
        "bg-green-50",
        "bg-yellow-400",
        "bg-orange-400",
        "bg-red-50",
      ];

      // Determine the color index based on the this.wdth
      let colorIndex = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (this.wdth >= thresholds[i]) {
          colorIndex = i + 1;
        } else {
          break;
        }
      }

      // Return the color based on the color index
      return colors[colorIndex];
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
  transition: all 1.5s ease-out;
  /* background-color: #4caf50; */
  /* border-radius: 4px; */
}
</style>
