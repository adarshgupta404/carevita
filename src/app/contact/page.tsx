import React from 'react'
import { assets } from '@/assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='flex flex-col my-10 justify-center md:flex-row gap-10  mb-28 text-sm  '>
      <img className='w-full md:max-w-[360px] ' src={assets.contact_image.src} alt="error" />

      <div className='flex flex-col justify-center items-start gap-6 '>
      <p className='font-semibold text-lg text-gray-600 '>OUR OFFICE</p>
      <p className='text-gray-500'>54768 Wiliams station <br /> Suite 350, Washington, USA</p>
              <p className='text-gray-500'>Tel: (415) 555-0123 <br /> Email: carevita.heath@gmail.com</p>
      <p className='font-semibold text-lg text-gray-600'>CAREER AT CAREVITA</p>
      <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, neque.</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>

    </div>
  )
}

export default Contact
