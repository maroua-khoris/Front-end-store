import axios from 'axios';
import   {
  registerRequest,
  registerSuccess,
  registerFailure,loginSuccess,
  resetPasswordSuccess,
  resetPasswordFailure,}  from '../redux/reducers.js';

export async function loginCustomer(dispatch, credentials) {
    try {
      console.log(credentials);
      const response = await axios.post('http://localhost:5000/api/customers/login', credentials);
      console.log('Login API response:', response.data);

      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.refreshToken);
      return response.data;
    } catch (error) {
      console.error('Error in loginCustomer function:', error);
      throw error; 
    }
  }

export async function resetPasswordApi(dispatch, credentials) {
  try {
    const response = await axios.post('http://localhost:5000/api/customers/forgotPassword', credentials);
    console.log('email sent successfully');
    
    const resetToken = response.data.resetToken;
    dispatch(resetPasswordSuccess(resetToken));

  } catch (error) {
    console.error(error);
    dispatch(resetPasswordFailure('An error occurred during password reset.'));
  }
}

export async function newpassword(dispatch, credentials, resetToken) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/customers/resetPassword/${resetToken}`, 
      credentials
    );
    console.log('response.data', response.data);
    const updatedResetToken = response.data.resetToken;
    dispatch(resetPasswordSuccess(response.data, updatedResetToken));

   return response.data;
  } catch (error) {
    console.error(error);
    
    if (error.response && error.response.status === 400) {
      return error.response.data; 
    }

    dispatch(resetPasswordFailure('An error occurred during password reset.'));
  }
}

export const registerCustomerApi = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/customers', userData);
    return response.data; // This may contain success, message, and verificationToken
  } catch (error) {
    console.error('Error in registerCustomerApi:', error);
    throw error;
  }
};

// API function to verify customer email
export const verifyCustomerEmailApi = async (verificationToken) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/customers/validate/${verificationToken}`);
    return response.data; // This may contain success and message
  } catch (error) {
    console.error('Error in verifyCustomerEmailApi:', error);
    throw error;
  }
};