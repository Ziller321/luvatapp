import React, { SFC } from "react";
import styled from "styled-components";

const Details = styled.div`
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    margin: 10px;

`

interface Props {
  location: KoskiLocation;
  openCart: (item: Price) => void
}

export const LocationDetails: SFC<Props> = ({ location, openCart }) => (
  <Details>
    {location.address}
    {location.prices.map((price, index) => (
      <div key={index}>{price.price} <button type="button" onClick={() => openCart(price)}>Osta</button></div>
    ))}
  </Details>
)

