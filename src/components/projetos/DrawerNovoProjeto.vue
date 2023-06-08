<template>
  <v-container fluid>
    <v-navigation-drawer 
      v-model="isDrawerOpen"
      temporary
      location="right"
      width="720"
    >
      <v-sheet class="d-flex align-center px-3" height="64">
        <v-btn
          icon flat
          @click.stop="$emit('close')"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="pl-3 text-h5 text-tertiary font-weight-regular">Novo Projeto</h1>
        <v-spacer></v-spacer>
        <!-- <v-btn
          icon flat
          @click.stop="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </v-sheet>

      <v-divider></v-divider>

      <v-container>

        <v-alert
          color="secondary"
          icon="mdi-lightbulb"
          class="pa-6"
          style="border-radius: 25px"
          closable
        >
          {{ alert }}
        </v-alert>

        <v-form 
          validate-on="submit lazy"
          @submit.prevent="handleSubmit"
          class="pt-6"
        >

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Nome do Projeto"
                  v-model="form.nome_projeto"
                  :rules="rules.nome_projeto.value"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col></v-col>
              <v-col cols="12" md="6">
                <v-select 
                  label="Segmento"
                  v-model="form.seguimento"
                  variant="outlined"
                  :rules="rules.seguimento.value"
                  :items="['Energia', 'Indústria', 'Logística', 'Transportes', 'Mineração', 'Outro']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select 
                  label="Tipo de Empreendimento"
                  
                  variant="outlined"
                  :items="['Parque Eólico', 'Linha de Transmissão', 'Mineração', 'Porto', 'Rodovia', 'Outro']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.inicio_contrato"
                  label="Início do Contrato"
                  type="date"
                ></v-text-field>
                <!-- <v-menu
                  ref="inicio_contrato"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.inicio_contrato"
                      label="Início do Contrato"
                      prepend-inner-icon="mdi-calendar"
                      readonly type="date"
                      v-on="on"
                      variant="outlined"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.inicio_contrato" @input="menu = false"></v-date-picker>
                </v-menu> -->
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col class="flex-grow">
                    <v-text-field 
                      label="Prazo "
                      v-model="form.prazo"
                      :rules="rules.prazo.value"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col class="flex-grow">
                    <v-btn-toggle
                      v-model="form.tipo_prazo"
                      rounded="50"
                      color="secondary"
                      group
                    >
                      <v-btn value="dias">
                        Dias
                      </v-btn>
                      <v-btn value="meses">
                        Meses
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea
                  label="Escopo do Contrato"
                  v-model="form.escopo_contrato"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea
                  label="Exclusões do Escopo do Contrato"
                  v-model="form.exclusao_escopo_contrato"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6 pb-0"
          >
            <v-row no-gutters class="justify-space-between" justify="space-between">
              <v-col class="grow" cols="10">
                <h2 class="text-subtitle-1 text-tertiary font-weight-regular">
                  Empreendimentos Associados
                </h2>
              </v-col>
              <v-col class="shrink text-right right justify-end" cols="2">
                <v-switch 
                  class="text-right justify-end"
                  color="secondary"
                  v-model="form.empreendimentos_associados" 
                  true-value="true"
                  false-value="false"
                  inset
                  true-icon="mdi-check"
                  false-icon="mdi-close"
                ></v-switch>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            v-if="form.empreendimentos_associados == 'false'"
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Detalhes do Projeto
            </h2>
            <v-row>
              <v-col cols="12" md="12">
                <!-- <v-text-field 
                  label="Localização"
                  v-model="form.localizacao"
                  variant="outlined"
                ></v-text-field> -->
                <v-autocomplete
                  v-model="form.localizacao"
                  :items="['Brasília/DF', 'Planaltina/DF', 'Ceilândia/DF', 'Taguatinga/DF', 'Sobradinho/DF']"
                  chips
                  hide-details
                  hide-no-data
                  hide-selected
                  label="Localização"
                  multiple
                  single-line
                  variant="outlined"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn-toggle
                  v-model="form.tipo_extensao"
                  rounded="50"
                  color="secondary"
                  group
                >
                  <v-btn value="linha">Linha (km)</v-btn>
                  <v-btn value="area">Área (hectares)</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Extensão"
                  v-model="form.extensao"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            v-if="form.empreendimentos_associados == 'false'"
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Órgão Licenciador
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <!-- :items="['IBAMA', 'SEMAS/PA', 'CETESB/SP', 'INEMA/BA', 'SUDEMA/PB', 'SEMACE/CE', 'IBRAM/DF', 'SEMAD/MG']" -->
                <v-select 
                  label="Órgão Licenciador"
                  v-model="form.orgao_licenciador"
                  variant="outlined"
                  :items="['IBAMA', 'SEMAS', 'CETESB', 'INEMA', 'SUDEMA', 'SEMACE', 'IBRAM', 'SEMAD']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select 
                  label="UF do Órgão"
                  v-model="form.uf_orgao_licenciador"
                  variant="outlined"
                  :items="['AC','AL','AP','AM','BA','CE','DF','ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Número do Processo"
                  v-model="form.numero_processo"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            v-if="form.empreendimentos_associados == 'true'"
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <v-row no-gutters class="justify-space-between" justify="space-between">
              <v-col class="grow" cols="6">
                <h2 class="text-subtitle-1 text-tertiary font-weight-regular">
                  Programas Vinculados
                </h2>
              </v-col>
              <v-col class="shrink text-right right justify-end" cols="6">
                <v-btn-toggle
                  v-model="form.programas_vinculados"
                  rounded="50"
                  color="secondary"
                  group
                >
                  <v-btn value="projeto">Projetos</v-btn>
                  <v-btn value="empreendimentos">Empreendimentos</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <v-row>
              <v-col class="pb-6">
                <h2 class="text-subtitle-1 text-tertiary font-weight-regular">
                  Produtos Contratados
                </h2>
                <div class="text-caption text-grey-darken-1">
                  Vincule produtos e seus prazos ao projeto.
                </div>
              </v-col>
              <v-col>
                <div class="text-right">
                  <v-btn
                    normal
                    size="x-small"
                    rounded="lg"
                    stacked
                    color="secondary"
                    class="ml-3"
                    @click.stop="isDialogNovoProdutoContratadoOpen = !isDialogNovoProdutoContratadoOpen"
                  >
                    <v-icon size="27" class="">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="px-0 mx-0">
              <v-col class="px-0 mx-0">
                <v-list lines="two">
                  <v-list-item class="px-0 mx-0"
                    v-for="p in arrProdutosContratados"
                    :key="p.produto_contratado"
                    :title="p.produto_contratado"
                    :subtitle="p.data_inicio+' a '+p.data_fim"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="grey-lighten-1">
                        <v-icon color="white">mdi-briefcase</v-icon>
                      </v-avatar>
                    </template>

                    <template v-slot:append>
                      <v-btn
                        color="grey-lighten-1"
                        icon="mdi-circle-edit-outline"
                        variant="text"
                        class="px-0 mx-0"
                      ></v-btn>
                      <v-btn
                        color="grey-lighten-1"
                        icon="mdi-trash-can"
                        variant="text"
                      ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Dados Complementares
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Valor do contrato"
                  prefix="R$"
                  v-model="form.valor_contrato"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Início da supressão"
                  v-model="form.inicio_supressao"
                  variant="outlined"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Data da mobilização"
                  v-model="form.data_mobilizacao"
                  variant="outlined"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Anexar contrato"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Anexar proposta técnica"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <v-row>
              <v-col class="pb-6">
                <h2 class="text-subtitle-1 text-tertiary font-weight-regular">
                  Matriz de Comunicação
                </h2>
                <div class="text-caption text-grey-darken-1">
                  Vincule pessoas de contato ao projeto.
                </div>
              </v-col>
              <v-col>
                <div class="text-right">
                  <v-btn
                    normal
                    size="x-small"
                    rounded="lg"
                    stacked
                    color="secondary"
                    class="ml-3"
                    @click.stop="isDialogMatrizDeComunicacaoOpen = !isDialogMatrizDeComunicacaoOpen"
                  >
                    <v-icon size="27" class="">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row class="">
              <v-col 
                v-for="mc in arrMatrizDeComunicacao"
                class="" cols="12" md="6"
              >
                <v-card
                  :title="mc.nome"
                  :subtitle="mc.funcao"
                  class="pa-2 pb-0"
                  flat
                >
                  <v-list density class="pt-0 pb-2">
                    <v-list-item class="py-0 text-body-2">{{ mc.email }}</v-list-item>
                    <v-list-item class="pt-0 pb-1 text-body-2">{{ mc.telefone }}</v-list-item>
                  </v-list>
                  <v-divider></v-divider>
                  <v-card-actions class="justify-start py-0">
                    <v-btn
                        color="grey-lighten-1"
                        icon="mdi-circle-edit-outline"
                        variant="text"
                        class="px-0 mx-0"
                      ></v-btn>
                      <v-btn
                        color="grey-lighten-1"
                        icon="mdi-trash-can"
                        variant="text"
                      ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>

          <div class="pb-4">
            <v-btn
              normal
              block
              size="54"
              rounded
              color="tertiary text-secondary"
              class="font-weight-medium text-h6"
              type="submit"
            >
              Salvar
            </v-btn>
          </div>

        </v-form>

      </v-container>
    </v-navigation-drawer>

    <v-dialog
      v-model="isDialogNovoProdutoContratadoOpen"
      width="auto"
    >
      <v-card
        class="mx-auto text-center"
        elevation="16"
        width="400"
        rounded="xl"
      >
      <h1 class="py-4 text-h5 text-tertiary font-weight-regular">Novo Produto Contratado</h1>
      <v-divider></v-divider>
        <v-form 
          validate-on="submit lazy"
          @submit.prevent="handleSubmitProdutoContratado"
          class="pt-3"
        >
          <v-row class="pa-6">
            <v-col cols="12" md="12">
              <v-select 
                label="Produtos Contratados"
                v-model="formProdutoContratado.produto_contratado"
                variant="outlined"
                :items="['EIA/RIMA','Inventário Florestal','RAS/RDPA','Estudos Arqueológicos']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                label="Data de Início"
                v-model="formProdutoContratado.data_inicio"
                variant="outlined"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                label="Data de Término"
                v-model="formProdutoContratado.data_fim"
                variant="outlined"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn
              color="grey medium-emphasis"
              min-width="90"
              rounded
              text
              @click="closeDialogNovoProdutoContratado"
              class="px-4"
              size="large"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="success"
              min-width="90"
              rounded
              variant="tonal"
              class="px-4"
              size="large"
              @click.stop="addProdutoContratado"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isDialogMatrizDeComunicacaoOpen"
      width="auto"
    >
      <v-card
        class="mx-auto text-center"
        elevation="16"
        width="400"
        rounded="xl"
      >
      <h1 class="py-4 text-h5 text-tertiary font-weight-regular">
        Nova Pessoa de Contato
      </h1>
      <v-divider></v-divider>
        <v-form 
          validate-on="submit lazy"
          @submit.prevent="addMatrizDeComunicacao"
          class="pt-3"
        >
          <v-row class="pa-6">
            <v-col cols="12" md="12">
              <v-text-field 
                label="Nome"
                v-model="formMatrizDeComunicacao.nome"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                label="E-mail"
                v-model="formMatrizDeComunicacao.email"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                label="Telefone"
                v-model="formMatrizDeComunicacao.telefone"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                label="Função"
                v-model="formMatrizDeComunicacao.funcao"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn
              color="grey medium-emphasis"
              min-width="90"
              rounded
              text
              @click="closeDialogMatrizDeComunicacao"
              class="px-4"
              size="large"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="success"
              min-width="90"
              rounded
              variant="tonal"
              class="px-4"
              size="large"
              @click.stop="addMatrizDeComunicacao"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    
  </v-container>
</template>

<style>
.error--text {
  color: red;
}
</style>

<script setup>
import { ref, defineEmits, defineProps, customRef, toRefs, reactive, computed,  watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useProjetoStore } from '@/store/projeto';


// PROPS & EMITS
const props = defineProps(['isOpen', 'idCliente'])
const emits = defineEmits(['close', 'exibir-snackbar'])

const isDrawerOpen = computed({
  get() {
    return props.isOpen;
  },
  set(value) {
    if (value === false) {
      emits('close');
    }
  }
});

//const isDrawerOpen = ref(false)

// PREPARANDO STORES
const projetoStore = useProjetoStore();

// ALERT
const alert = 'Para cadastrar um novo projeto, preencha atentamente os dados gerais abaixo.'

const menu = ref(false);


// FORM
const form = reactive({ // Estado inicial do formulário
  //id_cliente: '3c936d22-e08b-49da-9fe9-6970fffc4320',
  id_cliente: props.idCliente,
  nome_projeto: '',
  seguimento: null, // 'energia', 'industria', 'logistica', ...
  //tipo_empreendimento: null, // 'parque eolico', 'linha de transmissao', ...
  //tipo_empreendimento: 'parque eolico', // 'parque eolico', 'linha de transmissao', ...
  inicio_contrato: '',
  prazo: '',
  tipo_prazo: 'dias', // 'dias', 'meses'
  escopo_contrato: '',
  exclusao_escopo_contrato: '',

  // EMPREENDIMENTOS ASSOCIASO
  // TRUE = Todas as licenças vinculadas aos empreendimentos
  // FALSE = Todas as licenças vinculadas aos projetos
  //empreendimentos_associados: false, // true ou false (default)
  empreendimentos_associados: 'false', // true ou false (default)

  // DETALHES DO PROJETO
  // Apenas se empreendimentos_associados é FALSE
  localizacao: [], //['Brasília-DF', 'Planaltina-GO'],
  tipo_extensao: 'linha', // 'linha' ou 'area'
  extensao: '',

  // PROGRAMAS VINCULADOS
  // Apenas se empreendimentos_associados é TRUE
  programas_vinculados: 'empreendimentos', // 'empreendimentos' (padrão) ou 'projetos'

  // ÓRGÃO LICENCIADOR
  orgao_licenciador: null,
  uf_orgao_licenciador: null,
  numero_processo: '',

  // PRODUTOS CONTRATADOS
  // Produto // 'EIA/RIMA', 'Inventário Florestal', 'RAS/RDPA', 'Estudos Arqueológicos', ...
  // Data de início
  // Data de fim

  // DADOS COMPLEMENTARES
  valor_contrato: '',
  inicio_supressao: '',
  data_mobilizacao: '',
  // Anexo Contrato
  // Anexo Proposta Técnica

  // MATRIZ DE COMUNICAÇÃO
  // Nome
  // E-mail
  // Telefone
  // Função

});

// FORM PRODUTOS CONTRATADOS
const formProdutoContratado = reactive({
  produto_contratado: null,
  data_inicio: '',
  data_fim: ''
});

const arrProdutosContratados = ref([]);

const resetFormProdutoContratado = () => {
  formProdutoContratado.produto_contratado = null;
  formProdutoContratado.data_inicio = '';
  formProdutoContratado.data_fim = '';
};

const addProdutoContratado = () => {
  arrProdutosContratados.value.push({ ...formProdutoContratado });
  resetFormProdutoContratado();
  console.log('arrProdutosContratados', arrProdutosContratados)
  closeDialogNovoProdutoContratado();
};

// DIALOG PRODUTO CONTRATADO
const isDialogNovoProdutoContratadoOpen = ref(false);
const closeDialogNovoProdutoContratado = () => {
  isDialogNovoProdutoContratadoOpen.value = false;
  resetFormProdutoContratado();
};


// FORM MATRIZ DE COMUNICAÇÃO
const formMatrizDeComunicacao = reactive({
  nome: '',
  email: '',
  telefone: '',
  funcao: ''
});

const arrMatrizDeComunicacao = ref([]);

const resetFormMatrizDeComunicacao = () => {
  formMatrizDeComunicacao.nome = '';
  formMatrizDeComunicacao.email = '';
  formMatrizDeComunicacao.telefone = '';
  formMatrizDeComunicacao.funcao = '';
};

const addMatrizDeComunicacao = () => {
  arrMatrizDeComunicacao.value.push({ ...formMatrizDeComunicacao });
  resetFormMatrizDeComunicacao();
  console.log('arrMatrizDeComunicacao', arrMatrizDeComunicacao)
  closeDialogMatrizDeComunicacao();
};

// DIALOG MATRIZ DE COMUNICAÇÃO
const isDialogMatrizDeComunicacaoOpen = ref(false);
const closeDialogMatrizDeComunicacao = () => {
  isDialogMatrizDeComunicacaoOpen.value = false;
  resetFormMatrizDeComunicacao();
};


const rules = {
  nome_projeto: {  },
  seguimento: {  },
  tipo_empreendimento: {  },
  inicio_contrato: {  },
  tipo_prazo: {  },
  prazo: {  },
  // escopo_contrato: {  },
  // exclusao_escopo_contrato: {  },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

const errorMessages = {
  // empresa: {
  //   required: 'Empresa é requerida.',
  //   minLength: 'Empresa deve ter no mínimo 3 caracteres.',
  // },
};

const getErrorMessage = (field) => {
  
  // console.log('FIELD', field)
  // console.log('v$ VALUE FIELD (ex. EMPRESA) ', v$.value[field])
  // //const field = v$.value[field].$params;

  // for (const validation in v$.value[field]) {
  //   console.log('validation', validation)
  //   return errorMessages[field]['required']
  //   // if (!validations[validation]) {
  //   //   return errorMessages[field][validation];
  //   // }
  // }

  // return '';

  const errors = [];
  if (!v$.value[field].$dirty) return errors;
  
  if (v$.value[field].$error) {
    if (v$.value[field].required.$invalid) {
      errors.push(errorMessages[field]['required']);
    }

    // if (v$.value[field].minLength.$invalid) {
    //   errors.push(errorMessages[field]['minLength']);
    // }
  }
  
  return errors;
};

const clearErrors = () => {
  console.log('CLEAN ERRORS')
  v$.value.name.$reset();
};

const handleBlur = () => {
  console.log('HANDLE BLUR')
  v$.value.name.$touch();
};

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log('FORM INVÁLIDO')
    return;
  }

  //console.log('ID CLIENTE', props.idCliente)
  await projetoStore.novoProjeto(form, props.idCliente)
    .then((message) => {
      emits('exibir-snackbar', message, 'success')
      // form.value = {
      //   id_cliente: props.idCliente,
      //   nome_projeto: '',
      //   seguimento: null,
      //   tipo_empreendimento: null,
      //   inicio_contrato: '',
      //   // tipo_prazo: '',
      //   // prazo: '',
      //   // escopo_contrato: '',
      //   // exclusao_escopo_contrato: '',
      // };
    })
    .catch((error) => {
      emits('exibir-snackbar', error.message, 'error')
    })
    emits('close')
}

</script>
