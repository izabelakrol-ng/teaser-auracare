import {
  Button,
  IconButton,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemDetails,
} from "@silk/components";
import { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft";
import { useAura } from "../store";
import { money, toneVar } from "../data";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;

export default function TreatmentDetail() {
  const { data, booking, setBooking, nav } = useAura();
  const t =
    data.treatments.find((x) => x.id === booking.treatmentId) ??
    data.treatments.find((x) => x.id === data.recommendedTreatment.treatmentId)!;
  const others = data.treatments.filter((x) => x.id !== t.id);

  const select = (id: string) => {
    setBooking({ treatmentId: id });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="detail-split" style={{ background: "var(--aura-cream)" }}>
      <div className="detail-image" style={{ background: toneVar(t.tone) }} />
      <div className="detail-body">
        <IconButton aria-label="Back to home" variant="ghost" color="neutral" onClick={() => nav("home")}>
          <ArrowLeftIcon />
        </IconButton>

        <div className="aura-enter flex flex-col gap-4" style={{ animationDelay: "60ms", maxWidth: "52ch", marginTop: 24 }}>
          <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>
            {t.category}
          </span>
          <h1 style={{ ...serif, fontSize: 34, lineHeight: 1.12, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: 0 }}>
            {t.name}
          </h1>
          <div className="flex items-baseline gap-4">
            <span style={{ ...serif, fontSize: 24, color: "var(--aura-gold)" }}>{money(t.price)}</span>
            <span style={{ fontSize: 12.5, letterSpacing: "0.06em", color: "var(--aura-mute)" }}>
              {t.duration} · {t.practitioner}
            </span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--aura-ink)", margin: 0 }}>{t.longDescription}</p>
        </div>

        <div className="aura-enter" style={{ animationDelay: "180ms", marginTop: 32 }}>
          <Button variant="fill" color="accent" size="l" onClick={() => nav("booking")}>
            Book this treatment
          </Button>
        </div>

        <div className="aura-enter" style={{ animationDelay: "300ms", marginTop: 44 }}>
          <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>
            More treatments
          </span>
          <div style={{ marginTop: 8 }}>
            {others.map((o) => (
              <ListItem key={o.id} onClick={() => select(o.id)}>
                <div style={{ width: 52, height: 52, flex: "0 0 auto", background: toneVar(o.tone) }} />
                <ListItemContent>
                  <ListItemTitle>{o.name}</ListItemTitle>
                  <ListItemDetails>
                    {o.category} · {o.duration}
                  </ListItemDetails>
                </ListItemContent>
                <span style={{ ...serif, fontSize: 16, color: "var(--aura-gold)" }}>{money(o.price)}</span>
              </ListItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
