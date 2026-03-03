"use client";

import dynamic from "next/dynamic";

const FractionSlider = dynamic(() => import("./FractionSlider"), { ssr: false });
const AreaPerimeter = dynamic(() => import("./AreaPerimeter"), { ssr: false });
const BarChartPoll = dynamic(() => import("./BarChartPoll"), { ssr: false });
const SlopeIntercept = dynamic(() => import("./SlopeIntercept"), { ssr: false });
const TransformationBoard = dynamic(() => import("./TransformationBoard"), { ssr: false });
const DiceExperiment = dynamic(() => import("./DiceExperiment"), { ssr: false });
const QuadraticExplorer = dynamic(() => import("./QuadraticExplorer"), { ssr: false });
const UnitCircle = dynamic(() => import("./UnitCircle"), { ssr: false });
const DerivativeVisualizer = dynamic(() => import("./DerivativeVisualizer"), { ssr: false });

const lessonMap: Record<string, React.ComponentType> = {
  "A-1": FractionSlider,
  "A-2": AreaPerimeter,
  "A-3": BarChartPoll,
  "B-1": SlopeIntercept,
  "B-2": TransformationBoard,
  "B-3": DiceExperiment,
  "C-1": QuadraticExplorer,
  "C-2": UnitCircle,
  "C-3": DerivativeVisualizer,
};

export default function LessonContent({ moduleId }: { moduleId: string }) {
  const Component = lessonMap[moduleId];
  if (!Component) {
    return (
      <div className="lesson-stage">
        <p className="subtext">Interactive content for module {moduleId}</p>
      </div>
    );
  }
  return <Component />;
}
