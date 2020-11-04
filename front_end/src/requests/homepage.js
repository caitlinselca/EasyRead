import axios from 'axios';

export default async function getBooks(){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres',
            {
                 trueGenres: ['history']
            }
        );
        return response.data;
    }catch(err){
        return err;
    }
}