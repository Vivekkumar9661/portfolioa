"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayCard() {
  const [open, setOpen] = useState(false);
  const [page2, setPage2] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [photo, setPhoto] = useState(null);
  const audioRef = useRef(null);

  // 🎵 Play music when opened
  useEffect(() => {
    if (open && audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
  }, [open]);

  // ❤️ Effects on open
  useEffect(() => {
    if (!open) return;

    setBursts(Array.from({ length: 22 }, (_, i) => `${Date.now()}-heart-${i}`));
    setSparkles(
      Array.from({ length: 40 }, (_, i) => `${Date.now()}-spark-${i}`),
    );
    setFireworks(
      Array.from({ length: 10 }, (_, i) => `${Date.now()}-fire-${i}`),
    );
  }, [open]);

  // 📸 Photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // 🎵 Custom music upload
  const handleMusicUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !audioRef.current) return;
    const url = URL.createObjectURL(file);
    audioRef.current.src = url;
  };

  // 📱 Fullscreen
  const goFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  // 🔗 Share
  const shareCard = () => {
    const text = "🎉 Happy Birthday Vishal 🎂 Check this animated card!";
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title: "Birthday Card", text, url });
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 overflow-hidden relative">
      {/* 🎵 Audio */}
      <audio ref={audioRef} loop />

      {/* 🎛 Controls */}
      <div className="absolute top-2 flex flex-wrap gap-2 z-50">
        <label className="bg-white px-3 py-1 rounded cursor-pointer text-sm">
          📸 Upload Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoUpload}
          />
        </label>

        <label className="bg-white px-3 py-1 rounded cursor-pointer text-sm">
          🎵 Upload Music
          <input
            type="file"
            accept="audio/*"
            hidden
            onChange={handleMusicUpload}
          />
        </label>

        <button
          onClick={goFullscreen}
          className="bg-white px-3 py-1 rounded text-sm"
        >
          📱 Fullscreen
        </button>
        <button
          onClick={shareCard}
          className="bg-white px-3 py-1 rounded text-sm"
        >
          🔗 Share
        </button>
      </div>

      {/* 📖 Book */}
      <div className="perspective-[1600px]">
        <div className="relative w-[340px] h-[440px]">
          {/* Final Page */}
          <AnimatePresence>
            {page2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateX: -15 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-[#12002b] via-[#3a0ca3] to-[#7209b7]"
              >
                {/* Neon Glow Ring */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px #ff77ff",
                      "0 0 35px #ff77ff",
                      "0 0 10px #ff77ff",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-2 rounded-3xl border border-white/20"
                />

                {/* Photo */}
                {photo && (
                  <motion.img
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={photo}
                    alt="Vishal"
                    className="relative z-10 w-36 h-36 object-cover rounded-full mb-3 border-4 border-pink-400 shadow-xl"
                  />
                )}

                {/* Animated Name */}
                <motion.h2
                  animate={{
                    y: [0, -8, 0],
                    textShadow: [
                      "0 0 5px #ffffff",
                      "0 0 25px #ff4dff",
                      "0 0 5px #ffffff",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="relative z-10 text-4xl font-extrabold text-white mb-1 tracking-wide"
                >
                  🎉 Vishal 🎉
                </motion.h2>

                {/* Shimmer Message */}
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="relative z-10 text-white/95 text-base mb-4 leading-relaxed"
                >
                  🎂 Wishing you a year filled with endless smiles, big dreams,
                  glowing success and beautiful memories. May every day bring
                  you new reasons to celebrate and shine brighter than ever!
                  🌟💖
                </motion.p>

                {/* 🎉 Corner Emoji Bursts */}
                <motion.div
                  animate={{
                    x: [0, 80, 140],
                    y: [0, -60, -120],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-3 left-3 text-2xl"
                >
                  🎈🎉
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -80, -140],
                    y: [0, -60, -120],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.2 }}
                  className="absolute top-3 right-3 text-2xl"
                >
                  🎊✨
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, 90, 150],
                    y: [0, 70, 130],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.1 }}
                  className="absolute bottom-3 left-3 text-2xl"
                >
                  🎁💫
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -90, -150],
                    y: [0, 70, 130],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.3 }}
                  className="absolute bottom-3 right-3 text-2xl"
                >
                  🎆🥳
                </motion.div>

                {/* Premium CTA */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 text-black font-semibold shadow-lg"
                >
                  🎁 Best Wishes
                </motion.button>

                {/* Floating Mini Sparkles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`mini-${i}`}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: Math.random() * 220 - 110,
                      y: Math.random() * 220 - 110,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute text-yellow-300"
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page 2 */}
          <motion.div
            animate={{ rotateY: page2 ? -160 : 0 }}
            transition={{ duration: 1.2 }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200 to-pink-300 shadow-xl flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold">🎂 Surprise Inside 🎂</h2>
            <button
              onClick={() => setPage2(true)}
              className="mt-6 px-5 py-2 rounded-full bg-purple-600 text-white"
            >
              Next Page ➡️
            </button>
          </motion.div>

          {/* Front Page */}
          <motion.div
            animate={{ rotateY: open ? -160 : 0 }}
            transition={{ duration: 1.3 }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 text-white shadow-2xl flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl font-bold mb-4">🎁 Birthday Book 🎁</h1>
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold"
              >
                Open ✨
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ❤️ Hearts */}
      <AnimatePresence>
        {open &&
          bursts.map((id) => (
            <motion.div
              key={id}
              initial={{ x: 0, y: 0, scale: 0.5 }}
              animate={{
                x: Math.random() * 600 - 300,
                y: -Math.random() * 600 - 150,
                rotate: Math.random() * 360,
                scale: 1.5,
                opacity: 0,
              }}
              transition={{ duration: 4 + Math.random() * 2 }}
              className="absolute flex items-center gap-1 text-2xl"
            >
              ❤️ <span className="text-white font-bold">Vishal</span>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* ✨ Sparkles */}
      <AnimatePresence>
        {open &&
          sparkles.map((id) => (
            <motion.div
              key={id}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: Math.random() * 700 - 350,
                y: Math.random() * 600 - 300,
                scale: Math.random() * 1.5 + 0.5,
                opacity: 0,
              }}
              transition={{ duration: 2 + Math.random() * 2 }}
              className="absolute text-yellow-300"
            >
              ✨
            </motion.div>
          ))}
      </AnimatePresence>

      {/* 🎆 Fireworks */}
      <AnimatePresence>
        {open &&
          fireworks.map((id) => (
            <motion.div
              key={id}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [1, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-3 h-3 rounded-full bg-white"
              style={{
                left: Math.random() * window.innerWidth,
                top: Math.random() * window.innerHeight,
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
