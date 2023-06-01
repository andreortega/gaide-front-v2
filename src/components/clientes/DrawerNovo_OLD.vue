<template>
  <v-container fluid>
    <v-navigation-drawer 
      v-model="props.drawer"
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
        <h1 class="pl-3 text-h5 text-tertiary font-weight-regular">Novo Cliente</h1>
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
          @submit.prevent="submitForm"
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
                  label="Nome da Empresa"
                  v-model="form.empresa"
                  :rules="[
                    () => !!form.empresa || 'This field is required'
                  ]"
                  :error-messages="empresaErrors"
                  :errors="empresaErrors"

                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-text-field 
                  label="CNPJ"
                  v-model="form.cnpj"
                  :rules="cnpjRules"
                  :error-messages="cnpjErrors"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" md="6">
                <v-select 
                  v-model="form.ramo"
                  label="Ramo de Atuação"
                  variant="outlined"
                  :items="['Indústria','Comércio','Serviços']"
                ></v-select>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Endereço
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Endereço
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Número
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Complemento
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Bairro
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select 
                  variant="outlined"
                  label="UF"
                  :items="['AC','AL','AP','AM','BA','CE','DF','ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Cidade
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  CEP
                </v-text-field>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Pessoa de Contato
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Nome
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  E-mail
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Telefone
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined">
                  Função
                </v-text-field>
              </v-col>
            </v-row>
          </v-sheet> -->

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

<script setup>
import { ref, customRef, reactive, computed, defineProps, defineEmits, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'


// PROPS & DRAWER
const props = defineProps([
  'drawer'
])

// EMITS
const emits = defineEmits([
  'close'
])

// ALERT
const alert = 'Para cadastrar um novo cliente, preencha atentamente os dados gerais abaixo.'

// FORM
const { regex } = helpers;

//const empresa = ref('')

const form = reactive({ // Estado inicial do formulário
  empresa: '',
  //cnpj: '',
  ramo: null,
  // endereco: '',
  // numero: '',
  // complemento: '',
  // bairro: '',
  // uf: null,
  // cidade: '',
  // cep: '',
  // contato_nome: '',
  // contato_email: '',
  // contato_telefone: '',
  // contato_funcao: ''
})

const validations = { // Regras de validação
    empresa: { required, minLength: minLength(3) },
    //cnpj: { required, maxLength: maxLength(18), cnpj: cnpjValidator },
    // cnpj: { 
    //   required, 
    //   maxLength: maxLength(18),
    //   // regex: regex('cnpjFormat', /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    //   // custom: validateCnpj 
    //   isValidCnpj
    // },
    ramo: { required },
    // endereco: { required },
    // numero: { required },
    // complemento: { required },
    // bairro: { required },
    // uf: { required },
    // cidade: { required },
    // cep: { required },
    // contato_nome: { required },
    // contato_email: { required, email },
    // contato_telefone: { required },
    // contato_funcao: { required }
}

//const $v = () => useVuelidate(rules, form)
//const { value: errors, v$ } = useVuelidate(rules, form)
const v$ = useVuelidate(validations, form, { $lazy: true })
const empresaRules = (value) => {
  console.log('value', value)
  return value.errors
};
// const empresaErrors = computed(() => {
//   console.log('entrou empresaErrors', v$?.value?.$errors)
//   return getErrors(v$?.value?.$errors)
// });
const empresaErrors = computed(() => {
  const errors = []
  if (!v$.value.$dirty) return errors
  // !this.$v.email.email && errors.push('Must be valid e-mail')
  // !this.$v.email.required && errors.push('E-mail is required')
  return errors
});
const emailValidation = computed(() => {
  return email.value ? email.value.$invalid : null;
});
// const getEmpresaErrors = computed(() => {
//   const empresaErrors = v$?.value?.$errors?.empresa;
//   return empresaErrors ? empresaErrors.$messages : [];
// });
//const empresaErrors = computed(() => getErrors(v$?.value?.$errors?.empresa));



// const cnpjRules = v$?.value?.form?.cnpj?.$params;
// const cnpjErrors = computed(() => v$?.value?.$errors?.cnpj);

// CUSTOM VALIDATION RULES
//const mustBeLearnVue = (value) => value.includes('learnvue')

//const meta = useVuelidate(rules, form)

//const { value: errors, meta } = useVuelidate(rules, form)
// const v$name = useVuelidate(rules.name, form);
// const v$email = useVuelidate(rules.email, form);

//function submitForm() {
const submitForm = () => {

  // VALIDAÇÃO
  //v$.value.$validate()
  v$?.value.$touch();

  //if (!v$.value.$invalid) {
  if (v$?.value.$error) {
    console.log('❌ Form com ERRO', getErrors(v$?.value.$errors))
    return;
  }

  // SUBMIT FORM
  console.log('Submit Form')

  // FECHAR DRAWER
  //emit('close')
}

function getErrors(errorObject) {
  if (!errorObject) {
    return [];
  }

  return Object.values(errorObject).map((error) => error.$message);
}

//const validateCnpj = computed(() => {
  function isValidCnpj(value) {
  if (!value) {
    return true;
  }

  const cnpj = value.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  const numbers = Array.from(cnpj, Number);

  // Verificar se todos os dígitos são iguais
  if (numbers.every(num => num === numbers[0])) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += numbers[i] * (6 - (i % 8 + 1));
  }
  let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (digit1 !== numbers[12]) {
    return false;
  }

  // Calcular o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += numbers[i] * (7 - (i % 8 + 1));
  }
  let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (digit2 !== numbers[13]) {
    return false;
  }

  return true;
}


// TESTES C/ WATCH
const watcherTest = watch([() => [props.drawer]], (newValue, oldValue) =>
  console.log('props.drawer', props.drawer)
);
</script>
