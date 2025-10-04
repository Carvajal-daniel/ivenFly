"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SCENE_TIMINGS = [3000, 5000, 5000, 4000, 4000, 6000];

const UplysVideo: React.FC<{ height?: string }> = ({ height = "h-[500px]" }) => {
  const [currentScene, setCurrentScene] = useState(0);

  const nextScene = useCallback(() => {
    if (currentScene < SCENE_TIMINGS.length - 1) {
      setCurrentScene((prev) => prev + 1);
    }
  }, [currentScene]);

  const restartVideo = () => setCurrentScene(0);

  useEffect(() => {
    const timer = setTimeout(nextScene, SCENE_TIMINGS[currentScene]);
    return () => clearTimeout(timer);
  }, [currentScene, nextScene]);

  return (
    <div className={`relative w-full md:w-[50rem] ${height} rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100`}>
      <AnimatePresence mode="wait">
        {currentScene === 0 && (
          <motion.div
            key="scene0"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-6xl flex items-center justify-center md:text-6xl font-extrabold  text-black/70">
            <Image src="/assets/logo.png" className=" h-30 w-40 -mr-10" alt="uplys logo" width={100} height={100} />
              Uplys
            </div>
          </motion.div>
        )}

        {currentScene === 1 && (
          <motion.div
            key="scene1"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-2xl md:text-3xl font-bold text-slate-600 text-center">
              Gestão Financeira Inteligente
            </div>
          </motion.div>
        )}

        {currentScene === 2 && (
          <motion.div
            key="scene2"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xl md:text-2xl font-semibold text-slate-700 text-center">
              Sugestões Inteligentes 💡📊🎯
            </div>
            <ul className="text-sm md:text-base text-slate-600 text-center space-y-2">
              <li>Reduza custos em fornecedores</li>
              <li>Melhor horário de vendas às 14h</li>
              <li>Prevemos +28% de aumento na demanda</li>
            </ul>
          </motion.div>
        )}

        {currentScene === 3 && (
          <motion.div
            key="scene3"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xl md:text-2xl font-semibold text-slate-700 text-center">
              Automação de Marketing ✨🎨🚀
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 w-full max-w-xl">
              <div className="bg-blue-500 text-white p-2 rounded">Posts profissionais</div>
              <div className="bg-violet-500 text-white p-2 rounded">Design impactante</div>
              <div className="bg-yellow-400 text-white p-2 rounded">Publique em 1 clique</div>
            </div>
          </motion.div>
        )}

        {currentScene === 4 && (
          <motion.div
            key="scene4"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xl md:text-2xl font-semibold text-slate-700 text-center">
              Resumo das Funcionalidades
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 w-full max-w-xl text-center text-slate-700">
              <div>💰 Gestão Financeira</div>
              <div>🤖 Inteligência Artificial</div>
              <div>📱 Automação de Marketing</div>
            </div>
          </motion.div>
        )}

        {currentScene === 5 && (
          <motion.div
            key="scene5"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-slate-700">
              Uplys
            </div>
            <div className="text-xl md:text-2xl text-slate-600">Cresça com Inteligência</div>
            <button
              onClick={restartVideo}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg"
            >
              Assistir Novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UplysVideo;
