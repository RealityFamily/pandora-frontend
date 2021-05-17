import {Router, Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css';
import LoginComponent from "./components/LoginComponent/LoginComponent";
import AdminPage from "./components/AdminPage/AdminPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      {/*<AdminPage></AdminPage>*/}
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginComponent}></Route>
                <Route path="/login" exact component={LoginComponent}></Route>
                <AuthenticatedRoute path="/admin" exact component={AdminPage}></AuthenticatedRoute>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
