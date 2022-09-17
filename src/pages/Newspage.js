import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from 'features/news/newsSlice';
import { StyledSection } from 'style';
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
          <div
            style={{
              textAlign: 'center',
              color: '#5a5a5a',
              marginBottom: '30px',
            }}
            className='sectionTitle'
          >
            Technology news
          </div>
          <div className='sectionTitle'>{list[0]?.title}</div>
          <div className='sectionContent'>{list[0]?.content}</div>
          <div className='sectionTitle'>{list[1]?.title}</div>
          <div className='sectionContent'>{list[1]?.content}</div>
          <div className='sectionTitle'>{list[2]?.title}</div>
          <div className='sectionContent'>{list[2]?.content}</div>
        </>
      )}
    </StyledSection>
  );
};

export { Newspage };
