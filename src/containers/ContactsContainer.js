import { connect } from "react-redux";
import Contacts from '../components/Contacts'

const mapStateToProps = state => ({ repos: state[3] });
const ContactsContainer = connect(mapStateToProps)(Contacts);

export default ContactsContainer;