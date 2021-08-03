import {Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component ={LandingPage}/>
      </Switch>
    </div>
  );
}

export default App;
