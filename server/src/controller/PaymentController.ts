import { Request, Response } from "express";
import { PaymentService } from "../application/adapter/PaymentService";
import { IWalletService } from "../application/port/IWalletService";
import { ITransactionService } from "../application/port/ITransactionService";

export class PaymentController {
    private paymentService: PaymentService;

    constructor(walletService: IWalletService, transactionService: ITransactionService) {
        this.paymentService = new PaymentService(walletService, transactionService);
    }

    async transfer(req: Request, res: Response): Promise<void> {
        try {
            const { senderCvu, receiverCvu, amount, description } = req.body;
            if (senderCvu === undefined || receiverCvu === undefined || amount === undefined || description === undefined) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            const transaction = await this.paymentService.transfer(senderCvu, receiverCvu, amount, description);
            res.status(201).json({ success: true, transaction });
        } catch (error: any) {
            if (error?.message?.includes("insufficient")) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message || "Internal server error" });
            }
        }
    }
}
