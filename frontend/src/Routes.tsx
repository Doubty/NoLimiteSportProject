import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllEvents from './pages/AllEvents';
import Team from './pages/Team';
import EventPage from './pages/EventPage';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';

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
                <Route path="/allProducts">
                    <AllProducts/>
                </Route>
                <Route path="/product/:productId">
                    <ProductPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
  }
  
export default Routes;