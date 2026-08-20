import {
  Card,
  Badge,
  Avatar,
  AvatarFallback,
  Link,
  Divider,
  ProgressBar,
  ProfileInfo,
  ProfileInfoHeader,
  ProfileInfoName,
  ProfileInfoSubtext,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemDetails,
} from "@silk/components";
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight";
import { CheckIcon } from "@phosphor-icons/react/Check";
import { useAura } from "../store";
import { toneVar, treatmentImage, img } from "../data";

const serif = { fontFamily: "var(--aura-serif)", fontWeight: 300 } as const;
const eyebrow = {
  fontSize: 10.5,
  textTransform: "uppercase",
  letterSpacing: "0.28em",
  color: "var(--aura-sage)",
} as const;

const fallback = { background: "var(--aura-tone-skin)", ...serif, color: "rgba(34,31,27,.55)" };

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
        <div className="flex flex-col gap-5">
          <span className="wordmark">{brand.wordmark}</span>
          <h1 style={{ ...serif, fontSize: 31, lineHeight: 1.14, letterSpacing: "-0.015em", color: "var(--aura-ink)", margin: 0 }}>
            Good morning, {P.greetingName}
          </h1>
          <ProfileInfo>
            <Avatar shape="circle" size="l">
              <AvatarFallback style={fallback}>{P.initials}</AvatarFallback>
            </Avatar>
            <ProfileInfoHeader>
              <ProfileInfoName>{P.firstName} {P.lastName}</ProfileInfoName>
              <ProfileInfoSubtext>Member since {P.memberSince} · {P.homeLocation}</ProfileInfoSubtext>
            </ProfileInfoHeader>
          </ProfileInfo>
        </div>

        <Divider />
        <AppointmentCard />
        <Divider />
        <CareTeam />
      </aside>

      {/* RIGHT — the journey */}
      <main className="home-main">
        <ProgrammeCard onOpen={() => goTreatment(data.recommendedTreatment.treatmentId)} />

        <JourneyCard />

        <div>
          <span style={eyebrow}>Considered for you</span>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 12 }}>
            {data.recommendations.map((r) => (
              <RecommendationCard key={r.treatmentId} r={r} image={treatmentImage(r.treatmentId)} onOpen={() => goTreatment(r.treatmentId)} />
            ))}
          </div>
        </div>

        <PractitionerNote />

        <div>
          <span style={eyebrow}>Recent visits</span>
          <div style={{ marginTop: 8 }}>
            {data.recentVisits.map((v, i) => (
              <ListItem key={i} hasDivider={i < data.recentVisits.length - 1}>
                <ListItemContent>
                  <ListItemTitle>{v.name}</ListItemTitle>
                  <ListItemDetails>{v.date} · {v.practitioner}</ListItemDetails>
                </ListItemContent>
              </ListItem>
            ))}
          </div>
        </div>

        <Link
          variant="default"
          href="#"
          onClick={(e) => { e.preventDefault(); nav("treatment"); }}
          style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 12 }}
        >
          Explore treatments <ArrowRightIcon />
        </Link>
      </main>
    </div>
  );
}

function ProgrammeCard({ onOpen }: { onOpen: () => void }) {
  const { data } = useAura();
  const PR = data.activeProgram;
  return (
    <Card
      isInteractive
      onClick={onOpen}
      className="bg-surface-interactive-strong text-text-inverted border-transparent"
      style={{ padding: 30, display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div className="flex items-start justify-between gap-4">
        <span style={{ ...eyebrow, color: "var(--aura-sage)" }}>{PR.eyebrow}</span>
        <Badge variant="accent" type="soft">Session {PR.sessionCurrent} of {PR.sessionTotal}</Badge>
      </div>
      <h2 style={{ ...serif, fontSize: 29, lineHeight: 1.15, color: "var(--aura-on-dark)", margin: 0 }}>{PR.name}</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(246,242,234,.72)", margin: 0, maxWidth: "46ch" }}>{PR.journeyNote}</p>
    </Card>
  );
}

function JourneyCard() {
  const { data } = useAura();
  const J = data.journey;
  const PR = data.activeProgram;
  return (
    <Card className="bg-surface-neutral-soft" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="flex items-center justify-between gap-4">
        <span style={eyebrow}>{J.eyebrow}</span>
        <span style={{ fontSize: 12, color: "var(--aura-mute)" }}>Session {PR.sessionCurrent} of {PR.sessionTotal}</span>
      </div>
      <ProgressBar value={(PR.sessionCurrent / PR.sessionTotal) * 100} showLabel={false} />
      <div>
        {J.phases.map((ph, i) => (
          <ListItem key={ph.name} hasDivider={i < J.phases.length - 1}>
            {ph.state === "done" ? (
              <CheckIcon size={18} style={{ color: "var(--aura-gold)", flex: "0 0 auto" }} />
            ) : (
              <span
                style={{
                  width: 16, height: 16, flex: "0 0 auto", borderRadius: 9999,
                  background: ph.state === "current" ? "var(--aura-gold)" : "transparent",
                  border: ph.state === "current" ? "none" : "1px solid var(--aura-line)",
                }}
              />
            )}
            <ListItemContent>
              <ListItemTitle>{ph.name}</ListItemTitle>
              <ListItemDetails>{ph.note}</ListItemDetails>
            </ListItemContent>
            {ph.state === "current" && <Badge variant="accent" type="soft">You are here</Badge>}
          </ListItem>
        ))}
      </div>
    </Card>
  );
}

function RecommendationCard({ r, image, onOpen }: { r: { name: string; reason: string; tone: string }; image?: string; onOpen: () => void }) {
  const bg = image
    ? { backgroundImage: `url(${img(image, 520, 300)})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: toneVar(r.tone) };
  return (
    <Card isInteractive onClick={onOpen} style={{ padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: 96, ...bg }} />
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
    <Card className="bg-surface-neutral-soft" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      <span style={eyebrow}>{N.eyebrow}</span>
      <p style={{ ...serif, fontSize: 18, lineHeight: 1.5, color: "var(--aura-ink)", margin: 0 }}>“{N.message}”</p>
      <ProfileInfo>
        <Avatar shape="circle" size="m">
          <AvatarFallback style={fallback}>{N.initials}</AvatarFallback>
        </Avatar>
        <ProfileInfoHeader>
          <ProfileInfoName>{N.from}</ProfileInfoName>
          <ProfileInfoSubtext>Lead Aesthetic Practitioner</ProfileInfoSubtext>
        </ProfileInfoHeader>
      </ProfileInfo>
    </Card>
  );
}

function CareTeam() {
  const { data } = useAura();
  const CT = data.careTeam;
  return (
    <div className="flex flex-col gap-4">
      <span style={eyebrow}>{CT.eyebrow}</span>
      {CT.members.map((m) => (
        <ProfileInfo key={m.name}>
          <Avatar shape="circle" size="m">
            <AvatarFallback style={fallback}>{m.initials}</AvatarFallback>
          </Avatar>
          <ProfileInfoHeader>
            <ProfileInfoName>{m.name}</ProfileInfoName>
            <ProfileInfoSubtext>{m.role}</ProfileInfoSubtext>
          </ProfileInfoHeader>
        </ProfileInfo>
      ))}
    </div>
  );
}

function AppointmentCard() {
  const { data } = useAura();
  const AP = data.upcomingAppointment;
  return (
    <Card className="bg-surface-neutral-soft" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ textAlign: "center", flex: "0 0 auto" }}>
        <div style={{ ...serif, fontSize: 30, lineHeight: 1, color: "var(--aura-gold)" }}>{AP.day}</div>
        <div style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--aura-mute)", marginTop: 4 }}>{AP.month}</div>
      </div>
      <Divider variant="vertical" style={{ height: 56 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={eyebrow}>{AP.eyebrow}</span>
        <div style={{ ...serif, fontSize: 18, lineHeight: 1.25, color: "var(--aura-ink)" }}>{AP.treatmentName}</div>
        <div style={{ fontSize: 13, color: "var(--aura-mute)" }}>{AP.time} · {AP.practitioner} · {AP.location}</div>
      </div>
    </Card>
  );
}
