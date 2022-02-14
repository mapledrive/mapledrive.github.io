import React, { useState, useEffect } from 'react';

const Servicepage = () => {
  const [postId, setPostId] = useState([]);

  const postData = async () => {
    try {
      const response = await fetch(
        'https://inshortsapi.vercel.app/news?category=science',
      );
      const answer = await response.json();
      setPostId(answer.data);
    } catch (err) {
      // перехватит любую ошибку в блоке try: и в fetch, и в response.json
      console.log('error', err);
    }
  };

  useEffect(postData, []);

  if (!postId?.length) return null;

  return (
    <section>
      <div className='sectionTitle'>{postId[0].title}</div>
      <div className='sectionContent'>{postId[0].content}</div>
    </section>
  );
};

export { Servicepage };

// const Servicepage = () => {
//   return (
//     <section>
//       <div className='sectionTitle'>Service page</div>
//       <div className='sectionContent'>
//         This is a Service page. The page of the app
//       </div>
//     </section>
//   );
// };

// export { Servicepage };
