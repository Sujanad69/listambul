export interface ShiftDetail {
  day: string;
  shortDay: string;
  standard: {
    hours: number;
    schedule: string;
    prepTime: string;
    exitTime: string;
    notes: string;
    splitShift: boolean;
  };
  busy: {
    hours: number;
    schedule: string;
    prepTime: string;
    exitTime: string;
    notes: string;
    splitShift: boolean;
  };
  peak: {
    hours: number;
    schedule: string;
    prepTime: string;
    exitTime: string;
    notes: string;
    splitShift: boolean;
  };
}

export type ScenarioKey = 'standard' | 'busy' | 'peak';

export interface ScenarioMeta {
  key: ScenarioKey;
  label: string;
  shortLabel: string;
  totalHours: number;
  overtimeHours: number;
  description: string;
  badge: string;
}

export const SCENARIOS: Record<ScenarioKey, ScenarioMeta> = {
  standard: {
    key: 'standard',
    label: 'Standard Baseline',
    shortLabel: 'Baseline',
    totalHours: 47.0,
    overtimeHours: 7.0,
    description: 'Scheduled regular hours under normal dinner and lunch covers.',
    badge: 'Nominal Operations',
  },
  busy: {
    key: 'busy',
    label: 'Busy / High Volume',
    shortLabel: 'High Volume',
    totalHours: 51.25,
    overtimeHours: 11.25,
    description: 'Extended prep calls and delayed line shutdown due to heavy volume.',
    badge: 'Elevated Demand',
  },
  peak: {
    key: 'peak',
    label: 'Peak Events & Heavy Prep',
    shortLabel: 'Peak Demand',
    totalHours: 54.75,
    overtimeHours: 14.75,
    description: 'Maximum capacity, private bookings, full inventory audits, and event service.',
    badge: 'Surge Operations',
  },
};

export const STATUTORY_WEEKLY_CAP = 40.0;

export const WEEKLY_SCHEDULE: ShiftDetail[] = [
  {
    day: 'Monday',
    shortDay: 'Mon',
    standard: {
      hours: 10.5,
      schedule: '11:45–16:30 / 18:00–23:45',
      prepTime: '11:45 AM',
      exitTime: '23:45 PM',
      notes: 'Standard split shift: Lunch prep, service & clean to 16:30 (4.75h) + Dinner prep, service & shutdown to 23:45 (5.75h) = 10.5h',
      splitShift: true,
    },
    busy: {
      hours: 11.25,
      schedule: '11:00 prep / exit ~23:45',
      prepTime: '11:00 AM',
      exitTime: '23:45 PM',
      notes: 'Early 11:00 AM mise en place arrival; extended late turnaround and line sanitize',
      splitShift: true,
    },
    peak: {
      hours: 12.0,
      schedule: '11:00 prep / exit ~00:30',
      prepTime: '11:00 AM',
      exitTime: '00:30 AM',
      notes: 'Extended service window, banquet prep, and comprehensive kitchen shutdown',
      splitShift: true,
    },
  },
  {
    day: 'Tuesday',
    shortDay: 'Tue',
    standard: {
      hours: 5.0,
      schedule: '11:30–16:30 (clean to 16:30)',
      prepTime: '11:30 AM',
      exitTime: '16:30 PM',
      notes: 'Single daytime shift: 11:30 prep call, lunch service, and weekly station deep clean until 16:30 (5.0h total). Evening closed.',
      splitShift: false,
    },
    busy: {
      hours: 6.0,
      schedule: 'Extended stock & deep clean',
      prepTime: '11:30 AM',
      exitTime: '17:30 PM',
      notes: 'Extended inventory restocking, supplier reception, and thorough sanitation cycle',
      splitShift: false,
    },
    peak: {
      hours: 6.5,
      schedule: 'Full inventory & audit',
      prepTime: '11:00 AM',
      exitTime: '17:30 PM',
      notes: 'Full cold-storage audit, deep cycle degreasing, and pre-rest inventory sign-off',
      splitShift: false,
    },
  },
  {
    day: 'Wednesday',
    shortDay: 'Wed',
    standard: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
    busy: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
    peak: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
  },
  {
    day: 'Thursday',
    shortDay: 'Thu',
    standard: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
    busy: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
    peak: {
      hours: 0.0,
      schedule: 'CLOSED (0.0 hrs)',
      prepTime: '—',
      exitTime: '—',
      notes: 'Designated consecutive weekly rest day (Trial Schedule)',
      splitShift: false,
    },
  },
  {
    day: 'Friday',
    shortDay: 'Fri',
    standard: {
      hours: 10.5,
      schedule: '11:45–16:30 / 18:00–23:45',
      prepTime: '11:45 AM',
      exitTime: '23:45 PM',
      notes: 'Full dual service: Weekend opening prep, lunch service to 16:30, split intermission, dinner rush to 23:45 (10.5h)',
      splitShift: true,
    },
    busy: {
      hours: 11.25,
      schedule: '11:00 prep / exit ~23:45',
      prepTime: '11:00 AM',
      exitTime: '23:45 PM',
      notes: 'Pre-weekend prep surge, high evening turnover, and delayed dish breakdown',
      splitShift: true,
    },
    peak: {
      hours: 12.0,
      schedule: '11:00 prep / exit ~00:30',
      prepTime: '11:00 AM',
      exitTime: '00:30 AM',
      notes: 'Maximum table turnover, prolonged service seating, and midnight closing protocol',
      splitShift: true,
    },
  },
  {
    day: 'Saturday',
    shortDay: 'Sat',
    standard: {
      hours: 10.5,
      schedule: '11:45–16:30 / 18:00–23:45',
      prepTime: '11:45 AM',
      exitTime: '23:45 PM',
      notes: 'High-volume Saturday lunch & dinner service with standard 1.5h split break (10.5h)',
      splitShift: true,
    },
    busy: {
      hours: 11.5,
      schedule: 'Heavy dinner & late turn',
      prepTime: '11:00 AM',
      exitTime: '00:00 AM',
      notes: 'Heavy multi-seating dinner service, expedited food prep, and late station clean',
      splitShift: true,
    },
    peak: {
      hours: 12.25,
      schedule: 'Peak turn & late exit',
      prepTime: '11:00 AM',
      exitTime: '00:45 AM',
      notes: 'Peak weekly volume: Continuous seating past 23:00 and late-night kitchen reset',
      splitShift: true,
    },
  },
  {
    day: 'Sunday',
    shortDay: 'Sun',
    standard: {
      hours: 10.5,
      schedule: '11:45–16:30 / 18:00–23:45',
      prepTime: '11:45 AM',
      exitTime: '23:45 PM',
      notes: 'Sunday family lunch and evening dinner service followed by weekly station handover (10.5h)',
      splitShift: true,
    },
    busy: {
      hours: 11.25,
      schedule: '11:00 prep / exit ~23:45',
      prepTime: '11:00 AM',
      exitTime: '23:45 PM',
      notes: 'Extended Sunday lunch orders and evening close with perishable food rotation',
      splitShift: true,
    },
    peak: {
      hours: 12.0,
      schedule: 'Heavy prep & late finish',
      prepTime: '11:00 AM',
      exitTime: '00:00 AM',
      notes: 'Heavy prep for upcoming week, full station deep sanitization before rest cycle',
      splitShift: true,
    },
  },
];

export interface Recommendation {
  id: string;
  title: string;
  legalCitation: string;
  summary: string;
  impact: string;
  keyAction: string;
  statutoryDetail: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'baseline-overtime',
    title: 'Statutory 40h Cap, Consecutive Rest & Overtime',
    legalCitation: 'Arts. 198, 232 & 268 Código do Trabalho',
    summary: 'The 40h standard work week across 5 working days honors 2 consecutive rest days (Wed/Thu · Art. 232), with +7.0h to +14.75h overtime reconciled via rest time off or pay (Art. 268).',
    impact: '+7.0h to +14.75h overtime per chef / week',
    keyAction: 'Formally reconcile overtime via compensatory rest days in lieu or statutory overtime compensation rates (Art. 268).',
    statutoryDetail: 'Article 198 sets standard maximum work at 40h per week; Art. 232 guarantees weekly rest; Art. 268 regulates supplementary work compensation.',
  },
  {
    id: 'fixed-horario-prep',
    title: 'Fixed Official Schedule & 11-Hour Shift Rest Window',
    legalCitation: 'Arts. 197, 214 & 215 Código do Trabalho',
    summary: 'Working hours start from food prep (Art. 197), requiring a posted schedule (Art. 215) and a mandatory 11-hour continuous rest window between shifts (Art. 214).',
    impact: '100% legal compliance & fatigue prevention',
    keyAction: 'Post a mandatory fixed schedule (Art. 215) and enforce 11-hour rest intervals following late dinner shutdowns (~23:45) before morning call times.',
    statutoryDetail: 'Article 197 defines working time; Art. 214 mandates 11h consecutive daily rest between shifts; Art. 215 requires posted schedules.',
  },
  {
    id: 'synchronous-arrival',
    title: 'Synchronized Crew Call & Heavy Prep Coordination',
    legalCitation: 'Workplace Equality & Flexible Prep Call Policy',
    summary: 'Flexible prep call times (11:45 standard or 11:00 heavy prep) with mandatory simultaneous entry for the entire brigade.',
    impact: 'Equitable workload distribution',
    keyAction: 'Enforce synchronous arrival for all rostered staff at the scheduled call time to share demanding mise en place and delivery breakdown equitably.',
    statutoryDetail: 'Prevents early arrivals from carrying a disproportionate prep workload and guarantees full station readiness before service.',
  },
  {
    id: 'digital-attendance',
    title: 'Digital Attendance & Operational Management System (Registo de Horário)',
    legalCitation: 'Art. 202 Código do Trabalho · Workload Fairness & System Efficiency',
    summary: 'Automated digital time tracking to balance workloads, prevent staff burnout, and provide management with reliable shift data.',
    impact: '100% auditable time ledger & balanced workloads',
    keyAction: 'Implement an automated clock-in panel or mobile terminal to log exact timestamps in compliance with statutory inspections and to optimize shift scheduling.',
    statutoryDetail: 'Article 202 mandates that employers maintain an auditable daily record of working hours, split intervals, and overtime.',
  },
];

export const LEGAL_ARTICLES = [
  {
    code: 'Art. 198 (Código do Trabalho)',
    heading: 'Limites máximos do período normal de trabalho',
    excerpt: 'The normal working period may not exceed eight hours per day and forty hours per week. Any productive kitchen time performed beyond 40 hours constitutes supplementary (overtime) work.',
  },
  {
    code: 'Art. 202 (Código do Trabalho)',
    heading: 'Registo de tempos de trabalho',
    excerpt: 'The employer must maintain an updated record of working hours, including employees performing work outside the establishment, with daily start and end times as well as mandatory meal or interval breaks.',
  },
  {
    code: 'Art. 268 (Código do Trabalho)',
    heading: 'Pagamento de trabalho suplementar',
    excerpt: 'Overtime work is compensated with supplementary remuneration or converted into equivalent compensatory rest time by mutual agreement or applicable collective labor framework.',
  },
];
