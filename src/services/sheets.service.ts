import { google } from 'googleapis'
import { TransactionData } from './llm.service'
import dotenv from 'dotenv'
import sheetsRepository from '../common/sheets.repository'

dotenv.config()

const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_JSON_BASE64

if (!credentialsBase64) {
  throw new Error(
    '❌ Missing GOOGLE_CREDENTIALS_JSON_BASE64 in environment variables.'
  )
}

let credentials

try {
  const decodedCredentials = Buffer.from(credentialsBase64, 'base64').toString(
    'utf-8'
  )
  credentials = JSON.parse(decodedCredentials)
} catch (error) {
  throw new Error(
    '❌ Failed to parse GOOGLE_CREDENTIALS_JSON_BASE64. Check your .env file.'
  )
}

export const getBsDollarRate = async (): Promise<number> => {
  const auth = new google.auth.GoogleAuth({
    credentials,
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
    credentials,
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
      data.date,
      index === 0 ? data.description : null,
      entry.account,
      null,
      `$${entry.amount}`,
      null,
      entry.category || null,
      entry.subcategory || null,
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

  await sheetsRepository.updateSheetValues(range, rows)
}

const sheetsService = {
  insertTransactionToSheet,
  getBsDollarRate,
}

export default sheetsService
