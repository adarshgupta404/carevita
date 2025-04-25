'use client';

import React from 'react';
import Link from 'next/link';
import { specialityData } from '@/assets/assets_frontend/assets';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            href={`/doctors?speciality=${item.speciality}`}
            className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500'
          >
            <img className='w-12 sm:w-24 mb-2' src={item.image.src} alt={item.speciality} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
