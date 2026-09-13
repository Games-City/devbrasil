import React from 'react';

export default function TelaFinal({ grupoNome, pontos, erros, tempoTotal, onReiniciar }) {
  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="text-center space-y-6 max-w-md w-full bg-slate-900 p-8 rounded-2xl shadow-2xl border border-emerald-500/40">
      <h2 className="text-3xl font-extrabold text-emerald-400"> Missão Cumprida!</h2>
      <p className="text-slate-400 text-sm">
        Parabéns, <span className="text-cyan-400 font-bold">{grupoNome}</span>! Você restaurou a energia de todo o mapa do Brasil.
      </p>

      {/* Card de Estatísticas Finais */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-left">
        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <span className="text-slate-400 text-sm">Pontuação Total:</span>
          <span className="font-mono font-bold text-xl text-emerald-400">{pontos} pts</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <span className="text-slate-400 text-sm">Erros cometidos:</span>
          <span className="font-mono font-bold text-rose-400">{erros} erros</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Tempo Total:</span>
          <span className="font-mono font-bold text-amber-400">{formatarTempo(tempoTotal)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
       SEGUE O RELATÓRO DA RODADA
      </p>

      <button 
        onClick={onReiniciar}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
      >
        Jogar Novamente
      </button>
    </div>
  );
}