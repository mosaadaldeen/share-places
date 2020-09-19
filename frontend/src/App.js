import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth_context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = lazy(() => import("./user/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Auth = lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:placeId" component={UpdatePlace} />
        <Route path="/" exact component={Users} />
        <Route path={"/:userId/places"} exact component={UserPlaces} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path={"/:userId/places"} exact component={UserPlaces} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
