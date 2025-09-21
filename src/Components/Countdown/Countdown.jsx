import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // 3 days from now
    return date;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-2">Special Offer Ends In!</h2>
      <p className="mb-6 opacity-90">Hurry up before this deal expires</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CountdownItem value={timeLeft.days} label="Days" />
        <CountdownItem value={timeLeft.hours} label="Hours" />
        <CountdownItem value={timeLeft.minutes} label="Minutes" />
        <CountdownItem value={timeLeft.seconds} label="Seconds" />
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-6 bg-white text-blue-600 font-semibold py-3 rounded-lg shadow-md hover:bg-blue-50 transition-colors"
      >
        Shop Now & Save 20%
      </motion.button>
    </div>
  );
};

const CountdownItem = ({ value, label }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 200
  });
  const roundedValue = useTransform(springValue, latest => Math.floor(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return (
    <div className="text-center">
      <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
        <motion.span
          key={value}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-3xl md:text-4xl font-bold block"
        >
          {roundedValue}
        </motion.span>
      </div>
      <span className="text-sm opacity-90 mt-2 block">{label}</span>
    </div>
  );
};

export default Countdown;