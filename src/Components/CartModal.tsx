import React, { Component } from "react";
import styled from "styled-components";


const Modal = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;

display: flex;
justify-content: center;
align-items: center;

& > div {
  width: 600px;
  background: white;
  padding: 30px;
  box-shadow: 1px 2px 15px #999;
}
`

interface Props {
  location: KoskiLocation;
  item: Price;
  closeModal: () => void;
}

interface State {

}

export class CartModal extends Component<Props, State> {
  render() {
    console.log("Render cart", this);
    return (
      <Modal>
        <div>
          Osta lupa {this.props.location.name}<br />
          hintaan {this.props.item.price}
          <br /><br />

          <b>Ostajan tiedot</b>
          <form>
            <input type="text" name="name" />
            <input type="text" name="address" />
            <input type="text" name="age" />

            <button type="submit">Osta</button>
          </form>

          <button onClick={this.props.closeModal}>Peruuta</button>

        </div>
      </Modal>)
  }
}

