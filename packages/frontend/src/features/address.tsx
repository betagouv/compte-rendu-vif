export const searchAddress = async (query: string) => {
  const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=10`);
  const data = await response.json();

  return data.features.map((feature: AddressFeature, index: number) => ({
    index,
    address: feature.properties.name,
    zipCode: feature.properties.postcode,
    city: feature.properties.city,
    label: feature.properties.label,
  }));
};

export type AddressResult = {
  address: string;
  zipCode: string;
  city: string;
  label: string;
  index: number;
};

export interface AddressFeature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Properties {
  label: string;
  score: number;
  type: string;
  importance: number;
  id: string;
  banId: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  locality: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
