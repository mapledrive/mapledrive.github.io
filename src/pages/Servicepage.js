import React, { useState, useEffect } from 'react';

const Servicepage = () => {
  const [postId, setPostId] = useState([]);

  useEffect(() => {
    async function postData() {
      try {
        const response = await fetch(
          'https://inshortsapi.vercel.app/news?category=science'
        );
        const answer = await response.json();
        setPostId(answer.data);
      } catch (err) {
        // перехватит любую ошибку в блоке try: и в fetch, и в response.json
        console.log('error', err);
      }
    }
    postData();
  }, []);

  if (!postId?.length) return null;

  return (
    <section>
      <div className='sectionTitle'>{postId[0].title}</div>
      <div className='sectionContent'>{postId[0].content}</div>
    </section>
  );
};

export { Servicepage };
