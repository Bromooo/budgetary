<template>
  <div class="w-full">
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
        @submit.prevent="login"
      >
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
            placeholder="example@domain.com"
            v-model="form.email"
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
              v-model="form.password"
              type="password"
              class="w-full"
              placeholder="Password"
            />
            <img src="@/assets/icons/png/eye-open.png" alt="" />
          </div>
        </div>

        <div class="w-full mt-14">
          <base-button :isLoading="loading" type="submit">Log in</base-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (!this.form.email) {
        return this.$toast.warning("Email address is required");
      }
      if (
        !this.form.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        return this.$toast.warning("Invalid email address provided");
      }
      if (!this.form.password.length) {
        return this.$toast.warning("Password is required");
      }
      this.loading = true;
      this.$store
        .dispatch("authRequest", {
          path: "auth/login",
          data: this.form,
        })
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem("token", resp.data.token);
            this.$store.commit("setUser", resp.data);
            this.$toast.success("User signed in successfully!");
          } else {
            this.$toast.warning("Something went wrong");
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            this.$toast.error(err.response.data.error.msg);
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>