"use client";

import { motion } from "motion/react";
import { GraduationCap, BookOpen, Globe, Award, Lightbulb, Compass, Star, Pencil } from "lucide-react";

export default function BackgroundAnimation() {
  const icons = [
    { Icon: GraduationCap, color: "text-indigo-400", size: 64, initialX: "10%",  initialY: "20%", duration: 20, dx: "40%",  dy: "-30%" },
    { Icon: BookOpen,      color: "text-sky-400",    size: 48, initialX: "80%",  initialY: "15%", duration: 25, dx: "-30%", dy: "40%"  },
    { Icon: Globe,         color: "text-violet-400", size: 56, initialX: "85%",  initialY: "70%", duration: 22, dx: "-40%", dy: "-20%" },
    { Icon: Award,         color: "text-pink-400",   size: 72, initialX: "12%",  initialY: "78%", duration: 28, dx: "30%",  dy: "-40%" },
    { Icon: Lightbulb,     color: "text-amber-400",  size: 50, initialX: "50%",  initialY: "8%",  duration: 18, dx: "20%",  dy: "30%"  },
    { Icon: Compass,       color: "text-teal-400",   size: 60, initialX: "42%",  initialY: "82%", duration: 24, dx: "-20%", dy: "-30%" },
    { Icon: Star,          color: "text-rose-400",   size: 36, initialX: "30%",  initialY: "45%", duration: 16, dx: "35%",  dy: "20%"  },
    { Icon: Pencil,        color: "text-emerald-400",size: 40, initialX: "65%",  initialY: "50%", duration: 19, dx: "-25%", dy: "-35%" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* ── Base gradient background ── */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f0f9ff 30%, #fdf4ff 60%, #fff7ed 100%)"
        }}
      />

      {/* ── Large slow-drifting gradient blobs (Desktop Only to prevent mobile glitching) ── */}

      {/* Top-left: indigo-violet */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.65, 0.45], x: ["0%", "8%", "0%"], y: ["0%", "6%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute -top-[15%] -left-[15%] w-[55%] h-[55%] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)" }}
      />

      {/* Bottom-right: sky-cyan */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4], x: ["0%", "-8%", "0%"], y: ["0%", "-6%", "0%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute -bottom-[15%] -right-[15%] w-[55%] h-[55%] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)" }}
      />

      {/* Center: pink-fuchsia accent */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.45, 0.25], rotate: [0, 180, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-[30%] left-[35%] w-[35%] h-[35%] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #f0abfc 0%, #e879f9 50%, #d946ef 100%)" }}
      />

      {/* Top-right: amber-orange */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: ["0%", "-5%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute -top-[10%] right-[5%] w-[35%] h-[35%] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)" }}
      />

      {/* Bottom-left: emerald-teal */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-[5%] left-[5%] w-[30%] h-[30%] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, #6ee7b7 0%, #34d399 50%, #10b981 100%)" }}
      />

      {/* ── Subtle mesh grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* ── Floating Icons ── */}
      {icons.map((item, index) => {
        const { Icon, color, size, initialX, initialY, duration, dx, dy } = item;
        return (
          <motion.div
            key={index}
            className={`absolute ${color} opacity-30`}
            style={{ left: initialX, top: initialY }}
            animate={{
              y: ["0%", dy, "0%"],
              x: ["0%", dx, "0%"],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
          >
            <Icon size={size} strokeWidth={1.2} />
          </motion.div>
        );
      })}
    </div>
  );
}
