export interface BaseResponse<T> {
  status: boolean;
  timestamp: number;
  data: T;
}

// Airport Types
export type AirportResponse = BaseResponse<Airport[]>;

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export type NearbyAirportsResponse = BaseResponse<{
  current: Airport;
  nearby: Airport[];
  recent: Airport[];
}>;

// Flight Search Types
export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  date: string;
  originEntityId: string;
  destinationEntityId: string;
  returnDate?: string;
  adults: number;
  childrens?: number;
  infants?: number;
  cabinClass: string;
  currencyCode?: string;
  stops?: number;
  limit?: number;
}

// Price Calendar Types
export interface PriceCalendarParams {
  origin: string;
  destination: string;
  month: string; // YYYY-MM format
}

export type PriceCalendarResponse = BaseResponse<{
  dates: {
    date: string;
    price: number;
  }[];
}>;

// Flight Everywhere Types
export interface FlightEverywhereParams {
  origin: string;
  departureDate?: string;
  returnDate?: string;
  budget?: number;
}

// Multi-Stop Flight Types
export interface MultiStopFlightParams {
  segments: {
    origin: string;
    destination: string;
    date: string;
  }[];
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  cabinClass: string;
}

// Config Types
export type ConfigResponse = BaseResponse<{
  currencies: string[];
  languages: string[];
  countries: string[];
}>;

// Locale Types
export type LocaleResponse = BaseResponse<{
  currency: string;
  language: string;
  country: string;
}>;

export interface Root {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: Data;
}

export interface Data {
  context: Context;
  itineraries: Itinerary[];
  messages: string[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: FareAttributes;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  tags?: string[];
}

export interface FilterStats {
  duration: Duration;
  airports: Airport[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export type FareAttributes = unknown; // Placeholder for future use

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Leg {
  id: string;
  origin: Origin;
  destination: Destination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface Duration {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface StopPrices {
  direct: Direct;
  one: One;
  twoOrMore: TwoOrMore;
}

export type Direct = unknown; // Placeholder for future use

export type One = unknown; // Placeholder for future use

export type TwoOrMore = unknown; // Placeholder for future use

export interface Origin {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Destination {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Carriers {
  marketing: Marketing[];
  operationType: string;
}

export interface Segment {
  id: string;
  origin: Origin2;
  destination: Destination2;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: OperatingCarrier;
}

export interface Marketing {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Origin2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent;
  name: string;
  type: string;
  country: string;
}

export interface Destination2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent2;
  name: string;
  type: string;
  country: string;
}

export interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface OperatingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface Parent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface Parent2 {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}
