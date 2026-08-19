import { Button } from "@silk/components";
import { CheckIcon } from "@phosphor-icons/react/Check";
import { useAura } from "../store";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;

export default function Confirmation() {
  const { data, booking, nav } = useAura();
  const C = data.confirmation;

  const t =
    data.treatments.find((x) => x.id === booking.treatmentId) ?? data.recommendedTreatment;
  const loc = data.locations.find((x) => x.id === booking.locationId);
  const day = data.bookingOptions.dates.find((x) => x.id === booking.dateId);

  const treatmentName = "name" in t ? t.name : data.recommendedTreatment.name;
  const practitioner = "practitioner" in t ? t.practitioner : data.upcomingAppointment.practitioner;
  const locName = loc ? loc.name : data.patient.homeLocation;
  const dayLabel = day ? day.label : data.upcomingAppointment.dateLabel;
  const time = booking.time ?? data.upcomingAppointment.time;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: 24, padding: "14px 0", borderTop: "1px solid var(--aura-line)" }}
    >
      <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--aura-sage)" }}>{label}</span>
      <span style={{ fontSize: 14, color: "var(--aura-ink)", textAlign: "right" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--aura-cream)" }}>
      <div style={{ maxWidth: 460, width: "100%", padding: "40px 26px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
        {/* gold hairline confirmation mark */}
        <div
          className="aura-enter"
          style={{ width: 64, height: 64, borderRadius: 9999, border: "1px solid var(--aura-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--aura-gold)" }}
        >
          <CheckIcon size={26} />
        </div>

        <div className="aura-enter flex flex-col gap-3" style={{ animationDelay: "80ms" }}>
          <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>{C.eyebrow}</span>
          <h1 style={{ ...serif, fontSize: 32, lineHeight: 1.14, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: 0 }}>{C.message}</h1>
        </div>

        <div className="aura-enter" style={{ animationDelay: "200ms", width: "100%", borderBottom: "1px solid var(--aura-line)", marginTop: 6 }}>
          <Row label="Treatment" value={treatmentName} />
          <Row label="Practitioner" value={practitioner} />
          <Row label="Clinic" value={locName} />
          <Row label="When" value={`${dayLabel} · ${time}`} />
        </div>

        <p className="aura-enter" style={{ animationDelay: "320ms", fontSize: 13.5, lineHeight: 1.7, color: "var(--aura-mute)", margin: "6px 0 0", maxWidth: "38ch" }}>
          {C.reassurance}
        </p>

        <div className="aura-enter" style={{ animationDelay: "420ms", marginTop: 8 }}>
          <Button variant="outline" color="neutral" size="l" onClick={() => nav("home")}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
