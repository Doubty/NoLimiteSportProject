<template>
  <InicialScreen />
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import InicialScreen from "@/components/InicialScreen.vue"; // @ is an alias to /src

@Component({
  name: "App",
  components: {
    InicialScreen,
  },
})
export default class App extends Vue {}
</script>


<style lang="stylus"></style>
