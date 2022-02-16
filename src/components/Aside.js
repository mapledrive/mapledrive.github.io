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
      {list.map((post, index) => (
        <Pack key={index} title={post.title} content={post.content} />
      ))}
    </aside>
  );
};

const Pack = ({ title, content }) => (
  <div className='sidebarwidget'>
    <div className='sidebarTitle'>{title}</div>
    <div className='sidebarContent'>{content}</div>
  </div>
);

const asideFill = [
  {
    title: 'About Maple Drive',
    content:
      'Maple Drive is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info',
  },
  {
    title: 'New To this website?',
    content:
      'Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.',
  },
  {
    title: 'About Maple Drive',
    content:
      'Maple Drive is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info',
  },
  {
    title: 'New To this website?',
    content:
      'Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.',
  },
];
