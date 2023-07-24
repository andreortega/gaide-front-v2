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

    <v-snackbar 
      v-model="snackbar.show"
      location="top right"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <DrawerNovo
      :isOpen="isDrawerOpen"
      :idEmpreendimento="idEmpreendimento"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-0 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Licenças
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
              <v-icon>mdi-briefcase</v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-title class="text-h4 pb-0">{{ licencas?.length }}</v-card-title>
          <v-card-text class="text-subtitle-1 font-weight-regular">
            <span v-if="licencas?.length == 1">Licença ativa</span>
            <span v-if="licencas?.length > 1">Licenças ativos</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="pb-0">
      <v-col md="12">
        <v-responsive max-width="550">
          <v-text-field 
            v-model="searchText" 
            label="Pesquisar licenças"
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="pt-0 mt-0">
      <v-col v-for="(l, i) in filteredLicencas" cols="12" sm="4" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="pa-2 d-flex flex-column fill-height"
            flat
            :elevation="isHovering ? 6 : 0"
            v-bind="props"
            :color="isHovering ? 'lightGreen' : undefined"
            @click="handleCardClick(l)"
          >
            <v-card-text>
              <div class="text-h6 font-weight-medium">
                {{ l.numero_licenca }}
              </div>
              <v-row no-gutters class="pt-3 text-body-2 font-weight-medium text-uppercase">
                <v-col class="text-quartiary">Detalhes da Licença</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Tipo de Licença</v-col>
                <v-col>Status da Licença</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ l.tipo_licenca }}</v-col>
                <v-col>{{ l.status_licenca }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Descrição da Licença</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ l.descricao }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Emissão</v-col>
                <v-col>Validade</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ formatDate(l.emissao_licenca)  }}</v-col>
                <v-col>{{ l.validade_licensa }} {{ l.tipo_validade }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Estruturas Licenciadas</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ l.estrutura_licenciadas }}</v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>
              <v-row no-gutters class="pt-3 text-body-2 font-weight-medium text-uppercase">
                <v-col class="text-quartiary">Órgão Licenciador</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Órgão Licenciador</v-col>
                <v-col>UF do Órgão</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ l.orgao_licenciador }}</v-col>
                <v-col>{{ l.uf_orgao_licenciador }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Número do Processo</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ l.numero_processo }}</v-col>
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
                @click.stop="abrirDialogExcluir(l)"
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
        :title="`EXCLUIR LICENÇA ${ itemSelecionado.numero_licenca }`"
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
import { useLicencaStore } from "@/store/licenca";
import { useRoute, useRouter } from 'vue-router';
//import { useFilters } from '@/composables/filters';
import moment from 'moment';
import 'moment/locale/pt-br';

// COMPONENTS
import DrawerNovo from './DrawerNovaLicenca.vue'

// BREADCRUMB
const breadcrumbItems = computed(() => {
  return [
    { title: 'Home', href: '/home', disabled: false, },
    { title: 'Clientes', href: '/clientes', disabled: false, },
    { title: 'Cliente X', href: `/projetos/f28ff055-2483-4c48-82ed-f34984cb6b6d`, disabled: false, },
    { title: 'Projeto X', href: `/empreendimentos/67731d6d-b65d-471d-9149-d95649d059ae`,  disabled: false,  },
    { title: 'Licença X', href: `/licencas/${idEmpreendimento}`,  disabled: true,  },
  ];
});
const activeIndex = computed(() => { return breadcrumbItems.length - 1 } );

// ROTA
const router = useRouter();
const route = useRoute();
const idEmpreendimento = computed(() => route.params.id);

// PROPS & DRAWER
//const props = defineProps(['id'])

// STORE
const licencaStore = useLicencaStore();
const licencas = computed(() => licencaStore.licencas);

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
const filteredLicencas = computed(() => {
  const searchQuery = searchText.value.toLowerCase();
  return licencas?.value?.filter((licenca) => {
    return (
      licenca.numero_licenca.toLowerCase().includes(searchQuery)
      //  || empreendimento.email.toLowerCase().includes(searchQuery)
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
    return moment(value).format('DD/MM/YYYY');
};

const handleCardClick = (item) => {
  router.push({ name: 'Condicionantes', params: { id: item.id } });
};

const abrirDialogExcluir = (item) => {
  itemSelecionado.value = item;
  dialog.value = true
};

const confirmarExclusao = async () => {
  console.log('ID licença a excluir', itemSelecionado.value.id);
  await licencaStore.excluirLicenca(itemSelecionado.value.id)
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
  licencaStore.fill(route.params.id);
});

</script>
