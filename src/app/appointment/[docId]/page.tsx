'use client'

import React, { useContext, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import { assets } from '@/assets/assets_frontend/assets';
import RealtedDoctors from '@/components/components/RealtedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader } from 'lucide-react';

const AppointmentsPage = () => {
  const router = useRouter();
  const params = useParams();
  const docId = params?.docId as string;

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getAllDoctorsData,
    loading,
    setLoading,
  } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState<any>(null);
  const [docSlots, setDocSlots] = useState<any[][]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) {
      return toast.warn('Doctor info not available');
    }
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotAvailable =
          !docInfo.slots_booked[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment.');
      return router.push('/login');
    }

    try {
      setLoading(true);

      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctorsData();
        router.push('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctors.length && docId) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loader className="animate-spin text-primary w-16 h-16" />
        </div>
      )}

      {docInfo && (
        <div className={`${loading ? 'opacity-45' : ''}`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Doctor Image */}
            <div>
              <img
                className="bg-primary w-full sm:max-w-72 rounded-lg"
                src={docInfo.image}
                alt="Doctor"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}
                <img className="w-5" src={assets.verified_icon.src} alt="verified" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About <img src={assets.info_icon.src} alt="info" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{' '}
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>

          {/* Slot Selection */}
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    key={index}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                    }`}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            {/* Time Selection */}
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 cursor-pointer">
              {docSlots.length > 0 &&
                docSlots[slotIndex]?.map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? 'bg-primary text-white'
                        : 'text-gray-400 border border-gray-300'
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
            <button
              onClick={bookAppointment}
              className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
            >
              Book an appointment
            </button>
          </div>

          {/* Related Doctors */}
          <RealtedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      )}
    </>
  );
};

export default AppointmentsPage;
