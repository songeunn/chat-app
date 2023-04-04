import styled from "styled-components";

export const Title = styled.h2`
  font-size: 18px;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  box-sizing: border-box;
`;

export const OutlinedInput = styled(Input)`
  border: 1px solid var(--point-color);
`;

export const TxtArea = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
`;

export const OutlinedTxtArea = styled(TxtArea)`
  border: 1px solid var(--point-color);
`;

export const ErrorMsg = styled.span`
  display: block;
  color: var(--error-color);
`;
