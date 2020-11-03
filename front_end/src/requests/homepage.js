import axios from 'axios';

export default async function homepage(){
    try{
        const response = await axios.get( // whatever is returned from backend gets put into this const
            'http://localhost:3001/openlibrary/'
        );
        return response.data;
    }catch(err){
        return err;
    }
}