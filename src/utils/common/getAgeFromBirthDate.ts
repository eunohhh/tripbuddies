export function getAgeFromBirthDate(birthDate: string): number {
  const birthYear = new Date(birthDate).getUTCFullYear();
  const currentYear = new Date().getUTCFullYear();
  return currentYear - birthYear;
}
