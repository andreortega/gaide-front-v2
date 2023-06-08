import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://gaide-dev.us-east-1.elasticbeanstalk.com',
  timeout: 5000, // Tempo limite de 5 segundos
});

export const postClient = async (cliente) => {
  try {
    //console.log('chamando axios post...', cliente)
    const response = await axiosInstance.post('/client', cliente);
    //console.log('Passou do post. Segue response >>> ', response)
    //return { success: true, data: response.data };
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const deleteClient = async (idCliente) => {
  try {
    const response = await axiosInstance.delete(`/client/${idCliente}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const postProjeto = async (projeto, id_cliente) => {
//export const postProjeto = async (projeto) => {
  try {
    const response = await axiosInstance.post(`/projeto/${id_cliente}`, projeto);
    //const response = await axiosInstance.post('/projeto/3c936d22-e08b-49da-9fe9-6970fffc4320', projeto);
    console.log('RESPONSE POST PROJETO', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (idProjeto) => {
  try {
    const response = await axiosInstance.delete(`/projeto/${idProjeto}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const postEmpreendimento = async (empreendimento) => {
  try {
    const response = await axiosInstance.post('/empreendimentos', empreendimento);
    console.log('RESPONSE POST EMPREENDIMENTO', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const deleteEmpreendimento = async (idEmpreendimento) => {
  try {
    const response = await axiosInstance.delete(`/empreendimentos/${idEmpreendimento}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const postLicenca = async (licenca) => {
  try {
    const response = await axiosInstance.post('/licenca', licenca);
    console.log('RESPONSE POST LICENÇAS', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const deleteLicenca = async (idLicenca) => {
  try {
    const response = await axiosInstance.delete(`/licenca/${idLicenca}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const postCondicionante = async (condicionante) => {
  try {
    const response = await axiosInstance.post('/condicionantes', condicionante);
    console.log('RESPONSE POST CONDICIONANTES', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const deleteCondicionante = async (idCondicionante) => {
  try {
    const response = await axiosInstance.delete(`/condicionantes/${idCondicionante}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

export const postAtividadeDeCondicionante = async (atividadeDeCondicionante) => {
  try {
    const response = await axiosInstance.post('/condicionantes_atividades', atividadeDeCondicionante);
    console.log('RESPONSE POST ATIVIDADES DE CONDICIONANTES', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const deleteAtividadeDeCondicionante = async (idAtividadeDeCondicionante) => {
  try {
    const response = await axiosInstance.delete(`/condicionantes_atividades/${idAtividadeDeCondicionante}`);
    console.log('Passou do delete. Segue response >>> ', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)')
    return { success: false, error: error.message };
  }
};

// .then((response) => {
//     if(response.data && !response.data.error) {
//       return { success: true, data: response.data };
//     }
//     else {
//       return { success: false, error: r.data.error };
//     }
//   })
//   .catch(error => {
//     return { success: false, error: error };
//   });