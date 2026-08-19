import { Card, Badge, Avatar, AvatarFallback, Link } from "@silk/components";
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight";
import { useAura } from "../store";
import { toneVar } from "../data";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;

export default function Home() {
  const { data, nav, setBooking } = useAura();
  const { patient: P, activeProgram: PR, recommendedTreatment: RC, upcomingAppointment: AP, brand } = data;

  const goTreatment = (id: string) => {
    setBooking({ treatmentId: id });
    nav("treatment");
  };

  return (
    <div className="home-split">
      {/* LEFT — identity + next appointment, pinned */}
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

        <div className="aura-enter mt-auto" style={{ animationDelay: "180ms" }}>
          <AppointmentCard />
        </div>
      </aside>

      {/* RIGHT — the journey */}
      <main className="home-main">
        {/* Forest programme card — the single dark mass + primary affordance */}
        <Card
          isInteractive
          onClick={() => goTreatment(RC.treatmentId)}
          className="aura-enter bg-surface-interactive-strong text-text-inverted border-transparent"
          style={{ animationDelay: "120ms", padding: 30, display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div className="flex items-start justify-between gap-4">
            <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>
              {PR.eyebrow}
            </span>
            <Badge variant="accent" type="soft">
              Session {PR.sessionCurrent} of {PR.sessionTotal}
            </Badge>
          </div>
          <h2 style={{ ...serif, fontSize: 29, lineHeight: 1.15, color: "var(--aura-on-dark)", margin: 0 }}>{PR.name}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(246,242,234,.72)", margin: 0, maxWidth: "46ch" }}>
            {PR.journeyNote}
          </p>
        </Card>

        {/* Recommendation */}
        <Card
          isInteractive
          onClick={() => goTreatment(RC.treatmentId)}
          className="aura-enter"
          style={{ animationDelay: "240ms", display: "flex", alignItems: "stretch", overflow: "hidden", padding: 0 }}
        >
          <div style={{ width: 104, flex: "0 0 auto", background: toneVar(RC.tone) }} />
          <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
            <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>
              {RC.eyebrow}
            </span>
            <h3 style={{ ...serif, fontSize: 22, lineHeight: 1.2, margin: 0, color: "var(--aura-ink)" }}>{RC.name}</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--aura-mute)", margin: 0 }}>{RC.reason}</p>
          </div>
        </Card>

        <div className="aura-enter" style={{ animationDelay: "360ms", paddingTop: 6 }}>
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

function AppointmentCard() {
  const { data } = useAura();
  const AP = data.upcomingAppointment;
  return (
    <Card style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 20 }} className="bg-surface-neutral-soft">
      <div style={{ textAlign: "center", flex: "0 0 auto", paddingRight: 20, borderRight: "1px solid var(--aura-line)" }}>
        <div style={{ fontFamily: "var(--aura-serif)", fontWeight: 300, fontSize: 30, lineHeight: 1, color: "var(--aura-gold)" }}>
          {AP.day}
        </div>
        <div style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--aura-mute)", marginTop: 4 }}>
          {AP.month}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--aura-sage)" }}>
          {AP.eyebrow}
        </span>
        <div style={{ fontFamily: "var(--aura-serif)", fontWeight: 300, fontSize: 18, lineHeight: 1.25, color: "var(--aura-ink)" }}>
          {AP.treatmentName}
        </div>
        <div style={{ fontSize: 13, color: "var(--aura-mute)" }}>
          {AP.time} · {AP.practitioner} · {AP.location}
        </div>
      </div>
    </Card>
  );
}
