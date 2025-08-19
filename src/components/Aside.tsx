import { useEffect, memo } from 'react';
import { fetchSidebarNews } from 'features/sidebar/sidebarSlice';
import Spinner from 'components/Spinner';
import {
  SidebarWidget,
  SidebarTitle,
  SidebarContent,
  StyledAside,
} from 'style';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const Aside = memo(() => {
  const list = useAppSelector(state => state.sidebar.list);
  const isLoading = useAppSelector(state => state.sidebar.isLoading);

  const dispatch = useAppDispatch();

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

const Pack = ({ title, content }: { title: string; content: string }) => (
  <SidebarWidget>
    <SidebarTitle>{title}</SidebarTitle>
    <SidebarContent>{content}</SidebarContent>
  </SidebarWidget>
);

export { Aside };
