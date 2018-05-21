interface GoogleData {
  results: GResult[];
  status: string;
}

interface Address {
  long_name: string;
  short_name: string;
  type: string[];
}

interface Price {
  price: string;
  type: string;
}

declare interface Coordinates {
  lat: number;
  lng: number;
}

interface GResult {
  address_components: Address[];
  formatted_address: string;
  geometry: {
    location: Coordinates;
    location_type: string;
    viewport: {
      northeast: Coordinates;
      southwest: Coordinates;
    };
  };
  place_id: string;
  type: string[];
}

declare interface KoskiLocation {
  id: string;
  name: string;
  prices: Price[];
  address: string;
  gdata: GoogleData;
}
