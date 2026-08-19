// AuraCare mock data (ported from the vanilla prototype's mock.json).
export const data = {
  brand: { wordmark: "AURACARE", productName: "my AuraCare" },
  patient: {
    firstName: "Elena",
    lastName: "Voss",
    greetingName: "Elena",
    initials: "EV",
    memberSince: "2023",
    homeLocation: "AuraCare Notting Hill",
  },
  activeProgram: {
    name: "Radiance Skin Renewal",
    eyebrow: "Your programme",
    sessionCurrent: 4,
    sessionTotal: 8,
    phase: "Renewal",
    journeyNote:
      "You're past the midpoint. Your skin's tone and texture are settling into their renewed rhythm.",
  },
  recommendedTreatment: {
    treatmentId: "signature-hydrafacial",
    eyebrow: "Considered for you",
    name: "Signature Hydrafacial",
    reason: "To maintain your skin's hydration between sessions.",
    tone: "sage",
  },
  recommendations: [
    {
      treatmentId: "signature-hydrafacial",
      name: "Signature Hydrafacial",
      reason: "To maintain your skin's hydration between sessions.",
      tone: "sage",
    },
    {
      treatmentId: "iv-wellness-infusion",
      name: "IV Wellness Infusion",
      reason: "A gentle lift for energy as your programme continues.",
      tone: "slate",
    },
  ],
  journey: {
    eyebrow: "Your journey",
    phases: [
      { name: "Assessment", note: "Skin mapped", state: "done" },
      { name: "Renewal", note: "You are here", state: "current" },
      { name: "Maintenance", note: "From October", state: "upcoming" },
    ],
  },
  careTeam: {
    eyebrow: "Your care team",
    members: [
      { name: "Dr Amara Silva", role: "Lead Aesthetic Practitioner", initials: "AS" },
      { name: "Nadia Rahman", role: "Wellness Therapist", initials: "NR" },
    ],
  },
  practitionerNote: {
    eyebrow: "A note from your practitioner",
    from: "Dr Amara Silva",
    initials: "AS",
    message:
      "Your skin has responded beautifully to the last two sessions, Elena. We'll keep the pace gentle and focus on hydration through the summer.",
  },
  recentVisits: [
    { name: "Radiance Skin Renewal — Session 4", date: "13 August", practitioner: "Dr Amara Silva" },
    { name: "Radiance Skin Renewal — Session 3", date: "30 July", practitioner: "Dr Amara Silva" },
    { name: "Advanced Skin Analysis", date: "9 July", practitioner: "Dr Amara Silva" },
  ],
  upcomingAppointment: {
    eyebrow: "Your next visit",
    treatmentName: "Radiance Skin Renewal — Session 5",
    dateLabel: "Thursday 27 August",
    day: "27",
    month: "August",
    time: "10:30",
    practitioner: "Dr Amara Silva",
    location: "AuraCare Notting Hill",
    reassurance: "We've held your place.",
  },
  treatments: [
    {
      id: "signature-hydrafacial",
      name: "Signature Hydrafacial",
      category: "Aesthetic",
      tone: "sage",
      shortDescription: "A quiet reset for tired, dehydrated skin.",
      longDescription:
        "A layered cleanse, gentle resurfacing and deep hydration in one unhurried session. Skin is left calm, even and luminous — the kind of glow that looks like rest rather than product.",
      duration: "60 minutes",
      price: 220,
      practitioner: "Dr Amara Silva",
    },
    {
      id: "advanced-skin-analysis",
      name: "Advanced Skin Analysis",
      category: "Diagnostics",
      tone: "sand",
      shortDescription: "The reading that shapes your programme.",
      longDescription:
        "A considered assessment of hydration, texture and tone beneath the surface. We map what your skin needs now, then design the phases of your programme around it — nothing generic, nothing guessed.",
      duration: "45 minutes",
      price: 180,
      practitioner: "Dr Amara Silva",
    },
    {
      id: "iv-wellness-infusion",
      name: "IV Wellness Infusion",
      category: "Wellness",
      tone: "slate",
      shortDescription: "Replenishment, delivered gently.",
      longDescription:
        "A tailored blend of vitamins and minerals, drawn up for how you feel this week. Delivered slowly in a quiet room, it restores what busy weeks quietly take — hydration, energy, clarity.",
      duration: "50 minutes",
      price: 260,
      practitioner: "Dr Nadia Rahman",
    },
    {
      id: "holistic-wellness-consultation",
      name: "Holistic Wellness Consultation",
      category: "Consultation",
      tone: "oat",
      shortDescription: "An hour to be properly listened to.",
      longDescription:
        "An unhurried conversation about sleep, stress, movement and skin — the whole picture, not a single complaint. You leave with a wellness plan written for your life, phase by phase.",
      duration: "60 minutes",
      price: 200,
      practitioner: "Dr Nadia Rahman",
    },
    {
      id: "laser-skin-resurfacing",
      name: "Laser Skin Resurfacing",
      category: "Aesthetic",
      tone: "clay",
      shortDescription: "Precision, with recovery in mind.",
      longDescription:
        "A measured resurfacing that softens fine lines and evens tone, paced across sessions so your skin is never pushed. Comfort and after-care are planned as carefully as the treatment itself.",
      duration: "45 minutes",
      price: 450,
      practitioner: "Dr Amara Silva",
    },
  ],
  locations: [
    { id: "notting-hill", name: "AuraCare Notting Hill", address: "112 Westbourne Grove, London W2" },
    { id: "marylebone", name: "AuraCare Marylebone", address: "28 Marylebone High Street, London W1" },
    { id: "chelsea", name: "AuraCare Chelsea", address: "45 Sloane Square, London SW1" },
    { id: "hampstead", name: "AuraCare Hampstead", address: "9 Flask Walk, London NW3" },
  ],
  bookingOptions: {
    dates: [
      { id: "2026-08-27", label: "Thu 27 Aug" },
      { id: "2026-08-28", label: "Fri 28 Aug" },
      { id: "2026-08-29", label: "Sat 29 Aug" },
      { id: "2026-09-01", label: "Mon 1 Sep" },
      { id: "2026-09-02", label: "Tue 2 Sep" },
    ],
    timeSlots: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
  },
  confirmation: {
    eyebrow: "Confirmed",
    message: "You're booked, Elena.",
    reassurance: "We've held your place. A gentle reminder will reach you the day before.",
  },
};

export type AuraData = typeof data;
export const toneVar = (tone: string) => `var(--aura-tone-${tone})`;
export const money = (p: number) => `£${p}`;
