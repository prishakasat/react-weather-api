import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const user = useSelector((state) => state.auth.value);
  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-500 h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Weather App</h1>
        {!user ? (<p className="text-lg mb-8">Please login to see weather</p>) : (<Link
          to="/protected"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Weather
        </Link>)}

      </div>
    </div>
  );
};

export default Home;
