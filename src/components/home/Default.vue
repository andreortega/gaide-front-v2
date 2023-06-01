<template>
  <v-container class="fill-height d-flex flex-column">

    <v-row class="d-flex align-center justify-center">
      <v-col class="justify-space-between">
        <div class="pb-4 text-body-2 font-weight-light text-center">Boas-vindas ao</div>
        <div class="pb-4"><v-img height="50" src="@/assets/logo.png" /></div>
        <v-btn
          color="primary"
          to="clientes"
          min-width="228"
          size="x-large"
          variant="flat"
        >
          <v-icon
            icon="mdi-account-supervisor-circle"
            size="large"
            start
          />
          Clientes
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  //
</script>
