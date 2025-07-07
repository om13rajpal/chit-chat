import path from 'path'
import dotenv from 'dotenv'

const envPath = path.join(__dirname, '../../.env')
dotenv.config({
    path: envPath
})

export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV