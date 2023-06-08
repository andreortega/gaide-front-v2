// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postCondicionante, deleteCondicionante } from '../api/api';

export const useCondicionanteStore = defineStore('condicionante', {
  state: () => ({
    condicionantes: []
  }),
  actions: {
    
     async fill(idLicenca) {
      console.log('ID ACTIONS CONDICIONANTES STORE - ID LICENÇA >>> ', idLicenca)
      await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/condicionantes/licenca/${idLicenca}`)
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.condicionantes = response.data
          }, 1000)
        })
    },

    //async novaLicenca(licenca, idEmpreendimento) {
    async novaCondicionante(condicionante, idLicenca) {
      try {
        //const data = await postLicenca(licenca, idEmpreendimento)
        const data = await postCondicionante(condicionante)
        console.log('DATA LICENÇA >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          //this.condicionantes.push(condicionante);
          this.condicionantes = null;
          this.fill(idLicenca)
          //return response
          return 'Condicionante salva com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar condicionante ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar condicionante 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar condicionante 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar condicionante 3', data.error);
      }
    },

    async excluirCondicionante(idCondicionante) {
      try {
        const data = await deleteCondicionante(idCondicionante);
        console.log('data', data)
        console.log('status', data.status)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.condicionantes.findIndex((item) => item.id === idCondicionante);
          console.log('index',index)
          this.condicionantes.splice(index, 1);
        }
        //return data.statusText;
        return 'Condicionante excluída com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir Condicionante 2:', error);
        throw new Error('Erro ao excluir Condicionante 3', data.error);
      }
    }

  },
})