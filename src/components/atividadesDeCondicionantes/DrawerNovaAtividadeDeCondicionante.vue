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
          Nova Atividade de Condicionante
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
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Atividades Realizadas
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.inicio"
                  label="Início"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.termino"
                  label="Término"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <!-- <v-autocomplete
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
                ></v-autocomplete> -->
                <v-text-field
                  label="Localização'"
                  v-model="form.localizacao"
                  rows="3"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Descrição da Atividade"
                  v-model="form.descricao"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Status de Atendimento
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-select 
                  label="Status"
                  variant="outlined"
                  :items="['A iniciar', 'Em atendimento', 'Parcialmente atendida', 'Observada', 'Atendida', 'Não atendida']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                % de Completude
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Anexar Evidência"
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
              Observações
            </h2>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Escreva suas anotações"
                  rows="3"
                ></v-textarea>
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
import { useAtividadeDeCondicionanteStore } from '@/store/atividadeDeCondicionante';

// PROPS & DRAWER
//const props = defineProps(['isOpen, idCliente'])
//const props = defineProps(['idCliente'])
//defineProps(['isDrawerOpen'])
//const props = defineProps(['isOpen'])
// const props = toRefs(defineProps({
//   isOpen: Boolean,
// }));

// PROPS & EMITS
const props = defineProps(['isOpen', 'idCondicionante'])
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
const atividadeDeCondicionanteStore = useAtividadeDeCondicionanteStore();

// ALERT
const alert = 'Para cadastrar uma nova atividade de condicionante, preencha atentamente os dados gerais abaixo.'

const menu = ref(false);

// const binaryString = 'Teste binário GAIDE!'; // String binária mocada
// const base64String = btoa(binaryString); // Converte a string binária em base64
// console.log(base64String)

// FORM
const form = reactive({ // Estado inicial do formulário
  //id_projeto: '3c936d22-e08b-49da-9fe9-6970fffc4320',
  id_condicionante: props.idCondicionante,
  inicio: '',
  termino: '',
  localizacao: 'Brasília/DF',
  descricao: 'asfdsadf'
  // OBSERVACOES

  // STATUS DE ATENDIMENTO DA ATIVIDADE DA CONDICIONANTE
  // Status
  // % de Completude
  // Anexo Evidência

})

const rules = {
  numero_licenca: {  },
  seguimento: {  },
  tipo_empreendimento: {  },
  inicio_contrato: {  },
  tipo_prazo: {  },
  prazo: {  },
  // escopo_contrato: {  },
  // exclusao_escopo_contrato: {  },
};

// const handleFileUpload = (files) => {
//   form.licenca_arquivo.value = files[0];
// };

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

  //console.log('ID CLIENTE', props.idCliente)
  await atividadeDeCondicionanteStore.novaAtividadeDeCondicionante(form)
    .then((message) => {
      emits('exibir-snackbar', message, 'success')
      form.value = {
        nome: '',
      };
    })
    .catch((error) => {
      emits('exibir-snackbar', error.message, 'error')
    })
    emits('close')
}

</script>
