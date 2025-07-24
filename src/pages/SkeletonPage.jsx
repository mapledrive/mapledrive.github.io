import { StyledSection, SectionTitle } from 'style';
import { SkeletonComponent } from 'features/skeleton/SkeletonComponent';

// https://github.com/ankitsaxena21/React-Skeleton-Loading-UI
const SkeletonPage = () => {
  return (
    <StyledSection>
      <SectionTitle>Custom skeleton without library</SectionTitle>
      <SkeletonComponent />
    </StyledSection>
  );
};

export { SkeletonPage };
