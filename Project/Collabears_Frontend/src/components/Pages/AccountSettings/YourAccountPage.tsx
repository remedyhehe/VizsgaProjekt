import React from 'react'
import Navbar from '../../Layouts/Navbar'

const YourAccountPage = () => {
  return (
    <>
      <Navbar />
      <div className='sm:flex'>
        {/* Oldalsó nem látható sáv */}
        <div className='bg-blue-600 hidden sm:block sm:w-1/6'>
          a
        </div>
        <div className='bg-red-600 w-screen sm:w-2/6 md:w-1/6'>
          <h2 className='text-2xl font-semibold'>username</h2>
          <h2 className='text-lg'>Free subscription</h2>
        </div>
        <div className='bg-orange-600 w-screen sm:w-3/4 md:w-2/3'>
          a
        </div>
        <div className='bg-blue-600 hidden sm:block sm:w-1/6'>
          a
        </div>
      </div>
    </>
  )
}

export default YourAccountPage