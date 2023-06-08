// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postLicenca, deleteLicenca } from '../api/api';

export const useLicencaStore = defineStore('licenca', {
  state: () => ({
    licencas: []
  }),
  actions: {
    
     async fill(idEmpreendimento) {
      // this.clientes = await fetch('@/data/clientes.json')
      //   .then((response) => response.json())
      console.log('ID ACTIONS LICENÇA STORE - ID EMPREENDIMENTO >>> ', idEmpreendimento)
      await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/licenca/empreendimento/${idEmpreendimento}`)
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.licencas = response.data
          }, 1000)
        })
    },

    //async novaLicenca(licenca, idEmpreendimento) {
    async novaLicenca(licenca, idEmpreendimento) {
      try {
        //const data = await postLicenca(licenca, idEmpreendimento)
        const data = await postLicenca(licenca)
        console.log('DATA LICENÇA >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          //this.licencas.push(licenca);
          this.licencas = null
          this.fill(idEmpreendimento)
          //return response
          return 'Licença salva com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar licença ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar licença 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar licença 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar licença 3', data.error);
      }
    },

    async excluirLicenca(idLicenca) {
      try {
        const data = await deleteLicenca(idLicenca);
        console.log('data', data)
        console.log('status', data.status)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.licencas.findIndex((item) => item.id === idLicenca);
          console.log('index',index)
          this.licencas.splice(index, 1);
        }
        //return data.statusText;
        return 'Licença excluída com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir Licenca 2:', error);
        throw new Error('Erro ao excluir Licenca 3', data.error);
      }
    }

  },
})