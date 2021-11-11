import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/ManagerEvents">
          <ManagerEvents />
        </Route>
        <Route path="/ManagerStores">
          <ManagerStores />
        </Route>
        <Route path="/ManagerUsers">
          <ManagerUsers />
        </Route>
        <Route path="/BikeGroup">
          <BikeGroup />
        </Route>

        <Route path="/ManagerProducs">
          <ManagerProducs />
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
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;