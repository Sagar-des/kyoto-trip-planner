// Every field is optional on purpose: a missing value shows a short filler line, never a blank.
type Maybe<T> = T | null | undefined;

export type StayDetails = {
  destination?: Maybe<string>;
  listingTitle?: Maybe<string>;
  checkIn?: Maybe<string>; // "2025-04-11"
  checkOut?: Maybe<string>; // "2025-04-13"
  nightlyPriceUsd?: Maybe<number>;
  description?: Maybe<string>;
};

export type ExperienceDetails = {
  activityName?: Maybe<string>;
  duration?: Maybe<string>;
  dayPlan?: Maybe<{ day?: Maybe<string>; plan?: Maybe<string> }[]>; // day like "Sat 12 Apr"
};

export type FoodDetails = {
  restaurantName?: Maybe<string>;
  mealType?: Maybe<string>;
  priceRange?: Maybe<string>; // "$", "$$", "$$$", "$$$$"
  description?: Maybe<string>;
};

export type TripCardItem =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };
