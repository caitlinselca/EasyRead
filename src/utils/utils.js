import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/************** Login **************/

async function login(user){
    try{
        const response = await axios.post( // whatever is returned from backend gets put into this const
            'http://34.229.161.180/user/login', 
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
            'http://34.229.161.180/user/islogin',
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

/************** Register **************/

async function register(user){
    try{
        const response = await axios.post(
            'http://34.229.161.180/user/register', 
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

/************** Genres **************/

async function saveGenres(data){
    try{
        const response = await axios.post(
            'http://34.229.161.180/user/savegenres',
            {
                trueGenres: data
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + cookies.get('accessToken')
                }
            }
        );
        return response;
    }catch(err){
        return err;
    }
}

/************** Themes **************/

async function saveThemes(data){
    try{
        const response = await axios.post(
            'http://34.229.161.180/user/savethemes',
            {
                ands: data.ands,
                ors: data.ors
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + cookies.get('accessToken')
                }
            }
        );
        return response;
    }catch(err){
        return err;
    }
}

/************** Homepage **************/
async function getBooks(){
    try{
        const response = await axios.post(
            'http://34.229.161.180/openlibrary/getBooks',
            {
                 amount: 1000
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + cookies.get('accessToken')
                }
            }
        );
        return response.data;
    }catch(err){
        return err;
    }
}

export {
    login,
    isLogin,
    register,
    saveGenres,
    saveThemes,
    getBooks
}