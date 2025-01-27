import React from 'react';
import LoginForm from '../components/loginform';

interface LoginProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>
        <LoginForm setAuth={setAuth} />
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
