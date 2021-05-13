import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ArticlePage from './articlePage';
import './css/style.css';
import CreateArticle from './createArticlePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/articlePage' component={ArticlePage} />
      <Route exact path='/createArticlePage' component={CreateArticle} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);

