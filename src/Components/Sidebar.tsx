import React, { Component } from "react";
import { SidebarContainer } from "./SidebarContainer";
import { LocationListItem } from './LocationListItem';

interface Props {
  locationList: KoskiLocation[];
  setActiveLocation: (location: KoskiLocation) => void;
}

export class Sidebar extends Component<Props> {
  render() {
    const { locationList } = this.props;
    return (
      <SidebarContainer>
        {
          locationList.map(location =>
            <LocationListItem key={location.id} onClick={() => this.props.setActiveLocation(location)}>
              {location.name}
            </LocationListItem>
          )
        }
      </SidebarContainer>
    )
  }
}