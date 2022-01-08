import axios from "axios";
import jwt from 'jsonwebtoken';

import AuthentificationRepository from "./authentification.repository";

export default class AuthentificationBussiness{
    private authentificationRepository: AuthentificationRepository;

    constructor(authentificationRepository: AuthentificationRepository = new AuthentificationRepository()){
        this.authentificationRepository = authentificationRepository;
    }

    public async registerUser(userName: String, userPassword: String, userEmail: String){
        const userModule = process.env.USER_SERVICE_URI as string;
        const authorization = this.generateModuleToken();
        const { data } = await axios.post(userModule, { userName, userPassword, userEmail },{ headers: {'authorization' : authorization }});

        if(!data)
            throw new Error('Ocurrio un error con el modulo de usuarios');
        
        if(data.err)
            throw new Error(data.errMsg);
        

        this.authentificationRepository.makeAuth({ authentificationUser: data._id , authentificationDate: new Date() });
        return {
            user: data,
            jwt: this.generateJWT(data)
        }
    }

    public async loginUser(userName: String, userPassword: String){
        const user = await this.validateLogin(userName.toLowerCase(), userPassword.toLowerCase());

        return {
            user,
            jwt: this.generateJWT(user)
        }
    }

    private async validateLogin(userName: String, userPassword: String){
        const userModule = process.env.USER_SERVICE_URI as string;
        const authorization = this.generateModuleToken();
        const { data } = await axios.get(`${userModule}/${userName}`,{ headers: {'authorization' : authorization}});

        if(!data)
            throw new Error('Usuario o Clave incorrectos.');

        if(data.userPassword !== userPassword)
            throw new Error('Usuario o Clave incorrectos.');

        this.authentificationRepository.makeAuth({ authentificationUser: data._id , authentificationDate: new Date() });        
        return data;       
    }

    private generateModuleToken(){
        const secret_token = process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'secret';
        const expiresIn = process.env.EXPIRES_TOKEN ? process.env.EXPIRES_TOKEN : '1800s';
        return jwt.sign({}, secret_token, { expiresIn });
    }

    private generateJWT(user: any){
        const secret_token = process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'secret';
        const expiresIn = process.env.EXPIRES_TOKEN ? process.env.EXPIRES_TOKEN : '1800s';
        return jwt.sign(user, secret_token, { expiresIn: expiresIn });
    }
}