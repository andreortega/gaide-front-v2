<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="100" src="@/assets/logo.svg" />

      <h1 class="text-h2 font-weight-bold">GAIDE</h1>
      <div class="text-body-2 font-weight-light mb-n1">Gestão Ambiental Inteligente</div>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">

        <v-col cols="auto">
          <v-btn
            color="primary"
            to="home"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
          >
            LOGIN
          </v-btn>
        </v-col>

      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  //
</script>
