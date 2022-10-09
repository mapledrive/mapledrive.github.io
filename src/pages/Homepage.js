import { StyledSection, SectionTitle } from 'style';
import styled from 'styled-components';

const Homepage = () => {
  return (
    <StyledSection>
      <SectionTitle>Hi, I'm Sait 👋</SectionTitle>
      <SectionTitle>I love to build amazing apps.</SectionTitle>
      <SkillsContent>
        I am a Javascript Developer 🚀 I have experience in building <br />
        Web applications with JavaScript / Reactjs / Redux / Material UI <br />
        and some other cool libraries and frameworks.
      </SkillsContent>
    </StyledSection>
  );
};

export { Homepage };

const SkillsContent = styled.main`
  color: #222;
  padding: 12px 0px;
  box-sizing: border-box;
  font-size: 20px;
  font-family: Roboto;
  line-height: 30px;
  font-weight: 400;
  font-style: normal;
`;
