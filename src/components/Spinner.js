import Gear from 'Gear';
import { Overlay, GearWrap } from 'style';

const LoadingSpinner = () => (
  <Overlay>
    <GearWrap>
      <Gear />
    </GearWrap>
  </Overlay>
);

export default LoadingSpinner;
