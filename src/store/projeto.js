// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postProjeto, deleteProject } from '../api/api';

export const useProjetoStore = defineStore('projeto', {
  state: () => ({
    projetos: []
  }),
  actions: {
    
     async fill(idCliente) {
      // this.clientes = await fetch('@/data/clientes.json')
      //   .then((response) => response.json())
      console.log('ID ACTIONS PROJETO STORE >>> ', idCliente)
      await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/projeto/cliente/${idCliente}`)
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.projetos = response.data
          }, 1000)
        })
    },

    async novoProjeto(projeto, idCliente) {
    //async novoProjeto(projeto) {
      try {
        const data = await postProjeto(projeto, idCliente)
        //const data = await postProjeto(projeto)
        console.log('DATA PROJETO >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          //this.projetos.push(projeto);
          this.projetos = null
          this.fill(idCliente)
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
    },

    async excluirProjeto(idProjeto) {
      try {
        const data = await deleteProject(idProjeto);
        console.log('data', data)
        console.log('status', data.status)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.projetos.findIndex((item) => item.id === idProjeto);
          console.log('index',index)
          this.projetos.splice(index, 1);
        }
        //return data.statusText;
        return 'Projeto excluído com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir projeto 2:', error);
        throw new Error('Erro ao excluir projeto 3', data.error);
      }
    }

  },
})