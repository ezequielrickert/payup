import { UserController } from "../../controller/UserController";
import { FakeUserService } from "../adapters/FakeUserService";
import { Request, Response } from "express";
import { UserDto } from "../../dto/UserDto";

describe("UserController", () => {
    let userController: UserController;
    let fakeUserService: FakeUserService;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        fakeUserService = new FakeUserService();
        userController = new UserController(fakeUserService);

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe("createUser", () => {
        it("should create a user and return 201", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User", password: "securepassword", cvu: 1234567890 };
            req.body = user;

            await userController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "User created" });
            expect(fakeUserService.usersList).toContainEqual(user);
        });

        it("should return 400 if user already exists", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User", password: "securepassword", cvu: 1234567890 };
            fakeUserService.usersList.push(user);
            req.body = user;

            await userController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "User already exists" });
        });
    });

    describe("getUserByEmail", () => {
        it("should return 400 if email is not provided", async () => {
            req.query = {};

            await userController.getUserByEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Email must be provided" });
        });

        it("should return 404 if user is not found", async () => {
            req.query = { email: "notfound@example.com" };

            await userController.getUserByEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return user if found", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User", password: "securepassword", cvu: 1234567890 };
            fakeUserService.usersList.push(user);
            req.query = { email: "test@example.com" };

            await userController.getUserByEmail(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(user);
        });
    });

    describe("authenticateUser", () => {
        it("should return 400 if email or password is missing", async () => {
            req.body = { email: "test@example.com" };
            await userController.authenticateUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Email and password must be provided" });

            req.body = { password: "securepassword" };
            await userController.authenticateUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Email and password must be provided" });
        });

        it("should return 401 if credentials are invalid", async () => {
            req.body = { email: "notfound@example.com", password: "wrongpassword" };
            await userController.authenticateUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
        });

        it("should return user if credentials are valid", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User", password: "securepassword", cvu: 1234567890 };
            fakeUserService.usersList.push(user);
            req.body = { email: "test@example.com", password: "securepassword" };
            await userController.authenticateUser(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith(user);
        });
    });

    describe('getUserTransactions', () => {
        it('should return an empty array if no transactions exist', async () => {
            req.query = { email: 'test@example.com' };
            fakeUserService.usersList.push({ email: 'test@example.com', name: 'Test User', password: 'securepassword', cvu: 1234567890 });
            jest.spyOn(fakeUserService, 'getUserTransactions').mockResolvedValueOnce([]);
            await userController.getUserTransactions(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith([]);
        });
        it('should return transactions if they exist', async () => {
            req.query = { email: 'test@example.com' };
            fakeUserService.usersList.push({ email: 'test@example.com', name: 'Test User', password: 'securepassword', cvu: 1234567890 });
            const txs = [
                { amount: 100, senderCvu: 1234567890, receiverCvu: 2222222222, description: 'Test1' },
                { amount: 200, senderCvu: 3333333333, receiverCvu: 1234567890, description: 'Test2' }
            ];
            jest.spyOn(fakeUserService, 'getUserTransactions').mockResolvedValueOnce(txs as any);
            await userController.getUserTransactions(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith(txs);
        });
        it('should return 400 if email is not provided', async () => {
            req.query = {};
            await userController.getUserTransactions(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Email must be provided' });
        });
    });
});
