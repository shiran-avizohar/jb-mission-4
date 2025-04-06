import { Request, Response, NextFunction } from "express";
import { BankOperationModel } from "../../models/bankOperation";

export async function getOperationsByAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const accountNumber = req.params.accountNumber;

    if (!accountNumber) {
      return res.status(400).json({ message: "Account number is required." });
    }

    const operations = await BankOperationModel.find({ accountNumber });

    res.json(operations.map(doc => doc.toObject()));
  } catch (e) {
    next(e);
  }
}

export async function addOperation(req: Request, res: Response, next: NextFunction) {
    try {
      const { accountNumber, type, amount, date, interest, payments } = req.body;
  
      // Check if all required fields are provided
      if (!accountNumber || !type || !amount || !date) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      // Create a new operation document with the received data
      const newOperation = new BankOperationModel({
        accountNumber,
        type,
        amount,
        date,
        interest,
        payments,
      });
  
      // Save the new operation to the database
      await newOperation.save();
  
      // Send the saved operation as a response
      res.status(201).json(newOperation.toObject());
    } catch (e) {
      next(e);
    }
  }
