import axios from 'axios';

export default async function getBooks(){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres',
            {
                 trueGenres: ['history'],
                 amount: 10
            }
        );
        return response.data.books.works;
    }catch(err){
        return err;
    }
}