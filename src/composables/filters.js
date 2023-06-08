import { useFilters } from '@/composables/filters';

const { formatDate } = useFilters();

const date = '2023-05-31';

const format = (value) => {
  return formatDate(value);
};