<template>
  <div class="w-full">
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
        <div
          class="
            flex
            items-stretch
            justify-between
            gap-6
            flex-col
            lg:flex-row lg:w-auto
            w-full
          "
        >
          <div
            class="
              lg:w-auto
              w-full
              p-6
              border-2 border-grey-20
              rounded-xl
              bg-grey-10
            "
          >
            <h6 class="text-grey-50 text-base font-poppins font-medium">
              Total goal amount
            </h6>
            <h1 class="text-grey-80 font-poppins text-[2.5rem] font-semibold">
              {{ $numberFormat(totalGoal) }}
            </h1>
          </div>
          <div
            class="
              lg:w-auto
              w-full
              p-6
              border-2 border-green-10
              rounded-xl
              bg-green-10 bg-opacity-20
            "
          >
            <h6 class="text-green-30 text-base font-poppins font-medium">
              Total saved amount
            </h6>
            <h1 class="text-green-50 font-poppins text-[2.5rem] font-semibold">
              {{ $numberFormat(totalSaved) }}
            </h1>
          </div>
        </div>
        <div class="flex items-center justify-between gap-4">
          <auto-outline-button @click="showModal = true">
            <span>Add New Goal</span>
            <span>
              <img src="@/assets/icons/svg/addBlue.svg" alt="" />
            </span>
          </auto-outline-button>
        </div>
      </div>
    </card>
    <loading v-if="loading" />
    <p
      v-if="!loading && !goals.length"
      class="w-full text-center text-grey-50 font-semibold"
    >
      You haven't set any goal yet.
    </p>
    <card v-if="goals.length && !loading" class="px-0">
      <div
        class="
          w-full
          flex flex-col
          lg:flex-row
          items-center
          justify-between
          py-2
          px-8
          border-b-2 border-b-grey-10
          lg:gap-0
          gap-4
        "
        :class="{
          'border-t-2 border-t-grey-10': index === 0,
        }"
        v-for="(goal, index) in goals"
        :key="goal._id"
      >
        <div
          class="
            lg:w-auto
            w-full
            flex flex-col
            items-center
            justify-between
            lg:items-start
          "
        >
          <h2 class="text-2xl text-grey-80 font-semibold">
            {{ goal.description }}
          </h2>
          <p class="text-sm text-grey-50">
            Target Date: {{ $formatDate(goal.targetDate) }}
          </p>
        </div>
        <div
          class="
            lg:w-auto
            w-full
            flex flex-col
            lg:flex-row
            items-center
            justify-between
            lg:gap-8
          "
        >
          <div>
            <div
              class="
                lg:min-w-[250px]
                flex
                items-center
                justify-between
                gap-2
                lg:w-auto
                w-full
              "
            >
              <span class="text-sm text-grey-90 inline-block w-full min-w-fit">
                Target:
              </span>
              <h2 class="text-2xl mb-2 text-primary-blue font-semibold">
                {{ $numberFormat(goal.goalAmount) }}
              </h2>
            </div>
            <div
              class="
                lg:min-w-[250px]
                flex
                items-center
                justify-between
                gap-2
                lg:w-auto
                w-full
              "
            >
              <span class="text-sm text-grey-90 inline-block w-full min-w-fit">
                Saved:
              </span>
              <h2 class="text-2xl mb-2 text-green-50 font-semibold">
                {{ $numberFormat(goal.savedAmount) }}
              </h2>
            </div>
          </div>

          <auto-outline-button @click="fund(goal)"> Fund </auto-outline-button>
        </div>
      </div>
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
                Add New Goal
              </h2>
              <span
                class="max-w-[90%] text-primary-blue close-btn cursor-pointer"
                @click="showModal = false"
                >close</span
              >
            </div>
            <hr class="w-full border border-b-grey-20 mt-4" />

            <div class="modal-content w-full">
              <div class="w-full mt-4">
                <label class="text-sm text-primary-blue font-poppins"
                  >Description</label
                >
                <input
                  type="text"
                  placeholder="Description"
                  v-model="form.description"
                  class="border border-grey-30 rounded-xl w-full py-4 px-6"
                />
              </div>
              <div class="w-full mt-4">
                <label class="text-sm text-primary-blue font-poppins"
                  >Amount</label
                >
                <input
                  type="number"
                  placeholder="Amount"
                  v-model="form.goalAmount"
                  class="border border-grey-30 rounded-xl w-full px-6 py-4"
                />
              </div>
              <div class="w-full mt-4">
                <label class="text-sm text-primary-blue font-poppins"
                  >Target Date</label
                >
                <input
                  type="date"
                  placeholder="Target Date"
                  v-model="form.targetDate"
                  :min="tomorrow"
                  class="border border-grey-30 rounded-xl w-full py-4 px-6"
                />
              </div>
              <div class="w-full mt-4 mb-10">
                <label class="text-sm text-primary-blue font-poppins"
                  >Start amount (optional)</label
                >
                <input
                  type="number"
                  placeholder="How much do you want to start with?"
                  v-model="form.creditAmount"
                  class="border border-grey-30 rounded-xl w-full px-6 py-4"
                />
              </div>
              <auto-button class="w-full" :isLoading="adding" @click="addGoal"
                >Add New Goal</auto-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="modal-fade" appear>
      <div
        v-if="EditModal && selected"
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
        @click.self="
          EditModal = false;
          selected = null;
        "
      >
        <div class="max-w-xl">
          <div class="modal min-w-[330px] p-6 bg-white rounded-xl">
            <div class="modal-header flex items-center justify-between">
              <h2 class="text-grey-80 text-xl font-medium font-poppins">
                Fund {{ selected.description }}
              </h2>
              <span
                class="max-w-[90%] text-primary-blue close-btn cursor-pointer"
                @click="
                  EditModal = false;
                  selected = null;
                "
                >close</span
              >
            </div>
            <hr class="w-full border border-b-grey-20 mt-4" />

            <div class="modal-content w-full">
              <div class="w-full mt-4 mb-8">
                <label class="text-sm text-primary-blue font-poppins"
                  >Amount</label
                >
                <input
                  type="number"
                  placeholder="Amount"
                  v-model="amount"
                  class="border border-grey-30 rounded-xl w-full px-6 py-4"
                />
              </div>

              <auto-button class="w-full" :isLoading="funding" @click="fundGoal"
                >Add to {{ selected.description }}</auto-button
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
import AutoButton from "@/components/AutoButton.vue";
import Loading from "@/components/Loading.vue";
export default {
  data() {
    return {
      showModal: false,
      EditModal: false,
      adding: false,
      funding: false,
      loading: true,
      amount: "",
      selected: null,
      goals: [],
      form: {
        goalAmount: "",
        targetDate: "",
        description: "",
      },
    };
  },
  mounted() {
    this.getGoals();
  },
  computed: {
    tomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Format the date to "YYYY-MM-DD"
      const formattedDate = tomorrow.toISOString().slice(0, 10);
      return formattedDate;
    },
    totalGoal() {
      var sum = 0;
      this.goals.forEach((goal) => {
        sum += goal.goalAmount;
      });
      return sum;
    },
    totalSaved() {
      var sum = 0;
      this.goals.forEach((goal) => {
        sum += goal.savedAmount;
      });
      return sum;
    },
  },
  components: { Card, AutoOutlineButton, AutoButton, Loading },
  methods: {
    fund(goal) {
      this.selected = goal;
      this.EditModal = true;
    },
    isDateLessThanTomorrow(targetDate) {
      // Get today's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Convert the target date string to a Date object
      const parsedTargetDate = new Date(targetDate);

      // Compare the target date with tomorrow's date
      return parsedTargetDate < tomorrow;
    },
    fundGoal() {
      if (!this.amount || typeof this.amount !== "number") {
        return this.$toast.warning("Please enter amount");
      }
      this.funding = true;
      this.$store
        .dispatch("patchRequest", {
          path: "goal/" + this.selected._id,
          data: { amount: this.amount },
        })
        .then(async (resp) => {
          if (resp.data) {
            var message = resp.data.message;
            await this.getGoals();
            this.$toast.success(message);
            this.funding = false;
            this.amount = "";
            this.EditModal = false;
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            this.$toast.error(err.response.data.error.msg);
          }
          this.funding = false;
        });
    },
    addGoal() {
      if (!this.form.description) {
        return this.$toast.warning("Please give a brief description");
      }
      if (!this.form.goalAmount || typeof this.form.goalAmount !== "number") {
        return this.$toast.warning("Please enter amount");
      }
      if (!this.form.targetDate) {
        return this.$toast.warning("Please select a target date");
      }
      if (this.isDateLessThanTomorrow(this.form.targetDate)) {
        return this.$toast.warning("Target date can only start from tomorrow");
      }
      this.adding = true;
      if (!this.form.creditAmount) {
        this.form.creditAmount = 0;
      }
      this.$store
        .dispatch("postRequest", {
          path: "goal/create-goal",
          data: this.form,
        })
        .then(async (resp) => {
          if (resp.data) {
            var message = resp.data.message;
            await this.getGoals();
            this.$toast.success(message);
            this.adding = false;
            this.form = {
              goalAmount: "",
              targetDate: "",
              description: "",
            };
            this.showModal = false;
            // this.getCategories();
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
    async getGoals() {
      await this.$store
        .dispatch("getRequest", {
          path: "goal/goals",
        })
        .then((resp) => {
          if (resp.data) {
            this.goals = resp.data;
            this.loading = false;
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
  },
};
</script>

<style>
</style>