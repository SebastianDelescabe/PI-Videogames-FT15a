import {Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import SearchBar from './components/SearchBar/SearchBar';
import VideogameForm from './components/VideogameForm/VideogameForm'

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component ={LandingPage}/>
        <Route path="/home" component = {Home}/>
        <Route path="/home" component  = {SearchBar}/>
        <Route exact path="/formulario" component = {VideogameForm}/>
      </Switch>
    </div>
  );
}

export default App;
