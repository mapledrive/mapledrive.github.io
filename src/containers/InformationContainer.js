import { connect } from "react-redux";
import Information from '../components/Information'

const mapStateToProps = state => ({ repos: state[5] });
const InformationContainer = connect(mapStateToProps)(Information);

export default InformationContainer;