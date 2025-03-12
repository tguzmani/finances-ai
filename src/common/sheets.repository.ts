import {
  GoogleAuth,
  JSONClient,
} from 'google-auth-library/build/src/auth/googleauth'
import dotenv from 'dotenv'
import { google, sheets_v4 } from 'googleapis'

dotenv.config()

class SheetsRepository {
  auth: GoogleAuth<JSONClient>
  sheets: sheets_v4.Sheets
  spreadsheetId: string | undefined = process.env.GOOGLE_SHEETS_ID

  constructor() {
    const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_JSON_BASE64

    if (!credentialsBase64) {
      throw new Error(
        '❌ Missing GOOGLE_CREDENTIALS_JSON_BASE64 in environment variables.'
      )
    }

    let credentials

    try {
      const decodedCredentials = Buffer.from(
        credentialsBase64,
        'base64'
      ).toString('utf-8')
      credentials = JSON.parse(decodedCredentials)
    } catch (error) {
      throw new Error(
        '❌ Failed to parse GOOGLE_CREDENTIALS_JSON_BASE64. Check your .env file.'
      )
    }

    this.auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    this.sheets = google.sheets({ version: 'v4', auth: this.auth })
  }

  async getSheetValues(range: string) {
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    })

    return res.data.values
  }

  async updateSheetValues(range: string, values: any[][]) {
    const res = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    })

    return res.data
  }
}

const sheetsRepository = new SheetsRepository()

export default sheetsRepository
