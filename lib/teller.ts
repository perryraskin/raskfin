import axios from 'axios';
import createHttpError from 'http-errors';

const TELLER_API_BASE_URL = 'https://api.teller.io';

export async function connectBankAccount(bankDetails: any) {
  try {
    const response = await axios.post(`${TELLER_API_BASE_URL}/connect`, bankDetails);
    return response.data;
  } catch (error) {
    throw createHttpError(error.response.status, error.response.data.message);
  }
}
