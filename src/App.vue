<template>
  <router-view />
</template>
<script>
export default {
  // mounted() {
  //   // console.log("Mounted");
  //   // console.log(this.$toast);
  //   // this.$toast.success("toast");
  //   // console.log(this.$store.getters.token);
  // },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-poppins;
}
p,
a,
label,
input {
  @apply font-open-sans;
}
input,
select {
  outline: none;
}
input[type="submit"] {
  @apply cursor-pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
*::-webkit-scrollbar {
  width: 3px;
}

*::-webkit-scrollbar-track {
  background: #e9eefd; /* color of the tracking area */
}

*::-webkit-scrollbar-thumb {
  background-color: #c8d6ff; /* color of the scroll thumb */

  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid #c8d6ff; /* creates padding around scroll thumb */
}

.myscrollbar-thin::-webkit-scrollbar {
  width: 2px;
}

.myscrollbar-thin::-webkit-scrollbar-track {
  background: #e9eefd; /* color of the tracking area */
}

.myscrollbar-thin::-webkit-scrollbar-thumb {
  min-height: 40px;
  background-color: #c8d6ff; /* color of the scroll thumb */

  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid #c8d6ff; /* creates padding around scroll thumb */
}
/* nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
