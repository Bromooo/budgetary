<template>
  <div class="w-full">
    <!-- <h1>Dashboard</h1>
    <span class="cursor-pointer" @click="$store.dispatch('logout')"
      >logout</span
    > -->
    <card>
      <div class="w-full flex items-start justify-between">
        <div>
          <h6 class="text-grey-50 text-sm font-poppins font-semibold">
            {{ getGreeting() }} {{ $store.getters.user.firstName }}!
          </h6>
          <h5 class="font-poppins text-2xl font-medium text-grey-90 mt-1">
            Real-time updates keep users on track with spending and budgets.
          </h5>
        </div>
        <div>
          <auto-outline-button>
            <span>Add Income</span>
            <span>
              <img src="@/assets/icons/svg/addBlue.svg" alt="" />
            </span>
          </auto-outline-button>
        </div>
      </div>
      <hr class="w-full border border-b-grey-20 mt-4 mb-6" />
      <div class="w-ful flex flex-nowrap items-stretch justify-between gap-6">
        <div class="w-full p-6 border-2 border-grey-20 rounded-xl">
          <h6 class="text-grey-50 text-base font-poppins font-medium">
            Current Balance
          </h6>
          <h1 class="text-grey-80 font-poppins text-[2.5rem] font-semibold">
            ₦500,000
          </h1>
        </div>
        <div class="lg:w-5/12 w-full flex gap-6 flex-col">
          <div class="w-full py-3 px-6 rounded-xl border-2 border-green-10">
            <span class="flex">
              <span class="font-poppins leading-7 text-sm text-green-30"
                >Income</span
              ><span>
                <img src="@/assets/icons/svg/income.svg" alt="" />
              </span>
            </span>
            <h2 class="text-green-50 font-poppins text-xl font-semibold">
              ₦500,000
            </h2>
          </div>
          <div class="w-full py-3 px-6 rounded-xl border-2 border-red-10">
            <span class="flex">
              <span class="font-poppins text-sm text-red-30 leading-7"
                >Expenses</span
              ><span>
                <img src="@/assets/icons/svg/excome.svg" alt="" />
              </span>
            </span>
            <h2 class="text-red-50 font-poppins text-xl font-semibold">
              ₦500,000
            </h2>
          </div>
        </div>
      </div>
    </card>
    <card>
      <div class="mb-3 w-full flex items-center justify-between">
        <div class="flex gap-2 items-center justify-between">
          <h6 class="text-grey-60 text-sm font-poppins font-semibold">
            Budget:
          </h6>
          <h2 class="text-grey-80 font-poppins text-2xl font-semibold">
            ₦60,000
          </h2>
        </div>
        <div class="flex gap-2 items-center justify-between">
          <h6 class="text-grey-60 text-sm font-poppins font-semibold">
            Remaining Budget:
          </h6>
          <h2 class="text-green-50 font-poppins text-2xl font-semibold">
            ₦5,000
          </h2>
        </div>
      </div>
      <Progress :progress="40" />
    </card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import AutoOutlineButton from "@/components/AutoOutlineButton.vue";
import Progress from "@/components/Progress.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: { Card, AutoOutlineButton, Progress },
  methods: {
    getGreeting() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      let greeting;

      if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }

      return greeting;
    },
    getPercentage(number, total) {
      if (
        typeof number !== "number" ||
        typeof total !== "number" ||
        total === 0
      ) {
        throw new Error(
          "Invalid input. Both arguments must be numbers, and total cannot be zero."
        );
      }

      return (number / total) * 100;
    },
  },
  mounted() {},
};
</script>