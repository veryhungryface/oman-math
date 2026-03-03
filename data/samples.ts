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

export const classId = "CL-8B";

export function getStudentReport(studentId: string) {
  return studentReports.find((report) => report.studentId === studentId);
}
