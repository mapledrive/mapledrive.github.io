import Slider from 'features/slider/Slider';
import { StyledSection } from 'style';

const Sliderpage = () => {
  return (
    <StyledSection>
      <div className='sectionTitle'>Slider</div>
      <div className='sectionContent'>
        Very simple example of UI element that can be reused on any React app
      </div>
      <Slider />
    </StyledSection>
  );
};

export { Sliderpage };
