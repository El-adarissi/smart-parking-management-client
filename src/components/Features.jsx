import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faShieldAlt,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  const features = [
    {
      icon: faHandPointer,
      title: "Convenience",
      description:
        "‘A click away’ conveniences of the modern street parking transaction that takes just a few seconds.",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      icon: faShieldAlt,
      title: "Secure",
      description:
        "Guaranteed secured payment gives great content and safety that eliminates the parking meter and autopay machine.",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      icon: faMapMarkerAlt,
      title: "Location",
      description:
        "The smart parking app directs you to your chosen parking space.",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      icon: faClock,
      title: "Savaing Time",
      description:
        "optimizes time by reducing the hassle of searching for a spot, ensuring quick and efficient parking decisions in real-time",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
  ];

  return (
    <div id='features' className="bg-white py-12 px-6 md:px-16 lg:px-32 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 relative after:content-[''] after:block after:w-32 after:h-1 after:bg-gradient-to-r after:from-teal-500 after:to-orange-500 after:mt-2 after:mx-auto">
        Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full ${feature.bg} hover:bg-opacity-80 transition`}
            >
              <FontAwesomeIcon
                icon={feature.icon}
                className={`text-3xl ${feature.color}`}
              />
            </div>
            <h3 className={`text-xl font-bold mt-4 ${feature.color}`}>
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
