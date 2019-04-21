/**
 * project new-wiz-bat
 */

import { connect } from 'react-redux';
import translate from '../../common/react-redux-translate';

const la = 'en';

let T = translate(la);

T = connect( state => ({lang: state.app.lang}))(T);

export const funcT = ({keys, insertions = []}) => <T keys={keys} insertions={insertions} />;

export default T;
