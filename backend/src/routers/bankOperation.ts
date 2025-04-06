import { Router } from "express";
import { getOperationsByAccount, addOperation } from "../controllers/bankOperation/controller";
import { addOperationValidator } from "../controllers/bankOperation/validator";
import validation from "../middlewares/validation";

const bankOperationsRouter = Router()

bankOperationsRouter.get('/:accountNumber', getOperationsByAccount)
bankOperationsRouter.post('/', validation(addOperationValidator), addOperation)

export default bankOperationsRouter