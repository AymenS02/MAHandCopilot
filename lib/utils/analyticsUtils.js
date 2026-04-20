export function getAgeRange(age) {
  if (!Number.isFinite(age) || age < 0) return 'Unknown';
  if (age < 13) return 'Under 13';
  if (age <= 17) return '13-17';
  if (age <= 24) return '18-24';
  if (age <= 34) return '25-34';
  return '35+';
}

export function toValidAge(value) {
  const age = Number(value);
  return Number.isFinite(age) && age >= 0 ? age : null;
}

