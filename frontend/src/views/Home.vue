<template>
  <v-container>
    <h2>Catálogo de produtos</h2>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          @keyup.enter.native="consultarVinhos"
          color="deep-purple"
          v-model="inputSearch"
          label="Pesquisar vinho"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="listWines" color="deep-purple" class="mt-3">
          <span style="color: white"> Pesquisar</span>
          <v-icon color="white" class="ml-2">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-4" no-gutters>
      <v-col
        class="mr-5 ml-5"
        v-for="wine in listWines()"
        :key="wine.id"
        cols="12"
        md="3"
      >
        <WineCard
          :image="wine.image"
          :wine="wine.wine"
          :winery="wine.winery"
          :rating="wine.rating"
          :location="wine.location"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WineCard from "@/components/WineCard.vue";
@Component({
  components: {
    WineCard,
  },
})
export default class Home extends Vue {
  private inputSearch = "";
  private tempWines = [];

  public listWines(): void {
    if (this.inputSearch === "" || this.inputSearch === " ") {
      return this.getWines();
    } else {
      return this.getWines().filter((wine: { wine: string }) =>
        wine.wine.match(this.inputSearch)
      );
    }
  }

  getWines() {
    return this.$store.getters.allWines;
  }
  wines() {
    return this.$store.state.wines;
  }

  async mounted() {
    this.$store.dispatch("getWines");
  }
}
</script>

<style lang="stylus"></style>
