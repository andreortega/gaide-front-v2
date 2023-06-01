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

//export const postProjeto = async (projeto, id_cliente) => {
export const postProjeto = async (projeto) => {
  try {
    //const response = await axiosInstance.post(`/projeto/${id_cliente}`, projeto);
    const response = await axiosInstance.post('/projeto/3c936d22-e08b-49da-9fe9-6970fffc4320', projeto);
    console.log('RESPONSE POST PROJETO', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
    return { success: false, error: error.message };
  }
};

export const postEmpreendimento = async (empreendimento) => {
  try {
    const response = await axiosInstance.post('/empreendimento/3c936d22-e08b-49da-9fe9-6970fffc4320', empreendimento);
    console.log('RESPONSE POST EMPREENDIMENTO', response)
    return response;
  } catch (error) {
    //throw error;
    console.log('na API caiu no catch(error)', error)
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