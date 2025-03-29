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
      <div v-if="!menuSmall" class="search-container">
        <div class="search">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="search">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                />
              </g>
            </g>
          </svg>
          <input
            class="input"
            type="text"
            placeholder="Search a set"
            v-model="filterWord"
          />
          <svg
            class="icon delete"
            @click="clearFilter()"
            v-if="filterWord != ''"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="close">
                <rect
                  width="24"
                  height="24"
                  transform="rotate(180 12 12)"
                  opacity="0"
                />
                <path
                  d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <router-link
        v-for="set in filteredList"
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
      filterWord: "",
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
    },
    filteredList() {
      if (this.filterWord != "") {
        return this.setsByDate.filter((set) => {
          return set.name
            .toLowerCase()
            .includes(this.filterWord.toLowerCase());
        });
      } else {
        return this.setsByDate;
      }
    },
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
    clearFilter() {
      this.filterWord = "";
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
    align-items: center;
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

.search-container {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px 10px 20px 10px; 
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    padding: 5px 0px;
    border-radius: 5px;
    border: 1px solid var(--primary);
    background: var(--blue-600);

    .icon {
      fill: var(--font);
      width: 20px;
      height: 20px;
      padding: 0 2px;
    }

    .delete {
      cursor: pointer;
    }

    .input {
      background: none;
      border: none;
      color: var(--font);
      // width: 150px;
      width: calc(100% - 50px);
      padding-left: 2px;

      &::placeholder {
        color: #bbbbbb;
        font-weight: 400;
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>