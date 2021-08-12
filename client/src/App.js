import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import SearchBar from './components/SearchBar/SearchBar';
import VideogameForm from './components/VideogameForm/VideogameForm'
import Detail from './components/Detail/Detail'

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/home" component={SearchBar} />
        <Route exact path="/form" component={VideogameForm} />
        <Route exact path='/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
