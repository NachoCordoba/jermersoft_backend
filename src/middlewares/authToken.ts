import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticateToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers['authorization'];

    if(!token)
        return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN as string,(err: any, user: any)=>{
        if(err) return res.sendStatus(401);

        next();
    });
}