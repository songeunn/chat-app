import styled from "styled-components";

export const OutlinedButton = styled.button`
  background-color: black;
  border: 1px solid var(--point-color);
  color: var(--point-color);
  &:hover {
    background-color: var(--point-color);
    border: 1px solid black;
    color: black;
  }
`;

export const FilledButton = styled.button`
  background-color: var(--point-color);
  border: 1px solid black;
  color: black;
  &:hover {
    background-color: black;
    border: 1px solid var(--point-color);
    color: var(--point-color);
  }
`;
