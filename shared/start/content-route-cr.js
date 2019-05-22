import React, {Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import Spinner from '../common/spinner/spinner';
import { MainRoutes } from '../common/constants/constants';

/*import Spinner from '../shared/common/spinner/spinner';
import DrawBox from '../shared/initial/draw-box/draw-box';
import Home from '../shared/initial/home/home-page';
import About from '../shared/initial/about/about';
import LogPage from '../shared/initial/login/login-page';*/
/*webpackPreload: true *//*webpackPreload: true */
 const Home = lazy(() => import(/*webpackPreload: true */ './home/home-page'));

 const About = lazy(() => import( './about/about'));

 const DrawBox = lazy(() => import( './draw-box/draw-box'));

 const LogPage = lazy(() => import(/*webpackPreload: true */ './login/login-page'));

const StartPageRouteCl = () => (
    <Suspense fallback={<Spinner />}>
        <Switch>
            <Route exact path={MainRoutes.home.path} component={Home} />
            <Route exact path={MainRoutes.drawbox.path} component={DrawBox} />
            <Route exact path={MainRoutes.login.path} component={LogPage} />
            <Route exact path={MainRoutes.about.path} component={About} />
        </Switch>
    </Suspense>
);
 
export default StartPageRouteCl;
