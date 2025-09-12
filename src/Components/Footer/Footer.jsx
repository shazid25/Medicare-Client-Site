// Footer.jsx
import React, { useEffect, useState } from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [medicineNames, setMedicineNames] = useState([]);
  const [medicineIcons, setMedicineIcons] = useState([]);

  useEffect(() => {
    // Floating medicine names
    const names = [
      "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
      "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
      "Antibiotics", "Pain Relief", "Skincare", "Vitamins", "First Aid"
    ];

    const elements = [];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: 12 + Math.random() * 10,
        fontSize: 0.7 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    setMedicineNames(elements);

    // Floating emoji icons
    const icons = ["💊", "🧴", "🩹", "🧪"];
    const iconElements = [];
    for (let i = 0; i < 30; i++) {
      iconElements.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.5
      });
    }
    setMedicineIcons(iconElements);
  }, []);

  return (
    <footer className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12 overflow-hidden rounded-t-3xl mt-12">
      {/* Floating medicines text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {medicineNames.map((med) => (
          <div
            key={med.id}
            className="absolute font-semibold select-none text-black"
            style={{
              top: `${med.top}%`,
              left: `${med.left}%`,
              fontSize: `${med.fontSize}rem`,
              opacity: med.opacity,
              animation: `floatMedicine ${med.animationDuration}s linear infinite`,
            }}
          >
            {med.name}
          </div>
        ))}

        {/* Floating emojis */}
        {medicineIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute select-none"
            style={{
              top: `${icon.top}%`,
              left: `${icon.left}%`,
              fontSize: `${icon.size}px`,
              opacity: icon.opacity,
              animation: `floatEmoji ${icon.duration}s ease-in-out ${icon.delay}s infinite`,
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold mb-4 animate-fade-in-down">
          Stay Connected
        </h2>
        <p className="mb-6 text-lg animate-fade-in-up">
          Follow Us on social media
        </p>

        {/* Social links - Bill Gates */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com/BillGates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-300 transition transform hover:scale-125 animate-bounce"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/williamhgates/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-300 transition transform hover:scale-125 animate-bounce delay-100"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/thisisbillgates/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-300 transition transform hover:scale-125 animate-bounce delay-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/BillGates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-yellow-300 transition transform hover:scale-125 animate-bounce delay-300"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Footer bottom */}
        <p className="mt-6 text-sm text-gray-200 animate-fade-in-up">
          © {new Date().getFullYear()} MediCare | Built with 💙
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes floatMedicine {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-120px) rotate(360deg);
          }
        }

        @keyframes floatEmoji {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.2);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
