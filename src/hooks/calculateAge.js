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

  return years;
}
