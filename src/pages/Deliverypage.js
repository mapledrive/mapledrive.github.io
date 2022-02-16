import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from 'actions';

const Deliverypage = () => {
  const list = useSelector(state => state.newsReducer.list);
  const isLoading = useSelector(state => state.newsReducer.isLoading);

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchNews()), []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section>
          <div className='sectionTitle'>{list[0]?.title}</div>
          <div className='sectionContent'>{list[0]?.content}</div>
          <div className='sectionTitle'>{list[1]?.title}</div>
          <div className='sectionContent'>{list[1]?.content}</div>
          <div className='sectionTitle'>{list[2]?.title}</div>
          <div className='sectionContent'>{list[2]?.content}</div>
        </section>
      )}
    </>
  );
};

export { Deliverypage };

const LoadingSpinner = () => 'Loading...';
