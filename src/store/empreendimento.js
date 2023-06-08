// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postEmpreendimento, deleteEmpreendimento } from '../api/api';

export const useEmpreendimentoStore = defineStore('empreendimento', {
  state: () => ({
    empreendimentos: []
  }),
  actions: {
    
     async fill(idProjeto) {
      // this.clientes = await fetch('@/data/clientes.json')
      //   .then((response) => response.json())
      console.log('ID ACTIONS EMPREENDIMENTO STORE >>> ', idProjeto)
      await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/empreendimentos/${idProjeto}`)
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.empreendimentos = response.data
          }, 1000)
        })
    },

    async novoEmpreendimento(empreendimento, idProjeto) {
      try {
        //const data = await postEmpreendimento(empreendimento, idProjeto)
        const data = await postEmpreendimento(empreendimento)
        console.log('DATA PROJETO >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          //this.empreendimentos.push(empreendimento);
          this.empreendimentos = null
          this.fill(idProjeto)
          //return response
          return 'Empreendimento salvo com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar empreendimento ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar empreendimento 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar empreendimento 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar empreendimento 3', data.error);
      }
    },

    async excluirEmpreendimento(idEmpreendimento) {
      try {
        const data = await deleteEmpreendimento(idEmpreendimento);
        console.log('data', data)
        console.log('status', data.status)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.empreendimentos.findIndex((item) => item.id === idEmpreendimento);
          console.log('index',index)
          this.empreendimentos.splice(index, 1);
        }
        //return data.statusText;
        return 'Empreendimento excluído com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir empreendimento 2:', error);
        throw new Error('Erro ao excluir empreendimento 3', data.error);
      }
    }

  },
})