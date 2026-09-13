import React, { useRef, useEffect } from 'react';

export default function ModalHistoria({ onIniciar }) {
  const audioRef = useRef(null);

  const textoHistoria = "Atenção, grupo. O país está na escuridão digital. As cinco regiões perderam sua energia e os códigos principais falharam. Sistemas comprometidos. Cada região exige a conclusão de cinco protocolos de segurança e desafios de programação. Restaurem a luz nacional antes que o sistema caia.";

  useEffect(() => {
    // 1. Toca a música de fundo com volume baixo para dar o clima cibernético
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(e => console.log("Áudio bloqueado pelo navegador", e));
    }

    // 2. Configura a voz estilo "Hacker / Sistema"
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancela falas anteriores

      const utterance = new SpeechSynthesisUtterance(textoHistoria);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;  // Velocidade ligeiramente mais lenta e metódica
      utterance.pitch = 0.4;  // TOM BEM GRAVE (dá o efeito de voz de hacker/máquina)
      utterance.volume = 1.0; // Volume alto para a voz

      // Tenta encontrar uma voz mais robótica/grave no sistema do usuário
      const definirVoz = () => {
        const voices = window.speechSynthesis.getVoices();
        // Procura por vozes masculinas ou com perfis mais graves em português se houver
        const vozHacker = voices.find(v => v.lang.includes('pt') && (v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Microsoft'))) || voices[0];
        if (vozHacker) {
          utterance.voice = vozHacker;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        definirVoz();
      } else {
        window.speechSynthesis.onvoiceschanged = definirVoz;
      }
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleFechar = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onIniciar();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <audio ref={audioRef} loop src="/src/music/musica.mp3" />
      
      <div className="bg-slate-900 border border-emerald-500/50 p-8 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-fade-in font-mono">
        <div className="text-emerald-400 text-3xl uppercase tracking-widest animate-pulse">[ MISSÃO ]</div>
        <h2 className="text-2xl font-bold text-emerald-300">PROTOCOLO DE RECUPERAÇÃO</h2>
        <p className="text-slate-300 leading-relaxed text-sm text-left bg-slate-950 p-4 rounded-xl border border-slate-800">
          {textoHistoria}
        </p>
        <button 
          onClick={handleFechar}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer tracking-wider"
        >
          INICIAR SISTEMA
        </button>
      </div>
    </div>
  );
}