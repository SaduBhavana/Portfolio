import './App.css';
import Home from './home';
import ParticleBackground from './ParticleBackground';

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
