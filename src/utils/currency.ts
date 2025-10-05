export const formatCurrency = (amount: number, language: 'en' | 'bn' = 'en'): string => {
  const symbol = '৳'
  
  if (language === 'bn') {
    // Convert to Bengali numerals
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    const formattedAmount = amount.toFixed(2).replace(/\d/g, (digit) => bengaliNumerals[parseInt(digit)])
    return `${symbol}${formattedAmount}`
  }
  
  return `${symbol}${amount.toFixed(2)}`
}

export const formatBengaliNumber = (num: number): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.toString().replace(/\d/g, (digit) => bengaliNumerals[parseInt(digit)])
}