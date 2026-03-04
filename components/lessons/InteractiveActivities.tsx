"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";

// A-1 activities
const ShareItFairly = dynamic(() => import("@/components/activities/ShareItFairly"), { ssr: false });
const NumberLineDefend = dynamic(() => import("@/components/activities/NumberLineDefend"), { ssr: false });
const EquivalentCardMatch = dynamic(() => import("@/components/activities/EquivalentCardMatch"), { ssr: false });
const RatioMixer = dynamic(() => import("@/components/activities/RatioMixer"), { ssr: false });

// A-2 activities
const RoomPlanner = dynamic(() => import("@/components/activities/RoomPlanner"), { ssr: false });
const FenceBuilder = dynamic(() => import("@/components/activities/FenceBuilder"), { ssr: false });
const ButterflySymmetry = dynamic(() => import("@/components/activities/ButterflySymmetry"), { ssr: false });
const ClockChallenge = dynamic(() => import("@/components/activities/ClockChallenge"), { ssr: false });

// A-3 activities
const SnackVote = dynamic(() => import("@/components/activities/SnackVote"), { ssr: false });
const PictogramBuilder = dynamic(() => import("@/components/activities/PictogramBuilder"), { ssr: false });
const LuckySpinner = dynamic(() => import("@/components/activities/LuckySpinner"), { ssr: false });
const WeatherStory = dynamic(() => import("@/components/activities/WeatherStory"), { ssr: false });

// B-1 activities
const TilePatternRule = dynamic(() => import("@/components/activities/TilePatternRule"), { ssr: false });
const ScaleBalance = dynamic(() => import("@/components/activities/ScaleBalance"), { ssr: false });
const TaxiFareGraph = dynamic(() => import("@/components/activities/TaxiFareGraph"), { ssr: false });
const HeartRateStory = dynamic(() => import("@/components/activities/HeartRateStory"), { ssr: false });

// B-2 activities
const CityTransformation = dynamic(() => import("@/components/activities/CityTransformation"), { ssr: false });
const TreasureMapScale = dynamic(() => import("@/components/activities/TreasureMapScale"), { ssr: false });
const NavigationBearing = dynamic(() => import("@/components/activities/NavigationBearing"), { ssr: false });
const BoxNetFold = dynamic(() => import("@/components/activities/BoxNetFold"), { ssr: false });

// B-3 activities
const SampleSizeDemo = dynamic(() => import("@/components/activities/SampleSizeDemo"), { ssr: false });
const SalarySkew = dynamic(() => import("@/components/activities/SalarySkew"), { ssr: false });
const BagOfMarbles = dynamic(() => import("@/components/activities/BagOfMarbles"), { ssr: false });
const HeightHistogram = dynamic(() => import("@/components/activities/HeightHistogram"), { ssr: false });

// C-1 activities
const BallThrow = dynamic(() => import("@/components/activities/BallThrow"), { ssr: false });
const DiscriminantSort = dynamic(() => import("@/components/activities/DiscriminantSort"), { ssr: false });
const MirrorGraph = dynamic(() => import("@/components/activities/MirrorGraph"), { ssr: false });
const ProfitRegion = dynamic(() => import("@/components/activities/ProfitRegion"), { ssr: false });

// C-2 activities
const FerrisWheel = dynamic(() => import("@/components/activities/FerrisWheel"), { ssr: false });
const RadianClock = dynamic(() => import("@/components/activities/RadianClock"), { ssr: false });
const GpsIntersection = dynamic(() => import("@/components/activities/GpsIntersection"), { ssr: false });
const TidePredictor = dynamic(() => import("@/components/activities/TidePredictor"), { ssr: false });

// C-3 activities
const SpeedTangent = dynamic(() => import("@/components/activities/SpeedTangent"), { ssr: false });
const RollerCoaster = dynamic(() => import("@/components/activities/RollerCoaster"), { ssr: false });
const PopulationGrowth = dynamic(() => import("@/components/activities/PopulationGrowth"), { ssr: false });
const InsuranceExpectedValue = dynamic(() => import("@/components/activities/InsuranceExpectedValue"), { ssr: false });

type ActivityConfig = {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
};

const A1_ACTIVITIES: ActivityConfig[] = [
  {
    id: "share-it-fairly",
    name: "Activity 1: Share it fairly",
    description: "Sketch a sharing story and represent it as fraction, decimal, and percent.",
    component: ShareItFairly,
  },
  {
    id: "number-line-defend",
    name: "Activity 2: Number line defend",
    description: "Place 1/4, 1/2, and 3/4 on the number line and defend the spacing.",
    component: NumberLineDefend,
  },
  {
    id: "equivalent-card-match",
    name: "Activity 3: Equivalent card match",
    description: "Match fraction cards to decimal and percent cards.",
    component: EquivalentCardMatch,
  },
  {
    id: "ratio-mixer",
    name: "Activity 4: Ratio mixer mini-challenge",
    description: "Scale a ratio to keep the taste the same.",
    component: RatioMixer,
  },
];

const A2_ACTIVITIES: ActivityConfig[] = [
  {
    id: "room-planner",
    name: "Activity 1: Room Planner",
    description: "Drag furniture around your room and calculate the total area.",
    component: RoomPlanner,
  },
  {
    id: "fence-builder",
    name: "Activity 2: Fence Builder",
    description: "Design a rectangular garden and calculate how much fence you need.",
    component: FenceBuilder,
  },
  {
    id: "butterfly-symmetry",
    name: "Activity 3: Butterfly Symmetry",
    description: "Color the left side of the butterfly - the right side mirrors automatically!",
    component: ButterflySymmetry,
  },
  {
    id: "clock-challenge",
    name: "Activity 4: Clock Challenge",
    description: "Set the analog clock to match the target time.",
    component: ClockChallenge,
  },
];

const A3_ACTIVITIES: ActivityConfig[] = [
  {
    id: "snack-vote",
    name: "Activity 1: Snack Vote",
    description: "Help the class vote for next week's snack. Click to add votes!",
    component: SnackVote,
  },
  {
    id: "pictogram-builder",
    name: "Activity 2: Pictogram Builder",
    description: "Build a pictogram showing books read. Each icon = 2 books.",
    component: PictogramBuilder,
  },
  {
    id: "lucky-spinner",
    name: "Activity 3: Lucky Spinner",
    description: "Adjust the spinner colors, then spin to test your predictions!",
    component: LuckySpinner,
  },
  {
    id: "weather-story",
    name: "Activity 4: Weather Story",
    description: "Drag the temperature points to explore weekly weather patterns.",
    component: WeatherStory,
  },
];

const B1_ACTIVITIES: ActivityConfig[] = [
  {
    id: "tile-pattern-rule",
    name: "Activity 1: Tile Pattern Rule",
    description: "Find the rule that describes this growing tile pattern.",
    component: TilePatternRule,
  },
  {
    id: "scale-balance",
    name: "Activity 2: Scale Balance",
    description: "Adjust x to balance the equation: 2x + 3 = 11",
    component: ScaleBalance,
  },
  {
    id: "taxi-fare-graph",
    name: "Activity 3: Taxi Fare Graph",
    description: "Adjust the base fare and per-minute rate, then calculate fares.",
    component: TaxiFareGraph,
  },
  {
    id: "heart-rate-story",
    name: "Activity 4: Heart Rate Story",
    description: "Match each exercise phase to the correct heart rate pattern.",
    component: HeartRateStory,
  },
];

const B2_ACTIVITIES: ActivityConfig[] = [
  {
    id: "city-transformation",
    name: "Activity 1: City Transformation",
    description: "Apply geometric transformations to a building.",
    component: CityTransformation,
  },
  {
    id: "treasure-map-scale",
    name: "Activity 2: Treasure Map Scale",
    description: "Use the map scale to convert map distance to real distance.",
    component: TreasureMapScale,
  },
  {
    id: "navigation-bearing",
    name: "Activity 3: Navigation Bearing",
    description: "Navigate the ship to the target port using bearings.",
    component: NavigationBearing,
  },
  {
    id: "box-net-fold",
    name: "Activity 4: Box Net Fold",
    description: "Design a box by adjusting dimensions, then fold it.",
    component: BoxNetFold,
  },
];

const B3_ACTIVITIES: ActivityConfig[] = [
  {
    id: "sample-size-demo",
    name: "Activity 1: Sample Size Demo",
    description: "Explore how sample size affects estimate accuracy.",
    component: SampleSizeDemo,
  },
  {
    id: "salary-skew",
    name: "Activity 2: Salary Skew",
    description: "Explore how outliers affect mean and median.",
    component: SalarySkew,
  },
  {
    id: "bag-of-marbles",
    name: "Activity 3: Bag of Marbles",
    description: "Adjust marble counts, draw samples, and compare theoretical vs. actual probabilities.",
    component: BagOfMarbles,
  },
  {
    id: "height-histogram",
    name: "Activity 4: Height Histogram",
    description: "Adjust bin width to explore different views of the height distribution.",
    component: HeightHistogram,
  },
];

const C1_ACTIVITIES: ActivityConfig[] = [
  {
    id: "ball-throw",
    name: "Activity 1: Ball Throw",
    description: "Adjust parabola parameters to model a thrown ball's trajectory.",
    component: BallThrow,
  },
  {
    id: "discriminant-sort",
    name: "Activity 2: Discriminant Sort",
    description: "Sort cards by their discriminant value to show solution types.",
    component: DiscriminantSort,
  },
  {
    id: "mirror-graph",
    name: "Activity 3: Mirror Graph",
    description: "Toggle the inverse function and see it mirror across y=x.",
    component: MirrorGraph,
  },
  {
    id: "profit-region",
    name: "Activity 4: Profit Region",
    description: "Shade the region where profit is positive.",
    component: ProfitRegion,
  },
];

const C2_ACTIVITIES: ActivityConfig[] = [
  {
    id: "ferris-wheel",
    name: "Activity 1: Ferris Wheel",
    description: "Rotate the wheel and see how sin(θ) gives the height.",
    component: FerrisWheel,
  },
  {
    id: "radian-clock",
    name: "Activity 2: Radian Clock",
    description: "Convert degrees to radians and visualize on a unit circle.",
    component: RadianClock,
  },
  {
    id: "gps-intersection",
    name: "Activity 3: GPS Intersection",
    description: "Adjust two signal lines to find their intersection point.",
    component: GpsIntersection,
  },
  {
    id: "tide-predictor",
    name: "Activity 4: Tide Predictor",
    description: "Adjust sine wave parameters to model tidal patterns.",
    component: TidePredictor,
  },
];

const C3_ACTIVITIES: ActivityConfig[] = [
  {
    id: "speed-tangent",
    name: "Activity 1: Speed Tangent",
    description: "See how the tangent line shows instantaneous speed.",
    component: SpeedTangent,
  },
  {
    id: "roller-coaster",
    name: "Activity 2: Roller Coaster",
    description: "Click on all the stationary points (where slope = 0).",
    component: RollerCoaster,
  },
  {
    id: "population-growth",
    name: "Activity 3: Population Growth",
    description: "Compare population and growth rate over time.",
    component: PopulationGrowth,
  },
  {
    id: "insurance-expected-value",
    name: "Activity 4: Insurance Expected Value",
    description: "Calculate fair insurance premiums using expected value.",
    component: InsuranceExpectedValue,
  },
];

type Props = {
  moduleId: string;
};

export default function InteractiveActivities({ moduleId }: Props) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  // Get activities for this module
  const activitiesMap: Record<string, ActivityConfig[]> = {
    "A-1": A1_ACTIVITIES,
    "A-2": A2_ACTIVITIES,
    "A-3": A3_ACTIVITIES,
    "B-1": B1_ACTIVITIES,
    "B-2": B2_ACTIVITIES,
    "B-3": B3_ACTIVITIES,
    "C-1": C1_ACTIVITIES,
    "C-2": C2_ACTIVITIES,
    "C-3": C3_ACTIVITIES,
  };

  const activities = activitiesMap[moduleId] ?? [];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" && activeTab < activities.length - 1) {
      setActiveTab(activeTab + 1);
    } else if (e.key === "ArrowLeft" && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const goToPrevious = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  const goToNext = () => {
    if (activeTab < activities.length - 1) setActiveTab(activeTab + 1);
  };

  if (activities.length === 0) {
    return (
      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h4>{t("Interactive canvas")}</h4>
        <p className="subtext">Interactive activities coming soon for this module.</p>
      </div>
    );
  }

  const currentActivity = activities[activeTab];
  const ActivityComponent = currentActivity.component;

  return (
    <div className="card" style={{ marginTop: "1.5rem" }} onKeyDown={handleKeyDown} tabIndex={0}>
      <h4>{t("Interactive canvas")}</h4>
      <p className="subtext">Students work through these activities during the lesson.</p>

      {/* Activity tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "1.5rem",
          borderBottom: "2px solid #e7e3df",
          flexWrap: "wrap",
        }}
      >
        {activities.map((activity, idx) => (
          <button
            key={activity.id}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: "0.8rem 1.2rem",
              background: activeTab === idx ? "#fff" : "transparent",
              borderBottom: activeTab === idx ? "3px solid #d57d3d" : "none",
              color: activeTab === idx ? "#d57d3d" : "#5b534c",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            {activity.name.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Activity description */}
      <div style={{ padding: "1rem 0", borderBottom: "1px solid #e7e3df" }}>
        <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>{currentActivity.description}</p>
      </div>

      {/* Activity content */}
      <div style={{ marginTop: "1.5rem" }}>
        <ActivityComponent />
      </div>

      {/* Progress indicator */}
      <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e7e3df" }}>
        <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>
          Activity {activeTab + 1} of {activities.length}
        </p>
        <div style={{ height: "4px", background: "#f1ece7", borderRadius: "2px", overflow: "hidden", marginTop: "0.5rem" }}>
          <div
            style={{
              height: "100%",
              background: "#d57d3d",
              width: `${((activeTab + 1) / activities.length) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            marginTop: "1rem",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={goToPrevious}
            disabled={activeTab === 0}
            style={{
              padding: "0.6rem 1.2rem",
              background: activeTab === 0 ? "#e7e3df" : "#d57d3d",
              color: activeTab === 0 ? "#999" : "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: activeTab === 0 ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Previous Activity
          </button>
          <button
            onClick={goToNext}
            disabled={activeTab === activities.length - 1}
            style={{
              padding: "0.6rem 1.2rem",
              background: activeTab === activities.length - 1 ? "#e7e3df" : "#d57d3d",
              color: activeTab === activities.length - 1 ? "#999" : "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: activeTab === activities.length - 1 ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
            }}
          >
            Next Activity →
          </button>
        </div>

        {/* Keyboard hint */}
        <p style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.8rem", textAlign: "center" }}>
          💡 Tip: Use ← → arrow keys to navigate
        </p>
      </div>
    </div>
  );
}
