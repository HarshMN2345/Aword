import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db.config';
import jwt from 'jsonwebtoken';

interface LoginPayload {
    name: string;
    email: string;
    provider: string;
    oauth_id: string;
    image: string;
}

class AuthController {
    public static async login(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const body: LoginPayload = request.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            });

            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body
                });
            }

            const JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id
            };

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string);
            response.json({
                message: "User logged in successfully",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`
                }
            });
        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
}

export default AuthController;