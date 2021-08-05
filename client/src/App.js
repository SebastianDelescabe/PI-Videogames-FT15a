import {Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component ={LandingPage}/>
        <Route path="/home" component = {Home}/>
        <Route path="/home" component  = {SearchBar}/>
      </Switch>
    </div>
  );
}

export default App;
