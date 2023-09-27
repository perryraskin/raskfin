import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

const BankConnection = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/teller/connect', data);

      if (response.status === 200) {
        router.push('/success');
      } else {
        setErrorMessage('Failed to connect bank account. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Connect your bank account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="bankDetails" ref={register({ required: true })} />
        {errors.bankDetails && <p>This field is required</p>}
        <input type="submit" />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default BankConnection;
