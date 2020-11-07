import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function login(user){
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

async function isLogin(){
    if(cookies.get('accessToken') == null) return false;
    try{
        const response = await axios.get(
            'http://localhost:3001/user/islogin',
            {
                headers: {
                    'Authorization': 'Bearer ' + cookies.get('accessToken')
                }
            }
        );
        return response;
    }catch(err){
        return err.response;
    }
}

export {
    login,
    isLogin
}