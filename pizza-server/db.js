import mongoose from "mongoose"

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log(`[database]: connected to db`)
  } catch (err) {
    console.warn(`[database error]: ${err}`)
  }
}

export { dbConnect, mongoose }
