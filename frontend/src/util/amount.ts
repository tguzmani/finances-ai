function amount(number: number) {
  if (number === null) return '0.00'

  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default amount
