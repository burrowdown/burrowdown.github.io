import "dotenv/config"
import app from "./app.js"
import { dbConnect } from "./db.js"

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
  dbConnect()
  console.log(`listening on port ${PORT}`)
})
