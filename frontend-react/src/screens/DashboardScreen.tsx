import SidebarNav from '../navigation/SidebarNav'
import ChipIcon from '../assets/icons/chip.svg'
import GalleryApp from '../GalleryApp'
import { useEffect, useState } from 'react'

const DashboardScreen = () => {
  const [galleryName, setGalleryName] = useState<string>('')
  useEffect(() => {
    console.log("GalleryName: ", galleryName);
  }, [galleryName])

  return (
    <div className="relative min-h-screen md:flex">

      {/* <!-- mobile menu bar --> */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* <!-- logo --> */}
        <a href="#" className="block p-4 text-white font-bold">Better Dev</a>

        {/* <!-- mobile menu button --> */}
        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* <!-- sidebar --> */}
      <div className="sidebar bg-gray-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

        {/* <!-- logo --> */}
        <a href="#" className="text-gray-100 flex items-center space-x-2 px-4">
          <img className="w-8" src={ChipIcon} alt="" />
          <span className="text-2xl font-extrabold">Wills place</span>
        </a>

        {/* <!-- nav --> */}
        <SidebarNav onJoinGalleryPressed={setGalleryName} />
      </div>

      {/* <!-- content --> */}
      <div className="bg-gray-300 flex-1 p-10 text-2xl font-bold">
        <GalleryApp galleryName={galleryName} />
      </div>

    </div>
  )
}

export default DashboardScreen
