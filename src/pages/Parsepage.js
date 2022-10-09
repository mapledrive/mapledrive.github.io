import React, { useRef, useState } from 'react';
import { StyledSection, SectionTitle, SectionContent } from 'style';

function Parsepage() {
  //const [text, setText] = useState('');
  const [structure, setArray] = useState([]);
  // Start by creating a variable called inputEl to store the Ref:
  const inputEl = useRef(null);

  // Accessing the first selected file using a classical DOM selector
  const onChange = async () => {
    let file = inputEl.current.files[0];
    const fileContent = await file.text();
    //setText(fileContent);
    let resultingArray = parseCsv(fileContent);
    setArray(resultingArray);
  };
  console.log(structure);
  // add an onChange handler to the input
  return (
    <StyledSection>
      <SectionTitle>Parser for text files</SectionTitle>
      <input ref={inputEl} onChange={onChange} type='file' />
      {/* <SectionContent>{text}</SectionContent> */}
      <SectionContent>
        <ul>
          {structure.map((item, index) => {
            return <li key={index}>{item.join()}</li>;
          })}
        </ul>
      </SectionContent>
    </StyledSection>
  );
}

export { Parsepage };

/**
 * CSV Parser.  Takes a string as input and returns
 * an array of arrays (for each row).
 *
 * @param input String, CSV input
 * @param separator String, single character used to separate fields.
 *        Defaults to ","
 * @param quote String, single character used to quote non-simple fields.
 *        Defaults to "\"".
 */
function parseCsv(input, separator, quote) {
  quote = quote || '"';
  separator = separator || ',';

  if (input.length === 0) return [['']];

  var objPattern = new RegExp(
    '(\\' +
      separator +
      '|\\r?\\n|\\r|^)' +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      separator +
      '\\r\\n]*))',
    'gi'
  );

  var arrData = [[]];
  var arrMatches = null;

  while ((arrMatches = objPattern.exec(input))) {
    var strMatchedSeparator = arrMatches[1];
    if (strMatchedSeparator.length && strMatchedSeparator !== separator) {
      arrData.push([]);
    }

    var strMatchedValue;
    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
    } else {
      strMatchedValue = arrMatches[3] ?? '';
    }

    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
}
