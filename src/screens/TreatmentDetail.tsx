import {
  Button,
  Badge,
  Divider,
  IconButton,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemDetails,
} from "@silk/components";
import { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft";
import { CheckIcon } from "@phosphor-icons/react/Check";
import { useAura } from "../store";
import { money, toneVar, img } from "../data";

const cover = (url: string, w: number, h: number) => ({
  backgroundImage: `url(${img(url, w, h)})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;
const eyebrow = { fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" } as const;

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
      <div className="detail-image" style={t.image ? cover(t.image, 900, 1200) : { background: toneVar(t.tone) }} />
      <div className="detail-body">
        <IconButton aria-label="Back to home" variant="ghost" color="neutral" onClick={() => nav("home")}>
          <ArrowLeftIcon />
        </IconButton>

        <div className="flex flex-col gap-4" style={{ maxWidth: "52ch", marginTop: 24 }}>
          <Badge variant="accent" type="soft" style={{ alignSelf: "flex-start" }}>{t.category}</Badge>
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

        {/* What's included — Silk ListItem + ListItemCheckIcon */}
        <div className="flex flex-col gap-2" style={{ marginTop: 32, maxWidth: 620 }}>
          <span style={eyebrow}>What's included</span>
          <div style={{ marginTop: 4 }}>
            {t.included.map((item, i) => (
              <ListItem key={item} hasDivider={i < t.included.length - 1}>
                <CheckIcon size={18} style={{ color: "var(--aura-gold)", flex: "0 0 auto" }} />
                <ListItemContent>
                  <ListItemTitle>{item}</ListItemTitle>
                </ListItemContent>
              </ListItem>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <Button variant="fill" color="accent" size="l" onClick={() => nav("booking")}>
            Book this treatment
          </Button>
        </div>

        <Divider style={{ marginTop: 44 }} />

        <div style={{ marginTop: 24 }}>
          <span style={eyebrow}>More treatments</span>
          <div style={{ marginTop: 8 }}>
            {others.map((o) => (
              <ListItem key={o.id} onClick={() => select(o.id)} style={{ cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, flex: "0 0 auto", ...(o.image ? cover(o.image, 120, 120) : { background: toneVar(o.tone) }) }} />
                <ListItemContent>
                  <ListItemTitle>{o.name}</ListItemTitle>
                  <ListItemDetails>{o.category} · {o.duration}</ListItemDetails>
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
