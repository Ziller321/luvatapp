import styled from "styled-components";
import React, { SFC } from "react";

const HeaderBar = styled.div`
  grid-area: header;
  background: #C4ECB4;
  padding: 10px;
  color: #707070;
  z-index: 1;
  box-shadow: 1px 2px 5px #999;
`


interface Props {
  title: string;
}

export const Header: SFC<Props> = ({ title }) => (
  <HeaderBar>
    {title}
  </HeaderBar>
)