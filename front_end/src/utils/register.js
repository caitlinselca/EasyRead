import axios from 'axios';

export default async function register(user){
    try{
        const response = await axios.post(
            'http://localhost:3001/user/register', 
            {
                email: user.email,
                username: user.username,
                password: user.password
            }
        );
        return response;
    }catch(err){
        if(err.response) return err.response;
    }
}