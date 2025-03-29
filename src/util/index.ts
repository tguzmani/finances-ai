export function amountToFloat(amount: string): number {
  const sanitizedAmount = amount
    .replace('$', '')
    .replace(/,/g, '') // Remove all commas
    .trim()

  return parseFloat(sanitizedAmount !== '-' ? sanitizedAmount : '0')
}
