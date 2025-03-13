const axios = require('axios')
const https = require('https')
const cheerio = require('cheerio')

const agent = new https.Agent({
  rejectUnauthorized: false,
})

async function getBcvExchangeRate() {
  try {
    const response = await axios.get('https://bcv.org.ve', {
      httpsAgent: agent,
    })

    const $ = cheerio.load(response.data)

    const dolarElementText = $(
      '#dolar > .field-content > .row > .centrado > strong'
    )
      .text()
      .trim()

    const bcvDolarValue = parseFloat(dolarElementText.replace(',', '.'))

    return bcvDolarValue

    // if (parallelDolarValue) {
    //   const savingsRate = (1 - bcvDolarValue / parallelDolarValue) * 100

    //   console.log(parallelDolarValue)
    //   console.log(savingsRate.toFixed(2) + '%')
    // }
  } catch (error: any) {
    console.error(error.message)
  }
}

const bcvScrapper = {
  getBcvExchangeRate,
}

export default bcvScrapper
