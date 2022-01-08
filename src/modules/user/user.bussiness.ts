import IUser from "./user.interface";
import UserRepository from "./user.repository";

export default class UserBussiness{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository()){
        this.userRepository = userRepository;
    }

    public async getPaginatedUser(page: number, limit: number): Promise<any>{
        return this.userRepository.getPaginatedUser(page, limit);
    }

    public async getUserByName(userName: String): Promise<IUser>{
        return this.userRepository.getUserByName(userName);
    }
    
    public async addUser(user: IUser): Promise<IUser>{
        return this.userRepository.addUser(user);
    }

    public async deleteUser(_id: String){
        return this.userRepository.deleteUser(_id);
    }

    public async updateUser(_id: String, updates: any){
        return this.userRepository.updateUser(_id, updates);
    }
}