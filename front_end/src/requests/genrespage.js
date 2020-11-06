import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function getBooks(data){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres', 
            {
                trueGenres: data
            }
        );
        return response.data;
    }catch(err){
        return err;
    }
}

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

export {
    getBooks,
    saveGenres
}