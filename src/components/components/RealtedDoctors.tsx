"use client";

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Doctor {
   _id: string;
   name: string;
   speciality: string;
   image: string;
   availability: boolean;
}

interface RelatedDoctorsProps {
   speciality: string;
   docId: string;
}

const RelatedDoctors: React.FC<RelatedDoctorsProps> = ({ speciality, docId }) => {
   const { doctors } = useContext(AppContext);
   const [relDoc, setRelDoc] = useState<Doctor[]>([]);
   const router = useRouter();

   useEffect(() => {
      if (doctors.length > 0 && speciality) {
         const doctorData = (doctors as Doctor[]).filter((doc) =>
            doc.speciality === speciality && doc._id !== docId
         );
         setRelDoc(doctorData);
      }
   }, [doctors, speciality, docId]);

   return (
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
         <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
         <p className='text-sm text-center'>Simply browse through our extensive list of trusted doctors.</p>
         <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc.slice(0, 5).map((item, index) => (
               <div
                  className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                  key={index}
                  onClick={() => {
                     router.push(`/appointment/${item._id}`);
                     window.scrollTo(0, 0);
                  }}
               >
                  <div className='relative w-full h-48 bg-blue-50'>
                     <Image
                        src={item.image}
                        alt={`${item.name}'s profile`}
                        fill
                        className='object-cover'
                     />
                  </div>
                  <div className='p-4'>
                     <div className={`flex items-center gap-2 text-sm text-center ${item.availability ? 'text-green-500' : 'text-gray-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${item.availability ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <p>{item.availability ? 'Available' : 'Not Available'}</p>
                     </div>
                     <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                     <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
               </div>
            ))}
         </div>
         <button
            className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
            onClick={() => {
               router.push('/doctors');
               window.scrollTo(0, 0);
            }}
         >
            more
         </button>
      </div>
   );
};

export default RelatedDoctors;