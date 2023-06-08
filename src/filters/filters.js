import moment from 'moment';
import 'moment/locale/pt-br';

// export const uppercase = (value) => {
// return value.toUpperCase();
// };

export const formatDate = (value) => {
// Implemente a lógica de formatação de data aqui
    return moment(value).format('DD/MM/YYYY');
};