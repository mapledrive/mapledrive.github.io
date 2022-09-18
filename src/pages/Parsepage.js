import React, { useRef, useState } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';

function Parsepage() {
  const [text, setText] = useState('');
  const inputEl = useRef(null);

  const onChange = async () => {
    let file = inputEl.current.files[0];
    const fileContent = await file.text();
    setText(fileContent);
  };

  return (
    <StyledSection>
      <SectionTitle>Parser for text files</SectionTitle>
      <input ref={inputEl} onChange={onChange} type='file' />
      <SectionContent>{text}</SectionContent>
    </StyledSection>
  );
}

export { Parsepage };
