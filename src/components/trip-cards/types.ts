// Field names match the workbook columns (Stays, Experiences, Food sheets).
// Every field is optional on purpose: an empty cell shows a short filler line, never a blank.
type Maybe<T> = T | null | undefined;

export type StayDetails = {
  optionId?: Maybe<string>;
  listingTitle?: Maybe<string>;
  propertyType?: Maybe<string>;
  neighbourhood?: Maybe<string>;
  nights?: Maybe<number>;
  pricePerNightUsd?: Maybe<number>;
  totalForTwoNightsUsd?: Maybe<number>;
  guestRating?: Maybe<number>;
  reviewCount?: Maybe<number>;
  hostFirstName?: Maybe<string>;
  highlight?: Maybe<string>;
  checkInDate?: Maybe<string>; // "2025-04-11"
  checkOutDate?: Maybe<string>; // "2025-04-13"
};

export type ExperienceDetails = {
  optionId?: Maybe<string>;
  experienceTitle?: Maybe<string>;
  category?: Maybe<string>;
  hostFirstName?: Maybe<string>;
  date?: Maybe<string>; // "2025-04-12"
  startTime?: Maybe<string>; // "10:30"
  durationHours?: Maybe<number>;
  pricePerGuestUsd?: Maybe<number>;
  totalForTwoGuestsUsd?: Maybe<number>;
  rating?: Maybe<number>;
  meetingPoint?: Maybe<string>;
  availability?: Maybe<string>; // "Spots open" | "Sold out"
};

export type FoodDetails = {
  optionId?: Maybe<string>;
  placeName?: Maybe<string>;
  cuisine?: Maybe<string>;
  neighbourhood?: Maybe<string>;
  meal?: Maybe<string>;
  priceLevel?: Maybe<string>; // "$", "$$", "$$$"
  estCostForTwoUsd?: Maybe<number>;
  walkFromStayMin?: Maybe<number>;
  bookingNote?: Maybe<string>;
};

export type TripCardItem =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };
