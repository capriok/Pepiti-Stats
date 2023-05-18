export function dateIsValid(date) {
  return !isNaN(date) && date instanceof Date
}
