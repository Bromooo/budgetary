<template>
  <div class="w-full bg-grey-10 min-h-screen">
    <header class="w-full bg-white mb-8">
      <div class="max-w-xl mx-auto">
        <nav class="py-5 w-[90%] mx-auto flex items-center justify-between">
          <router-link :to="{ name: 'dashboard' }">
            <img src="@/assets/icons/svg/logo.svg" alt="" />
          </router-link>
          <div class="flex items-center justify-between gap-6">
            <auto-outline-button @click="$store.dispatch('logout')"
              >Logout</auto-outline-button
            >
            <auto-button :isLoading="opening">
              <span @click="openModal">Add Expense</span>
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
        @click="closeModal"
      >
        <div class="max-w-xl">
          <div class="modal min-w-[330px] p-6 bg-white rounded-xl">
            <div class="modal-header flex items-center justify-between">
              <h2 class="text-grey-80 text-xl font-medium font-poppins">
                Add Expense
              </h2>
              <span
                class="max-w-[90%] text-primary-blue close-btn cursor-pointer"
                @click="showModal = false"
                >close</span
              >
            </div>
            <hr class="w-full border border-b-grey-20 mt-4" />

            <div class="modal-content w-full">
              <select
                class="
                  border border-grey-30
                  bg-transparent
                  rounded-xl
                  w-full
                  py-4
                  px-6
                  mt-8
                "
                v-if="!newCat"
                v-model="form.category"
              >
                <option value="" disabled selected>CATEGORY</option>
                <option value="new">Add New</option>
                <option
                  v-for="category in $store.getters.categories"
                  :key="category"
                  :value="category"
                  v-text="category"
                ></option>
              </select>
              <input
                v-else
                type="text"
                placeholder="Enter New Category"
                v-model="form.category"
                class="border border-grey-30 rounded-xl w-full py-4 px-6 mt-8"
              />
              <input
                type="number"
                placeholder="Amount"
                v-model="form.amount"
                class="border border-grey-30 rounded-xl w-full py-4 px-6 mt-8"
              />
              <input
                type="text"
                placeholder="Description"
                v-model="form.description"
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
                @click="addExpense"
                >Add expense</auto-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AutoButton from "@/components/AutoButton.vue";
import AutoOutlineButton from "@/components/AutoOutlineButton.vue";
export default {
  components: { AutoButton, AutoOutlineButton },
  data() {
    return {
      showModal: false,
      opening: false,
      adding: false,
      newCat: false,
      form: {
        amount: "",
        category: "",
        description: "",
      },
    };
  },
  computed: {
    // newCat() {
    //   return this.form.category === "new_cat";
    // },
  },
  watch: {
    form: {
      handler(newValue) {
        if (newValue.category === "new") {
          this.newCat = true;
          this.form.category = "";
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async openModal() {
      this.opening = true;
      await this.getCategories();
      this.opening = false;
      this.showModal = true;
    },
    capitalizeFirstLetter(inputString) {
      if (inputString.length === 0) return inputString; // Handle empty string case

      const firstLetter = inputString.charAt(0).toUpperCase();
      const restOfString = inputString.slice(1);

      return firstLetter + restOfString;
    },
    addExpense() {
      if (!this.form.category) {
        return this.$toast.warning("Please select category");
      }
      if (!this.form.amount || typeof this.form.amount !== "number") {
        return this.$toast.warning("Please enter amount");
      }
      if (!this.form.description) {
        return this.$toast.warning("Please give a brief description");
      }
      this.form.category = this.capitalizeFirstLetter(this.form.category);
      this.adding = true;
      this.$store
        .dispatch("postRequest", {
          path: "expenses",
          data: this.form,
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
                this.form = {
                  amount: "",
                  category: "",
                  description: "",
                };
                this.newCat = false;
                this.showModal = false;
              });
            this.getCategories();
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
    async getCategories() {
      await this.$store
        .dispatch("getRequest", { path: "expenses/getExpensesAmount" })
        .then((resp) => {
          this.$store.commit(
            "setCategories",
            Object.keys(resp.data.expensesByCategory)
          );
        });
    },
  },
};
</script>

<style>
</style>