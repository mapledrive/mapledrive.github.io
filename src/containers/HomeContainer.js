import { connect } from "react-redux";
import {Home} from '../components/Home'

const mapStateToProps = state => ({ swim: state[0] });
const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;