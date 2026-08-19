import {
  Card,
  Badge,
  Avatar,
  AvatarFallback,
  Link,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemDetails,
} from "@silk/components";
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight";
import { useAura } from "../store";
import { toneVar } from "../data";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;
const eyebrow = {
  fontSize: 10.5,
  textTransform: "uppercase",
  letterSpacing: "0.28em",
  color: "var(--aura-sage)",
} as const;

export default function Home() {
  const { data, nav, setBooking } = useAura();
  const { patient: P, activeProgram: PR, brand } = data;

  const goTreatment = (id: string) => {
    setBooking({ treatmentId: id });
    nav("treatment");
  };

  return (
    <div className="home-split">
      {/* LEFT — identity, next visit, care team */}
      <aside className="home-aside">
        <div className="aura-enter flex flex-col gap-5" style={{ animationDelay: "60ms" }}>
          <span className="wordmark">{brand.wordmark}</span>
          <Avatar shape="circle" size="xl">
            <AvatarFallback style={{ background: "var(--aura-tone-skin)", ...serif, color: "rgba(34,31,27,.55)" }}>
              {P.initials}
            </AvatarFallback>
          </Avatar>
          <h1 style={{ ...serif, fontSize: 31, lineHeight: 1.14, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: 0 }}>
            Good morning, {P.greetingName}
          </h1>
          <p style={{ fontSize: 12.5, color: "var(--aura-mute)", margin: 0 }}>
            Member since {P.memberSince} · {P.homeLocation}
          </p>
        </div>

        <div className="aura-enter" style={{ animationDelay: "180ms" }}>
          <AppointmentCard />
        </div>

        <div className="aura-enter" style={{ animationDelay: "300ms" }}>
          <CareTeam />
        </div>
      </aside>

      {/* RIGHT — the journey */}
      <main className="home-main">
        <ProgrammeCard onOpen={() => goTreatment(data.recommendedTreatment.treatmentId)} />

        <div className="aura-enter" style={{ animationDelay: "220ms" }}>
          <JourneyCard />
        </div>

        <div className="aura-enter" style={{ animationDelay: "300ms" }}>
          <span style={eyebrow}>Considered for you</span>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 12 }}>
            {data.recommendations.map((r) => (
              <RecommendationCard key={r.treatmentId} r={r} onOpen={() => goTreatment(r.treatmentId)} />
            ))}
          </div>
        </div>

        <div className="aura-enter" style={{ animationDelay: "380ms" }}>
          <PractitionerNote />
        </div>

        <div className="aura-enter" style={{ animationDelay: "460ms" }}>
          <RecentVisits />
        </div>

        <div className="aura-enter" style={{ animationDelay: "540ms", paddingTop: 2 }}>
          <Link
            variant="default"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              nav("treatment");
            }}
            style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 12 }}
          >
            Explore treatments <ArrowRightIcon />
          </Link>
        </div>
      </main>
    </div>
  );
}

function ProgrammeCard({ onOpen }: { onOpen: () => void }) {
  const { data } = useAura();
  const PR = data.activeProgram;
  const segs = Array.from({ length: PR.sessionTotal }, (_, i) => i < PR.sessionCurrent);
  return (
    <Card
      isInteractive
      onClick={onOpen}
      className="aura-enter bg-surface-interactive-strong text-text-inverted border-transparent"
      style={{ animationDelay: "120ms", padding: 30, display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div className="flex items-start justify-between gap-4">
        <span style={{ ...eyebrow, color: "var(--aura-sage)" }}>{PR.eyebrow}</span>
        <Badge variant="accent" type="soft">
          Session {PR.sessionCurrent} of {PR.sessionTotal}
        </Badge>
      </div>
      <h2 style={{ ...serif, fontSize: 29, lineHeight: 1.15, color: "var(--aura-on-dark)", margin: 0 }}>{PR.name}</h2>
      {/* phase progress — gold segments, hairline for upcoming */}
      <div className="flex gap-1.5" style={{ maxWidth: 460 }}>
        {segs.map((on, i) => (
          <span key={i} style={{ height: 2, flex: 1, background: on ? "var(--aura-gold)" : "rgba(246,242,234,.28)" }} />
        ))}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(246,242,234,.72)", margin: 0, maxWidth: "46ch" }}>{PR.journeyNote}</p>
    </Card>
  );
}

function JourneyCard() {
  const { data } = useAura();
  const J = data.journey;
  return (
    <Card className="bg-surface-neutral-soft" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
      <span style={eyebrow}>{J.eyebrow}</span>
      <div className="flex" style={{ gap: 0 }}>
        {J.phases.map((ph, i) => {
          const active = ph.state !== "upcoming";
          return (
            <div key={ph.name} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="flex items-center">
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 9999,
                    flex: "0 0 auto",
                    background: ph.state === "current" ? "var(--aura-gold)" : active ? "var(--aura-forest)" : "transparent",
                    border: active ? "none" : "1px solid var(--aura-line)",
                  }}
                />
                {i < J.phases.length - 1 && (
                  <span style={{ height: 1, flex: 1, background: "var(--aura-line)" }} />
                )}
              </div>
              <div>
                <div style={{ ...serif, fontSize: 17, color: "var(--aura-ink)" }}>{ph.name}</div>
                <div style={{ fontSize: 12, color: ph.state === "current" ? "var(--aura-gold)" : "var(--aura-mute)", marginTop: 2 }}>
                  {ph.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function RecommendationCard({
  r,
  onOpen,
}: {
  r: { name: string; reason: string; tone: string };
  onOpen: () => void;
}) {
  return (
    <Card isInteractive onClick={onOpen} style={{ padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: 96, background: toneVar(r.tone) }} />
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 7 }}>
        <h3 style={{ ...serif, fontSize: 20, lineHeight: 1.2, margin: 0, color: "var(--aura-ink)" }}>{r.name}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--aura-mute)", margin: 0 }}>{r.reason}</p>
      </div>
    </Card>
  );
}

function PractitionerNote() {
  const { data } = useAura();
  const N = data.practitionerNote;
  return (
    <Card className="bg-surface-neutral-soft" style={{ padding: "24px 26px", display: "flex", gap: 18, alignItems: "flex-start" }}>
      <Avatar shape="circle" size="l">
        <AvatarFallback style={{ background: "var(--aura-tone-skin)", ...serif, color: "rgba(34,31,27,.55)" }}>
          {N.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <span style={eyebrow}>{N.eyebrow}</span>
        <p style={{ ...serif, fontSize: 18, lineHeight: 1.5, color: "var(--aura-ink)", margin: 0 }}>“{N.message}”</p>
        <span style={{ fontSize: 12.5, color: "var(--aura-mute)" }}>{N.from}</span>
      </div>
    </Card>
  );
}

function RecentVisits() {
  const { data } = useAura();
  return (
    <div className="flex flex-col gap-2">
      <span style={eyebrow}>Recent visits</span>
      <div>
        {data.recentVisits.map((v, i) => (
          <ListItem key={i}>
            <ListItemContent>
              <ListItemTitle>{v.name}</ListItemTitle>
              <ListItemDetails>
                {v.date} · {v.practitioner}
              </ListItemDetails>
            </ListItemContent>
          </ListItem>
        ))}
      </div>
    </div>
  );
}

function CareTeam() {
  const { data } = useAura();
  const CT = data.careTeam;
  return (
    <div className="flex flex-col gap-3">
      <span style={eyebrow}>{CT.eyebrow}</span>
      <div className="flex flex-col gap-3">
        {CT.members.map((m) => (
          <div key={m.name} className="flex items-center gap-3">
            <Avatar shape="circle" size="m">
              <AvatarFallback style={{ background: "var(--aura-tone-skin)", ...serif, color: "rgba(34,31,27,.55)" }}>
                {m.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div style={{ fontSize: 14, color: "var(--aura-ink)" }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "var(--aura-mute)" }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentCard() {
  const { data } = useAura();
  const AP = data.upcomingAppointment;
  return (
    <Card style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 20 }} className="bg-surface-neutral-soft">
      <div style={{ textAlign: "center", flex: "0 0 auto", paddingRight: 20, borderRight: "1px solid var(--aura-line)" }}>
        <div style={{ ...serif, fontSize: 30, lineHeight: 1, color: "var(--aura-gold)" }}>{AP.day}</div>
        <div style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--aura-mute)", marginTop: 4 }}>
          {AP.month}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={eyebrow}>{AP.eyebrow}</span>
        <div style={{ ...serif, fontSize: 18, lineHeight: 1.25, color: "var(--aura-ink)" }}>{AP.treatmentName}</div>
        <div style={{ fontSize: 13, color: "var(--aura-mute)" }}>
          {AP.time} · {AP.practitioner} · {AP.location}
        </div>
      </div>
    </Card>
  );
}
