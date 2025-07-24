import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSidebarNews } from 'features/sidebar/sidebarSlice';
import Spinner from 'components/Spinner';
import {
  SidebarWidget,
  SidebarTitle,
  SidebarContent,
  StyledAside,
} from 'style';

const Aside = memo(() => {
  const list = useSelector(state => state.sidebar.list);
  const isLoading = useSelector(state => state.sidebar.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSidebarNews()); // Safe to add dispatch to the dependencies array
  }, [dispatch]);
  return (
    <StyledAside isLoading={isLoading}>
      {isLoading && <Spinner />}
      {list.map((post, index) => (
        <Pack key={index} title={post.title} content={post.content} />
      ))}
    </StyledAside>
  );
});

const Pack = ({ title, content }) => (
  <SidebarWidget>
    <SidebarTitle>{title}</SidebarTitle>
    <SidebarContent>{content}</SidebarContent>
  </SidebarWidget>
);

export { Aside };
