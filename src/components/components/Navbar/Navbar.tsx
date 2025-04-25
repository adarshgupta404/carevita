"use client";

import { assets } from '@/assets/assets_frontend/assets';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
   const router = useRouter();
   
   const [showmenu, setShowmenu] = useState(false);
   const {token, setToken,userData} = useContext(AppContext)

   const logout = ()=> {
      toast.success("Logout successfully.")
      router.push('/')
      setToken(null);
      if (typeof window !== 'undefined') {
         localStorage.removeItem('token')
      }
   }
   // console.log("token: ",token)

   return (
      <div className='flex items-center justify-between text-sm py-4 mb-5 border-gray-400 border-b'>
         <img onClick={()=>router.push('/')} className='w-44 cursor-pointer' src={assets.logo.src} alt="CareVita Logo" />
         <ul className='hidden md:flex items-start gap-5 font-medium'>
            <Link href='/'>
               <li className='py-1'>HOME</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </Link>
            <Link href='/doctors'>
               <li className='py-1'>ALL DOCTORS</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </Link>
            <Link href='/about'>
               <li className='py-1'>ABOUT</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </Link>
            <Link href='/contact'>
               <li className='py-1'>CONTACT</li>
               <hr className='border-none outline-none h-0.5 bg-primary m-auto' hidden />
            </Link>
         </ul>
         <div className='flex items-center gap-4'>
            {token && userData ? <div className='flex items-center gap-2 cursor-pointer group relative'>
               <img className='w-10 h-10 rounded-full border-2 border-primary shadow-lg' src={userData.image} alt="Profile" />
               <img className='w-2.5' src={assets.dropdown_icon.src} alt="Dropdown" />
               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block' > 
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                     <p onClick={()=>router.push('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                     <p onClick={() => router.push('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                     <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
               </div>

            </div> : <button className='bg-primary text-white px-8 py-3 rounded-full hidden md:block' onClick={() => router.push('/signup')}>
               Create account</button>}

               <img onClick={()=>setShowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon.src} alt="Menu" />

               {/*---------mobile menu-------------*/ }
               <div className={`${showmenu? 'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
               <div className='flex items-center justify-between px-5 py-6 '>
               <img className='w-36' src={assets.logo.src} alt="CareVita Logo" />
               <img className='w-7 cursor-pointer' onClick={()=>setShowmenu(false)} src={assets.cross_icon.src} alt="Close" />
               </div>
               <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                  <Link href='/' onClick={() => setShowmenu(false)}><p className='px-4 py-2 inline-block rounded'>HOME</p></Link>
                  <Link href='/doctors' onClick={() => setShowmenu(false)}><p className='px-4 py-2 inline-block rounded' >ALL DOCTORS</p></Link>
                  <Link href='/about' onClick={() => setShowmenu(false)}><p className='px-4 py-2 inline-block rounded' >ABOUT</p></Link>
                  <Link href='/contact' onClick={() => setShowmenu(false)}><p className='px-4 py-2 inline-block rounded' >CONTACT</p></Link>
                  <Link href='/signup' onClick={() => setShowmenu(false)}><p className='px-4 py-2 inline-block rounded' >Create Account</p></Link>
                  
               
               </ul>
               </div>

         </div>
      </div>
   )
}

export default Navbar
