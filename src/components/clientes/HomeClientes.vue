<template>
  <v-container fluid>

    <v-breadcrumbs 
      class="pt-0 px-0" 
      :items="breadcrumbItems"
    >
      <template v-slot:title="{ item }" >
        <span class="pl-0 pr-2 text-caption">{{ item.title.toUpperCase() }}</span>
      </template>
    </v-breadcrumbs>

<!-- <v-snackbar
  v-model="snackbar.show"
  :color="snackbar.color"
  :timeout="snackbar.timeout"
>
  {{ snackbar.text }}
  <template v-slot:actions>
  
  </template>
</v-snackbar> -->

    <v-snackbar 
      v-model="snackbar.show"
      location="bottom center"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <DrawerNovo 
      :is-open="isDrawerOpen"
      :editMode="editMode"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-0 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Clientes
        </div>
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

    <v-row class="mt-0 pb-8">
      <v-col cols="6" md="3">
        <v-card
          flat
          class="text-center pt-4 pb-2"
          width="180"
        >
          <v-card-title class="text-h4 pb-0">
            <v-avatar size="81" color="lightGreen">
              <v-icon>mdi-account-group</v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-title class="text-h4 pb-0">{{ clientes?.length }}</v-card-title>
          <v-card-text class="text-subtitle-1 font-weight-regular">
            <span v-if="clientes?.length == 1">Cliente ativo</span>
            <span v-if="clientes?.length > 1">Clientes ativos</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="pb-0">
      <v-col md="12">
        <v-responsive max-width="550">
          <!-- <v-autocomplete
            :items="items"
            append-inner-icon="mdi-microphone"
            auto-select-first
            class="flex-full-width"
            density="default"
            menu-icon=""
            placeholder="Pesquisar clientes"
            prepend-inner-icon="mdi-magnify"
            rounded
            theme="light"
            variant="solo"
            no-data-text="Sem dados disponíveis"
            v-model="values"
          ></v-autocomplete> -->
          <v-text-field 
            v-model="searchText" 
            label="Pesquisar clientes"
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="pt-0 mt-0">
      <v-col v-for="(c, i) in filteredClients" cols="12" sm="4" md="4" class="">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="pa-2 d-flex flex-column fill-height"
            flat
            :elevation="isHovering ? 6 : 0"
            v-bind="props"
            :color="isHovering ? 'lightGreen' : undefined"
            @click="handleCardClick(c)"
          >
            <!-- <v-toolbar
              color="rgba(255, 0, 0, 0)"
            >
              <v-toolbar-title class="text-h6">
                {{ c.name }}
              </v-toolbar-title>
              <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar> -->
            <!-- <v-card-text class="justify-space-between fill-height" > -->
            <v-card-text>
              <div class="text-h6 font-weight-medium">{{ c.name }}</div>
              <v-row
                no-gutters
                class="pt-3 text-body-2 font-weight-medium primary--text"
              >
                <v-col>Ramo</v-col>
                <v-col>CNPJ</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ c.line_of_business }}</v-col>
                <v-col>{{ c.cnpj }}</v-col>
              </v-row>
              <v-row
                no-gutters
                class="pt-3 text-body-2 font-weight-medium primary--text"
              >
                <v-col>Pessoa de Contato</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>
                  <div>{{ c.contact_name }}</div>
                  <div>{{ c.contact_function }}</div>
                  <div>{{ c.contact_email }}</div>
                  <div>{{ c.contact_phone }}</div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="pb-0 pt-0">
              <v-spacer></v-spacer>
              <v-btn 
                size="large" 
                color="surface-variant" 
                variant="text" 
                icon="mdi-trash-can-outline"
                @click.stop="abrirDialogExcluir(c)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        class="mx-auto text-center"
        elevation="16"
        max-width="500"
        rounded="xl"
        :title="`EXCLUIR CLIENTE ${ itemSelecionado.name }`"
        text="Tem certeza que deseja excluir este registro?"
      >
        <!-- <v-card-title class="headline">Confirme</v-card-title>
        <v-divider></v-divider> -->
        <v-card-text class="text-center pb-6 pt-3">
          <v-icon
            class=""
            color="warning"
            icon="mdi-alert-circle-outline"
            size="128"
          ></v-icon>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn
            color="grey medium-emphasis"
            min-width="90"
            rounded
            text
            @click="dialog = false"
            class="px-4 "
            size="large"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="warning"
            min-width="90"
            rounded
            variant="tonal"
            class="px-4"
            size="large"
            @click.stop="confirmarExclusao"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>
.card-item {
  height: var(--v-card-min-height);
}
</style>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useClienteStore } from "@/store/cliente";
import { useRoute, useRouter } from 'vue-router';

// COMPONENTS
import DrawerNovo from './DrawerNovoCliente.vue'

// BREADCRUMB
const breadcrumbItems = computed(() => {
  return [
    { title: 'Home', href: '/home', disabled: false, },
    { title: 'Clientes', href: '/clientes', disabled: true, },
  ];
});
const activeIndex = computed(() => { return breadcrumbItems.length - 1 } );

// ROTA
const router = useRouter();
const route = useRoute();

// STORE
const clienteStore = useClienteStore();
const clientes = computed(() => clienteStore.clientes);

// DIALOG
const dialog = ref(false);
const itemSelecionado = ref(null);

// DRAWER
const isDrawerOpen = ref(false);
//const close = ref(null);
const closeDrawer = () => {
  isDrawerOpen.value = false;
}

const editMode = ref(false);

// AUTOCOMPLETE
//const search = ref('')
// const values = ref(null);
// const items = computed(() => {
//   clienteStore.clientes;
// });

const handleCardClick = (item) => {
  router.push({ name: 'Projetos', params: { id: item.id } });
};

const abrirDialogExcluir = (item) => {
  itemSelecionado.value = item;
  dialog.value = true
};

const confirmarExclusao = async () => {
  console.log('ID cliente a excluir', itemSelecionado.value.id);
  await clienteStore.excluirCliente(itemSelecionado.value.id)
    //console.log('item a excluir', itemSelecionado.value);
    .then((message) => {
      // const itemIndex = clientes.value.findIndex((item) => item.id === itemSelecionado.value.id);
      // if (itemIndex !== -1) {
      //   clienteStore.removerCliente(itemIndex); // Chamar a ação "removeItem" da store para remover o item da lista
      // }
      mostrarSnackbar(message, 'success')
    })
    .catch((error) => {
      mostrarSnackbar(error.message, 'error')
    })
  dialog.value = false;
};

// FILTRO
const searchText = ref('');
const filteredClients = computed(() => {
  const searchQuery = searchText.value.toLowerCase();
  return clientes?.value?.filter((cliente) => {
    return (
      cliente.name.toLowerCase().includes(searchQuery)
      //  || cliente.email.toLowerCase().includes(searchQuery)
    );
  });
});

// SNACKBAR
const snackbar = ref({
  show: false,
  color: '',
  text: '',
});

//function mostrarSnackbar(text) {
const mostrarSnackbar = (text, color) => {
  snackbar.value.show = true;
  snackbar.value.color = color;
  snackbar.value.text = text;
  setTimeout(() => {
    snackbar.value.show = false;
  }, 3500);
}
//const { exibirSnackbar } = useContext();

// const exibirSnackbar = (text, color) => {
//   console.log('ENTROU NO EXIBIR SNACKBAR')
//   snackbar.value.show = true;
//   snackbar.value.text = text;
//   snackbar.value.color = color;
//   setTimeout(() => {
//     snackbar.value.show = false;
//   }, 2000);
// };

onMounted(() => {
  //fetchItems(); // Chamada assíncrona à API ao montar o componente
  clienteStore.fill();
});


</script>
