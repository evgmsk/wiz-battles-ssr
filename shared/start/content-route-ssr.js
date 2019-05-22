import React from 'react';
import { Route, Switch } from 'react-router-dom';

import loadable from '@loadable/component';

import { MainRoutes } from '../common/constants/constants';

// import Spinner from '../../common/spinner/spinner';
import DrawBox from './draw-box/draw-box';
import Home from './home/home-page';
import About from './about/about';
import LogPage from './login/login-page';

// webpackChunkName: "about"  webpackChunkName: "logpage"

// const Home = loadable(() => import(/* webpackPreload: true */ '../home/home-page'));

// const About = loadable(() => import( '../about/about'));

// const DrawBox = loadable(() => import( '../draw-box/draw-box'));

// const LogPage = loadable(() => import( '../login/login-page'));/**/

const StartPageRoute = () => (
    <Switch>
        <Route exact path={MainRoutes.home.path} component={Home} />
        <Route exact path={MainRoutes.drawbox.path} component={DrawBox} />
        <Route exact path={MainRoutes.about.path} component={About} />
        <Route exact path={MainRoutes.login.path} component={LogPage} />
    </Switch>
);

export default StartPageRoute;
