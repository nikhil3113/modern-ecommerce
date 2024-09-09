import { Request,Response, NextFunction } from "express";
import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from "jsonwebtoken";
import dotenv from "dotenv";
// import adminAuth from "./adminAuth";

dotenv.config();

const auth = {
       userAuth(req:Request, res:Response, next:NextFunction){
        try {
            const token = req.headers.authorization;
        if(!token){
            return res.status(403).json({ message: "Authorization header missing" });
        }
        const words = token.split(" ")
        const jwtToken = words[1];
    
        if(!jwtToken){
            return res.status(403).json({ message: "Token missing" });
        }
         try {
        const decodedValue = jwt.verify(jwtToken, process.env.SECRET as string) as JwtPayload;

        if (decodedValue && (decodedValue as JwtPayload).username) {
          req.user = decodedValue;
          // console.log(req.user)
          next();
        } else {
          res.status(401).send("Unauthorized User");
        }
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          res.status(403).json({ message: "Token expired" });
        } else if (err instanceof JsonWebTokenError) {
          res.status(403).json({ message: "Malformed token" });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
        
    },

    adminAuth(req:Request, res:Response, next:NextFunction){
        try {
            const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const words = token.split(" ")
        const jwtToken = words[1];
    
        if(!jwtToken){
            return res.status(401).json({ message: "Token missing" });
        }
        const decodedValue = jwt.verify(jwtToken, process.env.SECRET as string) as JwtPayload;
    
        if(decodedValue &&  (decodedValue as JwtPayload).username && (decodedValue as JwtPayload).role === "ADMIN"){
            req.user = decodedValue;
            // console.log(req.user)
            next();
        }else{
            res.status(401).send("Unauthorized User")
        }
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
        
    }
}
export default auth;

