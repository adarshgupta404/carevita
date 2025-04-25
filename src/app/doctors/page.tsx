'use client'
import { AppContext } from '@/context/AppContext'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export interface Doctor {
  _id: string
  name: string
  image: string
  speciality: string
  availability: boolean
}

const specialities = [
  'All Specialities',
  'General Physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Gastroenterologist',
  'Cardiologist',
  'Orthopedist',
  'ENT Specialist',
  'Psychiatrist'
]

const DoctorsPage = () => {
  const { doctors, loading } = useContext(AppContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  const speciality = searchParams.get('speciality')
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(
    speciality || 'All Specialities'
  )

  useEffect(() => {
    if (doctors.length > 0) {
      if (selectedSpeciality && selectedSpeciality !== 'All Specialities') {
        const filtered = doctors.filter((doc: Doctor) => doc.speciality === selectedSpeciality)
        setFilteredDoctors(filtered)
      } else {
        setFilteredDoctors(doctors)
      }
    }
  }, [doctors, selectedSpeciality])

  const handleSpecialityChange = (spec: string) => {
    setSelectedSpeciality(spec)
    if (spec === 'All Specialities') {
      router.push('/doctors')
    } else {
      router.push(`/doctors?speciality=${encodeURIComponent(spec)}`)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
        <Loader className="animate-spin text-primary w-16 h-16" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full sticky top-4 md:w-64">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Specialities</h2>
            <div className="space-y-2">
              {specialities.map((spec) => (
                <button
                  key={spec}
                  onClick={() => handleSpecialityChange(spec)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedSpeciality === spec
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedSpeciality === 'All Specialities' ? 'Our Doctors' : `${selectedSpeciality} Specialists`}
            </h1>
            <p className="text-gray-600">
              {selectedSpeciality === 'All Specialities'
                ? 'Browse through our network of trusted healthcare professionals'
                : `Find the best ${selectedSpeciality} specialists near you`}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Link
                href={`/appointment/${doctor._id}`}
                key={doctor._id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name}'s profile`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className={`flex items-center gap-2 text-sm ${doctor.availability ? 'text-green-500' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${doctor.availability ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <p>{doctor.availability ? 'Available' : 'Not Available'}</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No doctors found.</p>
              {selectedSpeciality !== 'All Specialities' && (
                <button
                  onClick={() => handleSpecialityChange('All Specialities')}
                  className="text-primary hover:underline mt-4"
                >
                  View all doctors
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorsPage
