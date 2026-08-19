import { createContext, useContext } from "react";
import { data } from "./data";

export type Screen = "home" | "treatment" | "booking" | "confirmation";
export type Booking = {
  treatmentId?: string;
  locationId?: string;
  dateId?: string;
  time?: string;
};

type Ctx = {
  screen: Screen;
  nav: (s: Screen) => void;
  booking: Booking;
  setBooking: (patch: Booking) => void;
  data: typeof data;
};

export const AuraContext = createContext<Ctx>(null as unknown as Ctx);
export const useAura = () => useContext(AuraContext);
