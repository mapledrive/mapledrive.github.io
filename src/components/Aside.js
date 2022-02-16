import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSidebarNews } from 'actions';

export const Aside = () => {
  const list = useSelector(state => state.sidebar.list);
  const isLoading = useSelector(state => state.sidebar.isLoading);

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSidebarNews()), []);
  return (
    <aside>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        list.map((post, index) => (
          <Pack key={index} title={post.title} content={post.content} />
        ))
      )}
    </aside>
  );
};

const Pack = ({ title, content }) => (
  <div className='sidebarwidget'>
    <div className='sidebarTitle'>{title}</div>
    <div className='sidebarContent'>{content}</div>
  </div>
);

const LoadingSpinner = () => 'Loading...';
