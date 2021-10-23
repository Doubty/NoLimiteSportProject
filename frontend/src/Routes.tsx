import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllEvents from './pages/AllEvents';
import Team from './pages/Team';
import EventPage from './pages/EventPage';

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
                <Route path="/event/:eventId">
                    <EventPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
  }
  
export default Routes;