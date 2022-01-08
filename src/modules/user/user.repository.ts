import IUser from './user.interface';
import userModel from './user.model';

export default class UserRepository{
    constructor(){

    }

    public async getUsersCount(): Promise<number>{
        return userModel.countDocuments();
    }

    public async getPaginatedUser(page: number, limit: number): Promise<{
        count: Number,
        data: any
    }>{
        return {
            count: await this.getUsersCount(),
            data: await userModel.find().limit(limit).skip(page * limit)
        }
    }
    
    public async getUserByName(userName: String): Promise<IUser>{
        return userModel.findOne({ userName });
    }

    public async getUserByEmail(userEmail: String): Promise<IUser>{
        return userModel.findOne({ userEmail });
    }

    public async validate(user: IUser): Promise<void>{
        if(await this.getUserByName(user.userName))
            throw new Error('El Usuario ingresado ya existe.');
        if(await this.getUserByEmail(user.userEmail))
            throw new Error('El Email ingresado ya existe.');
    }
    
    public async addUser(user: IUser): Promise<IUser>{
        await this.validate(user);
        return userModel.create(user);
    }

    public async deleteUser(_id: String){
        return userModel.findByIdAndDelete(_id);
    }

    public async updateUser(_id: String, updates: any){
        return userModel.findByIdAndUpdate(_id, updates,{ new: true });
    }
}