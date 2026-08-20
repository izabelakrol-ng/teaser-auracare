import {
  Button,
  Divider,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemDetails,
} from "@silk/components";
import { CheckIcon } from "@phosphor-icons/react/Check";
import { useAura } from "../store";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;

export default function Confirmation() {
  const { data, booking, nav } = useAura();
  const C = data.confirmation;

  const t = data.treatments.find((x) => x.id === booking.treatmentId) ?? data.recommendedTreatment;
  const loc = data.locations.find((x) => x.id === booking.locationId);
  const day = data.bookingOptions.dates.find((x) => x.id === booking.dateId);

  const treatmentName = "name" in t ? t.name : data.recommendedTreatment.name;
  const practitioner = "practitioner" in t ? t.practitioner : data.upcomingAppointment.practitioner;
  const locName = loc ? loc.name : data.patient.homeLocation;
  const dayLabel = day ? day.label : data.upcomingAppointment.dateLabel;
  const time = booking.time ?? data.upcomingAppointment.time;

  const rows: [string, string][] = [
    ["Treatment", treatmentName],
    ["Practitioner", practitioner],
    ["Clinic", locName],
    ["When", `${dayLabel} · ${time}`],
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--aura-cream)" }}>
      <div style={{ maxWidth: 460, width: "100%", padding: "40px 26px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
        {/* gold hairline confirmation mark */}
        <div style={{ width: 64, height: 64, borderRadius: 9999, border: "1px solid var(--aura-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--aura-gold)" }}>
          <CheckIcon size={26} />
        </div>

        <div className="flex flex-col gap-3">
          <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-eyebrow)" }}>{C.eyebrow}</span>
          <h1 style={{ ...serif, fontSize: 32, lineHeight: 1.14, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: 0 }}>{C.message}</h1>
        </div>

        {/* summary — Silk ListItems (value prominent, label beneath) */}
        <div style={{ width: "100%", textAlign: "left", marginTop: 6 }}>
          <Divider />
          {rows.map(([label, value]) => (
            <ListItem key={label}>
              <ListItemContent>
                <ListItemTitle>{value}</ListItemTitle>
                <ListItemDetails>{label}</ListItemDetails>
              </ListItemContent>
            </ListItem>
          ))}
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--aura-mute)", margin: "6px 0 0", maxWidth: "38ch" }}>{C.reassurance}</p>

        <Button variant="outline" color="neutral" size="l" onClick={() => nav("home")} style={{ marginTop: 8 }}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
