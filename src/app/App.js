import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCurrentUser, getRecipes } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import './App.css';
import Recipes from '../recipes/Recipes';
import RecipeDetails from '../recipes/RecipeDetails';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Footer from '../common/Footer.js'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState({message: '', type:''});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.message === '' || message.message === null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [message])

  const handleClose = () => {
    setMessage({message: '', type:''});
  }


  const reFetchRecipes = () => {
    getRecipes()
    .then(recipeResponse => {
      setRecipes(recipeResponse);
    })
    .catch(error => {
      setMessage({message: error.message, type: 'error'})
    })
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    setMessage({message: "You're safely logged out!", type: 'success'});
  }

  useEffect(() => {
    setLoading(true);

    getCurrentUser()
    .then(response => {
      setCurrentUser(response);
      setAuthenticated(true);
      setLoading(false);
      reFetchRecipes();
    }).catch(error => {
      setLoading(false);
    });   
  },[])

  if(loading) {
    return <CircularProgress className="loading-indicator" style={{display: 'block', margin: '5rem auto'}}/>
  }

  return (
    <div className={authenticated ? 'app' : 'app-full-height'}>
      {authenticated && (<div className="app-top-box">
        <AppHeader authenticated={authenticated} onLogout={handleLogout} reFetchRecipes={reFetchRecipes} />
      </div>) }
      
        {message != null &&     
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            key='topcenter'>
              <Alert onClose={handleClose} severity={message.type}>{message.message}</Alert>
            </Snackbar>
          }

        <div className={authenticated ? 'app-body' : 'app-body-full-height'}>
        <Switch>
        
          <PrivateRoute exact path="/profile" authenticated={authenticated} currentUser={currentUser} component={Profile}></PrivateRoute>
            
          <PrivateRoute 
            exact path="/" 
            authenticated={authenticated} 
            currentUser={currentUser} 
            recipes={recipes} 
            reFetchRecipes={reFetchRecipes} 
            component={Recipes}
            setMessage={setMessage}>
            
          </PrivateRoute>
          
          <PrivateRoute 
            path='/recipes/:id' 
            authenticated={authenticated} 
            currentUser={currentUser} 
            reFetchRecipes={reFetchRecipes} 
            recipes={recipes}
            component={RecipeDetails}
            setMessage={setMessage}>
              
          </PrivateRoute>
          
          <Route exact path="/login"
              render={(props) => <Login authenticated={authenticated} {...props} setMessage={setMessage} />} />
          
          <Route path="/signup"
            render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
          
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
          
          <Route path="/recipes"></Route>
          
          <Route component={NotFound}></Route>
         
        </Switch>
        </div>

        {authenticated && <Footer />}
    </div>
  );
}


export default App;
