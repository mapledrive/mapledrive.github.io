import { connect } from "react-redux";
import {Delivery} from '../components/Delivery'

const mapStateToProps = state => ({ swim: state[2] });
const DeliveryContainer = connect(mapStateToProps)(Delivery);

export default DeliveryContainer;