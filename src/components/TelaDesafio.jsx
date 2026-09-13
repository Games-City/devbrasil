

const TelaDesafio=({ regiao, perguntaIdx, questaoAtual, totalPerguntas, feedbackMsg, onResponder })=> {
  return (
    
    
    <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400">Região: {regiao}</span>
          <h3 className="text-xl font-bold">Desafio {perguntaIdx + 1} de {totalPerguntas}</h3>
        </div>
        <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full">
          Tema: {questaoAtual.tema}
        </span>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm whitespace-pre-line text-cyan-200">
        {questaoAtual.pergunta}
      </div>

      <div className="space-y-3">
        {questaoAtual.opcoes.map((opcao, idx) => (
          <button
            key={idx}
            onClick={() => onResponder(idx)}
            className="w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-cyan-600/20 hover:border-cyan-500 border border-slate-700 transition text-sm cursor-pointer"
          >
            <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + idx)}</span> {opcao}
          </button>
        ))}
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-slate-950 text-center font-semibold text-sm border border-slate-800 animate-bounce">
          {feedbackMsg}
        </div>
      )}
    </div>
    
  );
}

export default TelaDesafio