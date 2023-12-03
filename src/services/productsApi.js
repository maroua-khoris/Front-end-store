import axios from 'axios';
import { getProducts } from '../redux/reducers';

export async function getProducts(dispatch) {
    await axios.get('http://localhost:4000/api/products/list')
  .then((response) => {
    dispatch(getProducts(response.data));
  })
  .catch((error) => {
    console.error(error);
  });
}