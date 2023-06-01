<template>
  <v-container fluid>

    <v-row no-gutters class="pb-4 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">Clientes</div>
      </v-col>
      <v-col>
        <div class="text-right">
          <v-btn
            normal
            size="72"
            stacked
            rounded
            color="quartiary text-secondary"
          >
            <v-icon size="27" class="">mdi-database</v-icon>
          </v-btn>
          <v-btn
            normal
            size="72"
            stacked
            rounded
            color="secondary"
            class="ml-3"
            @click.stop="isDrawerOpen = !isDrawerOpen"
          >
            <v-icon size="27" class="">mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    
    <v-row no-gutters="">
      <v-col md="12">
        <v-responsive max-width="550">
          <v-autocomplete
            :items="items"
            append-inner-icon="mdi-microphone"
            auto-select-first
            class="flex-full-width"
            density="default"
            menu-icon=""
            placeholder="Procurar cliente"
            prepend-inner-icon="mdi-magnify"
            rounded
            theme="light"
            variant="solo"
            no-data-text="Sem dados disponíveis"
            v-model="values"
          ></v-autocomplete>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="">
      <v-col v-for="(c, i) in clienteStore.clientes" cols="12" sm="4" md="3">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="pa-6 fill-height"
              flat
              hover
              :elevation="isHovering ? 6 : 0"
              v-bind="props"
              :color="isHovering ? 'secondary' : undefined"
              :to="{
                name: 'Projetos',
                params: { id: c.id }
              }"
            >
              <div class="text-h6 font-weight-medium">{{ c.name }}</div>
              <v-row
                no-gutters
                class="pt-3 text-body-2 font-weight-medium primary--text"
              >
                <v-col> Ramo </v-col>
                <v-col> CNPJ </v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-1 text-grey-darken-2">
                <v-col>
                  {{ c.line_of_business }}
                </v-col>
                <v-col>
                  {{ c.cnpj }}
                </v-col>
              </v-row>
              <v-row
                no-gutters
                class="pt-3 text-body-2 font-weight-medium primary--text"
              >
                <v-col> Pessoa de Contato </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-1 text-grey-darken-2">
                <v-col>
                  <div>{{ c.contact_name }}</div>
                  <div>{{ c.contact_function }}</div>
                  <div>{{ c.contact_email }}</div>
                  <div>{{ c.contact_phone }}</div>
                </v-col>
                <v-col> </v-col>
              </v-row>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-snackbar 
      v-model="snackbar.show"
      location="top right"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <!-- <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
      
      </template>
    </v-snackbar> -->

    <DrawerNovo 
      :is-open="isDrawerOpen"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useClienteStore } from "@/store/cliente";

// COMPONENTS
import DrawerNovo from './DrawerNovo.vue'
// components: {
//   DrawerNovo
// }

// PREPARA CLIENT STORES
const clienteStore = useClienteStore();
//const { exibirSnackbar } = useContext();
clienteStore.fill();

// AUTOCOMPLETE
//const search = ref('')
const values = ref(null);
const items = computed(() => {
  clienteStore.clientes;
});


// const exibirSnackbar = (text, color) => {
//   console.log('ENTROU NO EXIBIR SNACKBAR')
//   snackbar.value.show = true;
//   snackbar.value.text = text;
//   snackbar.value.color = color;
//   setTimeout(() => {
//     snackbar.value.show = false;
//   }, 2000);
// };


// DRAWER
const isDrawerOpen = ref(false);

// SNACKBAR
const snackbar = ref({
  show: false,
  color: '',
  text: '',
});

//function mostrarSnackbar(text) {
const mostrarSnackbar = (text, color) => {
  console.log('ENTROU NO EXIBIR SNACKBAR')
  snackbar.value.show = true;
  snackbar.value.color = color;
  snackbar.value.text = text;
  setTimeout(() => {
    snackbar.value.show = false;
  }, 3500);
}

// CLOSE DRAWER WATCH
//const close = ref(null);
const closeDrawer = () => {
  isDrawerOpen.value = false;
}



// TESTES
// const drawerrrr = watch([() => [drawer]], (newValue, oldValue) =>
//   console.log('drawer', drawer, 'newValue', newValue, 'oldValue', oldValue)
// );
// const testWatcher = watch([() => [close]], (newValue, oldValue) =>
//   console.log('close', close)
// );

</script>
