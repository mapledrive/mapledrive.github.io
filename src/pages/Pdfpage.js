import { StyledSection } from 'style';

const Pdfpage = () => {
  return (
    <StyledSection>
      <div className='sectionTitle'>PDF Reader</div>
      <div className='sectionContent'>
        Drag and Drop interface for creating pdf files on the fly in the browser
        <br />
      </div>
    </StyledSection>
  );
};

export { Pdfpage };

// import React, { useState, useEffect } from 'react';

// const Pdfpage = () => {
//   const [postId, setPostId] = useState([]);

//   useEffect(() => {
//     async function postData() {
//       try {
//         const response = await fetch(
//           'https://inshortsapi.vercel.app/news?category=science'
//         );
//         const answer = await response.json();
//         setPostId(answer.data);
//       } catch (err) {
//         // перехватит любую ошибку в блоке try: и в fetch, и в response.json
//         console.log('error', err);
//       }
//     }
//     postData();
//   }, []);

//   if (!postId?.length) return null;

//   return (
//     <StyledSection>
//       <div className='sectionTitle'>{postId[0].title}</div>
//       <div className='sectionContent'>{postId[0].content}</div>
//     </StyledSection>
//   );
// };

// export { Pdfpage };
