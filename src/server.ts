import app from './app'

const PORT = process.env.PORT || 4000

app.listen(PORT as number, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
