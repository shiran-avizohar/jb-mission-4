import mongoose from "../db/mongoose"

export interface BankOperation {
    _id?: string;
    accountNumber: string;
    type: 'withdrawal' | 'deposit' | 'loan';
    amount: number;
    date: Date; 
    interest?: number;
    payments?: number;
  }

const BankOperationSchema = new mongoose.Schema<BankOperation>({
    accountNumber: String,
    type: String,
    amount: Number,
    date: String,
    interest: Number,
    payments: Number
}, {
    toObject: {
        transform: function(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }

})

export const BankOperationModel = mongoose.model<BankOperation>('BankOperation', BankOperationSchema, 'bankOperations')