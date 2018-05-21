import React, { Component } from "react";
import styled from "styled-components";
import { LocationDetails } from "src/Components/LocationDetails";
import { CartModal } from "./CartModal";

const LocationListItemWrapper = styled.div`
  padding: 10px;
  font-weight: light;
`;

interface Props {
  onClick: () => void;
  location: KoskiLocation;
}

interface State {
  showDetails: boolean;
  showCart: boolean;
  cartItem?: Price;
}

export class LocationListItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showDetails: false,
      showCart: false
    }
  }
  onClick = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
    this.props.onClick();
  }

  openCart = (item: Price) => {
    console.log("Open cart ", item)
    this.setState({
      cartItem: item,
      showCart: true
    })
  }

  closeModal = () => {
    this.setState({
      showCart: false
    })
  }

  render() {
    const { location } = this.props;
    return (
      <LocationListItemWrapper onClick={this.onClick}>
        {location.name}
        {this.state.showDetails && (
          <LocationDetails location={location} openCart={this.openCart} />
        )}
        {
          this.state.showCart && this.state.cartItem && (
            <CartModal closeModal={this.closeModal} location={this.props.location} item={this.state.cartItem} />
          )
        }
      </LocationListItemWrapper>
    );
  }
}
