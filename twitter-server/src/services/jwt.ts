import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTUser } from "../interfaces"

const JWTSecret = "$uper@1234."

class JWTService {
    public static generateTokenForUser(user: User){
        const payload: JWTUser = {
            id: user.id,
            email: user.email
        }
        const token = JWT.sign(payload,JWTSecret);
        return token;
    }

    public static decodeToken(token: string){
        try{
            return JWT.verify(token,JWTSecret) as JWTUser;
        }catch(e){
            return null;
        }
    }

}

export default JWTService;