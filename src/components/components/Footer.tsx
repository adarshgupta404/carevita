import React from 'react'
import { assets } from '@/assets/assets_frontend/assets'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm '>
        <div>
          <img className='mb-5 w-40' src={assets.logo.src} alt="error" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem quo sequi error atque libero numquam. Qui animi obcaecati quod, amet commodi incidunt sunt! Autem commodi dolores tempora libero culpa.</p>
        </div>

        <div>
          <p className='text-sl font-medium mb-5 '>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact us</Link>
            <Link href={"/privact-policy"}>Privacy Policy</Link>
          </ul>
        </div>

        <div>
          <p className='text-sl font-medium mb-5 '>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-2359</li>
            <li>carevita@trust.gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>Copyright 2024@ CareVita - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
