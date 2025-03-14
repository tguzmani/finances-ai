function amount(number: number) {
  if (number === null) return '0.00'
  return `${number.toFixed(2)}`
}

export default amount
