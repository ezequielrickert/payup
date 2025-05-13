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

    describe("getUserById", () => {
        it("should return 404 if user is not found", async () => {
            req.params = { id: "1" };

            await userController.getUserById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return user if found", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User" };
            fakeUserService.usersList.push(user);
            req.params = { id: "1" };

            await userController.getUserById(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(user);
        });
    });

    describe("createUser", () => {
        it("should create a user and return 201", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User" };
            req.body = user;

            await userController.createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "User created" });
            expect(fakeUserService.usersList).toContainEqual(user);
        });

        it("should return 400 if user already exists", async () => {
            const user: UserDto = { email: "test@example.com", name: "Test User" };
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
            const user: UserDto = { email: "test@example.com", name: "Test User" };
            fakeUserService.usersList.push(user);
            req.query = { email: "test@example.com" };

            await userController.getUserByEmail(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(user);
        });
    });
});