import { StyledSection, SectionTitle, SectionContent } from 'style';

const Pdfpage = () => {
  return (
    <StyledSection>
      <SectionTitle>PDF Reader</SectionTitle>
      <SectionContent>
        Drag and Drop interface for creating pdf files on the fly in the browser
        <br />
      </SectionContent>
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
//       <SectionTitle>{postId[0].title}</SectionTitle>
//       <SectionContent>{postId[0].content}</SectionContent>
//     </StyledSection>
//   );
// };

// export { Pdfpage };
