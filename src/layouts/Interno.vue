<template>
  <v-app class="bg-grey-lighten-4 pb-12">
    <!-- <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = true" 
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
    </v-app-bar> -->
    <v-navigation-drawer
      expand-on-hover
      permanent
      rail
      rail-width="56"
      color="tertiary"
    >
      <v-list
        height="64"
        class="pt-1"
      >
        <v-list-item class="pl-1" active-color="white">
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
          <span class="text-subtitle-1 pl-1 font-weight-medium">GAIDE</span>
        </v-list-item>
        <!-- <v-list-item
          :prepend-avatar="'./src/assets/monograma.png'"
          title="GAIDE"
          class="Kannit wf-kannit wf-Kannit" wf-Kannit wf-kannit
        ></v-list-item> -->
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Clientes" value="clientes" to="/clientes"></v-list-item>
        <v-list-item prepend-icon="mdi-account-lock" title="Usuários" value="usuarios"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card class="flat " flat>
      <v-toolbar
        class="pl-14 mr-2 pr-2"
        color="primary"
        dark
      >
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title><span class="poppins Poppins wf-poppins wf-Poppins" style="font-family: 'Poppins'">Gaide</span></v-toolbar-title>
        <v-btn icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn> -->
        <v-img
          src="@/assets/logo.png"
          max-width="100"
          class="pl-8"
        />
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn>Mensagens</v-btn>
          <v-btn>Ajuda</v-btn>
        </v-toolbar-items>
        <v-divider vertical class="mx-2"></v-divider>
        <v-btn icon="mdi-cog"></v-btn>
       
        <!-- <v-spacer></v-spacer> -->
      </v-toolbar>
    </v-card>
    <v-main class=" pr-16">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //import DefaultView from './View.vue'
  //
  const props = defineProps ({
    drawer: false
  })
  
</script>
