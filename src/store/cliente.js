// Utilities
import { defineStore } from 'pinia';
import  axios  from 'axios';
import { postClient, deleteClient } from '../api/api';

export const useClienteStore = defineStore('cliente', {
  state: () => ({
    cliente: null,
    clientes: [],
    editMode: false,
  }),
  actions: {
    
     async fill() {
      // this.clientes = await fetch('@/data/clientes.json')
      //   .then((response) => response.json())
      await axios.get('http://gaide-dev.us-east-1.elasticbeanstalk.com/client/company')
        .then(response => {
          setTimeout(() => {
            //this.loadingState = 'success'
            this.clientes = response.data
          }, 1000)
        })
    },

    async fetchCliente(clienteId) {
      try {
        const response = await axios.get(`http://gaide-dev.us-east-1.elasticbeanstalk.com/client/${clienteId}`);
        this.cliente = response.data;
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    },

    async addCliente(cliente) {
      try {
        const data = await postClient(cliente)
        console.log('data', data)
        if (data.status === 200 || data.status === 201) {
          console.log('STORE entrou no response.success')
          //this.clientes.push(cliente);
          this.clientes = null
          this.fill()
          //return response
          return 'Cliente salvo com sucesso!'
        } else if (data.error) {
          //throw new Error(response.error);
          console.log('Teve Erro data.error:', data.error)
          return `Erro ao salvar cliente ${data.error}`;
        } else {
          //throw new Error(response.error);
          throw new Error('Erro ao salvar cliente 1', data.error);
        }
      } catch (error) {
        console.error('Erro ao salvar cliente 2:', error);
        //return { success: false, error: error }
        throw new Error('Erro ao salvar cliente 3', data.error);
      }
    },

    setEditMode(editMode) {
      this.editMode = editMode;
    },

    async updateCliente(id, cliente) {
      try {
        //await axios.put(`/api/clientes/${id}`, cliente);
        //const response = await updateCliente(id, cliente);
        const response = await axios.put(`http://gaide-dev.us-east-1.elasticbeanstalk.com/client/${id}`, cliente)
        console.log('updateCliente response.data', response.data);
        const index = this.clientes.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.clientes[index] = response.data;
        }
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
      }
    },

    // removerClienteDoStore(idCliente) {
    //   // Remover o item do estado "items" usando o índice fornecido
    //   const index = this.clientes.value.findIndex((item) => item.id === idCliente);
    //   this.clientes.splice(index, 1);
    // },

    async excluirCliente(idCliente) {
      try {
        const data = await deleteClient(idCliente);
        console.log('data', data)
        console.log('status', data.status)
        //if()
        //this.removerClienteDoStore(idCliente)

        if (data.status === 200 || data.status === 201) {
          console.log('deu status 200 ou 201 ao deletar')
          const index = this.clientes.findIndex((item) => item.id === idCliente);
          console.log('index',index)
          this.clientes.splice(index, 1);
        }
        //return data.statusText;
        return 'Cliente excluído com sucesso!'
      } catch (error) {
        console.error('Erro ao excluir cliente 2:', error);
        throw new Error('Erro ao excluir cliente 3', data.error);
      }
    }

  },
})