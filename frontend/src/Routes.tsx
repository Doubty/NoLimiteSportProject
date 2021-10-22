import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllEvents from './pages/AllEvents';
import Team from './pages/Team';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/allEvents">
                    <AllEvents/>
                </Route>
                <Route path="/team">
                    <Team/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
  }
  
export default Routes;