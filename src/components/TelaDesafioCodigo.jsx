import  { useState, useEffect } from 'react';

export default function TelaDesafioCodigo({ regiao, perguntaIdx, questaoAtual, totalPerguntas, feedbackMsg, onSubmeter }) {
  const [codigoInput, setCodigoInput] = useState('');

  // Limpa o textarea sempre que a pergunta mudar (quando o perguntaIdx ou regiao atualiza)
  useEffect(() => {
    setCodigoInput('');
  }, [perguntaIdx, regiao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmeter(codigoInput);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400">Região: {regiao}</span>
          <h3 className="text-xl font-bold">Desafio Prático {perguntaIdx + 1} de {totalPerguntas}</h3>
        </div>
        <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30">
         Código Prático
        </span>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-cyan-200 whitespace-pre-line">
        {questaoAtual.pergunta}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 block font-mono">Digite seu código / resposta abaixo:</label>
          <textarea 
            rows="4"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm text-emerald-300 focus:outline-none focus:border-cyan-500 shadow-inner"
            placeholder="// Escreva sua solução aqui..."
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value)}
          />
          <span className="text-[11px] text-slate-500 italic block">Dica: {questaoAtual.dica}</span>
        </div>

        <button 
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 font-bold rounded-xl hover:opacity-90 transition cursor-pointer shadow-lg"
        >
          Enviar Resposta de Código
        </button>
      </form>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-slate-950 text-center font-semibold text-sm border border-slate-800 animate-bounce">
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}