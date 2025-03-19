import React from "react";

const SmartParkingDescription = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-16 lg:px-32 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 relative after:content-[''] after:block after:w-32 after:h-1 after:bg-gradient-to-r after:from-teal-500 after:to-orange-500 after:mt-2 after:mx-auto">
        What is smart parking?
      </h2>

      <p className="italic text-gray-700 mt-4">
        Smart Parking is the fastest growing IoT based solution which has been
        adopted globally, specifically by universities, airports, railway
        stations, shopping malls and city garages.
      </p>
      <p className="italic text-gray-700 mt-4">
        Urbanization is increasing than ever and all the big cities around the
        world has seen a dramatic rise in number of vehicles- not a blessing for
        existing parking management for sure. As a consequence, roads are more
        dangerous due to improper parking of vehicles and Safe Parking has
        become a major issue in mega cities.
      </p>
      <p className="italic text-gray-700 mt-4">
        The Smart Parking System, also known as an automated parking system,
        integrates technology (low-cost sensors, real-time data, and apps) to
        manage on-street and off-street parking spots efficiently.
      </p>
      <p className="italic text-gray-700 mt-4">
        Drivers will be able to locate parking spaces using smartphones or
        computerised street panels. Some systems additionally offer features
        like online payments, parking time notifications, and even automobile
        search capabilities.
      </p>
      
    </div>
  );
};

export default SmartParkingDescription;
