import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import { MainRoutes } from '../../common/constants/constants';

/*import Spinner from '../shared/common/spinner/spinner';
import DrawBox from '../shared/initial/draw-box/draw-box';
import Home from '../shared/initial/home/home-page';
import About from '../shared/initial/about/about';
import LogPage from '../shared/initial/login/login-page';*/

 const Home = loadable(() => import(/*webpackPreload: true */ '../home/home-page'));

 const About = loadable(() => import('../about/about'));

 const DrawBox = loadable(() => import('../draw-box/draw-box'));

 const LogPage = loadable(() => import('../login/login-page'));

const StartPageRouteCl = () => (
    <Switch>
        <Route exact path={MainRoutes.home.path} component={Home} />
        <Route exact path={MainRoutes.drawbox.path} component={DrawBox} />
        <Route exact path={MainRoutes.login.path} component={LogPage} />
        <Route exact path={MainRoutes.about.path} component={About} />
    </Switch>
);

export default StartPageRouteCl;
