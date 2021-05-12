import React from 'react';
import './App.css';
import Characters from "./Components/Characters/characters";
import Houses from "./Components/Houses/houses";
import Page404 from "./Components/errors/page404";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';

export const PATH = {
    characters: "/characters",
    houses: "/houses",
    page404: "/page404",
    pageNotFound: "*",
    startPage: "/"
}

function App() {

    return (
        <div className="App">
            <HashRouter>

                <Switch>
                    <Route exact path={PATH.startPage}
                           render={() => <Characters/>}/>
                    <Route path={PATH.characters}
                           render={() => <Characters/>}/>
                    <Route path={PATH.houses}
                           render={() => <Houses/>}/>
                    <Route path={PATH.page404}
                           render={() => <Page404/>}/>

                    <Redirect from={PATH.pageNotFound} to={PATH.page404}/>
                </Switch>


            </HashRouter>
        </div>
    );
}

export default App;
