import React from 'react';


const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-4 sm:max-w-80 md:max-w-2/3 lg:max-w-1/2 xl:max-w-2/5">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">We apologize for the inconvenience. Please try again later.</p>
        <img src="/path/to/error-image.png" alt="Error Illustration" className="max-w-full h-auto mb-8" />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Go Back.
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
