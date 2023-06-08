<template>
  <v-container fluid>
    <v-navigation-drawer 
      v-model="props.isOpen"
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
                <!-- <v-text-field 
                  label="Nome da Empresa"
                  id="empresa"
                  v-model="empresa"
                  :rules="[
                    () => !!empresa || 'This field is required'
                  ]"
                  :error-messages="empresaErrors"
                  :errors="empresaErrors"
                  @input="v$.value.empresa.$touch()"
                  @blur="v$.value.empresa.$touch()"
                  :error-messages="getErrorMessage('name')"
                  variant="outlined"
                  required
                ></v-text-field> -->
                <v-text-field 
                  label="Nome da Empresa"
                  v-model="form.name"
                  :rules="rules.name.value"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="CNPJ"
                  v-model="form.cnpj"
                  :rules="rules.cnpj.value"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select 
                  label="Ramo de Atuação"
                  v-model="form.line_of_business"
                  variant="outlined"
                  :rules="rules.line_of_business.value"
                  :items="['Indústria','Comércio','Serviços']"
                ></v-select>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet 
            style="border-radius: 25px" 
            color="grey-lighten-4"
            class="mb-6 pa-6"
          >
            <h2 class="text-subtitle-1 text-tertiary font-weight-regular pb-6">
              Endereço
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Endereço"
                  v-model="form.street"
                  variant="outlined"
                  :rules="rules.street.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Número"
                  v-model="form.number"
                  variant="outlined"
                  :rules="rules.number.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Complemento"
                  v-model="form.complement"
                  variant="outlined"
                  :rules="rules.complement.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Bairro"
                  v-model="form.neighborhood"
                  variant="outlined"
                  :rules="rules.neighborhood.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select 
                  label="UF"
                  v-model="form.state"
                  variant="outlined"
                  :rules="rules.state.value"
                  :items="['AC','AL','AP','AM','BA','CE','DF','ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Cidade"
                  v-model="form.city"
                  variant="outlined"
                  :rules="rules.city.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="CEP"
                  v-model="form.cep"
                  variant="outlined"
                  :rules="rules.cep.value"
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
              Pessoa de Contato
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Nome"
                  v-model="form.contact_name"
                  variant="outlined"
                  :rules="rules.contact_name.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="E-mail"
                  v-model="form.contact_email"
                  variant="outlined"
                  :rules="rules.contact_email.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Telefone"
                  v-model="form.contact_phone"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Função"
                  v-model="form.contact_function"
                  variant="outlined"
                  :rules="rules.contact_function.value"
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
import { ref, defineEmits, customRef, reactive, computed,  watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useClienteStore } from '@/store/cliente';



// EMITS
const props = defineProps(['isOpen'])
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

// PREPARANDO STORES
const clienteStore = useClienteStore();

// ALERT
const alert = 'Para cadastrar um novo cliente, preencha atentamente os dados gerais abaixo.'


// FORM
const form = reactive({ // Estado inicial do formulário
  name: '',
  cnpj: '',
  line_of_business: null, // null
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: null, // null
  cep: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_function: ''
})

const rules = {
  name: { required, minLength: minLength(3) },
  // cnpj: { required, maxLength: maxLength(18), cnpj: cnpjValidator },
  cnpj: {  },
  line_of_business: {  },
  street: {  },
  number: {  },
  complement: {  },
  neighborhood: {  },
  city: {  },
  state: {  },
  cep: {  },
  contact_name: {  },
  contact_email: {  },
  contact_phone: {  },
  contact_function: {  }
};

const v$ = useVuelidate(rules, form, { $lazy: true })

const errorMessages = {
  empresa: {
    required: 'Empresa é requerida.',
    minLength: 'Empresa deve ter no mínimo 3 caracteres.',
  },
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
  
  await clienteStore.novoCliente(form)
    //console.log('FORM VALUE >>> ', form)
    .then((message) => {
      emits('exibir-snackbar', message, 'success')
      // form = {
      //   name: '',
      //   cnpj: '',
      //   line_of_business: null,
      //   street: '',
      //   number: '',
      //   complement: '',
      //   neighborhood: '',
      //   city: '',
      //   state: null,
      //   cep: '',
      //   contact_name: '',
      //   contact_email: '',
      //   contact_phone: '3223',
      //   contact_function: ''
      // };
    })
    .catch((error) => {
      emits('exibir-snackbar', error.message, 'error')
    })
  emits('close')
}

// TESTES C/ WATCH
const watcherTest = watch([() => [props.drawer]], (newValue, oldValue) =>
  console.log('props.drawer', props.drawer)
);
</script>
