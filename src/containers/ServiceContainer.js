import { connect } from "react-redux";
import {Contacts} from '../components/Contacts'

const mapStateToProps = state => ({ swim: state[3] });
const ContactsContainer = connect(mapStateToProps)(Contacts);

export default ContactsContainer;