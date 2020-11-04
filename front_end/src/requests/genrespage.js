import axios from 'axios';

export default async function getBooks(data){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres',
            {
                 trueGenres: data,
                 amount: 100
            }
        );
        return response.data;
    }catch(err){
        return err;
    }
}