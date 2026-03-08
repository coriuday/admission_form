"use client";

import { motion } from "motion/react";
import { GraduationCap, BookOpen, Globe, Award, Lightbulb, Compass } from "lucide-react";

export default function BackgroundAnimation() {
  const icons = [
    { Icon: GraduationCap, color: "text-indigo-200", size: 64, initialX: "10%", initialY: "20%", duration: 20 },
    { Icon: BookOpen, color: "text-blue-200", size: 48, initialX: "80%", initialY: "15%", duration: 25 },
    { Icon: Globe, color: "text-purple-200", size: 56, initialX: "85%", initialY: "75%", duration: 22 },
    { Icon: Award, color: "text-pink-200", size: 72, initialX: "15%", initialY: "80%", duration: 28 },
    { Icon: Lightbulb, color: "text-yellow-200", size: 50, initialX: "50%", initialY: "10%", duration: 18 },
    { Icon: Compass, color: "text-teal-200", size: 60, initialX: "45%", initialY: "85%", duration: 24 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-slate-50 opacity-90"></div>
      
      {/* Animated gradient blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 blur-[100px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200 blur-[100px]"
      />

      {/* Floating Icons */}
      {icons.map((item, index) => {
        const { Icon, color, size, initialX, initialY, duration } = item;
        return (
          <motion.div
            key={index}
            className={`absolute ${color} opacity-40`}
            style={{ left: initialX, top: initialY }}
            animate={{
              y: ["0%", "-50%", "0%"],
              x: ["0%", "30%", "0%"],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </div>
  );
}
