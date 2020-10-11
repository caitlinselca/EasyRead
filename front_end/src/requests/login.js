import axios from 'axios';

export default async function login(user){
    try{
        const response = await axios.post(
            'http://localhost:3001/user/login', 
            {
                username: user.username,
                password: user.password
            }
        );
        return response.data;
    }catch(err){
        return err;
    }
}