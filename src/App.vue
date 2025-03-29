<template>
  <div id="app">
    <div v-if="setsReady" class="app-body">
      <sidebar></sidebar>
      <div class="content">
        <router-view />
      </div>
    </div>
    <div v-else class="center">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Loader from "./components/Loader.vue";

export default {
  components: {
    Sidebar,
    Loader,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getSets");
  },
  computed: {
    setsReady() {
      return this.$store.state.setsReady;
    },
  },
};
</script>

<style lang="scss">
@use "./style/responsive" as responsive;
@import url("https://use.typekit.net/eqp3quc.css");

:root {
  --app-height: 100%;

  --blue-700: #0d0e1b;
  --blue-600: #121327;
  --blue-500: #1e2041;
  --blue-400: #23254d;

  --primary: #3d5afe;

  --font: #f4f4f4;
}

* {
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: sofia-pro;

  a {
    color: #eeeeee;
  }

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--blue-500);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--blue-400);
    border-radius: 5px;
    cursor: pointer;
  }
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: var(--blue-700);
  color: var(--font);

  @media not all and (hover: hover) {
    height: var(--app-height);
  }
}

.app-body {
  display: flex;
  flex-direction: column-reverse;

  .content {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
  }
}

.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

//responsive
.app-body {
  @include responsive.respond-to("tablet") {
    display: flex;
    flex-direction: row;
  }
}
</style>
