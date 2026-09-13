import { useState, useEffect } from 'react';
import questoesDataOriginal from './data/desafios.json';
import ModalHistoria from './components/ModalHistoria';
import MapaBrasil from './components/MapaBrasil';
import TelaDesafio from './components/TelaDesafio';
import TelaDesafioCodigo from './components/TelaDesafioCodigo';
import TelaFinal from './components/TelaFinal';
import Footer from './components/Footer'

export default function App() {
  const [etapa, setEtapa] = useState('inicio'); // inicio, historia, jogo, final
  const [nomeGrupo, setNomeGrupo] = useState('Grupo Alpha');
  
  // Armazenará as questões embaralhadas para esta partida
  const [questoesPartida, setQuestoesPartida] = useState({});

  const [regioesConquistadas, setRegioesConquistadas] = useState({
    norte: false,
    nordeste: false,
    'centro-oeste': false,
    sudeste: false,
    sul: false
  });
  
  const [regiaoAtiva, setRegiaoAtiva] = useState(null);
  const [perguntaIdx, setPerguntaIdx] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [pontos, setPontos] = useState(0);
  const [erros, setErros] = useState(0);

  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoTotalSegundos, setTempoTotalSegundos] = useState(0);

  // Função para embaralhar um array aleatoriamente (Fisher-Yates)
  const embaralharArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const iniciarJogoSetup = () => {
    if(nomeGrupo.trim() !== '') {
      // Embaralha as perguntas de cada região ao iniciar uma nova partida
      const novasQuestoes = {};
      Object.keys(questoesDataOriginal).forEach(regiao => {
        novasQuestoes[regiao] = embaralharArray(questoesDataOriginal[regiao]);
      });
      setQuestoesPartida(novasQuestoes);

      setEtapa('historia');
    }
  };

  const handleIniciarPartida = () => {
    setEtapa('jogo');
    setTempoInicio(Date.now());
  };

  const responderPerguntaMultipla = (opcaoIndex) => {
    const perguntasDaRegiao = questoesPartida[regiaoAtiva];
    const questaoAtual = perguntasDaRegiao[perguntaIdx];

    if (opcaoIndex === questaoAtual.resposta) {
      avancarOuConcluir(perguntasDaRegiao);
    } else {
      tratarErro();
    }
  };

  const responderPerguntaCodigo = (codigoDigitado) => {
    const perguntasDaRegiao = questoesPartida[regiaoAtiva];
    const questaoAtual = perguntasDaRegiao[perguntaIdx];

    const termoEsperado = questaoAtual.respostaEsperada.toLowerCase();
    const digitadoNormalizado = codigoDigitado.toLowerCase();

    if (digitadoNormalizado.includes(termoEsperado)) {
      avancarOuConcluir(perguntasDaRegiao);
    } else {
      tratarErro();
    }
  };

  const avancarOuConcluir = (perguntasDaRegiao) => {
    setPontos(prev => prev + 10);
    setFeedbackMsg(' Correta! Próximo desafio...');
    
    setTimeout(() => {
      if (perguntaIdx + 1 < perguntasDaRegiao.length) {
        setPerguntaIdx(prev => prev + 1);
        setFeedbackMsg('');
      } else {
        setRegioesConquistadas(prev => ({ ...prev, [regiaoAtiva]: true }));
        setFeedbackMsg(`Parabéns! Você dominou a região ${regiaoAtiva.toUpperCase()}!`);
        
        setTimeout(() => {
          setRegiaoAtiva(null);
          setPerguntaIdx(0);
          setFeedbackMsg('');
        }, 2500);
      }
    }, 1000);
  };

  const tratarErro = () => {
    setErros(prev => prev + 1);
    setFeedbackMsg('Resposta incorreta! Região bloqueada temporariamente.');
    setTimeout(() => {
      setRegiaoAtiva(null);
      setPerguntaIdx(0);
      setFeedbackMsg('');
    }, 2000);
  };

  useEffect(() => {
    const todasAcesas = Object.values(regioesConquistadas).every(v => v === true);
    if (todasAcesas && etapa === 'jogo' && tempoInicio) {
      const tempoGasto = Math.floor((Date.now() - tempoInicio) / 1000);
      setTempoTotalSegundos(tempoGasto);
      setEtapa('final');
    }
  }, [regioesConquistadas, etapa, tempoInicio]);

  const questaoAtual = (regiaoAtiva && questoesPartida[regiaoAtiva]) ? questoesPartida[regiaoAtiva][perguntaIdx] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      
      {etapa === 'inicio' && (
        <div className="text-center space-y-6 max-w-xl bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Missão Brasil: Conquista Tecnológica
          </h1>
          <p className="text-slate-400 text-sm">
            Supere perguntas e mini-desafios de código prático em ordem aleatória para acender o mapa do Brasil!
          </p>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-300">Nome do seu Grupo / Equipe:</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
              value={nomeGrupo}
              onChange={(e) => setNomeGrupo(e.target.value)}
              placeholder="Ex: Hackers do Sul"
            />
          </div>

          <button 
            onClick={iniciarJogoSetup}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 font-bold text-lg rounded-xl shadow-lg hover:opacity-90 transition cursor-pointer"
          >
            Avançar para História
          </button>
        </div>
      )}

      {etapa === 'historia' && (
        <ModalHistoria onIniciar={handleIniciarPartida} />
      )}

      {etapa === 'jogo' && !regiaoAtiva && (
        <MapaBrasil 
          grupoAtual={nomeGrupo}
          regioesConquistadas={regioesConquistadas}
          onSelecionarRegiao={(reg) => setRegiaoAtiva(reg)}
          placarGrupos={{ [nomeGrupo]: { regioesDom: Object.values(regioesConquistadas).filter(Boolean).length, pontos } }}
        />
      )}

      {etapa === 'jogo' && regiaoAtiva && questaoAtual && (
        questaoAtual.tipo === 'codigo' ? (
          <TelaDesafioCodigo 
            regiao={regiaoAtiva}
            perguntaIdx={perguntaIdx}
            questaoAtual={questaoAtual}
            totalPerguntas={questoesPartida[regiaoAtiva].length}
            feedbackMsg={feedbackMsg}
            onSubmeter={responderPerguntaCodigo}
          />
        ) : (
          <TelaDesafio 
            regiao={regiaoAtiva}
            perguntaIdx={perguntaIdx}
            questaoAtual={questaoAtual}
            totalPerguntas={questoesPartida[regiaoAtiva].length}
            feedbackMsg={feedbackMsg}
            onResponder={responderPerguntaMultipla}
          />
        )
      )}

      {etapa === 'final' && (
        <TelaFinal 
          grupoNome={nomeGrupo}
          pontos={pontos}
          erros={erros}
          tempoTotal={tempoTotalSegundos}
          onReiniciar={() => window.location.reload()}
        />
      )}
     <Footer/>
    </div>
  );
}