import { NextFunction, Request, Response } from "express";
import prisma from "../config/db.config";

class ChatGroupController {

    static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;
            const user = request.user;
            if (!user) {
                response.status(400).json({ message: "User not found" });
                return;
            }
            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                }
            });
            response.json({
                message: "Chat groups fetched successfully", groups
            })
        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
    static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const group = await prisma.chatGroup.findUnique({
                where: {
                    id: id
                }
            });
            response.json({
                message: "Chat group fetched successfully", group
            })
        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
    static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;
            const user = request.user;
            if (!user) {
                response.status(400).json({ message: "User not found" });
                return;
            }
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id
                }
            });
            response.json({
                message: "Chat group created successfully"
            })


        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
    static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;
            const { id } = request.params;
            await prisma.chatGroup.update({
                where: {
                    id: id
                },
                data: {
                    title: body.title,
                    passcode: body.passcode
                }
            });
            response.json({
                message: "Chat group Updated successfully"
            })


        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
    static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;
            await prisma.chatGroup.delete({
                where: {
                    id: id
                }
            });
            response.json({
                message: "Chat group deleted successfully"
            })


        } catch (error) {
            response.status(500).json({
                message: "Internal Server Error",
                error: (error as Error).message
            });
        }
    }
}

export default ChatGroupController;