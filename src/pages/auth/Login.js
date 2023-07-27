import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
        toast.success("Login Successfull", {
          position: 'top-right'
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
        toast.error(errorMessage, {
          position: 'top-right'
        });
      });
  };
  return (
    <div className="bg-gray-700 min-h-screen">
      <Toaster />
      <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-300 bg-gray-900  rounded-lg shadow-md p-8 max-w-md w-full">
          <h1 className="text-white text-3xl font-bold mb-6">Login</h1>
          <div className=" text-white flex flex-col space-y-2">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-white flex flex-col space-y-2">
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
