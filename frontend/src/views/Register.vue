<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2>Cadastro de produto</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="nome"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>

          <v-text-field
            v-model="vinicola"
            :rules="vinicolaRules"
            label="Vinícola de origem"
            required
          ></v-text-field>

          <v-text-field
            v-model="paisOrigem"
            :rules="origemRules"
            label="País de origem"
            required
          ></v-text-field>

          <v-file-input
            v-model="inputImagem"
            :rules="inputRules"
            label="Imagem"
            truncate-length="15"
          ></v-file-input>

          <div class="contentButtons">
            <v-btn color="error" class="mr-4" @click="reset">Cancelar</v-btn>
            <v-btn
              :disabled="!valid"
              color="deep-purple"
              class="mr-4"
              @click="validate"
            >
              <span style="color: white"
                >Salvar
                <v-icon color="white" class="ml-2"
                  >mdi-content-save</v-icon
                ></span
              >
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";

@Component
export default class About extends Vue {
  private valid = true;
  private name = "";
  private vinicola = "";
  private paisOrigem = "";
  private inputImagem = "";

  private nameRules = [
    (v) => !!v || "É necessário digitar o nome",
    (v) => (v && v.length <= 10) || "O nome deve ter menos de 100 caracteres",
  ];

  private vinicolaRules = [
    (v) => !!v || "É necessário digitar a vinícola de origem",
  ];

  private origemRules = [(v) => !!v || "É necessário digitar o país de origem"];

  private inputRules = [(v) => !!v || "É necessário inserir uma imagem"];

  validate() {
    // this.$refs.form.validate();
    this.$refs.form.reset();
    Swal.fire({
      title: "",
      text: "Cadastro realizado com sucesso",
      icon: "success",
      confirmButtonColor: "green",
      heightAuto: false,
    });

    setTimeout(() => {
      this.$router.push("/");
    }, 1000);
  }
  reset() {
    this.$refs.form.reset();
    this.$router.push("/");
  }
}
</script>

<style lang="stylus">
.contentButtons {
  margin-top: 1rem;
  float: right;
}
</style>