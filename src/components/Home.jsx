import React from "react";
import { Carousel } from "flowbite-react";
import img1 from "/src/assets/logo.png";
import img2 from "/src/assets/ParkingManagement.png";
import img3 from "/src/assets/ParkingManagement-1.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div id="home" className="bg-neutralsilver">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
        <Carousel className="w-full mx-auto">
          {/* Slide 1 */}
          <div className="my-8 py-12 flex flex-col md:flex-row-reverse justify-between gap-8">
            <div className="flex justify-center">
              <img
                src={img1}
                alt="Smart Parking Management"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
            {/* Hero Text */}
            <div className="md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-neutralDGrey leading-snug">
                Smart Parking Management Using{" "}
                <span className="text-brandPrimary">RFID</span>
              </h1>
              <p className="text-neutralDGrey text-lg sm:text-xl mb-4">
                If you are looking for smart solutions for parking, then you are
                in the right site.
              </p>
              <Link to="/authentificate">
                <button className="btn-primary">Register</button>
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="my-8 py-12 flex flex-col md:flex-row-reverse justify-between gap-8">
            <div className="flex justify-center">
              <img
                src={img3}
                alt="Adaptable Parking Solutions"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
            {/* Hero Text */}
            <div className="md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-neutralDGrey leading-snug">
                Adaptable Parking Solutions
              </h1>
              <p className="text-neutralDGrey text-lg sm:text-xl mb-8">
                We are developing a digital approach that enhances parking
                management across all platforms.
              </p>
              <Link to="/authentificate">
                <button className="btn-primary">Register</button>
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="my-8 py-12 flex flex-col md:flex-row-reverse justify-between gap-8">
            <div className="flex justify-center">
              <img
                src={img2}
                alt="Electronic Parking Management"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
            {/* Hero Text */}
            <div className="md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-neutralDGrey leading-snug">
                Electronic Parking Management
              </h1>
              <p className="text-neutralDGrey text-lg sm:text-xl mb-8">
                We are committed to advancing parking enforcement by integrating
                IoT Technology.
              </p>

              <Link to="/authentificate">
                <button className="btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
