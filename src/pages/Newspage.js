import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from 'features/news/newsSlice';
import { StyledSection, SectionTitle, SectionContent } from 'style';
import Spinner from 'components/Spinner';

const Newspage = () => {
  const list = useSelector(state => state.news.list);
  const isLoading = useSelector(state => state.news.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews()); // Safe to add dispatch to the dependencies array
  }, [dispatch]);

  return (
    <StyledSection>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SectionTitle
            style={{
              textAlign: 'center',
              color: '#5a5a5a',
              marginBottom: '30px',
            }}
          >
            Technology news
          </SectionTitle>
          <SectionTitle>{list[0]?.title}</SectionTitle>
          <SectionContent>{list[0]?.content}</SectionContent>
          <SectionTitle>{list[1]?.title}</SectionTitle>
          <SectionContent>{list[1]?.content}</SectionContent>
          <SectionTitle>{list[2]?.title}</SectionTitle>
          <SectionContent>{list[2]?.content}</SectionContent>
        </>
      )}
    </StyledSection>
  );
};

export { Newspage };
