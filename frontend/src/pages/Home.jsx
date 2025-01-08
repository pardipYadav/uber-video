import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1530652101053-8c0db4fbb5de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhZmZpYyUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png"
        />
        <div className="bg-white py-5 px-10">
          <h2 className="text-2xl font-bold">Get Started with uber</h2>
          <Link
            to="/login"
            className="flex itmes-center justify-center w-full bg-black text-white py-3 rounded mt-2"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
