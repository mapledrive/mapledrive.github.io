import Gear from 'Gear';
import { Overlay } from 'style';

const LoadingSpinner = () => (
  <Overlay>
    <div className='gearwrap'>
      <Gear />
    </div>
  </Overlay>
);

export default LoadingSpinner;
