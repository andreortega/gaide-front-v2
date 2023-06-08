<template>
  <v-container fluid>

    <v-snackbar 
      v-model="snackbar.show"
      location="top right"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <DrawerNovo
      :isOpen="isDrawerOpen"
      :idCondicionante="idCondicionante"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-0 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Atividades de Condicionantes
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
              <v-icon>mdi-document</v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-title class="text-h4 pb-0">{{ atividadesDeCondicionantes?.length }}</v-card-title>
          <v-card-text class="text-subtitle-1 font-weight-regular">
            <span v-if="atividadesDeCondicionantes?.length == 1">Atividade de Condicionante ativa</span>
            <span v-if="atividadesDeCondicionantes?.length > 1">Atividades de Condicionantes ativas</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="pb-0">
      <v-col md="12">
        <v-responsive max-width="550">
          <v-text-field 
            v-model="searchText" 
            label="Pesquisar atividades de condicionantes"
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="">
      <v-col v-for="(ac, i) in filteredAtividadesDeCondicionantes" cols="12" sm="4" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="pa-2 d-flex flex-column fill-height"
            flat
            :elevation="isHovering ? 6 : 0"
            v-bind="props"
            :color="isHovering ? 'lightGreen' : undefined"
          >
            <v-card-text>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Descrição da Atividade</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ ac.descricao }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Início</v-col>
                <v-col>Término</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ formatDate(ac.inicio)  }}</v-col>
                <v-col>{{ formatDate(ac.termino) }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-4 text-caption font-weight-medium primary--text">
                <v-col>Andamento</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-h5 text-grey-darken-2">
                <!-- <v-col>{{ ac.... }}</v-col> -->
                <v-col>45%</v-col>
              </v-row>
              <v-row no-gutters class="pt-4 text-caption font-weight-medium primary--text">
                <v-col>Evidência</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-h5 text-grey-darken-2">
                <!-- <v-col>{{ ac.... }}</v-col> -->
                <v-col></v-col>
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
                @click.stop="abrirDialogExcluir(ac)"
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
        :title="`EXCLUIR ATIVIDADE DE CONDICIONANTE`"
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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAtividadeDeCondicionanteStore } from "@/store/atividadeDeCondicionante";
import { useRoute, useRouter } from 'vue-router';
//import { useFilters } from '@/composables/filters';
import moment from 'moment';
import 'moment/locale/pt-br';

// COMPONENTS
import DrawerNovo from './DrawerNovaAtividadeDeCondicionante.vue'

// ROTA
const router = useRouter();
const route = useRoute();
const idCondicionante = computed(() => route.params.id);

// const { formatDate } = useFilters();

// const filters = {
//   formatDate,
// };

// const formatDate = (value) => {
//   // Lógica para formatar a data
//   // ...

//   return formattedDate;
// };

// const format = (value) => {
//   return formatDate(value);
// };

// PROPS & DRAWER
//const props = defineProps(['id'])

// STORE
const atividadeDeCondicionanteStore = useAtividadeDeCondicionanteStore();
const atividadesDeCondicionantes = computed(() => atividadeDeCondicionanteStore.atividadesDeCondicionantes);

// DIALOG
const dialog = ref(false);
const itemSelecionado = ref(null);

// DRAWER
const isDrawerOpen = ref(false);
const closeDrawer = () => {
  isDrawerOpen.value = false;
}

// FILTRO
const searchText = ref('');
const filteredAtividadesDeCondicionantes = computed(() => {
  const searchQuery = searchText.value.toLowerCase();
  return atividadesDeCondicionantes?.value?.filter((atividadeDeCondicionante) => {
    return (
      atividadeDeCondicionante.descricao.toLowerCase().includes(searchQuery)
      //  || condicionante.email.toLowerCase().includes(searchQuery)
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
  console.log('ENTROU NO EXIBIR SNACKBAR')
  snackbar.value.show = true;
  snackbar.value.color = color;
  snackbar.value.text = text;
  setTimeout(() => {
    snackbar.value.show = false;
  }, 3500);
}


const formatDate = (value) => {
    //return moment(value).format('DD/MM/YYYY');
    // const [year, month, day] = value.split('-');
    // return `${day}-${month}-${year}`;
    return moment(value).format('DD/MM/YYYY');
};

// const handleCardClick = (item) => {
//   router.push({ name: 'AtividadesDeCondicionantes', params: { id: item.id } });
// };

const abrirDialogExcluir = (item) => {
  itemSelecionado.value = item;
  dialog.value = true
};

const confirmarExclusao = async () => {
  console.log('ID atividade de condicionante a excluir', itemSelecionado.value.id);
  await atividadeDeCondicionanteStore.excluirAtividadeDeCondicionante(itemSelecionado.value.id)
    //console.log('item a excluir', itemSelecionado.value);
    .then((message) => {
      mostrarSnackbar(message, 'success')
    })
    .catch((error) => {
      mostrarSnackbar(error.message, 'error')
    })
  dialog.value = false;
};

onMounted(() => {
  //fetchItems(); // Chamada assíncrona à API ao montar o componente
  atividadeDeCondicionanteStore.fill(route.params.id);
});

</script>
