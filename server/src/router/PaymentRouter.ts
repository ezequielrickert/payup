import { Router } from "express";
import { PaymentController } from "../controller/PaymentController";

export function createPaymentRouter(paymentController: PaymentController): Router {

    const router = Router();
    router.post("/transferByCvu", (req, res) => paymentController.transfer(req, res));
    router.post("/transferByEmail", (req, res) => paymentController.transferByEmail(req, res));
    router.post("/externalWithdrawByEmail", (req, res) => paymentController.externalWithdrawByEmail(req, res));
    router.post("/externalWithdrawByCvu", (req, res) => paymentController.externalWithdrawByCvu(req, res));
    return router;
}
