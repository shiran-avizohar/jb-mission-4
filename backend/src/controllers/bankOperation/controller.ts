import { Request, Response, NextFunction } from "express";
import { BankOperationModel } from "../../models/bankOperation";


export async function getOperationsByAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountNumber = req.params.accountNumber;
  
      if (!accountNumber) {
        res.status(400).json({ message: "Account number is required." });
        return;
      }
  
      const operations = await BankOperationModel.find({ accountNumber });
  
      res.json(operations.map(doc => doc.toObject()));
  
    } catch (e) {
      next(e);
    }
  }

export async function addOperation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.body); // הדפסת הנתונים כדי לבדוק את מה שאתה מקבל
        const { accountNumber, type, amount, date, interest, payments } = req.body;

        if (!accountNumber || !type || !amount || !date) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }

        const newOperation = new BankOperationModel({
            accountNumber,
            type,
            amount,
            date,
            interest,
            payments,
        });

        await newOperation.save();

        res.status(201).json(newOperation.toObject());
    } catch (e) {
        next(e);
    }
}