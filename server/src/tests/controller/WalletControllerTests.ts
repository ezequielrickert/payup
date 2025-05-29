import { WalletController } from "../../controller/WalletController";
import { FakeWalletService } from "../adapters/FakeWalletService";
import { Request, Response } from "express";
import { WalletDto } from "../../dto/WalletDto";

describe("WalletController", () => {
    let walletController: WalletController;
    let fakeWalletService: FakeWalletService;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        fakeWalletService = new FakeWalletService();
        walletController = new WalletController(fakeWalletService);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe("getWallet", () => {
        it("should return 404 if wallet is not found", async () => {
            req.params = { userId: "1" };
            await walletController.getWallet(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Wallet not found" });
        });

        it("should return wallet if found", async () => {
            const wallet: WalletDto = { userId: 1, balance: 100 };
            fakeWalletService.wallets.push(wallet);
            req.params = { userId: "1" };
            await walletController.getWallet(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith(wallet);
        });
    });

    describe("deposit", () => {
        it("should deposit to wallet and return updated wallet", async () => {
            const wallet: WalletDto = { userId: 3, balance: 10 };
            fakeWalletService.wallets.push(wallet);
            req.params = { userId: "3" };
            req.body = { amount: 15 };
            await walletController.deposit(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith({ userId: 3, balance: 25 });
        });
    });

    describe("withdraw", () => {
        it("should withdraw from wallet and return updated wallet", async () => {
            const wallet: WalletDto = { userId: 4, balance: 30 };
            fakeWalletService.wallets.push(wallet);
            req.params = { userId: "4" };
            req.body = { amount: 10 };
            await walletController.withdraw(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith({ userId: 4, balance: 20 });
        });
    });
});

