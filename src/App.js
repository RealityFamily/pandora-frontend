import {Router, Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css';
import LoginComponent from "./components/LoginComponent/LoginComponent";
import AdminPage from "./components/AdminPage/AdminPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LogoutComponent from "./components/LogoutComponent/LogoutComponent";

function App() {
  return (
    <div>
      {/*<AdminPage></AdminPage>*/}
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginComponent}></Route>
                <Route path="/login" exact component={LoginComponent}></Route>
                <AuthenticatedRoute path="/admin" component={AdminPage}></AuthenticatedRoute>
                <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
