import React from 'react'
import Form from './Form'
import Cards from './Cards';

function Profile() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#e8e8ed]">
        <div className="max-w-4xl mx-auto p-4">
          <div className='text-center lucky text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6'>
            <h1 className="bg-clip-text text-transparent bg-[url('https://i.pinimg.com/564x/e7/dc/aa/e7dcaa5680915af54485af4386f38207.jpg')]">
              memoirverse !
            </h1>
          </div>
          <div>
            <Form />
          </div>

          <div>
            <Cards />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile