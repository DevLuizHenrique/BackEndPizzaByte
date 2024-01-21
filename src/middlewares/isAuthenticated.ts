import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //recebe o token
    const authToken = req.headers.authorization;

    if(!authToken){
        res.status(401).end();
    }

    try {
        const { sub } = verify(
            authToken,
            process.env.JWT_SECRET
        ) as Payload;
        
        //recupera o id token e armazena no user_id
        req.user_id = sub;

        return next();
        
    } catch (err) {
        res.status(401).end();
    }
    
    //console.log(authToken);
}