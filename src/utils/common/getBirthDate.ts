export function getBirthDate(age: number) {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthDate = new Date(Date.UTC(birthYear, 0, 1));
  return birthDate.toISOString();
}
