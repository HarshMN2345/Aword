import { Request, Response } from 'express';
interface LoginPayload{
    name:string;
    email:string;
    providor:string;
    oauth_id:string;
    image?:string;
}
class AuthController{
    static async login(request:Request, response:Response){
      try{
        const body:LoginPayload = request.body;
      }catch(error){

      }

    }
}
export default AuthController;