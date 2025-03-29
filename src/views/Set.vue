<template>
  <div v-if="cardsReady">
    <div class="header">
      <div>
        <h3>
          {{ currentCards.series }} &bull; Released on:
          {{ currentCards.releaseDate }} &bull;
          {{ legalty(currentCards.legalities) }}
        </h3>
        <h1>{{ currentCards.name }}</h1>
        <!-- <h3>Release date: {{ currentCards.releaseDate }}</h3> -->
      </div>
      <div class="search-container">
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
            placeholder="Search"
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
    </div>
    <div class="cards-container">
      <div class="card" v-for="card in filteredList" :key="card.id">
        <card :card="card"></card>
      </div>
    </div>
  </div>
  <div v-else class="loader">
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import Card from "../components/Card.vue";

export default {
  components: {
    Loader,
    Card,
  },
  data() {
    return {
      set: [],
      cards: [],
      loaded: false,
      filterWord: "",
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      if (this.cardsReady == true) {
        this.$store.dispatch("toggleCardsReady");
      }
      if (this.currentCards.cards != undefined) {
        this.$store.dispatch("toggleCardsReady");
        this.cards = this.currentCards.cards;
      } else {
        this.$store.dispatch("getCards", { setID: this.$route.params.id });
        if (this.currentCards.cards == undefined) {
          this.currentCards.cards = [];
        }
      }
    },
    clearFilter() {
      this.filterWord = "";
    },
    legalty(legal) {
      let message = [];
      if (legal.standard != undefined) {
        message.push("Standard: ✅");
      }
      if (legal.expanded != undefined) {
        message.push("Expanded: ✅");
      }

      if (legal.unlimited != undefined) {
        message.push("Unlimited: ✅");
      }

      return message.join(" • ");
    },
  },
  computed: {
    filteredList() {
      if (this.filterWord != "") {
        return this.currentCards.cards.filter((card) => {
          return card.name
            .toLowerCase()
            .includes(this.filterWord.toLowerCase());
        });
      } else {
        return this.currentCards.cards;
      }
    },
    currentCards() {
      return this.$store.getters.setIndex(this.$route.params.id);
    },
    cardsReady() {
      return this.$store.state.cardsReady;
    },
  },
};
</script>

<style lang="scss">
@use "../style/responsive" as responsive;

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  padding: 20px;
  padding-bottom: 20px;
  display: block;

  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .search-container {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
      width: 150px;

      &::placeholder {
        color: #bbbbbb;
        padding-left: 3px;
        font-weight: 400;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 20px;
  padding-bottom: 100px;

  .card {
    height: auto;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: auto;
    }
  }
}

//responsive
.header {
  @include responsive.respond-to("tablet") {
    h1 {
      font-size: 48px;
    }

    h3 {
      font-size: 14px;
    }
  }

  @include responsive.respond-to("phablet") {
    display: flex;
    justify-content: space-between;
  }
}

@include responsive.respond-to("mobile-lg") {
  .cards-container {
    justify-content: space-between;

    .card {
      height: auto;
      width: 157px;
      margin-bottom: 10px;
    }
  }
}

.cards-container {
  @include responsive.respond-to("tablet") {
    padding-bottom: 20px;

    .card {
      height: auto;
      width: 250px;
      margin-bottom: 10px;
    }
  }
}
</style>