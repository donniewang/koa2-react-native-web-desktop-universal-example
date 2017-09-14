import { connect } from 'dva';

import App from '../../../common/containers/app'

const mapStateToProps = ({ loading }) => ({ loading })

const mapDispatchToProps = ( dispatch ) => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(App);

module.exports = exports['default'];