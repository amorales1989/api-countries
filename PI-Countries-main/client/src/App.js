
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './conponents/LandingPage';
import Home from './conponents/Home';
import ActivityCreate  from './conponents/AddActivity';
import Details from './conponents/Details'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path ='/countries' component={Home}/>
        <Route exact path="/activities" component={ActivityCreate} />  
        <Route exact path='/countries/:id' component={Details} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
