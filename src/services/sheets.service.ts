import { google } from 'googleapis'
import { TransactionData } from './llm.service'
import { get } from 'http'

export const getBsDollarRate = async (): Promise<number> => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Cuentas!M24',
  })

  const rate = parseFloat(res.data.values?.[0][0])

  if (!rate) {
    throw new Error('Failed to fetch Bs/$ rate from Sheets.')
  }

  return rate
}

export const insertTransactionToSheet = async (data: TransactionData) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const getSheet = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Libro!B:I',
  })

  const existingRows = getSheet.data.values || []
  const nextRowNumber = existingRows.length + 1

  const rows: any[] = []

  // Debit accounts first
  data.debit_accounts.forEach((entry, index) => {
    rows.push([
      index === 0 ? data.date : null,
      index === 0 ? data.description : null,
      entry.account,
      null,
      `$${entry.amount}`,
      null,
      index === 0 ? data.category || null : null,
      index === 0 ? data.subcategory || null : null,
    ])
  })

  // Credit accounts next
  data.credit_accounts.forEach(entry => {
    rows.push([
      data.date,
      null,
      null,
      entry.account,
      null,
      `$${entry.amount}`,
      null,
      null,
    ])
  })

  const range = `Libro!B${nextRowNumber}:I${nextRowNumber + rows.length - 1}`

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  })
}

export const insertTestRow = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const testRow = [
    [
      new Date().toISOString().split('T')[0],
      'Test Entry',
      'Test Debit',
      'Test Credit',
      '$123',
      '$123',
      'Test Category',
      'Test Subcategory',
    ],
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Test!A:H',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: testRow },
  })
}

const sheetsService = {
  insertTransactionToSheet,
  getBsDollarRate,
}

export default sheetsService
