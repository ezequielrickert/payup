import { Request, Response } from "express";
import { PaymentService } from "../application/adapter/PaymentService";
import { IWalletService } from "../application/port/IWalletService";
import { ITransactionService } from "../application/port/ITransactionService";
import { IUserService } from "../application/port/IUserService";

export class PaymentController {
    private paymentService: PaymentService;
    private userService: IUserService;

    constructor(walletService: IWalletService, transactionService: ITransactionService, userService: IUserService) {
        this.paymentService = new PaymentService(walletService, transactionService);
        this.userService = userService;
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

    async transferByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { senderCvu, receiverEmail, amount, description } = req.body;
            if (senderCvu === undefined || receiverEmail === undefined || amount === undefined || description === undefined) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }
            const receiverCvu = await this.getCvuByEmail(receiverEmail);
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

    async getCvuByEmail(receiverEmail: string): Promise<number> {
        const user = await this.userService.findByEmail(receiverEmail);
        if (!user) throw new Error("User not found");
        return user.cvu!;
    }
}
