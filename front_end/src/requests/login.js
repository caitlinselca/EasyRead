import axios from 'axios';

export default async function login(user){
    try{
        const response = await axios.post( // whatever is returned from backend gets put into this const
            'http://localhost:3001/user/login', 
            {
                username: user.username,
                password: user.password
            }
        );
        return response;
    }catch(err){
        if(err.response) return err.response;
    }
}