import { useState } from "react";
import { AuraContext, type Screen, type Booking } from "./store";
import { data } from "./data";
import Home from "./screens/Home";
import TreatmentDetail from "./screens/TreatmentDetail";
import Booking_ from "./screens/Booking";
import Confirmation from "./screens/Confirmation";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [booking, setB] = useState<Booking>({});

  const nav = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0 });
  };
  const setBooking = (patch: Booking) => setB((b) => ({ ...b, ...patch }));

  return (
    <AuraContext.Provider value={{ screen, nav, booking, setBooking, data }}>
      {screen === "home" && <Home />}
      {screen === "treatment" && <TreatmentDetail />}
      {screen === "booking" && <Booking_ />}
      {screen === "confirmation" && <Confirmation />}
    </AuraContext.Provider>
  );
}
