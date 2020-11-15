import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function saveGenres(data){
    try{
        const response = await axios.post(
            'http://localhost:3001/user/savegenres',
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

async function getGenres(){
    try{
        const response = await axios.get(
            'http://localhost:3001/user/getgenres',
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

async function saveThemes(data){
    try{
        const response = await axios.post(
            'http://localhost:3001/user/savethemes',
            {
                themes: data
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

export {
    saveGenres,
    getGenres,
    saveThemes
}