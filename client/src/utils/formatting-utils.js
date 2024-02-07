export function getRandomNumberKey() {
  return `key-${Math.round(Math.random() * 1000 * Math.random() * 1000 / Math.random() * 1000 + Math.random() * 1000)}`;
}
