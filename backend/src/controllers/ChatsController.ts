import { Request, Response } from "express";
import prisma from "../config/db.config";

class ChatsController {
  static async index(req: Request, res: Response) {
    const { groupId } = req.params;
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId,
      },
    });
    res.json({ data: chats });
  }
}

export default ChatsController;