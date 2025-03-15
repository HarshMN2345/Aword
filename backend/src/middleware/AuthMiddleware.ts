import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware=(request:Request,response:Response,next:NextFunction):Promise<void>=>{  
    return new Promise((resolve) => {
        const requestAuthHeader = request.headers.authorization;
        if(requestAuthHeader===undefined||requestAuthHeader===null){
            response.status(401).json({
                message:"Unauthorized"
            });
            return resolve();
        }
        const token=requestAuthHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET as string,(error,user)=>{
            if(error){
                response.status(401).json({
                    message:"Unauthorized"
                });
                return resolve();
            }
            request.user=user as AuthUser;
            next();
            resolve();
        });
    });
}
export default authMiddleware;