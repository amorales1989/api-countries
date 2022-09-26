
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './conponents/LandingPage';
import Home from './conponents/Home';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path ='/countries' component={Home}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
