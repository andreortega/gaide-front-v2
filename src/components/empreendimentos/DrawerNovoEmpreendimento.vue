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
        <h1 class="pl-3 text-h5 text-tertiary font-weight-regular">
          Novo Empreendimento
        </h1>
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

        <v-form 
          validate-on="submit lazy"
          @submit.prevent="handleSubmit"
          class="pt-6"
        >

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6 "
          >
            <v-row>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field 
                  label="Nome do Empreendimento"
                  v-model="form.nome"
                  :rules="rules.nome.value"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Detalhes do Projeto
            </h2>
            <v-row>
              <v-col cols="12" md="12">
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
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Órgão Licenciador
            </h2>
            <v-row>
              <v-col cols="12" md="6">
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
import { useEmpreendimentoStore } from '@/store/empreendimento';


// PROPS & EMITS
const props = defineProps(['isOpen', 'idProjeto'])
const emits = defineEmits(['close', 'exibir-snackbar'])

console.log('props',props)

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
const empreendimentoStore = useEmpreendimentoStore();

// ALERT
const alert = 'Para cadastrar um novo empreendimento, preencha atentamente os dados gerais abaixo.'

const menu = ref(false);

// FORM
const form = reactive({ // Estado inicial do formulário
  //id_projeto: '3c936d22-e08b-49da-9fe9-6970fffc4320',
  id_projeto: props.idProjeto,
  nome: '',
  // DETALHES DO PROJETO
  // Apenas se empreendimentos_associados é FALSE
  localizacao: [],
  tipo_extensao: 'linha', // 'linha' ou 'area'
  extensao: '',

  // ÓRGÃO LICENCIADOR
  orgao_licenciador: null,
  uf_orgao_licenciador: null,
  numero_processo: '',

  // PRODUTOS CONTRATADOS
  // Produto // 'EIA/RIMA', 'Inventário Florestal', 'RAS/RDPA', 'Estudos Arqueológicos', ...
  // Data de início
  // Data de fim
})

const rules = {
  nome: {  },
  seguimento: {  },
  tipo_empreendimento: {  },
  inicio_contrato: {  },
  tipo_prazo: {  },
  prazo: {  },
  // escopo_contrato: {  },
  // exclusao_escopo_contrato: {  },
};

const v$ = useVuelidate(rules, form, { $lazy: true })

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

  await empreendimentoStore.novoEmpreendimento(form, props.idProjeto)
    .then((message) => {
      emits('exibir-snackbar', message, 'success')
      // form.value = {
      //   nome: '',
      // };
    })
    .catch((error) => {
      emits('exibir-snackbar', error.message, 'error')
    })
    emits('close')
}

</script>
