import styled from "styled-components";
export const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  max-height: 100%;
  grid-template-areas:
    "header header"
    "sidebar map";

  grid-template-rows: 40px 1fr;
  grid-template-columns: 400px 1fr;
`;
