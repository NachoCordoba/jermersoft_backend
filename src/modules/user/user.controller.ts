import { Request, Response} from 'express';
import UserBussiness from './user.bussiness';
import IUser from './user.interface';

export default class UserController{
    private userBussiness: UserBussiness;

    constructor(userBussiness: UserBussiness = new UserBussiness()){
        this.userBussiness = userBussiness;
    }

    public getPaginatedUser = async (req: Request, res: Response)=>{
        const { page = 1, limit = 10 } = req.query;
        try{
            return res.status(200).json(await this.userBussiness.getPaginatedUser(Number(page), Number(limit)));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }

    public getUserByName = async (req: Request, res: Response)=>{
        const { userName } = req.params;

        try{
            return res.status(200).json(await this.userBussiness.getUserByName(userName));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }

    public addUser = async (req: Request, res: Response)=>{
        const reqUser : IUser = req.body;
        try{
            const newUser = await this.userBussiness.addUser(reqUser);
            return res.status(200).json(newUser);
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }

    public deleteUser = async (req: Request, res: Response)=>{
        const { id } = req.params;
        try{
            return res.status(200).json(await this.userBussiness.deleteUser(id));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }

    public  updateUser = async (req: Request, res: Response)=>{
        const { id } = req.params;
        const updates = req.body;
        try{
            return res.status(200).json(await this.userBussiness.updateUser(id, updates));
        }
        catch(err: any){
            return res.status(400).json({ err: true, errMsg: err.message });
        }
    }
}