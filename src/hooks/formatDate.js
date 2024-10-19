import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import capitalizeFirstLetter from './capitalizeFirstLetter';

export function formatBirthDate(string) {
  if (!string) return ''; // Handle empty strings
  return capitalizeFirstLetter(dayjs(string).locale('pt-br').format('DD/MM/YY'));
}

export function formatCalendarDate(string){
  if (!string) return ''; // Handle empty strings
  return new Date(string).toISOString().split('T')[0];
}

export default function formatDate(string) {
  if (!string) return ''; // Handle empty strings
  return capitalizeFirstLetter(dayjs(string).locale('pt-br').format('ddd, DD/MM, HH:mm'));
}
