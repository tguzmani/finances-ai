async function getStatus() {
  return {
    googleSheetsUrl: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/edit?gid=1400547069#gid=1400547069`,
  }
}

const statusService = {
  getStatus,
}

export default statusService
