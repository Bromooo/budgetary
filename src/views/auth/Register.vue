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
          <input type="password" class="w-full" placeholder="Password" />
          <img src="@/assets/icons/png/eye-open.png" alt="" />
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
            type="password"
            class="w-full"
            placeholder="Confirm Password"
          />
          <img src="@/assets/icons/png/eye-open.png" alt="" />
        </div>
      </div>
      <div class="w-full mt-14">
        <input
          type="submit"
          value="Sign up"
          class="
            w-full
            bg-primary-blue
            text-white text-[1.375rem]
            font-medium
            py-4
            rounded-xl
          "
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped >
input {
  @apply text-lg;
}
</style>