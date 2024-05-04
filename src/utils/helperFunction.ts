export const capitalize = (str: string) => {
  if (!str.trim()) return str;
  return str
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};
