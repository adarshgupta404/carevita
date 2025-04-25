'use client'

import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Loader } from 'lucide-react'
import { AppContext } from '@/context/AppContext'

const SignUp = () => {
  const { loading, setLoading, backendUrl } = useContext(AppContext)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      if (!name) return toast.error("Please enter the name.")
      if (!email) return toast.error("Please enter the email.")
      if (!password) return toast.error("Please enter the password.")

      const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

      if (data.success) {
        toast.success(data.message)
        router.push('/login')
      } else {
        toast.error(data.message)
      }

    } catch (error: any) {
      console.error("Error in form submission:", error)
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again."
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loader className="animate-spin text-primary w-16 h-16" />
        </div>
      )}
      <div className={`flex w-full ${loading ? 'opacity-45' : ''}`}>
        <div className='hidden lg:flex h-[80vh] w-1/2 items-center justify-center relative'>
          <DotLottieReact
            src="https://lottie.host/298372bb-21da-4d35-afb2-e88e94606887/iMeptCpU8z.lottie"
            loop
            autoplay
          />
        </div>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
          <div className='w-11/12 max-w-[600px] px-10 py-3 max-sm:px-4 rounded-3xl bg-white border-2 border-gray-100 max-sm:text-center'>
            <h1 className='text-5xl max-sm:text-3xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>

            <form className='mt-4 max-sm:text-left' onSubmit={onSubmitHandler}>
              <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor='name'>Name</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                  placeholder="Enter your name"
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor='email'>Email</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                  placeholder="Enter your email"
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col mt-4'>
                <label className='text-lg font-medium' htmlFor='password'>Password</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                  placeholder="Enter your password"
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className='mt-4 flex flex-col gap-y-4'>
                <button
                  type="submit"
                  className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg'
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className='mt-4 flex justify-center items-center max-sm:flex-col'>
              <p className='font-medium text-base'>Already have an account?</p>
              <button
                className='ml-2 font-medium text-base text-violet-500'
                onClick={() => router.push('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
