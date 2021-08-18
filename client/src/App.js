import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import VideogameForm from './components/VideogameForm/VideogameForm'
import Detail from './components/Detail/Detail'

import './App.css';
import Index from './components/index'

function App() {

  return (
    <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Index} />
        <Route exact path="/form" component={VideogameForm} />
        <Route exact path='/detail/:id' component= {Detail} />
    </div>
  );
}

export default App;
