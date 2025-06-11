import { Request, Response } from "express";
import { PaymentService } from "../application/adapter/PaymentService";
import { IWalletService } from "../application/port/IWalletService";
import { ITransactionService } from "../application/port/ITransactionService";
import { IUserService } from "../application/port/IUserService";

const DEFAULT_DESCRIPTION = "Transferencia externa";

export class PaymentController {
    private paymentService: PaymentService;
    private userService: IUserService;

    constructor(
        walletService: IWalletService,
        transactionService: ITransactionService,
        userService: IUserService
    ) {
        this.paymentService = new PaymentService(walletService, transactionService);
        this.userService = userService;
    }

    private validateFields(fields: Record<string, any>, res: Response): boolean {
        for (const [key, value] of Object.entries(fields)) {
            if (value === undefined) {
                res.status(400).json({ error: `Missing required field: ${key}` });
                return false;
            }
        }
        return true;
    }

    private async handleTransfer(
        res: Response,
        senderCvu: number,
        receiverCvu: number,
        amount: number,
        description: string
    ): Promise<void> {
        try {
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

    private async handleWithdraw(
        res: Response,
        cvu: number,
        amount: number,
        description: string
    ): Promise<void> {
        try {
            const transaction = await this.paymentService.withdrawTransfer(cvu, amount, description);
            res.status(201).json({ success: true, transaction });
        } catch (error: any) {
            if (error?.message?.includes("insufficient")) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message || "Internal server error" });
            }
        }
    }

    async transfer(req: Request, res: Response): Promise<void> {
        const { senderCvu, receiverCvu, amount, description } = req.body;
        if (!this.validateFields({ senderCvu, receiverCvu, amount, description }, res)) return;
        await this.handleTransfer(res, senderCvu, receiverCvu, amount, description);
    }

    async transferByEmail(req: Request, res: Response): Promise<void> {
        const { senderCvu, receiverEmail, amount, description } = req.body;
        if (!this.validateFields({ senderCvu, receiverEmail, amount, description }, res)) return;

        try {
            const receiverCvu = await this.getCvuByEmail(receiverEmail);
            await this.handleTransfer(res, senderCvu, receiverCvu, amount, description);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async externalWithdrawByEmail(req: Request, res: Response): Promise<void> {
        const { email, amount } = req.body;
        if (!this.validateFields({ email, amount }, res)) return;

        try {
            const cvu = await this.getCvuByEmail(email);
            await this.handleWithdraw(res, cvu, amount, DEFAULT_DESCRIPTION);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async externalWithdrawByCvu(req: Request, res: Response): Promise<void> {
        const { cvu, amount } = req.body;
        if (!this.validateFields({ cvu, amount }, res)) return;

        await this.handleWithdraw(res, cvu, amount, DEFAULT_DESCRIPTION);
    }

    private async getCvuByEmail(email: string): Promise<number> {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new Error("User not found");
        return user.cvu!;
    }
}
