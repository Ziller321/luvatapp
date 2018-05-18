import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap as GoogleMapComponent,
  Marker
} from "react-google-maps";


interface Props {
  locationList: KoskiLocation[]
  activeLocation?: KoskiLocation
}
interface State {
  locationList: KoskiLocation[],
  activeLocation?: KoskiLocation
  pos: {
    lat: number;
    lng: number;
  }
}

class MapComponent extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      locationList: [],
      pos: {
        lat: 0,
        lng: 0
      }
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.locationList === prevState.locationList) {
      return null;
    }

    return {
      activeLocation: nextProps.activeLocation,
      locationList: nextProps.locationList,
    }
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError, options);
  }
  geolocationSuccess = (pos: Position) => {
    const crd = pos.coords;

    this.setState({
      pos: {
        lat: crd.latitude,
        lng: crd.longitude
      }
    })
  }


  geolocationError = (err: PositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  render() {
    console.log("render", this);

    return (
      <GoogleMapComponent defaultZoom={8} center={this.state.pos}>
        {this.state.locationList.map(location => {
          // console.log("location", location);

          const position = location.gdata.results[0].geometry.location;
          return (
            <Marker key={position.lat} position={position} />
          )

        })}

      </GoogleMapComponent>
    )
  }
}

export const GoogleMap = compose<{}, Props>(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBRCIZ4b_fk8H1-IRnrDwC-Q9lQzw0u3Uc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapComponent)