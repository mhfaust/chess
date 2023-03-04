const teens = new Map([
  [11, 'th'],
  [12, 'th'],
  [13, 'th'],
]);
const lastDigit = new Map([
  [1, 'st'],
  [2, 'nd'],
  [3, 'rd']
])

const ordinalSuffix = (n: number) => {
  return teens.get(n % 100) || lastDigit.get(n % 10) || 'th';
}

const numWithOrdSuffix = (n: number | string) => {
  return n + ordinalSuffix(parseInt(n as string, 10));
}

export default numWithOrdSuffix;