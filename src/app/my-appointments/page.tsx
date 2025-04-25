'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const MyAppointments = () => {
  const { backendUrl, token, getAllDoctorsData, loading, setLoading } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormat = (slotDate:any) => {
    const DateArray = slotDate.split('_');
    return DateArray[0] + " " + months[Number(DateArray[1])] + " " + DateArray[2];
  };

  const getUserAppointment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error:any) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointments = async (appointmentId:any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getAllDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loader className="animate-spin text-primary w-16 h-16" />
        </div>
      )}

      <div className={`${loading ? 'opacity-45' : ''}`}>
        <p className='pb-3 font-medium text-zinc-700 border-b'>My appointments</p>
        <div>
          {appointments.map((item:any, index) => (
            <div
              className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
              key={index}
            >
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="Doctor" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && !item.isComplete && (
                  <>
                    <button
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointments(item._id)}
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer'
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {item.cancelled && !item.isComplete && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Appointment Cancelled
                  </button>
                )}
                {item.isComplete && (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
