import { connect } from "react-redux";
import Service from '../components/Service'

const mapStateToProps = state => ({ repos: state[1] });
const ServiceContainer = connect(mapStateToProps)(Service);

export default ServiceContainer;