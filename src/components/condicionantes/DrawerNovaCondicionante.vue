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
          Nova Condicionante
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
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Número da Licença"
                  v-model="form.numero_condicionante"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn-toggle
                  label="Tipo"
                  v-model="form.tipo_condicionante"
                  rounded="50"
                  color="secondary"
                  group
                >
                  <v-btn value="informativa">
                    Informativa
                  </v-btn>
                  <v-btn value="executiva">
                    Executiva
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn-toggle
                  label="Caráter"
                  v-model="form.carater_condicionante"
                  rounded="50"
                  color="secondary"
                  group
                >
                  <v-btn value="geral">
                    Geral
                  </v-btn>
                  <v-btn value="especifica">
                    Específica
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Condicionante"
                  v-model="form.condicionante"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-select 
                  label="Status"
                  v-model="form.status"
                  variant="outlined"
                  :items="['A iniciar', 'Em atendimento', 'Parcialmente atendida', 'Observada', 'Atendida', 'Não atendida']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col class="flex-grow">
                    <v-text-field 
                      label="Prazo"
                      v-model="form.prazo"
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
                      <!-- <v-btn value="anos">
                        Anos
                      </v-btn> -->
                    </v-btn-toggle>
                  </v-col>
                </v-row>
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
                  v-model="form.observacoes"
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
import { useCondicionanteStore } from '@/store/condicionante';

// PROPS & DRAWER
//const props = defineProps(['isOpen, idCliente'])
//const props = defineProps(['idCliente'])
//defineProps(['isDrawerOpen'])
//const props = defineProps(['isOpen'])
// const props = toRefs(defineProps({
//   isOpen: Boolean,
// }));

// PROPS & EMITS
//const props = defineProps(['isOpen, idCliente'])
//const props = defineProps(['isOpen'])
const props = defineProps(['isOpen', 'idLicenca'])
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
const condicionanteStore = useCondicionanteStore();

// ALERT
const alert = 'Para cadastrar uma nova condicionante, preencha atentamente os dados gerais abaixo.'

const menu = ref(false);

// const binaryString = 'Teste binário GAIDE!'; // String binária mocada
// const base64String = btoa(binaryString); // Converte a string binária em base64
// console.log(base64String)

// FORM
const form = reactive({ // Estado inicial do formulário
  //id_projeto: '3c936d22-e08b-49da-9fe9-6970fffc4320',
  id_licenca: props.idLicenca,
  numero_condicionante: '',

  tipo_condicionante: 'informativa', // 'informativa' ou 'executiva'
  carater_condicionante: 'geral', // 'geral' ou 'especifica'
  condicionante: '',
  status: null, //null,
  
  prazo: '',
  tipo_prazo: 'dias', // 'dias' ou 'meses'
  periodico: 'true', // null
  observacoes: ''

  // PERIODICIDADE
  
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
  await condicionanteStore.novaCondicionante(form, props.idLicenca)
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
