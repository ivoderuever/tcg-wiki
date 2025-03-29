<template>
  <div id="nav" class="nav" :class="{ closed: menuSmall === true }">
    <div class="nav-top">
      <router-link to="/" class="logo">
        <img alt="Vue logo" src="../assets/Logo.svg" />
        <h1>TCG Wiki</h1>
      </router-link>
      <div @click="changeMenu()" class="min-nav-btn">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="arrow-ios-forward">
              <rect
                width="24"
                height="24"
                transform="rotate(-90 12 12)"
                opacity="0"
              />
              <path
                d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="pk-sets" v-if="setsReady">
      <div @click="changeMenu()" class="pk-set active no-set" v-if="$route.params.id == undefined">
        <span>Select a set</span>
      </div>
      <router-link
        v-for="set in setsByDate"
        :key="set.id"
        :to="{ name: 'Set', params: { id: set.id } }"
        :class="{ active: set.id === $route.params.id }"
        class="pk-set"
        @click.native="closeMobMenu()"
      >
        <div class="img">
          <img :src="`${set.images.symbol}`" loading="lazy" :alt="`${set.name}`" />
        </div>
        <span>
          {{ set.name }}
        </span>
      </router-link>
    </div>
    <div v-else class="center">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  name: "Sidebar",
  components: {
    Loader,
  },
  data() {
    return {
      menuSmall: false,
      ww: 750,
    };
  },
  computed: {
    sets() {
      return this.$store.state.sets;
    },
    setsReady() {
      return this.$store.state.setsReady;
    },
    setsByDate() {
      return this.$store.getters.setsByDate;
    }
  },
  created() {
    this.ww = window.innerWidth;
    window.addEventListener('resize', () => {
      this.ww = window.innerWidth;
    })

    let ls = JSON.parse(localStorage.getItem("menuSmall"));
    if (ls == null) {
      localStorage.setItem("menuSmall", JSON.stringify(false));
    } else {
      this.menuSmall = ls;
    }
  },
  methods: {
    changeMenu() {
      this.menuSmall = !this.menuSmall;
      localStorage.setItem("menuSmall", JSON.stringify(this.menuSmall));
    },
    closeMobMenu() {
      if(this.ww < 750) {
        this.changeMenu();
      }
    },
  },
};
</script>

<style lang="scss">
@use "../style/responsive" as responsive;

.nav {
  z-index: 1;
  transition: all 0.2s ease;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80vh;
  background: var(--blue-600);
  border-radius: 25px 25px 0px 0px;

  &:hover {
    .nav-top {
      .min-nav-btn {
        transition: all 0.2s ease;
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .nav-top {
    position: relative;
    height: 25px;
    .logo {
      display: none;
      justify-content: flex-start;
      height: 30px;
      padding: 5px 0 15px 0;

      img {
        width: auto;
        height: 30px;
        padding: 0 7px 0 10px;
      }

      h1 {
        font-size: 22px;
        font-weight: 700;
      }
    }

    .min-nav-btn {
      transition: all 0.2s ease;
      cursor: pointer;
      position: relative;
      top: -14px;
      display: block;
      width: 30px;
      height: 30px;
      padding: 2px;
      border-radius: 50%;
      margin: 0 auto;
      background: var(--blue-600);

      .icon {
        transition: all 0.2s ease;
        transform: rotate(90deg);
        width: auto;
        height: 30px;
        fill: var(--font);
      }
    }
  }
}

.pk-sets {
  overflow-y: auto;
  height: calc(80vh - 30px);

  .pk-set {
    display: flex;
    justify-content: flex-start;
    transition: all 0.2s ease;
    border-radius: 25px;
    margin-right: 5px;
    margin-bottom: 5px;
    width: 250px;
    margin: 0px auto;
    // border-bottom: 1px solid #535353;
    // border-top: 1px solid #535353;

    .img {
      position: relative;
      height: 30px;
      width: 30px;
      // background-color:#535353;
      padding: 5px 10px;
      padding-right: 10px;
      img {
        display: block;
        height: 30px;
        width: auto;
        max-width: 30px;
        margin: 0 auto;
      }
    }

    span {
      height: 24px;
      font-size: 14px;
      font-weight: 400;
      padding: 8px 0px;
    }

    &:hover {
      background-color: var(--primary);
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }

  .no-set {
    span {
      margin: 0 auto;
    }

    &:hover {
      background-color: var(--primary);
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }
}

.closed {
  transition: all 0.2s ease;
  width: 100%;
  height: 80px;

  .nav-top {
    .logo {
      h1 {
        display: none;
      }
    }
    .min-nav-btn {
      .icon {
        transition: all 0.2s ease;
        transform: rotate(-90deg);
      }
    }
  }

  .pk-sets {
    .pk-set {
      display: none;
      span {
        display: flex;
      }
    }
    .active {
      display: flex;
    }
  }
}

//responsive
.nav {
  @include responsive.respond-to("tablet") {
    transition: all 0.2s ease;
    position: relative;
    width: 290px;
    min-width: 260px;
    height: 95vh;
    padding: 10px;
    margin: 10px;
    border-radius: 25px 25px 25px 25px;

    .nav-top {
      height: 60px;
      .logo {
        display: flex;
      }

      .min-nav-btn {
        transition: all 0.2s ease;
        cursor: pointer;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 5px;
        right: -20px;
        display: inline-block;
        width: 22px;
        height: 22px;
        padding: 2px;
        border-radius: 50%;
        background: var(--primary);

        .icon {
          transition: all 0.2s ease;
          transform: rotate(-180deg);
          width: auto;
          height: 22px;
          fill: var(--font);
        }
      }
    }

    .pk-sets {
      height: calc(96vh - 60px);
      
      .no-set {
        display: none;
      }

      .pk-set {
        width: 100%;
        
        &:hover {
          background-color: var(--blue-500);
        }
      }
      .active {
        &:hover {
          background-color: var(--primary);
        }        
      }
    }
  }
}

.closed {
  @include responsive.respond-to("tablet") {
    transition: all 0.2s ease;
    width: 60px;
    min-width: 60px;
    height: unset;
    .nav-top {
       .min-nav-btn {
      .icon {
        transition: all 0.2s ease;
        transform: rotate(0deg);
      }
    }
    }
    .pk-sets {
      .pk-set {
        display: block;
        span {
          display: none;
        }
      }
    }
  }
}

.active {
  background-color: var(--primary);
  &:hover {
    background-color: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }
}
</style>