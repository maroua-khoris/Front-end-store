import axios from 'axios';
import { getProductSuccess } from '../redux/reducers';

export async function getProducts(dispatch) {
    await axios.get('http://localhost:4000/api/products/list')
  .then((response) => {
    dispatch(getProductSuccess(response.data));
  })
  .catch((error) => {
    console.error(error);
  });
}