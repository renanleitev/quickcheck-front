export default function calculateAge(date) {
  const birthDate = new Date(date);
  const todayDate = new Date();

  let years = todayDate.getFullYear() - birthDate.getFullYear();

  if (
    todayDate.getMonth() < birthDate.getMonth() ||
    (todayDate.getMonth() == birthDate.getMonth() && todayDate.getDate() < birthDate.getDate())
  ) {
    years--;
  }

  if (years < 0) {
    years = 0;
  }

  return years;
}
