export function amountToFloat(amount: string): number {
  const sanitizedAmount = amount.replace('$', '').trim()

  return parseFloat(sanitizedAmount !== '-' ? sanitizedAmount : '0')
}
