import GameStartModal from './components/GameStartModal/GameStartModal';
import GameManager from './components/GameManager/GameManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameStartModal/>
      <GameManager/>
      <p className="Cheater">Psst... the answer is in the console. You know, if you're a cheater.</p>
    </div>
  );
}

export default App;
