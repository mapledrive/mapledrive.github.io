import styled from 'styled-components';

export const StyledForm = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px;
  background-color: whitesmoke;
  width: 100%;
`;

export const StyledNumeric = styled.input`
  font-size: 16px;
  outline: none;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const StyledLabel = styled.label`
  line-height: normal;
  font-size: 16px;
`;
