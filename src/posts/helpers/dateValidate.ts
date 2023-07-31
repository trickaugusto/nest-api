export function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return !isNaN(dateObject.getTime());
}
