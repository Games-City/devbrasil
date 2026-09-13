import { useState, useEffect } from 'react';


const MapaBrasil=({ grupoAtual, regioesConquistadas, onSelecionarRegiao, placarGrupos })=> {
  
  // Cronômetro local da partida
  const [tempoSegundos, setTempoSegundos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoSegundos(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const coresRegioesAcesas = {
    norte: "fill-emerald-500 stroke-emerald-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]",
    nordeste: "fill-sky-500 stroke-sky-300 drop-shadow-[0_0_20px_rgba(14,165,233,0.9)]",
    'centro-oeste': "fill-amber-500 stroke-amber-300 drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]",
    sudeste: "fill-orange-500 stroke-orange-300 drop-shadow-[0_0_20px_rgba(249,115,22,0.9)]",
    sul: "fill-rose-600 stroke-rose-400 drop-shadow-[0_0_20px_rgba(225,29,72,0.9)]"
  };

  const getRegiaoStyle = (regiaoKey) => {
    const acesa = regioesConquistadas[regiaoKey];
    if (acesa) {
      return `${coresRegioesAcesas[regiaoKey]} stroke-[2] cursor-not-allowed transition-all duration-300`;
    }
    return "fill-slate-800/90 stroke-slate-600 stroke-[1.5] hover:fill-cyan-600/50 hover:stroke-cyan-400 cursor-pointer transition-all duration-300";
  };

  return (
   
    <div className="w-full max-w-4xl flex flex-col items-center space-y-6">
      
      {/* Placar Superior / Turno / Cronômetro */}
      <div className="flex flex-col md:flex-row justify-between w-full bg-slate-900 p-4 rounded-xl border border-slate-800 items-center gap-4 shadow-lg">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Grupo / Jogador:</span>
          <h2 className="text-xl font-bold text-cyan-400 animate-pulse">{grupoAtual}</h2>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tempo de Jogo</span>
          <span className="text-lg font-mono font-bold text-amber-400"> {formatarTempo(tempoSegundos)}</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold text-slate-200">Mapa Geográfico do Brasil</h3>
        <p className="text-slate-400 text-xs">
          Clique em uma região apagada para iniciar os 5 desafios!
        </p>
      </div>

      {/* Container do Mapa SVG */}
      <div className="relative bg-slate-900/60 p-6 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-center w-full max-w-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 650 680"
          className="w-full h-auto max-h-[460px] drop-shadow-2xl"
        >
          {/* NORTE */}
          <g onClick={() => !regioesConquistadas.norte && onSelecionarRegiao('norte')} className="group">
            <path id="norte" className={getRegiaoStyle('norte')} d="M50,80 Q90,30 180,45 T370,55 Q390,90 380,140 T410,210 Q380,260 310,270 T180,250 Q100,240 60,180 Z" />
            <text x="190" y="150" className="fill-white font-black text-sm pointer-events-none drop-shadow-md tracking-widest opacity-90">NORTE</text>
          </g>

          {/* NORDESTE */}
          <g onClick={() => !regioesConquistadas.nordeste && onSelecionarRegiao('nordeste')} className="group">
            <path id="nordeste" className={getRegiaoStyle('nordeste')} d="M420,130 Q470,110 540,115 T610,180 Q590,240 540,270 T440,290 Q400,260 410,210 Z" />
            <text x="470" y="210" className="fill-white font-black text-sm pointer-events-none drop-shadow-md tracking-widest opacity-90">NORDESTE</text>
          </g>

          {/* CENTRO-OESTE */}
          <g onClick={() => !regioesConquistadas['centro-oeste'] && onSelecionarRegiao('centro-oeste')} className="group">
            <path id="centro-oeste" className={getRegiaoStyle('centro-oeste')} d="M260,280 Q340,270 400,290 T420,380 Q390,460 330,450 T240,380 Q230,320 260,280 Z" />
            <text x="290" y="370" className="fill-white font-bold text-[11px] pointer-events-none drop-shadow-md tracking-wider opacity-90">CENTRO-OESTE</text>
          </g>

          {/* SUDESTE */}
          <g onClick={() => !regioesConquistadas.sudeste && onSelecionarRegiao('sudeste')} className="group">
            <path id="sudeste" className={getRegiaoStyle('sudeste')} d="M430,400 Q480,380 540,410 T530,500 Q480,520 420,490 T430,400 Z" />
            <text x="450" y="455" className="fill-white font-bold text-xs pointer-events-none drop-shadow-md tracking-wider opacity-90">SUDESTE</text>
          </g>

          {/* SUL */}
          <g onClick={() => !regioesConquistadas.sul && onSelecionarRegiao('sul')} className="group">
            <path id="sul" className={getRegiaoStyle('sul')} d="M370,520 Q430,510 460,540 T430,620 Q380,630 340,590 T370,520 Z" />
            <text x="380" y="580" className="fill-white font-bold text-xs pointer-events-none drop-shadow-md tracking-widest opacity-90">SUL</text>
          </g>
        </svg>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600"></span> Apagada</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span> Norte</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_6px_#0ea5e9]"></span> Nordeste</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"></span> Centro-Oeste</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]"></span> Sudeste</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-600 shadow-[0_0_6px_#e11d48]"></span> Sul</div>
      </div>
    </div>
  
  );
}

export default MapaBrasil