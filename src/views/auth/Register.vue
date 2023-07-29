<template>
  <div class="w-full">
    <form
      class="
        w-full
        lg:w-[90%]
        mx-auto
        gap-4
        flex
        items-center
        justify-between
        flex-wrap
      "
      @submit.prevent="register"
    >
      <div class="w-full lg:w-[48%]">
        <label
          class="
            text-base text-grey-60
            font-open-sans font-semibold
            mb-1
            inline-block
          "
          >First name</label
        >
        <input
          class="border border-grey-30 rounded-xl w-full py-4 px-6"
          v-model="form.firstName"
          type="text"
          placeholder="John"
        />
      </div>
      <div class="w-full lg:w-[48%]">
        <label
          class="
            text-base text-grey-60
            font-open-sans font-semibold
            mb-1
            inline-block
          "
          >Last name</label
        >
        <input
          class="border border-grey-30 rounded-xl w-full py-4 px-6"
          type="text"
          v-model="form.lastName"
          placeholder="Doe"
        />
      </div>
      <div class="w-full">
        <label
          class="
            text-base text-grey-60
            font-open-sans font-semibold
            mb-1
            inline-block
          "
          >E-mail address</label
        >
        <input
          class="border border-grey-30 rounded-xl w-full py-4 px-6"
          type="email"
          v-model="form.email"
          placeholder="example@domain.com"
        />
      </div>
      <div class="w-full">
        <label
          class="
            text-base text-grey-60
            font-open-sans font-semibold
            mb-1
            inline-block
          "
          >Password</label
        >
        <div
          class="
            border border-grey-30
            rounded-xl
            w-full
            py-4
            px-6
            flex
            items-center
            flex-nowrap
            justify-between
            gap-2
          "
        >
          <input
            :type="open ? 'text' : 'password'"
            class="w-full"
            v-model="form.password"
            placeholder="Password"
          />
          <img
            src="@/assets/icons/png/eye-open.png"
            @click="open = !open"
            class="cursor-pointer"
            alt=""
          />
        </div>
      </div>
      <div class="w-full">
        <label
          class="
            text-base text-grey-60
            font-open-sans font-semibold
            mb-1
            inline-block
          "
          >Confirm Password</label
        >
        <div
          class="
            border border-grey-30
            rounded-xl
            w-full
            py-4
            px-6
            flex
            items-center
            flex-nowrap
            justify-between
            gap-2
          "
        >
          <input
            :type="openc ? 'text' : 'password'"
            class="w-full"
            v-model="form.confirmPassword"
            placeholder="Confirm Password"
          />

          <img
            @click="openc = !openc"
            class="cursor-pointer"
            src="@/assets/icons/png/eye-open.png"
            alt=""
          />
        </div>
      </div>
      <div class="w-full mt-14">
        <base-button :isLoading="loading" type="submit"> Sign up </base-button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  data() {
    return {
      open: false,
      openc: false,
      loading: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    isPasswordValid(password) {
      // Test for length (minimum 8 characters)
      if (password.length < 8) {
        return "Password must be at least 8 characters in length";
      }

      // Test for letters (at least one letter)
      if (!/[a-zA-Z]/.test(password)) {
        return "Password must contain at least one letter";
      }

      // Test for numbers (at least one number)
      if (!/\d/.test(password)) {
        return "Password must contain at least one number";
      }

      // Test for characters (at least one character/symbol)
      // if (!/[!@#$%^&*()_+]/.test(password)) {
      //   return "Password must contain at least one special character (!@#$%^&*()_+)";
      // }

      // All conditions passed, the password is valid
      return "";
    },
    register() {
      if (!this.form.firstName) {
        return this.$toast.warning("First name is required");
      }
      if (this.form.firstName.length < 3) {
        return this.$toast.warning("First name is too short");
      }
      if (!this.form.lastName) {
        return this.$toast.warning("Last name is required");
      }
      if (this.form.lastName.length < 3) {
        return this.$toast.warning("Last name is too short");
      }
      if (!this.form.email) {
        return this.$toast.warning("Email address is required");
      }
      if (
        !this.form.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        return this.$toast.warning("Invalid email address provided");
      }
      if (this.isPasswordValid(this.form.password).length) {
        return this.$toast.warning(this.isPasswordValid(this.form.password));
      }
      if (this.form.password !== this.form.confirmPassword) {
        return this.$toast.warning("Passwords must match");
      }
      this.loading = true;
      this.$store
        .dispatch("authRequest", {
          path: "auth/register",
          data: this.form,
        })
        .then((resp) => {
          // console.log(resp);
          if (resp.status === 201) {
            this.$toast.success(
              "User created successfully! \n Proceed to Login"
            );
            setTimeout(() => {
              this.$router.push({ name: "auth.login" });
            }, 3000);
          } else {
            this.$toast.warning("Something went wrong");
          }
          this.loading = false;
        })
        .catch((err) => {
          // console.log(err);
          if (err.response) {
            this.$toast.error(err.response.data.error.msg);
          }
          this.loading = false;
        });
    },
  },
  // mounted() {
  //   // this.$toast.success("User created successfully! \nProceed to Login");
  // },
};
</script>

<style scoped >
input {
  @apply text-lg;
}
</style>