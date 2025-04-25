'use client'

import React, { useContext, useState } from 'react'
import { AppContext } from '@/context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Loader } from 'lucide-react'
const Login = () => {
  const { token, setToken, backendUrl, loading, setLoading } = useContext(AppContext)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      setLoading(true)
      if (!email) return toast.error('Please enter the email.')
      if (!password) return toast.error('Please enter the password.')

      const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        localStorage.setItem('token', data.token)
        setToken(data.token)
        router.push('/')
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      console.error('Error in form submission:', error)
      const errorMessage =
        error.response?.data?.message || 'Something went wrong. Please try again.'
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
        <div className="hidden lg:flex h-[80vh] w-1/2 items-center justify-center relative">
          <DotLottieReact
            src="https://lottie.host/298372bb-21da-4d35-afb2-e88e94606887/iMeptCpU8z.lottie"
            loop
            autoplay
          />
        </div>
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="w-11/12 max-w-[600px] px-10 py-3 max-sm:px-4 rounded-3xl bg-white border-2 border-gray-100 max-sm:text-center">
            <h1 className="text-5xl max-sm:text-3xl font-semibold">Welcome Back</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details.</p>
            <div className="mt-4 max-sm:text-left">
              <div className="flex flex-col">
                <label className="text-lg font-medium" htmlFor="email">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium" htmlFor="password">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 flex justify-between items-center max-sm:flex-col">
                <div>
                  <input type="checkbox" id="remember" />
                  <label className="ml-2 font-medium text-base" htmlFor="remember">Remember for 30 days</label>
                </div>
                <button className="font-medium text-base text-violet-500">Forgot password</button>
              </div>

              <div className="mt-4 flex flex-col gap-y-4">
                <button
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg"
                  onClick={onSubmitHandler}
                >
                  Login
                </button>
                <button
                  className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-2 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100"
                >
                  {/* Google Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
                  </svg>
                  Sign in with Google
                </button>
              </div>

              <div className="mt-4 flex max-sm:flex-col justify-center items-center">
                <p className="font-medium text-base">Don't have an account?</p>
                <button
                  className="ml-2 font-medium text-base text-violet-500"
                  onClick={() => router.push('/signup')}
                >
                  Sign Up
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
