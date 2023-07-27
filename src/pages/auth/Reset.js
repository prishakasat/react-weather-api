import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
const Reset = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("success");
        toast.success("Password reset successfull", {
          position: 'top-right'
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error has occured: ", errorCode, errorMessage);
        toast.error(errorMessage, {
          position: 'top-right'
        });
      });
  };
  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-500 min-h-screen dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">
          Reset Password
        </h1>
        <div className="flex flex-col space-y-4">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleReset}
          className="mt-6 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Reset;
