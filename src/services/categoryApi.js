import axios from 'axios';
import { getSubcategoriesSuccess } from '../redux/reducers';

export async function getSubcategories(dispatch) {
    await axios.get('http://localhost:4000/api/subcategories/')
  .then((response) => {
    console.log('categories response.data', response.data.subcategories)
    dispatch(getSubcategoriesSuccess(response.data.subcategories));
  })
  .catch((error) => {
    console.error(error);
  });
}