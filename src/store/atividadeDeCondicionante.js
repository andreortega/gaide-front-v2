// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postAtividadeDeCondicionante, deleteAtividadeDeCondicionante } from '../api/api';

export const useAtividadeDeCondicionanteStore = defineStore('atividadeDeCondicionante', {
  state: () => ({
    atividadesDeCondicionantes: []
  }),
  actions: {
    
     async fill(idCondicionante) {
      console.log('ID ACTIONS ATIVIDADES DE CONDICIONANTES STORE - ID CONDICIONANTE >>> ', idCondicionante)
      await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/condicionantes_atividades/condicionante/${idCondicionante}`)
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.atividadesDeCondicionantes = response.data
          }, 1000)
        })
    },

    //async novaLicenca(licenca, idEmpreendimento) {
    async novaAtividadeDeCondicionante(atividadeDeCondicionante) {
      try {
        //const data = await postLicenca(licenca, idEmpreendimento)
        const data = await postAtividadeDeCondicionante(atividadeDeCondicionante)
        console.log('DATA LICENÇA >>> ', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          this.atividadesDeCondicionantes.push(atividadeDeCondicionante);
          //return response
          return 'Atividade de Condicionante salva com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar atividade de condicionante ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar atividade de condicionante 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar atividade de condicionante 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar atividade de condicionante 3', data.error);
      }
    },

    async excluirAtividadeDeCondicionante(idAtividadeDeCondicionante) {
      try {
        const data = await deleteAtividadeDeCondicionante(idAtividadeDeCondicionante);
        console.log('data', data)
        console.log('status', data.status)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.atividadesDeCondicionantes.findIndex((item) => item.id === idAtividadeDeCondicionante);
          console.log('index',index)
          this.atividadesDeCondicionantes.splice(index, 1);
        }
        //return data.statusText;
        return 'Atividade de Condicionante excluída com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir AtividadeDeCondicionante 2:', error);
        throw new Error('Erro ao excluir AtividadeDeCondicionante 3', data.error);
      }
    }

  },
})