<template>
  <div class="card-container">
    <img @click="$refs.modalName.openModal()" :src="card.images.small" />
    <modal ref="modalName">
      <template v-slot:header>
        <h1>{{ card.name }}</h1>
      </template>

      <template v-slot:body>
        <div class="flex-container-row">
          <img class="large-img" :src="card.images.large" alt="Pokemon card" />
         </div>
      </template>

      <template v-slot:footer>
        <div></div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "Card",
  props: ["card"],
  components: {
    Modal,
  },
};
</script>

<style lang="scss">
@use "../style/responsive" as responsive;

.card-container {
  height: inherit;
  width: inherit;
}

.flex-container-row {
  display: flex;
  flex-direction: column;

  .large-img {
    width: 100%;
    height: auto;
    margin-right: 10px;
  }

  .card-details {
    margin-left: 20px;
    h3 {
      font-weight: 400;
      font-size: 18px;
    }
  }
}

@include responsive.respond-to("tablet") {
  .flex-container-row {
    display: flex;
    flex-direction: row;
    
    .large-img {
      width: 400px !important;
      height: auto !important;
      margin-right: 10px;
    }
  }

}
</style>