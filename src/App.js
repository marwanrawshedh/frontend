import React from 'react';
import Header from './Header';
import BestBooks from './BestBooks';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Fav from './Fav';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';

class App extends React.Component {

  render() {
    // console.log('app', this.props);
    const { user, isAuthenticated,  } = this.props.auth0;
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
              {isAuthenticated&&<BestBooks/>}
               
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {!isAuthenticated&&<Login/>}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/Profile"></Route>
              <Route exact path="/Fav">
                <Fav/>
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
