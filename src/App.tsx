// SMOKE TEST — verifies Silk renders + AuraCare theming applies before the full rebuild.
import {
  Button,
  Card,
  Badge,
  RadioCardGroup,
  RadioCard,
  RadioCardInput,
  RadioCardContent,
  RadioCardTitle,
  RadioCardDescription,
} from "@silk/components";

export default function App() {
  return (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
      <h1 style={{ fontFamily: "var(--aura-serif)", fontWeight: 300, fontSize: 34, margin: 0 }}>
        Silk smoke test — my AuraCare
      </h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="fill" color="accent">Fill accent</Button>
        <Button variant="outline" color="accent">Outline</Button>
        <Button variant="ghost" color="neutral">Ghost</Button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="positive" type="soft">Session 4 of 8</Badge>
      </div>

      <Card hasShadow>
        <div style={{ padding: 20 }}>
          <p style={{ fontFamily: "var(--aura-sans)", margin: 0 }}>Card content on surface-base</p>
        </div>
      </Card>

      <RadioCardGroup defaultValue="a" className="flex flex-col gap-2">
        <RadioCard>
          <RadioCardInput value="a" />
          <RadioCardContent>
            <RadioCardTitle>AuraCare Notting Hill</RadioCardTitle>
            <RadioCardDescription>112 Westbourne Grove, London W2</RadioCardDescription>
          </RadioCardContent>
        </RadioCard>
        <RadioCard>
          <RadioCardInput value="b" />
          <RadioCardContent>
            <RadioCardTitle>AuraCare Marylebone</RadioCardTitle>
            <RadioCardDescription>28 Marylebone High Street, London W1</RadioCardDescription>
          </RadioCardContent>
        </RadioCard>
      </RadioCardGroup>
    </div>
  );
}
