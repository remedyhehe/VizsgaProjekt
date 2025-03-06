import React from 'react';
import Navbar from '../Layouts/Navbar';

const PremiumPage = () => {
  return (
    <>
      <Navbar />
      <div className=''>
        <section className="text-gray-700 body-font overflow-hidden border-t border-gray-200">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="lg:w-1/4 mt-48 hidden lg:block">
              <div className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
                <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start -mt-px">Number of active projects</p>
                <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">TODO List</p>
                <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">Promotional coin</p>
                <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">Chat</p>
              </div>
            </div>
            <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
              {/* Free */}
              <div className="lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
                <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                  <h3 className="tracking-widest">BEGINNER</h3>
                  <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">Free</h2>
                  <span className="text-sm text-gray-600">For unlimited time</span>
                </div>
                <p className="bg-gray-100 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 text-lg font-semibold">5</p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl font-semibold"><i className="fa-solid fa-circle-check"></i></p>
                <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center font-semibold"><i className="fa-solid fa-x"></i></p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl font-semibold"><i className="fa-solid fa-circle-check"></i></p>
                <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">
                  <button className="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-orange-600 rounded">Owned
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>
              </div>
              {/* Pro */}
              <div className="lg:w-1/3 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg border-orange-500 relative">
                <span className="bg-orange-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                  <h3 className="tracking-widest">PRO</h3>
                  <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">$38
                    <span className="text-gray-600 text-base ml-1">/mo</span>
                  </h2>
                  <span className="text-sm text-gray-600">Charging $456 per year</span>
                </div>
                <p className="bg-gray-100 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 text-lg font-semibold">Unlimited</p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl"><i className="fa-solid fa-circle-check"></i></p>
                <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center "><i className="fa-solid fa-x"></i></p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl"><i className="fa-solid fa-circle-check"></i></p>
                <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">
                <button className="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-orange-600 rounded">Choose Plan
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>
              </div>
              {/* BUSINESS */}
              <div className="lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
              <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                  <h3 className="tracking-widest">BUSINESS</h3>
                  <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">$56
                    <span className="text-gray-600 text-base ml-1">/mo</span>
                  </h2>
                  <span className="text-sm text-gray-600">Charging $672 per year</span>
                </div>
                <p className="bg-gray-100 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 text-lg font-semibold">Unlimited</p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl font-semibold">1</p>
                <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center "><i className="fa-solid fa-x"></i></p>
                <p className="text-gray-600 text-center h-12 flex items-center justify-center text-2xl"><i className="fa-solid fa-circle-check"></i></p>
                <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">
                <button className="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-orange-600 rounded">Choose Plan
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PremiumPage;