import { Router } from "express";
import { PaymentController } from "../controller/PaymentController";

export function createPaymentRouter(paymentController: PaymentController): Router {

    const router = Router();
    router.post("/transfer", (req, res) => paymentController.transfer(req, res));
    return router;
}


