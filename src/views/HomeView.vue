<template>
  <div class="w-full h-[70vh] flex items-center justify-center" v-if="loading">
    <loading />
  </div>
  <div v-else class="w-full">
    <!-- <h1>Dashboard</h1>
    <span class="cursor-pointer" @click="$store.dispatch('logout')"
      >logout</span
    > -->
    <card>
      <div
        class="
          w-full
          flex
          items-start
          justify-between
          flex-col
          lg:flex-row
          gap-4
        "
      >
        <div>
          <h6 class="text-grey-50 text-sm font-poppins font-semibold">
            {{ getGreeting() }} {{ $store.getters.user.firstName }}!
          </h6>
          <h5 class="font-poppins text-2xl font-medium text-grey-90 mt-1">
            Real-time updates keep users on track with spending and budgets.
          </h5>
        </div>
        <div class="flex items-center justify-between gap-4">
          <router-link :to="{ name: 'goals' }">
            <auto-outline-button>Goals</auto-outline-button>
          </router-link>
          <auto-outline-button @click="showModal = true">
            <span>Add Income</span>
            <span>
              <img src="@/assets/icons/svg/addBlue.svg" alt="" />
            </span>
          </auto-outline-button>
        </div>
      </div>
      <hr class="w-full border border-b-grey-20 mt-4 mb-6" />
      <div
        class="
          w-ful
          flex flex-nowrap
          items-stretch
          justify-between
          gap-6
          flex-col
          lg:flex-row
        "
      >
        <div class="w-full p-6 border-2 border-grey-20 rounded-xl bg-grey-10">
          <h6 class="text-grey-50 text-base font-poppins font-medium">
            Current Balance
          </h6>
          <h1 class="text-grey-80 font-poppins text-[2.5rem] font-semibold">
            ₦{{ formatNumberWithCommas($store.getters.balance) }}
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
      <div
        class="
          mb-3
          w-full
          flex
          items-center
          justify-between
          flex-col
          lg:flex-row
        "
      >
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
    <transition name="modal-fade" appear>
      <div
        v-if="showModal"
        class="
          fixed
          top-0
          left-0
          h-screen
          w-full
          bg-grey-20 bg-opacity-50
          flex
          items-center
          justify-center
        "
        @click.self="showModal = false"
      >
        <div class="max-w-xl">
          <div class="modal min-w-[330px] p-6 bg-white rounded-xl">
            <div class="modal-header flex items-center justify-between">
              <h2 class="text-grey-80 text-xl font-medium font-poppins">
                Add Income
              </h2>
              <span
                class="max-w-[90%] text-primary-blue close-btn cursor-pointer"
                @click="showModal = false"
                >close</span
              >
            </div>
            <hr class="w-full border border-b-grey-20 mt-4" />

            <div class="modal-content w-full">
              <input
                type="number"
                placeholder="Amount"
                v-model="amount"
                class="
                  border border-grey-30
                  rounded-xl
                  w-full
                  py-4
                  px-6
                  mt-8
                  mb-10
                "
              />
              <auto-button
                class="w-full"
                :isLoading="adding"
                @click="addToBalance"
                >Add to balance</auto-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import AutoOutlineButton from "@/components/AutoOutlineButton.vue";
import Progress from "@/components/Progress.vue";
import Loading from "@/components/Loading.vue";
import BaseButton from "@/components/BaseButton.vue";
import AutoButton from "@/components/AutoButton.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      amount: "",
      adding: false,
      loading: true,
      showModal: false,
    };
  },
  components: {
    Card,
    AutoOutlineButton,
    Progress,
    Loading,
    BaseButton,
    AutoButton,
  },
  mounted() {
    this.getBalance();
  },
  methods: {
    addToBalance() {
      if (!this.amount) {
        return this.$toast.warning("Please enter amount");
      } else if (typeof this.amount !== "number" || this.amount < 0) {
        return this.$toast.warning("Invalid amount enterd");
      } else {
        this.addBalAPI(this.amount);
      }
    },
    addBalAPI(final) {
      this.adding = true;
      this.$store
        .dispatch("patchRequest", {
          path: "balance",
          data: { amount: final },
        })
        .then((resp) => {
          if (resp.data) {
            var message = resp.data.msg;
            this.$store
              .dispatch("getRequest", { path: "balance" })
              .then((resp) => {
                this.$store.commit("setBalance", resp.data.balance);
                this.$toast.success(message);
                this.adding = false;
                this.amount = "";
                this.showModal = false;
              });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            this.$toast.error(err.response.data.error.msg);
          }
          this.adding = false;
        });
    },
    getBalance() {
      this.$store.dispatch("getRequest", { path: "balance" }).then((resp) => {
        this.$store.commit("setBalance", resp.data.balance);
        this.loading = false;
      });
    },
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
        return 0;
      }

      return (number / total) * 100;
    },
    formatNumberWithCommas(number) {
      if (typeof number !== "number") {
        return "";
      }

      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>