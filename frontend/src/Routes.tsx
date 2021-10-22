import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllEvents from './pages/AllEvents';

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
            </Switch>
        </BrowserRouter>
    );
  }
  
export default Routes;