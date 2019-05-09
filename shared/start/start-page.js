import React, {useState, useEffect} from 'react';
import Header from './start-page/header/header';
import ContentRoute from './start-page/content-route-ssr';
import Spinner from '../common/spinner/spinner';

import './index.scss';

const StartPageSSR = props => {
    const [data, setData] = useState(false);
    useEffect(() => {
        setTimeout(() => setData(true), 50)
    }, []);
    return (
        <div className="start-page-wrapper" >
            {!data && <Spinner />}
            {data && 
                <React.Fragment>
                    <Header />
                    <ContentRoute />
                </React.Fragment>
            }
        </div>
    )
};

export default StartPageSSR;
