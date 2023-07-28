<template>
  <div class="w-full h-screen">
    <div class="flex items-stretch h-full w-full flex-nowrap bg-grey-10">
      <div class="w-4/12 pt-14 pb-24 bg-primary-blue hidden lg:block">
        <div
          class="
            flex flex-col
            items-center
            justify-between
            mx-auto
            text-white
            w-[90%]
            h-full
          "
        >
          <img class="mx-auto" src="@/assets/icons/png/min-logo.png" alt="" />
          <div class="w-full">
            <img src="@/assets/images/authImg.png" class="mx-auto" alt="" />
            <h2 class="text-center mt-6 text-2xl font-semibold">
              Real-time updates keep users on track with spending and budgets.
            </h2>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-8/12 h-full">
        <div class="w-full flex items-center justify-center h-full">
          <div class="p-8 bg-white w-[70%] xl:w-[55%] rounded-3xl">
            <div class="w-full">
              <img src="@/assets/icons/svg/logo.svg" alt="" class="mx-auto" />
            </div>
            <div
              class="
                w-full
                rounded-xl
                flex
                items-stretch
                bg-grey-10
                text-primary-blue text-center
                font-semibold
                text-lg
                overflow-hidden
                my-8
              "
            >
              <router-link
                class="block w-full py-4"
                :to="{ name: 'auth.register' }"
                >Sign up</router-link
              >
              <router-link
                class="block w-full py-4"
                :to="{ name: 'auth.login' }"
                >Log in</router-link
              >
            </div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped >
a.router-link-exact-active {
  @apply bg-primary-blue text-white;
  transition: all 0.3s ease-in-out;
}
</style>