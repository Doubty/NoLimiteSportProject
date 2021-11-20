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
import ManagerProducs from "./pages/ManagerProducts";
import BikeGroup from "./pages/BikeGroups";
import ManagerUsers from "./pages/ManagerUsers";
import ManagerStores from "./pages/ManagerStores";
import { isAuthenticated } from "./services/auth";
import gateway from "./services/gateway";

interface Props {
  children: any;
  path: string;
  isDashboard: boolean;
}

interface User {
  id: number;
  nivel: number;
}

const PrivateRoute = ({ children, path, isDashboard } : Props) => (
  <Route
    path={path}
    render={props => {
      if (isAuthenticated()) {
        if (isDashboard)
          return (children);

        let user : User;
        gateway.get("/usuarios/search/byToken").then( res => {
          user = res.data;

          if (user)
            if (user.nivel === 1)
              return (children);
        }).catch( () => {
          return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />;
        });

        return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />;
      } else 
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
    }
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

        <PrivateRoute isDashboard={true} path="/Dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute isDashboard={false} path="/ManagerEvents">
          <ManagerEvents />
        </PrivateRoute>
        <PrivateRoute isDashboard={false} path="/ManagerStores">
          <ManagerStores />
        </PrivateRoute>
        <PrivateRoute isDashboard={false} path="/ManagerUsers">
          <ManagerUsers />
        </PrivateRoute>
        <PrivateRoute isDashboard={false} path="/BikeGroup">
          <BikeGroup />
        </PrivateRoute>
        <PrivateRoute isDashboard={false} path="/ManagerProducs">
          <ManagerProducs />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
