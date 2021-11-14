import Home from "./pages/Home";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AllEvents from "./pages/AllEvents";
import Team from "./pages/Team";
import EventPage from "./pages/EventPage";
import AllProducts from "./pages/AllProducts";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ManagerEvents from "./pages/ManagerEvents";
import ManagerProducs from "./pages/MangerProducts";
import BikeGroup from "./pages/BikeGroups";
import ManagerUsers from "./pages/ManagerUsers";
import ManagerStores from "./pages/ManagerStores";
import { isAuthenticated } from "./services/auth";

interface Props {
  children: any;
  path: string;
}

const PrivateRoute = ({ children, path } : Props) => (
  <Route
    path={path}
    render={props =>
      isAuthenticated() ? (
        children
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/allEvents">
          <AllEvents />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/event/:eventId">
          <EventPage />
        </Route>
        <Route path="/allProducts">
          <AllProducts />
        </Route>
        <Route path="/product/:productId">
          <ProductPage />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>

        <PrivateRoute path="/Dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/ManagerEvents">
          <ManagerEvents />
        </PrivateRoute>
        <PrivateRoute path="/ManagerStores">
          <ManagerStores />
        </PrivateRoute>
        <PrivateRoute path="/ManagerUsers">
          <ManagerUsers />
        </PrivateRoute>
        <PrivateRoute path="/BikeGroup">
          <BikeGroup />
        </PrivateRoute>
        <PrivateRoute path="/ManagerProducs">
          <ManagerProducs />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
