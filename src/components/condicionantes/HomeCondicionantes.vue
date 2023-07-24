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
      :idLicenca="idLicenca"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-0 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Condicionantes
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
          <v-card-title class="text-h4 pb-0">{{ condicionantes?.length }}</v-card-title>
          <v-card-text class="text-subtitle-1 font-weight-regular">
            <span v-if="condicionantes?.length == 1">Condicionante ativa</span>
            <span v-if="condicionantes?.length > 1">Condicionantes ativas</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="pb-0">
      <v-col md="12">
        <v-responsive max-width="550">
          <v-text-field 
            v-model="searchText" 
            label="Pesquisar condicionantes"
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          color="primary"
          align-tabs="left"
        >
          <v-tab value="1">Executivas</v-tab>
          <v-tab value="2">Informativas</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            value="1"
          >
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      A Iniciar
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesAIniciar"
                        variant="outlined" 
                        color="primary"
                        class="mb-2"
                        :elevation="isHovering ? 6 : 0"
                        v-bind="props"
                        @click="handleCardClick(c)"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
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
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      Não Atendida
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesNaoAtendidas"
                        variant="outlined" 
                        color="primary"
                        class="mb-2"
                        :elevation="isHovering ? 6 : 0"
                        v-bind="props"
                        @click="handleCardClick(c)"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
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
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      Parcialmente Atendida
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesParcialmenteAtendidas"
                        variant="outlined" 
                        v-bind="props"
                        color="primary" 
                        class="mb-2"
                        @click="handleCardClick(c)"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
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
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      Em Atendimento
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesEmAtendimento"
                        variant="outlined" 
                        v-bind="props"
                        color="primary" 
                        class="mb-2"
                        @click="handleCardClick(c)"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
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
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      Atendida
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesAtendidas"
                        variant="outlined" 
                        :elevation="isHovering ? 6 : 0"
                        v-bind="props"
                        color="primary" 
                        class="mb-2"
                        @click="handleCardClick(c)"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
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
              </v-container>
            </v-card>
          </v-window-item>
          <v-window-item
            value="2"
          >
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      A Observar
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesAObservar"
                        variant="outlined" 
                        :elevation="isHovering ? 6 : 0"
                        v-bind="props"
                        color="primary" 
                        class="mb-2"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h3 class="pb-2 text-subtitle-2 font-weight-medium">
                      Observadas
                    </h3>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card 
                        v-for="c in condicionantesObservadas"
                        variant="outlined" 
                        :elevation="isHovering ? 6 : 0"
                        v-bind="props"
                        color="primary" 
                        class="mb-2"
                      >
                        <v-card-text>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Nº {{ c.numero_condicionante }}
                          </div>
                          <div class="text-grey-darken-2 text-subtitle-1 font-weight-medium">
                            {{ c.condicionante }}
                          </div>
                          <div class="text-grey-darken-1 text-caption font-weight-regular">
                            Validade {{ c.prazo }} {{ c.tipo_prazo }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col></v-col>
                  <v-col></v-col>
                  <v-col></v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-window-item>
        </v-window>
      <!-- <v-col v-for="(c, i) in filteredCondicionantes" cols="12" sm="4" md="4"> -->
        <!-- <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="pa-2 d-flex flex-column fill-height"
            flat
            :elevation="isHovering ? 6 : 0"
            v-bind="props"
            :color="isHovering ? 'lightGreen' : undefined"
            @click="handleCardClick(c)"
          >
            <v-card-text>
              <div class="text-caption font-weight-regular">
                Nº {{ c.numero_condicionante }}
              </div>
              <div class="pt-1 text-h6 font-weight-medium">
                {{ c.condicionante }}
              </div>
              <div class="text-body-2 font-weight-regular">
                Validade {{ c.prazo }} {{ c.tipo_prazo }}
              </div>
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
        </v-hover> -->
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
        :title="`EXCLUIR CONDICIONANTE ${ itemSelecionado.numero_condicionante }`"
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
import { useCondicionanteStore } from "@/store/condicionante";
import { useRoute, useRouter } from 'vue-router';

// COMPONENTS
import DrawerNovo from './DrawerNovaCondicionante.vue'

// BREADCRUMB
const breadcrumbItems = computed(() => {
  return [
    { title: 'Home', href: '/home', disabled: false, },
    { title: 'Clientes', href: '/clientes', disabled: false, },
    { title: 'Cliente X', href: `/projetos/f28ff055-2483-4c48-82ed-f34984cb6b6d`, disabled: false, },
    { title: 'Projeto X', href: `/empreendimentos/858439c6-4372-4a15-be95-7eef31ae15e0`,  disabled: false,  },
    { title: 'Licença X', href: `/condicionantes/${idLicenca}`,  disabled: true,  },
  ];
});
const activeIndex = computed(() => { return breadcrumbItems.length - 1 } );

// ROTA
const router = useRouter();
const route = useRoute();
const idLicenca = computed(() => route.params.id);

// TABS
const tab = ref(null);

// KANBAN
const condicionantesAIniciar = computed(() => condicionantes.value.filter(task => task.status === 'A iniciar'));
const condicionantesNaoAtendidas = computed(() => condicionantes.value.filter(task => task.status === 'Não atendida'));
const condicionantesParcialmenteAtendidas = computed(() => condicionantes.value.filter(task => task.status === 'Parcialmente atendida'));
const condicionantesEmAtendimento = computed(() => condicionantes.value.filter(task => task.status === 'Em atendimento'));
const condicionantesAtendidas = computed(() => condicionantes.value.filter(task => task.status === 'Atendida'));

const condicionantesAObservar = computed(() => condicionantes.value.filter(task => task.status === 'A observar'));
const condicionantesObservadas = computed(() => condicionantes.value.filter(task => task.status === 'Observada'));

// PROPS & DRAWER
//const props = defineProps(['id'])

// STORE
const condicionanteStore = useCondicionanteStore();
const condicionantes = computed(() => condicionanteStore.condicionantes);

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
const filteredCondicionantes = computed(() => {
  const searchQuery = searchText.value.toLowerCase();
  return condicionantes?.value?.filter((condicionante) => {
    return (
      condicionante.numero_condicionante.toLowerCase().includes(searchQuery)
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

const handleCardClick = (item) => {
  router.push({ name: 'AtividadesDeCondicionantes', params: { id: item.id } });
};

const abrirDialogExcluir = (item) => {
  itemSelecionado.value = item;
  dialog.value = true
};

const confirmarExclusao = async () => {
  console.log('ID condicionante a excluir', itemSelecionado.value.id);
  await condicionanteStore.excluirCondicionante(itemSelecionado.value.id)
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
  condicionanteStore.fill(route.params.id);
});

</script>
