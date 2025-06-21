import { Link } from 'react-router-dom';
import heroImage from '../assets/images/bike.jpg'
// import about1 from 'src/assets/images/Pasted image.png'
// import about2 from 'src/assets/images/Pasted image (2).png'

function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
       {/* Hero Section */}
        <section className="relative pt-20">
          <img src={heroImage} alt="Hero Bike" className="w-full h-[80vh] object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
            <Link to="/vehicle">
              <button className="bg-yellow-500 text-black font-medium px-10 py-3 rounded mt-4 hover:bg-yellow-600 text-lg">
               Get Started
              </button>
            </Link>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* About us */}
        <section className='relative pt-20'>
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6">About Us</h2>
          {/* <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <img src={about1} alt="Mechanic 1" className="w-64 h-40 object-cover rounded shadow" />
            <img src={about2} alt="Mechanic 2" className="w-64 h-40 object-cover rounded shadow" />
          </div> */}
          <p className="mt-6 text-sm md:text-base max-w-2xl mx-auto font-medium text-gray-700">
            WrapForge is a web platform for vehicle modifications, providing a user-friendly space for
            enthusiasts to visualize, design, and customize their vehicles using tools like 3D modeling.
            Combining automotive creativity with cutting-edge technology, WrapForge aims to make your dream vehicle a reality.
          </p>
        </section>
      </div>

    </>
  );
};

export default HomePage;