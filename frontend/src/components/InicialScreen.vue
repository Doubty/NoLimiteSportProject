<template>
  <!-- IninialScreen.vue -->

  <v-app>
    <v-navigation-drawer
      color="#6200ea"
      app
      clipped
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://scontent.fmvf1-1.fna.fbcdn.net/v/t1.6435-9/240824171_2363578050441622_5192364612176724813_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=0xlWj9Wy2bYAX9wFj17&_nc_ht=scontent.fmvf1-1.fna&oh=74228cae81f15de711c624211a3b881f&oe=61703F73"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Antônio Galvão dos Santos Freitas</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="item.action"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {
  @Prop() private msg!: string;

  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Catálogo",
          icon: "mdi-food-fork-drink",
          action: () => {
            this.$router.push("/");
          },
        },
        {
          title: "Cadastro",
          icon: "mdi-table-large",
          action: () => {
            this.$router.push("/cadastro");
          },
        },
        { title: "Sair", icon: "mdi-logout" },
      ],
      mini: true,
    };
  }
}
</script>

<style scoped lang="stylus">
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: white;
}

.theme--light.v-icon {
  color: white;
}
</style>
