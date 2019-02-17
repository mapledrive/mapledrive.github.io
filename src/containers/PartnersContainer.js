import { connect } from "react-redux";
import Partners from '../components/Partners'

const mapStateToProps = state => ({ swim: state[4] });
const PartnersContainer = connect(mapStateToProps)(Partners);

export default PartnersContainer;