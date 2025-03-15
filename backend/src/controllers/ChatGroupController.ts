import { NextFunction,Request,Response } from "express";

class ChatGroupController{

    static async store(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const body = request.body;
            response.json({
                message:"Chat Group created successfully",
                data:body
            });

        }catch(error){
            response.status(500).json({
                message:"Internal Server Error",
                error:(error as Error).message
            });
        }
    }
}

export default ChatGroupController;