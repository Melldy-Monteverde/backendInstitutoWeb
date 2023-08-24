import 'dotenv/config'
import displayRoutes from 'express-routemap'
import app from './app.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('app listening on port:', PORT)
  displayRoutes(app)
})
