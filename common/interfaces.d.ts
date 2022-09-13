export interface ITrafficCamResponse {
  items: Item[];
  api_info: IAPIInfo;
}

export interface IAPIInfo {
  status: string;
}

export interface IItem {
  timestamp: string;
  cameras: ICamera[];
}

export interface ICamera {
  timestamp: string;
  image: string;
  location: ILocation;
  camera_id: string;
  image_metadata: IImageMetadata;
}

export interface IImageMetadata {
  height: number;
  width: number;
  md5: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IGoogleAPILocationResponse {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  location_type: string;
  viewport: Bounds;
  bounds?: Bounds;
}

export interface Bounds {
  northeast: Location;
  southwest: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
