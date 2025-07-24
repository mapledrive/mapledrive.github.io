import Slider from 'features/slider/Slider';
import { StyledSection, SectionTitle, SectionContent } from 'style';

const Sliderpage = () => {
  return (
    <StyledSection>
      <SectionTitle>Slider</SectionTitle>
      <SectionContent>
        Very simple example of UI element that can be reused on any React app
      </SectionContent>
      <Slider />
    </StyledSection>
  );
};

export { Sliderpage };
