export type ModuleBand = "1-5" | "6-10" | "11-12";

export type LessonActivity = {
  title: string;
  studentAction: string;
  teacherMove: string;
  grouping: string;
  time: string;
  evidence: string;
};

export type ModuleItem = {
  id: string;
  band: ModuleBand;
  title: string;
  subtitle: string;
  strands: string[];
  cognitiveFocus: string[];
  lessonMinutes: number;
  assessmentMinutes: number;
  interactions: string[];
  activities: LessonActivity[];
  assessmentFocus: string[];
  reportFocus: string[];
  teacherPrompts: {
    intro: string[];
    concept: string[];
    apply: string[];
    reason: string[];
  };
};

export const modules: ModuleItem[] = [
  {
    id: "A-1",
    band: "1-5",
    title: "Number Sense and Fraction Lab",
    subtitle: "Fractions, decimals, percentages, ratio",
    strands: ["Number", "Operations", "Measurement"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 7,
    interactions: [
      "Fraction strip drag",
      "Number line placement",
      "Percent slider",
      "Ratio mixer",
      "Same value in 3 forms"
    ],
    activities: [
      {
        title: "Share it fairly",
        studentAction: "Sketch a sharing story and represent it as fraction, decimal, and percent.",
        teacherMove: "Ask how each form shows the same amount and why.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Three representations with a short explanation."
      },
      {
        title: "Number line defend",
        studentAction: "Place 1/4, 1/2, and 3/4 on the line and defend the spacing.",
        teacherMove: "Probe benchmark reasoning and equal spacing.",
        grouping: "Whole class",
        time: "2 min",
        evidence: "Verbal justification using benchmarks."
      },
      {
        title: "Equivalent card match",
        studentAction: "Match fraction cards to decimal and percent cards.",
        teacherMove: "Have groups explain one tricky match.",
        grouping: "Small groups",
        time: "3 min",
        evidence: "Matched sets with one explained pair."
      },
      {
        title: "Ratio mixer mini-challenge",
        studentAction: "Scale a ratio to keep the taste the same.",
        teacherMove: "Highlight scaling both parts equally.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Scaled ratio written and explained."
      }
    ],
    assessmentFocus: [
      "Match fraction, decimal, percent",
      "Compare ratios and scaling",
      "Translate visuals to numbers",
      "Explain equivalence"
    ],
    reportFocus: [
      "Representation conversion",
      "Ratio intuition",
      "Concept vs procedure gap"
    ],
    teacherPrompts: {
      intro: [
        "Where do you see fractions in everyday life?",
        "How could you share a snack fairly with a friend?"
      ],
      concept: [
        "Show 1/2 on the number line and explain your choice.",
        "How is 0.5 connected to 1/2?",
        "What does percent mean in your own words?"
      ],
      apply: [
        "If 25% of 100 mL is juice, how many mL is that?",
        "Create two different fractions that mean the same amount.",
        "Use the slider to find a value close to 3/4."
      ],
      reason: [
        "Explain why 1/2 = 0.5 = 50%.",
        "How would you convince someone that 2/4 equals 1/2?"
      ]
    }
  },
  {
    id: "A-2",
    band: "1-5",
    title: "Measure and Shape Explorer",
    subtitle: "Time, length, area, symmetry",
    strands: ["Measurement", "Geometry", "Spatial Sense"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 7,
    interactions: [
      "Clock hands move",
      "Perimeter tiles",
      "Area fill",
      "Symmetry mirror",
      "Route direction arrows"
    ],
    activities: [
      {
        title: "Measure hunt",
        studentAction: "Estimate and then measure two classroom objects in centimeters.",
        teacherMove: "Ask for unit choice and reasonableness checks.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Estimate vs actual recorded with units."
      },
      {
        title: "Perimeter vs area build",
        studentAction: "Build a 4x3 rectangle with tiles, then change the shape without changing area.",
        teacherMove: "Ask what stays the same and what changes.",
        grouping: "Small groups",
        time: "4 min",
        evidence: "Two shapes with same area, different perimeter."
      },
      {
        title: "Symmetry check",
        studentAction: "Draw one line of symmetry for a given shape.",
        teacherMove: "Ask how the halves match after reflection.",
        grouping: "Individual",
        time: "2 min",
        evidence: "Symmetry line drawn and explained."
      },
      {
        title: "Time tell and justify",
        studentAction: "Set the clock to a target time and explain the hand positions.",
        teacherMove: "Probe minute hand movement between hours.",
        grouping: "Pairs",
        time: "2 min",
        evidence: "Correct time set with reasoning."
      }
    ],
    assessmentFocus: [
      "Interpret units and measures",
      "Judge symmetry and properties",
      "Time and route problems",
      "Area vs perimeter confusion"
    ],
    reportFocus: ["Measurement sense", "Spatial reasoning", "Shape manipulation"],
    teacherPrompts: {
      intro: [
        "How do we measure space around us?",
        "Where do we see symmetry in the classroom?"
      ],
      concept: [
        "What changes when width increases but height stays the same?",
        "How is area different from perimeter?",
        "Find one line of symmetry in this shape."
      ],
      apply: [
        "Build a 4 by 3 rectangle. What is the area?",
        "Keep the area the same and change the perimeter.",
        "Set the clock to 3:30 using the slider."
      ],
      reason: [
        "Explain why two shapes can share area but not perimeter.",
        "Why does symmetry help us check our work?"
      ]
    }
  },
  {
    id: "A-3",
    band: "1-5",
    title: "Data and Decision Junior",
    subtitle: "Graphs, pictograms, chance",
    strands: ["Data", "Probability"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 6,
    assessmentMinutes: 6,
    interactions: [
      "Class poll to bar chart",
      "Pictogram builder",
      "Spinner chance demo",
      "Compare categories"
    ],
    activities: [
      {
        title: "Class poll",
        studentAction: "Vote once and watch the bar chart update.",
        teacherMove: "Ask which bar is tallest and why.",
        grouping: "Whole class",
        time: "2 min",
        evidence: "Students identify the most votes."
      },
      {
        title: "Pictogram build",
        studentAction: "Create a pictogram with a given key.",
        teacherMove: "Check that each icon matches the key value.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Pictogram that matches the key."
      },
      {
        title: "Spinner prediction",
        studentAction: "Predict the most likely outcome before spinning.",
        teacherMove: "Ask for the reasoning behind the prediction.",
        grouping: "Individual",
        time: "2 min",
        evidence: "Prediction with simple reasoning."
      },
      {
        title: "Data story",
        studentAction: "Write one sentence describing what the data shows.",
        teacherMove: "Model using numbers in the sentence.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Sentence referencing values from the chart."
      }
    ],
    assessmentFocus: [
      "Read bar graphs",
      "Compare values",
      "Complete a simple chart",
      "Explain data-based choice"
    ],
    reportFocus: ["Graph reading", "Comparison accuracy", "Reasoning quality"],
    teacherPrompts: {
      intro: [
        "What kinds of data do we collect in class?",
        "How can a chart help us decide something?"
      ],
      concept: [
        "What does the tallest bar represent?",
        "How do you read a pictogram?",
        "What does chance mean in simple words?"
      ],
      apply: [
        "Vote once and watch the bar change.",
        "Compare two categories and describe the difference.",
        "Predict which outcome is most likely on the spinner."
      ],
      reason: [
        "Explain your choice using data from the chart.",
        "Why can a small sample give a misleading result?"
      ]
    }
  },
  {
    id: "B-1",
    band: "6-10",
    title: "Algebra and Graphs Studio",
    subtitle: "Equations, sequences, functions",
    strands: ["Pre-Algebra", "Algebra", "Functions"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Balance equation tool",
      "Function machine",
      "Table to graph",
      "Slope and intercept slider"
    ],
    activities: [
      {
        title: "Pattern rule table",
        studentAction: "Complete a table and state the rule in words and symbols.",
        teacherMove: "Push for connection between input-output and equation.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Correct rule with two examples."
      },
      {
        title: "Balance it",
        studentAction: "Solve an equation using the balance model.",
        teacherMove: "Ask what operation keeps both sides equal.",
        grouping: "Individual",
        time: "3 min",
        evidence: "Solution and explanation of the operation."
      },
      {
        title: "Slope slider talk",
        studentAction: "Move the slope and describe the visual change.",
        teacherMove: "Connect steepness to rate of change.",
        grouping: "Whole class",
        time: "2 min",
        evidence: "Verbal description using rate language."
      },
      {
        title: "Graph from a story",
        studentAction: "Sketch a line graph for a short scenario.",
        teacherMove: "Ask what the intercept and slope mean in context.",
        grouping: "Pairs",
        time: "4 min",
        evidence: "Sketch with labeled axes and explanation."
      }
    ],
    assessmentFocus: [
      "Simplify expressions",
      "Solve equations",
      "Find sequence rules",
      "Connect table, graph, rule"
    ],
    reportFocus: ["Symbolic accuracy", "Graph literacy", "Rule discovery"],
    teacherPrompts: {
      intro: [
        "Where do we use patterns or rules in daily life?",
        "How does a graph tell a story?"
      ],
      concept: [
        "What does slope represent on a line graph?",
        "What does the intercept tell us?",
        "How do we keep an equation balanced?"
      ],
      apply: [
        "Move the slope slider and describe the change.",
        "Find a rule from the table.",
        "Plot two points for y = 2x + 1."
      ],
      reason: [
        "Explain why the graph of y = 2x + 1 is a straight line.",
        "How can you justify the solution to an inequality?"
      ]
    }
  },
  {
    id: "B-2",
    band: "6-10",
    title: "Geometry, Scale and Transformation Lab",
    subtitle: "Coordinates, scale, bearing, area",
    strands: ["Geometry", "Measurement", "Spatial Sense"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Transformation board",
      "Bearing compass",
      "Map scale tool",
      "3D net fold"
    ],
    activities: [
      {
        title: "Transformation station",
        studentAction: "Apply a reflection, rotation, and translation to the same shape.",
        teacherMove: "Ask students to name each transformation.",
        grouping: "Small groups",
        time: "4 min",
        evidence: "Correctly labeled transformations."
      },
      {
        title: "Bearing walk",
        studentAction: "Follow a bearing and record the new position.",
        teacherMove: "Check notation and direction language.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Position recorded with bearing notation."
      },
      {
        title: "Scale map",
        studentAction: "Convert map distances using the scale tool.",
        teacherMove: "Ask for unit conversions and reasonableness.",
        grouping: "Individual",
        time: "3 min",
        evidence: "Correct converted distances with units."
      },
      {
        title: "Net to solid",
        studentAction: "Predict the solid from a net and check by folding.",
        teacherMove: "Ask which faces match and why.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Prediction and confirmation."
      }
    ],
    assessmentFocus: [
      "Apply scale factors",
      "Interpret bearings",
      "Identify transformations",
      "Compute area and volume"
    ],
    reportFocus: ["Spatial transformation", "Scale reasoning", "Geometry use"],
    teacherPrompts: {
      intro: [
        "How do maps shrink real places?",
        "What does it mean to transform a shape?"
      ],
      concept: [
        "How is a reflection different from a translation?",
        "What does a scale factor do to size?",
        "How do we read a bearing?"
      ],
      apply: [
        "Reflect the shape across the y-axis.",
        "Use the scale to convert 2 cm into real distance.",
        "Rotate the shape 90 degrees and describe it."
      ],
      reason: [
        "Why can two shapes have the same area but different perimeter?",
        "Explain how scale changes both length and area."
      ]
    }
  },
  {
    id: "B-3",
    band: "6-10",
    title: "Statistics and Probability Investigator",
    subtitle: "Data, averages, experimental chance",
    strands: ["Data", "Probability"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Sample size simulator",
      "Mean and median sorter",
      "Histogram builder",
      "Dice experiment"
    ],
    activities: [
      {
        title: "Sample size demo",
        studentAction: "Run two samples and compare variability.",
        teacherMove: "Ask which sample is more reliable and why.",
        grouping: "Whole class",
        time: "3 min",
        evidence: "Comparison statement with justification."
      },
      {
        title: "Mean or median?",
        studentAction: "Choose the best average for a data set with an outlier.",
        teacherMove: "Press for reason related to outliers.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Selected measure with reasoning."
      },
      {
        title: "Dice experiment",
        studentAction: "Run 20 rolls and compare to theoretical probability.",
        teacherMove: "Connect experimental results to expected values.",
        grouping: "Small groups",
        time: "4 min",
        evidence: "Tallied results and comparison."
      },
      {
        title: "Histogram compare",
        studentAction: "Build a histogram and describe the shape.",
        teacherMove: "Ask for center, spread, and outliers.",
        grouping: "Individual",
        time: "3 min",
        evidence: "Short description using data terms."
      }
    ],
    assessmentFocus: [
      "Choose mean/median/mode",
      "Judge sample bias",
      "Compare experimental chance",
      "Conclude from data"
    ],
    reportFocus: ["Data interpretation", "Measure selection", "Uncertainty"],
    teacherPrompts: {
      intro: [
        "When do we use averages to compare groups?",
        "What makes a chance experiment fair?"
      ],
      concept: [
        "When is median better than mean?",
        "What is experimental probability?",
        "How does sample size affect results?"
      ],
      apply: [
        "Roll the dice and compare to theoretical probability.",
        "Compute the mean of a small data set.",
        "Choose the best average for data with an outlier."
      ],
      reason: [
        "Why are large samples more reliable?",
        "Explain how an outlier changes the mean."
      ]
    }
  },
  {
    id: "C-1",
    band: "11-12",
    title: "Functions and Quadratics Studio",
    subtitle: "Discriminant, transformations, inverse",
    strands: ["Functions", "Algebra"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Quadratic slider",
      "Discriminant visual",
      "Inverse overlay",
      "Graph transformation layer"
    ],
    activities: [
      {
        title: "Discriminant sort",
        studentAction: "Sort quadratic equations by number of real roots.",
        teacherMove: "Ask for the discriminant evidence.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Sorted set with discriminant sign."
      },
      {
        title: "Parabola transform",
        studentAction: "Move sliders and describe vertex and direction changes.",
        teacherMove: "Connect a, h, k to graph movement.",
        grouping: "Whole class",
        time: "3 min",
        evidence: "Description with correct parameter link."
      },
      {
        title: "Inverse overlay check",
        studentAction: "Compare a function and its inverse on the graph.",
        teacherMove: "Ask how reflection over y = x appears.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Observation of symmetry and swapped coordinates."
      },
      {
        title: "Inequality region",
        studentAction: "Shade solution regions on the graph for a quadratic inequality.",
        teacherMove: "Ask why intervals are included or excluded.",
        grouping: "Individual",
        time: "4 min",
        evidence: "Correct region with justification."
      }
    ],
    assessmentFocus: [
      "Use discriminant",
      "Transform graphs",
      "Solve quadratic inequality",
      "Explain graph and equation link"
    ],
    reportFocus: ["Function analysis", "Graph transformation", "Reasoning gap"],
    teacherPrompts: {
      intro: [
        "What do quadratic graphs look like?",
        "How can we predict the number of roots?"
      ],
      concept: [
        "What does the discriminant tell us?",
        "How does changing a affect the graph?",
        "Where is the vertex on this graph?"
      ],
      apply: [
        "Move the slider to shift the parabola.",
        "Find the roots and compare with the graph.",
        "Describe the effect of adding +3 to the function."
      ],
      reason: [
        "Explain a graph shift without plotting every point.",
        "Reason about inequality solutions using the graph."
      ]
    }
  },
  {
    id: "C-2",
    band: "11-12",
    title: "Trig and Coordinate Modelling Studio",
    subtitle: "Radians, unit circle, lines",
    strands: ["Trigonometry", "Coordinate Geometry"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Unit circle animator",
      "Degree to radian converter",
      "Line equation builder",
      "Wave graph model"
    ],
    activities: [
      {
        title: "Unit circle callout",
        studentAction: "Identify sin and cos values for a given angle.",
        teacherMove: "Ask which coordinate maps to each ratio.",
        grouping: "Individual",
        time: "3 min",
        evidence: "Correct coordinate values stated."
      },
      {
        title: "Radian conversion relay",
        studentAction: "Convert degree measures to radians using the tool.",
        teacherMove: "Check for common benchmarks like 90 and 180.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Correct conversions for at least two angles."
      },
      {
        title: "Line intersection solve",
        studentAction: "Find the intersection of two lines from their equations.",
        teacherMove: "Ask how the graph confirms the solution.",
        grouping: "Small groups",
        time: "4 min",
        evidence: "Coordinate solution and graph check."
      },
      {
        title: "Wave fit",
        studentAction: "Adjust amplitude and period to match a target wave.",
        teacherMove: "Connect changes to the equation form.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Matched wave with parameter explanation."
      }
    ],
    assessmentFocus: [
      "Convert degrees and radians",
      "Solve line intersections",
      "Read trig graphs",
      "Explain modelling choice"
    ],
    reportFocus: ["Trig visualization", "Coordinate modelling", "Graph reading"],
    teacherPrompts: {
      intro: [
        "Where do we see waves or cycles in real life?",
        "Why do we use radians instead of degrees?"
      ],
      concept: [
        "What do the unit circle coordinates represent?",
        "How are degrees connected to radians?",
        "What does the slope tell us about a line?"
      ],
      apply: [
        "Set an angle and read sin and cos values.",
        "Find the intersection of two lines on the graph.",
        "Model a wave using the slider."
      ],
      reason: [
        "Why do radians simplify arc length?",
        "Explain why cosine is negative in certain quadrants."
      ]
    }
  },
  {
    id: "C-3",
    band: "11-12",
    title: "Calculus and Uncertainty Studio",
    subtitle: "Derivative meaning, random variables",
    strands: ["Calculus", "Probability"],
    cognitiveFocus: ["K", "U", "A", "R"],
    lessonMinutes: 7,
    assessmentMinutes: 8,
    interactions: [
      "Tangent drag",
      "Stationary point detector",
      "Rate of change demo",
      "Distribution table builder"
    ],
    activities: [
      {
        title: "Tangent race",
        studentAction: "Move the tangent to compare steep vs flat slopes.",
        teacherMove: "Ask which point has the greatest rate of change.",
        grouping: "Whole class",
        time: "3 min",
        evidence: "Verbal comparison using slope language."
      },
      {
        title: "Stationary point hunt",
        studentAction: "Identify where the derivative is zero on the graph.",
        teacherMove: "Ask if it is a max or min and why.",
        grouping: "Pairs",
        time: "3 min",
        evidence: "Point identified with reasoning."
      },
      {
        title: "Rate of change story",
        studentAction: "Match a real-world story to a rate-of-change graph.",
        teacherMove: "Probe where the rate increases or decreases.",
        grouping: "Individual",
        time: "4 min",
        evidence: "Story choice with explanation."
      },
      {
        title: "Expected value table",
        studentAction: "Build a probability table and compute expectation.",
        teacherMove: "Ask which outcome influences the average most.",
        grouping: "Small groups",
        time: "4 min",
        evidence: "Table with correct expected value."
      }
    ],
    assessmentFocus: [
      "Interpret derivative",
      "Find stationary points",
      "Reason about rate of change",
      "Explain expectation"
    ],
    reportFocus: ["Calculus meaning", "Change reasoning", "Uncertainty model"],
    teacherPrompts: {
      intro: [
        "What does rate of change mean in real life?",
        "Where might we use probability models?"
      ],
      concept: [
        "How is the derivative related to slope?",
        "What is a stationary point?",
        "What does expected value represent?"
      ],
      apply: [
        "Move the tangent and describe how slope changes.",
        "Identify where the function is increasing or decreasing.",
        "Build a probability table and compute expectation."
      ],
      reason: [
        "Why does slope 0 suggest a max or min?",
        "Explain what variance tells us about spread."
      ]
    }
  }
];
