import { Request, Response } from 'express'; // There is a direct coupling with express but this is not a problem
import { UserDto } from "../dto/UserDto";
import { IUserService } from "../application/port/IUserService";

export class UserController {

    constructor(private userService: IUserService) {
        this.userService = userService;
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userDto = req.body as UserDto;
            console.log(userDto);
            await this.userService.save(userDto);
            res.status(201).json({ message: 'User created' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = req.query.email as string;
            if (!email) {
                res.status(400).json({ message: 'Email must be provided' });
                return;
            }
            const user = await this.userService.findByEmail(email);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}