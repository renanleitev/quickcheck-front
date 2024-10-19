import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import capitalizeFirstLetter from './capitalizeFirstLetter';

export default function formatDate(string) {
  if (!string) return ''; // Handle empty strings
  return capitalizeFirstLetter(dayjs(string).locale('pt-br').format('ddd, MM/DD, HH:mm'));
}
