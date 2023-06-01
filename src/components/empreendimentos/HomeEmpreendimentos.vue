<template>
  <v-container fluid>

    <DrawerNovo
      :isOpen="isDrawerOpen"
      :idCliente="idCliente"
      @close="closeDrawer" 
      @exibir-snackbar="mostrarSnackbar" 
    />

    <v-row no-gutters class="pb-4 d-flex align-center">
      <v-col class="fill-height">
        <div class="text-h4 font-weight-regular text-tertiary">
          Empreendimentos
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
            placeholder="Procurar projeto"
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
      <v-col v-for="(e, i) in empreendimentoStore.empreendimentos" cols="12" sm="4" md="4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="pa-6 fill-height"
              flat
              hover
              :elevation="isHovering ? 6 : 0"
              v-bind="props"
              :color="isHovering ? 'secondary' : undefined"
            >
              <div class="text-h6 font-weight-medium">
                {{ e.nome }}
              </div>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Segmento</v-col>
                <v-col>Tipo de Empreendimento</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.seguimento }}</v-col>
                <v-col>{{ e.tipo_de_empreendimento }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Início do Contrato</v-col>
                <v-col>Prazo</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.inicio_contrato }}</v-col>
                <v-col>{{ e.prazo }} {{ p.tipo_prazo }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Escopo do Contrato</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.escopo_contrato }}</v-col>
              </v-row>
              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Exclusões do Escopo do Contrato</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.exclusao_escopo_contrato ? e.exclusao_escopo_contrato : 'Nenhuma' }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-body-2 font-weight-mediumtext-grey-darken-2">
                <v-col>{{ encodeURI.empreendimentos_associados ? 'Tem Empreendimentos Associados' : 'Não Tem Empreendimentos Associados' }}</v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>
              <v-row no-gutters class="pt-3 text-body-2 font-weight-medium text-uppercase">
                <v-col class="text-quartiary">Detalhes do Projeto</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Localização</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.localizacao }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-body-2 font-weight-mediumtext-grey-darken-2">
                <v-col>{{ e.extensao }} {{ e.tipo_extensao == 'linha' ? 'km de extensão' : 'm2 de área' }}</v-col>
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
                <v-col>{{ e.orgao_licenciador }}</v-col>
                <v-col>{{ e.uf_orgao_licenciador }}</v-col>
              </v-row>

              <v-row no-gutters class="pt-3 text-caption font-weight-medium primary--text">
                <v-col>Número do Processo</v-col>
              </v-row>
              <v-row no-gutters class="pt-0 text-body-2 text-grey-darken-2">
                <v-col>{{ e.numero_processo }}</v-col>
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

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useEmpreendimentoStore } from "@/store/empreendimento";
import { useRoute } from 'vue-router';

// COMPONENTS
import DrawerNovo from './DrawerNovoEmpreendimento.vue'

// CLOSE DRAWER WATCH
//const close = ref(null);
const closeDrawer = () => {
  isDrawerOpen.value = false;
}

// ROTA
const route = useRoute();

// PROPS & DRAWER
//const props = defineProps(['id'])

// PREPARA STORE
const empreendimentoStore = useEmpreendimentoStore();
//const { exibirSnackbar } = useContext();
empreendimentoStore.fill(route.params.id);

// AUTOCOMPLETE
//const search = ref('')
const values = ref(null);
const items = computed(() => {
  empreendimentoStore.empreendimentos;
});

const idProjeto = () => {
  route.params.id;
};


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




// TESTES
// const drawerrrr = watch([() => [drawer]], (newValue, oldValue) =>
//   console.log('drawer', drawer, 'newValue', newValue, 'oldValue', oldValue)
// );
// const testWatcher = watch([() => [close]], (newValue, oldValue) =>
//   console.log('close', close)
// );

</script>
