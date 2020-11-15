import axios from 'axios';

export default async function getBooks(genres){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres',
            {
                 trueGenres: genres,
                 amount: 10
            }
        );
        return response.data.books;
    }catch(err){
        return err;
    }
}