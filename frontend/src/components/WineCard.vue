<template>
  <v-card v-if="wine" :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="image"></v-img>

    <v-card-title> {{ wine ? wine : "Sem nome" }}</v-card-title>

    <v-card>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Descrição
          <v-icon>mdi-information</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Avaliações
          <v-icon>mdi-star mdi-spin</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-card flat>
            <v-card-text>
              <strong>Nome do vinho:</strong> {{ wine }} <br />
              <strong>Vinícola de origem:</strong> {{ winery }} <br />
              <strong>Localização: </strong> {{ location }} <br />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <v-card flat>
            <v-card-text class="mt-2">
              <v-row align="center" class="mx-0">
                <strong class="mr-2">Nota Geral: </strong> {{ rating.average }}
                <v-rating
                  class="ml-2"
                  :value="rating.average"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <strong class="mr-2">Total de avaliações: </strong>
                {{ rating.reviews }} <br />
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WineCard extends Vue {
  @Prop() readonly image!: string;
  @Prop() readonly wine!: string;
  @Prop() readonly winery!: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Prop() readonly rating!: object;
  @Prop() readonly location!: string;

  private show = false;
  private tab = null;
}
</script>

<style lang="stylus"></style>