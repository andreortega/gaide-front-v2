// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postEmpreendimento } from '../api/api';

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

    //async novoProjeto(projeto, idCliente) {
    async novoEmpreendimento(empreendimento) {
      try {
        //const data = await postProjeto(projeto, idCliente)
        const data = await postProjeto(projeto)
        console.log('DATA PROJETO >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          this.projetos.push(projeto);
          //return response
          return 'Projeto salvo com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar projeto ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar projeto 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar projeto 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar projeto 3', data.error);
      }
    }

  },
})