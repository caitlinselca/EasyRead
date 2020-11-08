// import axios from 'axios';

// export default async function getBooks(){
//     try{
//         const response = await axios.post(
//             'http://localhost:3001/openlibrary/genres',
//             {
//                 //  trueGenres: ['horror'],
//                  trueGenres: ['horror', 'thriller'],
//                  amount: 10
//             }
//         );
//         return response.data.books.works;
//     }catch(err){
//         return err;
//     }
// }

import axios from 'axios';

export default async function getBooks(){
    try{
        const response = await axios.post(
            'http://localhost:3001/openlibrary/genres',
            {
                //  trueGenres: ['horror'],
                 trueGenres: ['horror', 'romance', 'thriller'],
                 amount: 10
            }
        );
        return response.data.books;
    }catch(err){
        return err;
    }
}