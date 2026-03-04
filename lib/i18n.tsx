"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "en" | "ar";

type Dict = Record<string, Record<string, string>>;

const dict: Dict = {
  "Math Insight Oman Demo": { ar: "عرض رؤية الرياضيات لعُمان" },
  "i-scream math with Oman": { ar: "آي-سكريم ماث مع عُمان" },
  "Cambridge-aligned math showcase": { ar: "عرض الرياضيات المتوافق مع كامبريدج" },
  "Teacher Home": { ar: "الصفحة الرئيسية للمعلم" },
  "Modules": { ar: "الوحدات" },
  "Lesson": { ar: "الدرس" },
  "Assessment": { ar: "التقييم" },
  "Student Report": { ar: "تقرير الطالب" },
  "Dashboard": { ar: "لوحة القيادة" },
  "Curriculum Map": { ar: "خريطة المنهج" },
  "Open Teacher Home": { ar: "فتح صفحة المعلم" },
  "Launch Flagship Lesson": { ar: "بدء الدرس الرئيسي" },
  "Start Lesson": { ar: "بدء الدرس" },
  "Run Assessment": { ar: "بدء التقييم" },
  "Start Assessment": { ar: "بدء التقييم" },
  "Submit answer": { ar: "إرسال الإجابة" },
  "Add short reasoning": { ar: "أضف تفسيراً قصيراً" },
  "Launch Quick Poll": { ar: "إطلاق استطلاع سريع" },
  "Reveal Hint": { ar: "كشف التلميح" },
  "Lesson Player": { ar: "مشغل الدرس" },
  "Interactive canvas": { ar: "لوحة تفاعلية" },
  "Interactive Canvas": { ar: "لوحة تفاعلية" },
  "Teacher guide": { ar: "دليل المعلم" },
  "Student sync code": { ar: "رمز مزامنة الطالب" },
  "Oman Mathematics Demo": { ar: "عرض الرياضيات لعُمان" },
  "Interactive lesson to adaptive assessment, in one flow.": { ar: "من الدرس التفاعلي إلى التقييم التكيفي في مسار واحد." },
  "Demo proof points": { ar: "نقاط إثبات العرض" },
  "Select grade band and lesson module": { ar: "اختر المرحلة الدراسية ووحدة الدرس" },
  "Today in class": { ar: "اليوم في الصف" },
  "Recommended next lesson": { ar: "الدرس التالي المقترح" },
  "Recent progress": { ar: "التقدم الأخير" },
  "Student Assessment": { ar: "تقييم الطالب" },
  "Adaptive assessment session": { ar: "جلسة تقييم تكيفي" },
  "Tools": { ar: "الأدوات" },
  "Number line": { ar: "خط الأعداد" },
  "Grid and graph": { ar: "شبكة ورسم بياني" },
  "Limited calculator": { ar: "آلة حاسبة محدودة" },
  "Drag and drop": { ar: "سحب وإفلات" },
  "Short response": { ar: "إجابة قصيرة" },
  "Overall mastery": { ar: "الإتقان العام" },
  "Module": { ar: "الوحدة" },
  "Strength": { ar: "نقاط القوة" },
  "Needs support": { ar: "يحتاج دعماً" },
  "Band": { ar: "المرحلة" },
  "Student selector": { ar: "اختيار الطالب" },
  "Risk": { ar: "خطر" },
  "Watch": { ar: "مراقبة" },
  "OK": { ar: "جيد" },
  "Risk status": { ar: "حالة المخاطر" },
  "Based on K/U/A/R profile": { ar: "بناء على ملف K/U/A/R" },
  "Last updated": { ar: "آخر تحديث" },
  "Demo data": { ar: "بيانات العرض" },
  "Learning summary": { ar: "ملخص التعلم" },
  "Domain mastery": { ar: "إتقان المجالات" },
  "Cognitive profile": { ar: "الملف المعرفي" },
  "Suggested module": { ar: "الوحدة المقترحة" },
  "Immediate Support": { ar: "دعم فوري" },
  "Prioritize concept rebuilding and guided practice this week.": { ar: "التركيز على إعادة بناء المفاهيم والممارسة الموجهة هذا الأسبوع." },
  "Previous student": { ar: "الطالب السابق" },
  "Next student": { ar: "الطالب التالي" },
  "Next steps": { ar: "الخطوات التالية" },
  "Misconceptions": { ar: "المفاهيم الخاطئة" },
  "Teacher comment": { ar: "تعليق المعلم" },
  "Teacher Dashboard": { ar: "لوحة قيادة المعلم" },
  "At-a-glance cognitive heatmap and risk scan across 10 students.": { ar: "خريطة حرارية معرفية ومسح مخاطر لعدد 10 طلاب." },
  "Cognitive heatmap": { ar: "خريطة حرارية معرفية" },
  "All": { ar: "الكل" },
  "Risk only": { ar: "خطر فقط" },
  "Reasoning low": { ar: "استدلال منخفض" },
  "Concept low": { ar: "مفهوم منخفض" },
  "Class cognitive radar": { ar: "رادار معرفي للصف" },
  "Risk students": { ar: "طلاب معرضون للخطر" },
  "Weak concepts": { ar: "المفاهيم الضعيفة" },
  "Average mastery": { ar: "متوسط الإتقان" },
  "Weak concept": { ar: "مفهوم ضعيف" },
  "Reasoning at risk": { ar: "الاستدلال في خطر" },
  "Student groups": { ar: "مجموعات الطلاب" },
  "Immediate support": { ar: "دعم فوري" },
  "Practice needed": { ar: "يحتاج تدريب" },
  "Ready for extension": { ar: "جاهز للتوسع" },
  "Next lesson recommendations": { ar: "توصيات الدرس التالي" },
  "Reteach focus": { ar: "تركيز إعادة التدريس" },
  "Cognitive focus": { ar: "التركيز المعرفي" },
  "Lesson / Assessment": { ar: "الدرس / التقييم" },
  "Progress": { ar: "التقدم" },
  "Concept radar": { ar: "رادار المفاهيم" },
  "Domain distribution (K/U/A/R)": { ar: "توزيع المجالات (م/ف/ت/ا)" },
  "Concept mastery map": { ar: "خريطة إتقان المفاهيم" },
  "Curriculum Map Admin": { ar: "إدارة خريطة المنهج" },
  "Tagging structure for Oman alignment": { ar: "هيكل التصنيف المتوافق مع عُمان" },
  "Core tags": { ar: "التصنيفات الأساسية" },
  "Assessment alignment": { ar: "توافق التقييم" },
  "Module Library": { ar: "مكتبة الوحدات" },
  "Nine modules aligned to Oman bands": { ar: "تسع وحدات متوافقة مع مراحل عُمان" },
  "Start lesson": { ar: "بدء الدرس" },
  "Symbolic manipulation": { ar: "المعالجة الرمزية" },
  "Graph interpretation": { ar: "تفسير الرسوم البيانية" },
  "Sequence rules": { ar: "قواعد المتتاليات" },
  "Students below R threshold": { ar: "طلاب أقل من عتبة الاستدلال" },
  "Number Sense and Fraction Lab": { ar: "معمل الحس العددي والكسور" },
  "Measure and Shape Explorer": { ar: "مستكشف القياس والأشكال" },
  "Data and Decision Junior": { ar: "البيانات والقرار للمبتدئين" },
  "Algebra and Graphs Studio": { ar: "استوديو الجبر والرسوم البيانية" },
  "Geometry, Scale and Transformation Lab": { ar: "معمل الهندسة والمقياس والتحويلات" },
  "Statistics and Probability Investigator": { ar: "محقق الإحصاء والاحتمالات" },
  "Functions and Quadratics Studio": { ar: "استوديو الدوال والمعادلات التربيعية" },
  "Trig and Coordinate Modelling Studio": { ar: "استوديو حساب المثلثات والنمذجة الإحداثية" },
  "Calculus and Uncertainty Studio": { ar: "استوديو التفاضل وعدم اليقين" },
  "Fractions, decimals, percentages, ratio": { ar: "الكسور والأعداد العشرية والنسب المئوية والنسب" },
  "Time, length, area, symmetry": { ar: "الوقت والطول والمساحة والتماثل" },
  "Graphs, pictograms, chance": { ar: "الرسوم البيانية والرسوم التوضيحية والاحتمالات" },
  "Equations, sequences, functions": { ar: "المعادلات والمتتاليات والدوال" },
  "Coordinates, scale, bearing, area": { ar: "الإحداثيات والمقياس والاتجاه والمساحة" },
  "Data, averages, experimental chance": { ar: "البيانات والمتوسطات والاحتمالات التجريبية" },
  "Discriminant, transformations, inverse": { ar: "المميز والتحويلات والعكسية" },
  "Radians, unit circle, lines": { ar: "الراديان ودائرة الوحدة والخطوط" },
  "Derivative meaning, random variables": { ar: "معنى المشتقة والمتغيرات العشوائية" },
  "Teacher Prompts": { ar: "أسئلة المعلم" },
  "Student activities": { ar: "أنشطة الطلاب" },
  "Short, high-participation routines aligned to the lesson focus.": {
    ar: "روتينات قصيرة عالية المشاركة متوافقة مع تركيز الدرس."
  },
  "Activity": { ar: "نشاط" },
  "Student action": { ar: "إجراء الطالب" },
  "Teacher move": { ar: "إجراء المعلم" },
  "Grouping": { ar: "التجميع" },
  "Time": { ar: "الوقت" },
  "Evidence": { ar: "الدليل" },
  "Try this": { ar: "جرّب هذا" },
  "Intro": { ar: "تمهيد" },
  "Concept Check": { ar: "تحقق المفهوم" },
  "Apply": { ar: "تطبيق" },
  "Reason": { ar: "استدلال" },
  "Teacher Prompt": { ar: "سؤال للمعلم" },
  "Close": { ar: "إغلاق" },
  "Fullscreen": { ar: "ملء الشاشة" },
  "Exit Fullscreen": { ar: "إنهاء ملء الشاشة" },
  // Stepper labels
  "Mark done": { ar: "تحديد كمنتهٍ" },
  "Next step": { ar: "الخطوة التالية" },
  "Step complete": { ar: "مكتملة" },
  // Scenario context
  "Help the shopkeeper measure out 3/4 kg of dates in the Muscat market.": {
    ar: "ساعد صاحب المتجر على قياس 3/4 كيلوغرام من التمر في سوق مسقط."
  },
  "Omani Date Market Challenge": { ar: "تحدي سوق التمر العماني" },
  "Design a school garden with exactly 24 square meters. Multiple solutions exist!": {
    ar: "صمم حديقة مدرسية بمساحة 24 متر مربع بالضبط. هناك حلول متعددة!"
  },
  "School Garden Design": { ar: "تصميم حديقة المدرسة" },
  "Vote for your favorite sport. Need at least 10 total votes to see results.": {
    ar: "صوّت لرياضتك المفضلة. تحتاج إلى 10 أصوات على الأقل لرؤية النتائج."
  },
  "Classroom Sports Poll": { ar: "استطلاع الرياضة في الفصل" },
  "Football": { ar: "كرة القدم" },
  "Basketball": { ar: "كرة السلة" },
  "Swimming": { ar: "السباحة" },
  "Cricket": { ar: "الكريكيت" },
  "Votes needed:": { ar: "الأصوات المطلوبة:" },
  "Most voted:": { ar: "الأكثر أصواتاً:" },
  "Set the taxi fare equation using base fare and distance rate.": {
    ar: "حدد معادلة أجرة التاكسي باستخدام الأجرة الأساسية ومعدل المسافة."
  },
  "Muscat Taxi Fare": { ar: "أجرة التاكسي في مسقط" },
  "Complete the Islamic geometric tile pattern with a 90° rotation.": {
    ar: "أكمل نمط البلاط الهندسي الإسلامي بدوران 90 درجة."
  },
  "Oman Geometric Tile": { ar: "البلاط الهندسي العماني" },
  "Roll the dice 30 times to observe the probability converging to 1/6.": {
    ar: "رمِ النرد 30 مرة لمراقبة الاحتمالية التي تتقارب إلى 1/6."
  },
  "Weather Prediction Experiment": { ar: "تجربة التنبؤ بالطقس" },
  "Rolls remaining:": { ar: "الرميات المتبقية:" },
  "Adjust the parabola so the soccer ball lands between x=4 and x=6.": {
    ar: "اضبط القطع المكافئ بحيث تهبط كرة القدم بين x=4 و x=6."
  },
  "Soccer Ball Trajectory": { ar: "مسار كرة القدم" },
  "Set the bearing to 045° for the harbor route.": {
    ar: "ضبط الاتجاه على 045° لمسار الميناء."
  },
  "Muscat Harbor Navigation": { ar: "ملاحة ميناء مسقط" },
  "Find where the car momentarily stops (zero velocity).": {
    ar: "ابحث عن المكان الذي تتوقف فيه السيارة للحظة (السرعة الصفرية)."
  },
  "Muscat Highway Driving": { ar: "القيادة على طريق مسقط السريع" },
  "Success! Challenge complete.": { ar: "نجاح! التحدي مكتمل." },
  "In progress—adjust to meet the challenge.": { ar: "جاري—اضبط لتحقيق التحدي." }
};

type I18nContextType = {
  locale: Locale;
  toggle: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  toggle: () => {},
  t: (k: string) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggle = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => {
      if (locale === "en") return key;
      return dict[key]?.ar ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
