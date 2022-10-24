import React, { Suspense } from 'react';
import { StyledSection, SectionTitle } from 'style';

const GithubComponent = React.lazy(() =>
  import('features/github/GithubComponent')
);

const Githubpage = () => {
  return (
    <StyledSection>
      <SectionTitle>Search Github Repositories</SectionTitle>
      <Suspense fallback={<div>Loading...</div>}>
        <GithubComponent />
      </Suspense>
    </StyledSection>
  );
};

export { Githubpage };
