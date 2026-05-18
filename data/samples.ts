export type RiskLevel = "ok" | "watch" | "risk";

export type StudentProfile = {
  studentId: string;
  name: string;
  gradeBand: "1-5" | "6-10" | "11-12";
  moduleTaken: string;
  timestamp: string;
  conceptMastery: number;
  cognitiveProfile: { K: number; U: number; A: number; R: number };
  riskLevel: RiskLevel;
};

export type StudentReport = {
  studentId: string;
  studentName: string;
  gradeBand: "1-5" | "6-10" | "11-12";
  moduleId: string;
  moduleTitle: string;
  overallMastery: number;
  conceptScores: { name: string; score: number }[];
  cognitiveScores: { K: number; U: number; A: number; R: number };
  officialSummaryScores: { K: number; A: number; R: number };
  misconceptions: string[];
  recommendedNextModules: string[];
  teacherComment: string;
  riskLevel: RiskLevel;
};

export const students: StudentProfile[] = [
  {
    studentId: "OMN-001",
    name: "Ahmed Al-Harthy",
    gradeBand: "6-10",
    moduleTaken: "B-1",
    timestamp: "2026-02-18 09:12",
    conceptMastery: 92,
    cognitiveProfile: { K: 95, U: 90, A: 88, R: 86 },
    riskLevel: "ok"
  },
  {
    studentId: "OMN-002",
    name: "Fatma Al-Balushi",
    gradeBand: "6-10",
    moduleTaken: "B-2",
    timestamp: "2026-02-18 09:19",
    conceptMastery: 89,
    cognitiveProfile: { K: 90, U: 88, A: 84, R: 82 },
    riskLevel: "ok"
  },
  {
    studentId: "OMN-003",
    name: "Salim Al-Saadi",
    gradeBand: "1-5",
    moduleTaken: "A-1",
    timestamp: "2026-02-18 09:25",
    conceptMastery: 74,
    cognitiveProfile: { K: 78, U: 72, A: 70, R: 66 },
    riskLevel: "watch"
  },
  {
    studentId: "OMN-004",
    name: "Aisha Al-Hinai",
    gradeBand: "1-5",
    moduleTaken: "A-2",
    timestamp: "2026-02-18 09:28",
    conceptMastery: 71,
    cognitiveProfile: { K: 74, U: 70, A: 68, R: 62 },
    riskLevel: "watch"
  },
  {
    studentId: "OMN-005",
    name: "Khalid Al-Maawali",
    gradeBand: "6-10",
    moduleTaken: "B-3",
    timestamp: "2026-02-18 09:31",
    conceptMastery: 67,
    cognitiveProfile: { K: 70, U: 65, A: 61, R: 58 },
    riskLevel: "watch"
  },
  {
    studentId: "OMN-006",
    name: "Maryam Al-Rawahi",
    gradeBand: "11-12",
    moduleTaken: "C-1",
    timestamp: "2026-02-18 09:35",
    conceptMastery: 63,
    cognitiveProfile: { K: 66, U: 62, A: 60, R: 54 },
    riskLevel: "watch"
  },
  {
    studentId: "OMN-007",
    name: "Saif Al-Lawati",
    gradeBand: "11-12",
    moduleTaken: "C-2",
    timestamp: "2026-02-18 09:38",
    conceptMastery: 59,
    cognitiveProfile: { K: 62, U: 58, A: 55, R: 49 },
    riskLevel: "watch"
  },
  {
    studentId: "OMN-008",
    name: "Noor Al-Shukaili",
    gradeBand: "1-5",
    moduleTaken: "A-3",
    timestamp: "2026-02-18 09:41",
    conceptMastery: 44,
    cognitiveProfile: { K: 50, U: 42, A: 39, R: 32 },
    riskLevel: "risk"
  },
  {
    studentId: "OMN-009",
    name: "Hamad Al-Yahyai",
    gradeBand: "6-10",
    moduleTaken: "B-1",
    timestamp: "2026-02-18 09:46",
    conceptMastery: 41,
    cognitiveProfile: { K: 46, U: 40, A: 36, R: 30 },
    riskLevel: "risk"
  },
  {
    studentId: "OMN-010",
    name: "Amal Al-Farsi",
    gradeBand: "11-12",
    moduleTaken: "C-3",
    timestamp: "2026-02-18 09:52",
    conceptMastery: 38,
    cognitiveProfile: { K: 44, U: 36, A: 34, R: 28 },
    riskLevel: "risk"
  }
];

export const studentReports: StudentReport[] = [
  {
    studentId: "OMN-001",
    studentName: "Ahmed Al-Harthy",
    gradeBand: "6-10",
    moduleId: "B-1",
    moduleTitle: "Algebra and Graphs Studio",
    overallMastery: 92,
    conceptScores: [
      { name: "Equation balance", score: 94 },
      { name: "Sequence rules", score: 88 },
      { name: "Graph reading", score: 90 },
      { name: "Function mapping", score: 91 }
    ],
    cognitiveScores: { K: 95, U: 90, A: 88, R: 86 },
    officialSummaryScores: { K: 95, A: 88, R: 86 },
    misconceptions: ["Occasional sign error in multi-step algebra"],
    recommendedNextModules: ["B-1", "C-1"],
    teacherComment: "Strong algebraic fluency and graph sense. Ready for extension tasks.",
    riskLevel: "ok"
  },
  {
    studentId: "OMN-002",
    studentName: "Fatma Al-Balushi",
    gradeBand: "6-10",
    moduleId: "B-2",
    moduleTitle: "Geometry, Scale and Transformation Lab",
    overallMastery: 89,
    conceptScores: [
      { name: "Transformations", score: 90 },
      { name: "Scale factor", score: 86 },
      { name: "Bearings", score: 85 },
      { name: "Area & volume", score: 92 }
    ],
    cognitiveScores: { K: 90, U: 88, A: 84, R: 82 },
    officialSummaryScores: { K: 90, A: 84, R: 82 },
    misconceptions: ["Needs reminders on bearing notation"],
    recommendedNextModules: ["B-2", "B-3"],
    teacherComment: "Visual reasoning is strong. Encourage clearer explanations on bearings.",
    riskLevel: "ok"
  },
  {
    studentId: "OMN-003",
    studentName: "Salim Al-Saadi",
    gradeBand: "1-5",
    moduleId: "A-1",
    moduleTitle: "Number Sense and Fraction Lab",
    overallMastery: 74,
    conceptScores: [
      { name: "Fraction meaning", score: 78 },
      { name: "Decimal link", score: 72 },
      { name: "Percent sense", score: 69 },
      { name: "Ratio language", score: 76 }
    ],
    cognitiveScores: { K: 78, U: 72, A: 70, R: 66 },
    officialSummaryScores: { K: 78, A: 70, R: 66 },
    misconceptions: ["Switches numerator/denominator in word problems"],
    recommendedNextModules: ["A-1", "A-2"],
    teacherComment: "Good procedural work. Needs more reasoning about equivalence.",
    riskLevel: "watch"
  },
  {
    studentId: "OMN-004",
    studentName: "Aisha Al-Hinai",
    gradeBand: "1-5",
    moduleId: "A-2",
    moduleTitle: "Measure and Shape Explorer",
    overallMastery: 71,
    conceptScores: [
      { name: "Perimeter", score: 68 },
      { name: "Area", score: 72 },
      { name: "Symmetry", score: 70 },
      { name: "Time reading", score: 74 }
    ],
    cognitiveScores: { K: 74, U: 70, A: 68, R: 62 },
    officialSummaryScores: { K: 74, A: 68, R: 62 },
    misconceptions: ["Confuses area with perimeter in irregular shapes"],
    recommendedNextModules: ["A-2", "A-3"],
    teacherComment: "Solid basics. Focus on distinguishing area vs perimeter.",
    riskLevel: "watch"
  },
  {
    studentId: "OMN-005",
    studentName: "Khalid Al-Maawali",
    gradeBand: "6-10",
    moduleId: "B-3",
    moduleTitle: "Statistics and Probability Investigator",
    overallMastery: 67,
    conceptScores: [
      { name: "Mean/median", score: 64 },
      { name: "Data reading", score: 70 },
      { name: "Probability", score: 61 },
      { name: "Sampling", score: 66 }
    ],
    cognitiveScores: { K: 70, U: 65, A: 61, R: 58 },
    officialSummaryScores: { K: 70, A: 61, R: 58 },
    misconceptions: ["Chooses mean even when outliers dominate"],
    recommendedNextModules: ["B-3", "A-3"],
    teacherComment: "Needs support interpreting context for statistics choices.",
    riskLevel: "watch"
  },
  {
    studentId: "OMN-006",
    studentName: "Maryam Al-Rawahi",
    gradeBand: "11-12",
    moduleId: "C-1",
    moduleTitle: "Functions and Quadratics Studio",
    overallMastery: 63,
    conceptScores: [
      { name: "Discriminant", score: 60 },
      { name: "Vertex form", score: 66 },
      { name: "Transformations", score: 61 },
      { name: "Inequalities", score: 64 }
    ],
    cognitiveScores: { K: 66, U: 62, A: 60, R: 54 },
    officialSummaryScores: { K: 66, A: 60, R: 54 },
    misconceptions: ["Graph shift direction errors"],
    recommendedNextModules: ["C-1", "B-1"],
    teacherComment: "Understands basics but needs graph-notation alignment.",
    riskLevel: "watch"
  },
  {
    studentId: "OMN-007",
    studentName: "Saif Al-Lawati",
    gradeBand: "11-12",
    moduleId: "C-2",
    moduleTitle: "Trig and Coordinate Modelling Studio",
    overallMastery: 59,
    conceptScores: [
      { name: "Radians", score: 58 },
      { name: "Unit circle", score: 60 },
      { name: "Line modelling", score: 57 },
      { name: "Trig graphs", score: 62 }
    ],
    cognitiveScores: { K: 62, U: 58, A: 55, R: 49 },
    officialSummaryScores: { K: 62, A: 55, R: 49 },
    misconceptions: ["Mixes degree and radian measures"],
    recommendedNextModules: ["C-2", "B-1"],
    teacherComment: "Needs fluency converting angles and reading graphs.",
    riskLevel: "watch"
  },
  {
    studentId: "OMN-008",
    studentName: "Noor Al-Shukaili",
    gradeBand: "1-5",
    moduleId: "A-3",
    moduleTitle: "Data and Decision Junior",
    overallMastery: 44,
    conceptScores: [
      { name: "Bar graphs", score: 46 },
      { name: "Pictograms", score: 40 },
      { name: "Comparisons", score: 42 },
      { name: "Chance", score: 38 }
    ],
    cognitiveScores: { K: 50, U: 42, A: 39, R: 32 },
    officialSummaryScores: { K: 50, A: 39, R: 32 },
    misconceptions: ["Misreads scale on bar charts", "Confuses total vs category"],
    recommendedNextModules: ["A-3", "A-1"],
    teacherComment: "Immediate support needed with graph reading basics.",
    riskLevel: "risk"
  },
  {
    studentId: "OMN-009",
    studentName: "Hamad Al-Yahyai",
    gradeBand: "6-10",
    moduleId: "B-1",
    moduleTitle: "Algebra and Graphs Studio",
    overallMastery: 41,
    conceptScores: [
      { name: "Equation balance", score: 44 },
      { name: "Sequence rules", score: 38 },
      { name: "Graph reading", score: 40 },
      { name: "Function mapping", score: 42 }
    ],
    cognitiveScores: { K: 46, U: 40, A: 36, R: 30 },
    officialSummaryScores: { K: 46, A: 36, R: 30 },
    misconceptions: ["Adds slope and intercept", "Table to graph mismatch"],
    recommendedNextModules: ["B-1", "A-1"],
    teacherComment: "Needs reteach of linear relationships with visuals.",
    riskLevel: "risk"
  },
  {
    studentId: "OMN-010",
    studentName: "Amal Al-Farsi",
    gradeBand: "11-12",
    moduleId: "C-3",
    moduleTitle: "Calculus and Uncertainty Studio",
    overallMastery: 38,
    conceptScores: [
      { name: "Derivative meaning", score: 36 },
      { name: "Stationary points", score: 40 },
      { name: "Rate of change", score: 34 },
      { name: "Probability model", score: 42 }
    ],
    cognitiveScores: { K: 44, U: 36, A: 34, R: 28 },
    officialSummaryScores: { K: 44, A: 34, R: 28 },
    misconceptions: ["Confuses slope with height", "Rate vs total"],
    recommendedNextModules: ["C-3", "C-1"],
    teacherComment: "Immediate support needed on interpreting derivatives.",
    riskLevel: "risk"
  }
];

export type FractionSkillKey =
  | "meaning"
  | "equivalent"
  | "compare"
  | "addSub"
  | "multiply"
  | "divide";

export type FractionMisconceptionCode =
  | "M1"
  | "M2"
  | "M3"
  | "M4"
  | "M5"
  | "M6"
  | "M7"
  | "M8";

export type FractionDiagnostic = {
  studentId: string;
  studentName: string;
  gradeBand: "1-5" | "6-10" | "11-12";
  skills: Record<FractionSkillKey, number>;
  activeMisconceptions: FractionMisconceptionCode[];
  evidenceSample: string;
  recommendedAction: string;
};

export const fractionSkillCatalog: { key: FractionSkillKey; label: string }[] = [
  { key: "meaning", label: "Fraction meaning" },
  { key: "equivalent", label: "Equivalent fractions" },
  { key: "compare", label: "Comparing fractions" },
  { key: "addSub", label: "Add / Subtract" },
  { key: "multiply", label: "Multiplication" },
  { key: "divide", label: "Division" }
];

export const fractionMisconceptionCatalog: {
  code: FractionMisconceptionCode;
  short: string;
  description: string;
}[] = [
  { code: "M1", short: "Add across", description: "Adds numerators and denominators separately (1/2 + 1/3 = 2/5)" },
  { code: "M2", short: "Bigger denom = bigger", description: "Thinks a larger denominator means a larger fraction (1/4 > 1/3)" },
  { code: "M3", short: "LCD for multiply", description: "Finds common denominator before multiplying fractions" },
  { code: "M4", short: "No reciprocal", description: "Divides numerator/denominator directly without inverting the divisor" },
  { code: "M5", short: "Partial simplify", description: "Simplifies only the numerator or only the denominator" },
  { code: "M6", short: "Improper↔Mixed", description: "Converts mixed numbers to improper fractions incorrectly" },
  { code: "M7", short: "Two whole numbers", description: "Treats a fraction as two independent whole numbers" },
  { code: "M8", short: "Unit fraction", description: "Confuses the meaning of unit fractions and the role of the denominator" }
];

export const fractionDiagnostics: FractionDiagnostic[] = [
  {
    studentId: "OMN-001",
    studentName: "Ahmed Al-Harthy",
    gradeBand: "6-10",
    skills: { meaning: 95, equivalent: 92, compare: 94, addSub: 90, multiply: 88, divide: 86 },
    activeMisconceptions: [],
    evidenceSample: "Solves 3/4 ÷ 2/3 with correct reciprocal and explanation.",
    recommendedAction: "Extend to fraction-decimal-percent fluency tasks."
  },
  {
    studentId: "OMN-002",
    studentName: "Fatma Al-Balushi",
    gradeBand: "6-10",
    skills: { meaning: 92, equivalent: 88, compare: 90, addSub: 85, multiply: 82, divide: 78 },
    activeMisconceptions: ["M4"],
    evidenceSample: "Wrote 2/3 ÷ 1/4 = 2/12 instead of inverting the divisor.",
    recommendedAction: "Targeted practice on division-as-reciprocal with visual models."
  },
  {
    studentId: "OMN-003",
    studentName: "Salim Al-Saadi",
    gradeBand: "1-5",
    skills: { meaning: 78, equivalent: 72, compare: 70, addSub: 64, multiply: 58, divide: 52 },
    activeMisconceptions: ["M1", "M7"],
    evidenceSample: "Answered 1/2 + 1/3 = 2/5 in three of four word problems.",
    recommendedAction: "Reteach common-denominator reasoning with bar models."
  },
  {
    studentId: "OMN-004",
    studentName: "Aisha Al-Hinai",
    gradeBand: "1-5",
    skills: { meaning: 74, equivalent: 70, compare: 62, addSub: 60, multiply: 55, divide: 48 },
    activeMisconceptions: ["M2", "M5"],
    evidenceSample: "Chose 1/4 > 1/3 in compare task; simplified 6/8 to 6/4.",
    recommendedAction: "Use number-line ordering and full-pair simplification drills."
  },
  {
    studentId: "OMN-005",
    studentName: "Khalid Al-Maawali",
    gradeBand: "6-10",
    skills: { meaning: 70, equivalent: 65, compare: 66, addSub: 62, multiply: 58, divide: 50 },
    activeMisconceptions: ["M3"],
    evidenceSample: "Found LCD before multiplying 2/3 × 3/5, then simplified by trial.",
    recommendedAction: "Contrast add/subtract vs. multiply procedures side-by-side."
  },
  {
    studentId: "OMN-006",
    studentName: "Maryam Al-Rawahi",
    gradeBand: "11-12",
    skills: { meaning: 66, equivalent: 62, compare: 64, addSub: 60, multiply: 55, divide: 52 },
    activeMisconceptions: ["M6"],
    evidenceSample: "Converted 2 3/4 to 9/4 inconsistently across three items.",
    recommendedAction: "Diagnostic drill on mixed-to-improper conversion with checks."
  },
  {
    studentId: "OMN-007",
    studentName: "Saif Al-Lawati",
    gradeBand: "11-12",
    skills: { meaning: 62, equivalent: 58, compare: 60, addSub: 55, multiply: 50, divide: 46 },
    activeMisconceptions: ["M4", "M5"],
    evidenceSample: "Skipped reciprocal in 5/6 ÷ 2/3; partial simplify on 12/18.",
    recommendedAction: "Routine for stepwise simplification and reciprocal check."
  },
  {
    studentId: "OMN-008",
    studentName: "Noor Al-Shukaili",
    gradeBand: "1-5",
    skills: { meaning: 50, equivalent: 42, compare: 38, addSub: 34, multiply: 28, divide: 22 },
    activeMisconceptions: ["M1", "M2", "M8"],
    evidenceSample: "Says 1/5 is larger than 1/2 because 5 is bigger.",
    recommendedAction: "Restart with unit-fraction visualizations; pair-share number lines."
  },
  {
    studentId: "OMN-009",
    studentName: "Hamad Al-Yahyai",
    gradeBand: "6-10",
    skills: { meaning: 46, equivalent: 40, compare: 42, addSub: 36, multiply: 32, divide: 26 },
    activeMisconceptions: ["M1", "M7"],
    evidenceSample: "Treats numerator and denominator as separate whole numbers in 4 of 5 items.",
    recommendedAction: "Targeted intervention block with bar models and equivalence games."
  },
  {
    studentId: "OMN-010",
    studentName: "Amal Al-Farsi",
    gradeBand: "11-12",
    skills: { meaning: 44, equivalent: 38, compare: 40, addSub: 34, multiply: 30, divide: 24 },
    activeMisconceptions: ["M3", "M4", "M6"],
    evidenceSample: "Multi-step rational expression collapsed mixed numbers incorrectly.",
    recommendedAction: "Prerequisite recovery on procedural fraction operations before resuming calculus."
  }
];

export const classId = "CL-8B";

export function getStudentReport(studentId: string) {
  return studentReports.find((report) => report.studentId === studentId);
}
