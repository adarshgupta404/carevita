"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import { AppContext } from "@/context/AppContext"
import { Loader, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const TopDoctors = () => {
  const router = useRouter()
  const { doctors, loading } = useContext(AppContext)

  const handleDoctorClick = (id: string) => {
    router.push(`/appointment/${id}`)
    window.scrollTo(0, 0)
  }

  const handleViewMoreClick = () => {
    router.push("/doctors")
    window.scrollTo(0, 0)
  }

  return (
    <section className="container mx-auto py-16 px-4 md:px-6">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">Top Doctors to Book</h2>
        <p className="text-gray-500 max-w-md">Simply browse through our extensive list of trusted doctors.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.slice(0, 8).map((doctor, index) => (
              <div
                key={index}
                onClick={() => handleDoctorClick(doctor._id)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${doctor.availability ? "bg-green-500" : "bg-gray-400"}`} />
                    <span className={`text-xs font-medium ${doctor.availability ? "text-green-600" : "text-gray-500"}`}>
                      {doctor.availability ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.speciality}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button
              onClick={handleViewMoreClick}
              variant="outline"
              className="group px-6 py-2 text-primary hover:text-primary"
            >
              View more doctors
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </>
      )}
    </section>
  )
}

export default TopDoctors
