import { useState } from "react";
import {
  Button,
  IconButton,
  ChoiceChip,
  RadioCardGroup,
  RadioCard,
  RadioCardInput,
  RadioCardContent,
  RadioCardTitle,
  RadioCardDescription,
} from "@silk/components";
import { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft";
import { useAura } from "../store";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;
const eyebrow = { fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-eyebrow)" } as const;

export default function Booking() {
  const { data, booking, setBooking, nav } = useAura();
  const [hint, setHint] = useState("");

  const t =
    data.treatments.find((x) => x.id === booking.treatmentId) ?? data.recommendedTreatment;
  const treatmentName = "name" in t ? t.name : data.recommendedTreatment.name;

  const confirm = () => {
    if (!booking.locationId) return setHint("Please choose a clinic to continue.");
    if (!booking.dateId) return setHint("Please choose a day to continue.");
    if (!booking.time) return setHint("Please choose a time to continue.");
    nav("confirmation");
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 26px 100px", display: "flex", flexDirection: "column", gap: 38 }}>
      <div className="aura-enter flex items-center gap-4" style={{ animationDelay: "60ms" }}>
        <IconButton aria-label="Back to treatment" variant="ghost" color="neutral" onClick={() => nav("treatment")}>
          <ArrowLeftIcon />
        </IconButton>
        <div>
          <span style={eyebrow}>Booking</span>
          <h1 style={{ ...serif, fontSize: 30, lineHeight: 1.14, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: "2px 0 0" }}>
            {treatmentName}
          </h1>
        </div>
      </div>

      {/* Clinic — Radio Cards (single-select, needs address context) */}
      <div className="aura-enter flex flex-col gap-4" style={{ animationDelay: "160ms" }}>
        <span style={eyebrow}>Choose a clinic</span>
        <RadioCardGroup
          value={booking.locationId}
          onValueChange={(v: string) => {
            setBooking({ locationId: v });
            setHint("");
          }}
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}
        >
          {data.locations.map((l) => (
            <RadioCard key={l.id}>
              <RadioCardInput value={l.id} />
              <RadioCardContent>
                <RadioCardTitle>{l.name}</RadioCardTitle>
                <RadioCardDescription>{l.address}</RadioCardDescription>
              </RadioCardContent>
            </RadioCard>
          ))}
        </RadioCardGroup>
      </div>

      {/* Day — single-select chips */}
      <div className="aura-enter flex flex-col gap-4" style={{ animationDelay: "260ms" }}>
        <span style={eyebrow}>Choose a day</span>
        <div className="flex flex-wrap gap-2.5">
          {data.bookingOptions.dates.map((d) => (
            <ChoiceChip
              key={d.id}
              pressed={booking.dateId === d.id}
              onPressedChange={() => {
                setBooking({ dateId: d.id });
                setHint("");
              }}
            >
              {d.label}
            </ChoiceChip>
          ))}
        </div>
      </div>

      {/* Time — single-select chips */}
      <div className="aura-enter flex flex-col gap-4" style={{ animationDelay: "360ms" }}>
        <span style={eyebrow}>Choose a time</span>
        <div className="flex flex-wrap gap-2.5">
          {data.bookingOptions.timeSlots.map((tm) => (
            <ChoiceChip
              key={tm}
              pressed={booking.time === tm}
              onPressedChange={() => {
                setBooking({ time: tm });
                setHint("");
              }}
            >
              {tm}
            </ChoiceChip>
          ))}
        </div>
      </div>

      <div className="aura-enter flex flex-col gap-3.5" style={{ animationDelay: "460ms" }}>
        <Button variant="fill" color="accent" size="l" onClick={confirm} style={{ width: "fit-content" }}>
          Confirm booking
        </Button>
        {hint && <span style={{ fontSize: 13, color: "var(--aura-mute)" }}>{hint}</span>}
      </div>
    </div>
  );
}
