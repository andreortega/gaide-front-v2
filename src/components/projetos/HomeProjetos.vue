<template>
  <v-container fluid>

    <v-snackbar 
      v-model="snackbar.show"
      location="bottom center"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <DrawerNovo
      :isOpen="isDrawerOpen"
      :idCliente="idCliente"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-0 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Projetos
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
          <v-card-title class="text-h4 pb-0">{{ projetos?.length }}</v-card-title>
          <v-card-text class="text-subtitle-1 font-weight-regular">
            <span v-if="projetos?.length == 1">Projeto ativo</span>
            <span v-if="projetos?.length > 1">Projetos ativos</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="pb-0">
      <v-col md="12">
        <v-responsive max-width="550">
          <v-text-field 
            v-model="searchText" 
            label="Pesquisar projetos"
            rounded
            variant="solo"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-responsive>
      </v-col>
    </v-row>

    <v-row class="pt-0 mt-0">
      <v-col v-for="(p, i) in filteredProjects" cols="12" sm="4" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="pa-2 d-flex flex-column fill-height"
            flat
            :elevation="isHovering ? 6 : 0"
            v-bind="props"
            :color="isHovering ? 'lightGreen' : undefined"
            @click="handleCardClick(p)"
          >
            <v-card-text>
              <div class="text-h6 font-weight-medium">{{ p.nome_projeto }}</div>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Segmento</v-col>
                <v-col>Tipo de Empreendimento</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ p.seguimento }}</v-col>
                <v-col>{{ p.tipo_de_empreendimento }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Início do Contrato</v-col>
                <v-col>Prazo</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ formatDate(p.inicio_contrato) }}</v-col>
                <v-col>{{ p.prazo }} {{ p.tipo_prazo }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Escopo do Contrato</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ p.escopo_contrato }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Exclusões do Escopo do Contrato</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ p.exclusao_escopo_contrato ? p.exclusao_escopo_contrato : 'Nenhuma' }}</v-col>
              </v-row>


              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Tem empreendimentos associados?</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 font-weight-mediumtext-grey-darken-2">
                <!-- <v-col>{{ p.empreendimentos_associados }}</v-col> -->
                <v-col>
                  <span v-if="p.empreendimentos_associados == 'true'">
                    <v-chip size="x-small" color="green" class="px-2"><v-icon icon="mdi-check"></v-icon></v-chip>
                    Sim
                  </span>
                  <span v-else>
                    <v-chip size="x-small" color="red"><v-icon icon="mdi-close"></v-icon></v-chip>
                    Não
                  </span>
                  <!-- {{ p.empreendimentos_associados == "true" ? 'Tem Empreendimentos Associados' : 'Não Tem Empreendimentos Associados' }} -->
                </v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>

              <v-template v-if="p.empreendimentos_associados != 'true'">
                <v-row no-gutters class="pt-3 text-body-2 font-weight-medium text-uppercase">
                  <v-col class="text-quartiary">Detalhes do Projeto</v-col>
                </v-row>

                <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                  <v-col>Localização</v-col>
                </v-row>
                <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                  <v-col>
                    <template v-for="(l,i) in getFormattedArray(p.localizacao)">
                      {{ l }}<span v-if="(i+1) < getFormattedArray(p.localizacao).length"> • </span>
                    </template>
                  </v-col>
                </v-row>

                <v-row no-gutters class="pt-3 text-body-2 font-weight-mediumtext-grey-darken-2">
                  <v-col>{{ p.extensao }} {{ p.tipo_extensao == 'linha' ? 'km de extensão' : 'm2 de área' }}</v-col>
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
                  <v-col>{{ p.orgao_licenciador }}</v-col>
                  <v-col>{{ p.uf_orgao_licenciador }}</v-col>
                </v-row>

                <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                  <v-col>Número do Processo</v-col>
                </v-row>
                <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                  <v-col>{{ p.numero_processo }}</v-col>
                </v-row>
              </v-template>
              <v-template v-else>
                <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                  <v-col>Programas Vinculados a</v-col>
                </v-row>
                <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                  <v-col>{{ p.programas_vinculados }}</v-col>
                </v-row>
              </v-template>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="pb-0 pt-0">
              <v-spacer></v-spacer>
              <v-btn 
                size="large" 
                color="surface-variant" 
                variant="text" 
                icon="mdi-trash-can-outline"
                @click.stop="abrirDialogExcluir(p)"
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
        :title="`EXCLUIR PROJETO ${ itemSelecionado.nome_projeto }`"
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
import { ref, computed, watch, onMounted } from "vue";
import { useProjetoStore } from "@/store/projeto";
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import 'moment/locale/pt-br';

// COMPONENTS
import DrawerNovo from './DrawerNovoProjeto.vue'


const formatDate = (value) => {
  return moment(value).format('DD/MM/YYYY');
};

// const formatDate = (date) => {
//   return moment(date).format('DD/MM/YYYY');
// };

// ROTA
const router = useRouter();
const route = useRoute();
// const idCliente = () => {
//   route.params.id;
// };
const idCliente = computed(() => route.params.id);

// PROPS & DRAWER
//const props = defineProps(['id'])

// STORE
const projetoStore = useProjetoStore();
const projetos = computed(() => projetoStore.projetos);

// DRAWER
const isDrawerOpen = ref(false);
const closeDrawer = () => {
  isDrawerOpen.value = false;
}

// DIALOG
const dialog = ref(false);
const itemSelecionado = ref(null);


function getFormattedArray(str) {
  const array = str.replace(/[\[\]"']/g, '').split(",")
  //console.log('array', array)
  return array;
}

const handleCardClick = (item) => {
  router.push({ name: 'Empreendimentos', params: { id: item.id } });
};

const abrirDialogExcluir = (item) => {
  itemSelecionado.value = item;
  dialog.value = true
};

const confirmarExclusao = async () => {
  console.log('ID projeto a excluir', itemSelecionado.value.id);
  await projetoStore.excluirProjeto(itemSelecionado.value.id)
    //console.log('item a excluir', itemSelecionado.value);
    .then((message) => {
      mostrarSnackbar(message, 'success')
    })
    .catch((error) => {
      mostrarSnackbar(error.message, 'error')
    })
  dialog.value = false;
};

// FILTRO
const searchText = ref('');
const filteredProjects = computed(() => {
  const searchQuery = searchText.value.toLowerCase();
  return projetos?.value?.filter((projeto) => {
    return (
      projeto.nome_projeto.toLowerCase().includes(searchQuery)
      //  || projeto.email.toLowerCase().includes(searchQuery)
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

onMounted(() => {
  //fetchItems(); // Chamada assíncrona à API ao montar o componente
  projetoStore.fill(idCliente.value);
});

</script>
