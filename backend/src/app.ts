import cors from 'cors'
import express, { json } from "express"
import { connect } from "./db/mongoose"
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import bankOperationsRouter from './routers/bankOperation'

const app = express();

export async function start() {

    await connect()

    
    // middlewares
    app.use(cors()) // allow any client to use this server

    app.use(json()) // a middleware to extract the post/put/patch data and save it to the request object in case the content type of the request is application/json

    app.use('/operations', bankOperationsRouter)

    // special notFound middleware
    app.use(notFound)

    // error middleware
    app.use(errorLogger)
    app.use(errorResponder)

    app.listen(3001, () => {
        console.log("Server is running on http://localhost:3001...");
      });
      }

export default app
