export type CognitiveDomain = "K" | "U" | "A" | "R";

export type Question = {
  id: string;
  moduleId: string;
  domain: CognitiveDomain;
  difficulty: number;
  stem: string;
  stemAr: string;
  choices: string[];
  choicesAr: string[];
  correctIndex: number;
  explanation: string;
  explanationAr: string;
};

export const questionBank: Question[] = [
  {
    id: "A1-K1", moduleId: "A-1", domain: "K", difficulty: 1,
    stem: "Which of the following is equal to 0.5?",
    stemAr: "أي مما يلي يساوي 0.5؟",
    choices: ["1/4", "1/2", "2/5", "3/5"],
    choicesAr: ["١/٤", "١/٢", "٢/٥", "٣/٥"],
    correctIndex: 1,
    explanation: "0.5 = 1/2 because half of 1 is 0.5",
    explanationAr: "٠٫٥ = ١/٢ لأن نصف ١ يساوي ٠٫٥"
  },
  {
    id: "A1-U1", moduleId: "A-1", domain: "U", difficulty: 2,
    stem: "What percentage is equivalent to 3/4?",
    stemAr: "ما النسبة المئوية المكافئة لـ ٣/٤؟",
    choices: ["25%", "50%", "75%", "80%"],
    choicesAr: ["٢٥٪", "٥٠٪", "٧٥٪", "٨٠٪"],
    correctIndex: 2,
    explanation: "3/4 = 0.75 = 75%",
    explanationAr: "٣/٤ = ٠٫٧٥ = ٧٥٪"
  },
  {
    id: "A1-A1", moduleId: "A-1", domain: "A", difficulty: 3,
    stem: "A juice box contains 100 mL. If 25 mL is strawberry flavour, what percentage is strawberry?",
    stemAr: "يحتوي علبة عصير على ١٠٠ مل. إذا كان ٢٥ مل بنكهة الفراولة، ما نسبة الفراولة؟",
    choices: ["15%", "20%", "25%", "50%"],
    choicesAr: ["١٥٪", "٢٠٪", "٢٥٪", "٥٠٪"],
    correctIndex: 2,
    explanation: "25/100 = 25%",
    explanationAr: "٢٥/١٠٠ = ٢٥٪"
  },
  {
    id: "A1-A2", moduleId: "A-1", domain: "A", difficulty: 3,
    stem: "There are 6 blue blocks and 9 red blocks. What is the simplest ratio of blue to red?",
    stemAr: "يوجد ٦ مكعبات زرقاء و ٩ مكعبات حمراء. ما أبسط نسبة للأزرق إلى الأحمر؟",
    choices: ["6:9", "2:3", "3:2", "1:2"],
    choicesAr: ["٦:٩", "٢:٣", "٣:٢", "١:٢"],
    correctIndex: 1,
    explanation: "6:9 simplified by dividing both by 3 = 2:3",
    explanationAr: "٦:٩ تبسط بالقسمة على ٣ = ٢:٣"
  },
  {
    id: "A1-R1", moduleId: "A-1", domain: "R", difficulty: 4,
    stem: "Why are 1/2, 0.50, and 50% the same amount?",
    stemAr: "لماذا ١/٢ و ٠٫٥٠ و ٥٠٪ هي نفس المقدار؟",
    choices: ["They are different numbers written the same way", "They all represent exactly half of a whole", "They only look the same on paper", "They are only equal for small numbers"],
    choicesAr: ["هي أرقام مختلفة مكتوبة بنفس الطريقة", "جميعها تمثل نصف الكل تماماً", "تبدو متشابهة على الورق فقط", "متساوية فقط للأرقام الصغيرة"],
    correctIndex: 1,
    explanation: "All three are different representations of the same quantity: half of one whole.",
    explanationAr: "الثلاثة تمثيلات مختلفة لنفس الكمية: نصف الواحد الصحيح."
  },

  {
    id: "A2-K1", moduleId: "A-2", domain: "K", difficulty: 1,
    stem: "How many lines of symmetry does a square have?",
    stemAr: "كم عدد خطوط التماثل في المربع؟",
    choices: ["1", "2", "3", "4"],
    choicesAr: ["١", "٢", "٣", "٤"],
    correctIndex: 3,
    explanation: "A square has 4 lines of symmetry.",
    explanationAr: "للمربع ٤ خطوط تماثل."
  },
  {
    id: "A2-U1", moduleId: "A-2", domain: "U", difficulty: 2,
    stem: "A rectangle is 5 cm long and 3 cm wide. What is its perimeter?",
    stemAr: "مستطيل طوله ٥ سم وعرضه ٣ سم. ما محيطه؟",
    choices: ["8 cm", "15 cm", "16 cm", "30 cm"],
    choicesAr: ["٨ سم", "١٥ سم", "١٦ سم", "٣٠ سم"],
    correctIndex: 2,
    explanation: "Perimeter = 2×(5+3) = 16 cm",
    explanationAr: "المحيط = ٢×(٥+٣) = ١٦ سم"
  },
  {
    id: "A2-A1", moduleId: "A-2", domain: "A", difficulty: 3,
    stem: "A rectangle has length 4 units and width 3 units. What is its area?",
    stemAr: "مستطيل طوله ٤ وحدات وعرضه ٣ وحدات. ما مساحته؟",
    choices: ["7 sq units", "12 sq units", "14 sq units", "24 sq units"],
    choicesAr: ["٧ وحدة مربعة", "١٢ وحدة مربعة", "١٤ وحدة مربعة", "٢٤ وحدة مربعة"],
    correctIndex: 1,
    explanation: "Area = 4 × 3 = 12 square units",
    explanationAr: "المساحة = ٤ × ٣ = ١٢ وحدة مربعة"
  },
  {
    id: "A2-R1", moduleId: "A-2", domain: "R", difficulty: 4,
    stem: "Can two shapes have the same perimeter but different areas?",
    stemAr: "هل يمكن أن يكون لشكلين نفس المحيط ولكن مساحات مختلفة؟",
    choices: ["No, same perimeter always means same area", "Yes, for example a 1×5 and 2×4 rectangle", "Only circles can do this", "Only if one is a triangle"],
    choicesAr: ["لا، نفس المحيط يعني دائماً نفس المساحة", "نعم، مثل مستطيل ١×٥ و ٢×٤", "فقط الدوائر يمكنها ذلك", "فقط إذا كان أحدهما مثلثاً"],
    correctIndex: 1,
    explanation: "1×5 has perimeter 12, area 5. 2×4 has perimeter 12, area 8.",
    explanationAr: "١×٥ محيطه ١٢ ومساحته ٥. و ٢×٤ محيطه ١٢ ومساحته ٨."
  },

  {
    id: "A3-K1", moduleId: "A-3", domain: "K", difficulty: 1,
    stem: "In a bar chart, which fruit got the most votes: Apple (8), Banana (5), Orange (3)?",
    stemAr: "في رسم بياني شريطي، أي فاكهة حصلت على أكثر أصوات: تفاح (٨)، موز (٥)، برتقال (٣)؟",
    choices: ["Banana", "Orange", "Apple", "They are equal"],
    choicesAr: ["الموز", "البرتقال", "التفاح", "متساوية"],
    correctIndex: 2,
    explanation: "Apple has the tallest bar at 8 votes.",
    explanationAr: "التفاح لديه أعلى شريط بـ ٨ أصوات."
  },
  {
    id: "A3-U1", moduleId: "A-3", domain: "U", difficulty: 2,
    stem: "If Apple got 8 votes and Banana got 5, how many more votes did Apple get?",
    stemAr: "إذا حصل التفاح على ٨ أصوات والموز على ٥، كم صوتاً إضافياً حصل عليه التفاح؟",
    choices: ["2", "3", "5", "13"],
    choicesAr: ["٢", "٣", "٥", "١٣"],
    correctIndex: 1,
    explanation: "8 - 5 = 3 more votes",
    explanationAr: "٨ - ٥ = ٣ أصوات إضافية"
  },
  {
    id: "A3-A1", moduleId: "A-3", domain: "A", difficulty: 3,
    stem: "A spinner has 4 equal sections. 1 section is red. What is the chance of landing on red?",
    stemAr: "قرص دوّار مقسم إلى ٤ أقسام متساوية. قسم واحد أحمر. ما احتمال الوقوع على الأحمر؟",
    choices: ["1/2", "1/3", "1/4", "1/5"],
    choicesAr: ["١/٢", "١/٣", "١/٤", "١/٥"],
    correctIndex: 2,
    explanation: "1 red section out of 4 total = 1/4",
    explanationAr: "قسم أحمر واحد من ٤ = ١/٤"
  },
  {
    id: "A3-R1", moduleId: "A-3", domain: "R", difficulty: 4,
    stem: "To find the most popular choice in a survey, you should look at which part of a bar chart?",
    stemAr: "لإيجاد الخيار الأكثر شعبية في استطلاع، أي جزء من الرسم البياني تنظر إليه؟",
    choices: ["The shortest bar", "The widest bar", "The tallest bar", "The middle bar"],
    choicesAr: ["أقصر شريط", "أعرض شريط", "أطول شريط", "الشريط الأوسط"],
    correctIndex: 2,
    explanation: "The tallest bar represents the most votes/frequency.",
    explanationAr: "أطول شريط يمثل أكبر عدد من الأصوات/التكرار."
  },

  {
    id: "B1-K1", moduleId: "B-1", domain: "K", difficulty: 1,
    stem: "Solve: 3x + 5 = 17. What is x?",
    stemAr: "حل: ٣س + ٥ = ١٧. ما قيمة س؟",
    choices: ["3", "4", "5", "6"],
    choicesAr: ["٣", "٤", "٥", "٦"],
    correctIndex: 1,
    explanation: "3x = 12, x = 4",
    explanationAr: "٣س = ١٢، س = ٤"
  },
  {
    id: "B1-U1", moduleId: "B-1", domain: "U", difficulty: 2,
    stem: "In a table, when x increases by 1, y increases by 2. If y=3 when x=1, what is the rule?",
    stemAr: "في جدول، عندما تزداد س بمقدار ١، تزداد ص بمقدار ٢. إذا ص=٣ عندما س=١، ما القاعدة؟",
    choices: ["y = x + 2", "y = 2x + 1", "y = 3x", "y = x + 3"],
    choicesAr: ["ص = س + ٢", "ص = ٢س + ١", "ص = ٣س", "ص = س + ٣"],
    correctIndex: 1,
    explanation: "When x=1, y=2(1)+1=3 ✓. Rate of change is 2, so y = 2x + 1.",
    explanationAr: "عندما س=١، ص=٢(١)+١=٣ ✓. معدل التغير ٢، لذا ص = ٢س + ١."
  },
  {
    id: "B1-A1", moduleId: "B-1", domain: "A", difficulty: 3,
    stem: "Solve: 2x − 3 > 7. What values of x satisfy this?",
    stemAr: "حل: ٢س − ٣ > ٧. ما قيم س التي تحقق ذلك؟",
    choices: ["x > 2", "x > 5", "x > 7", "x > 10"],
    choicesAr: ["س > ٢", "س > ٥", "س > ٧", "س > ١٠"],
    correctIndex: 1,
    explanation: "2x > 10, x > 5",
    explanationAr: "٢س > ١٠، س > ٥"
  },
  {
    id: "B1-A2", moduleId: "B-1", domain: "A", difficulty: 3,
    stem: "Which two points lie on the line y = 2x + 1?",
    stemAr: "أي نقطتين تقعان على الخط ص = ٢س + ١؟",
    choices: ["(0,1) and (1,3)", "(1,1) and (2,3)", "(0,2) and (1,4)", "(0,0) and (1,2)"],
    choicesAr: ["(٠,١) و (١,٣)", "(١,١) و (٢,٣)", "(٠,٢) و (١,٤)", "(٠,٠) و (١,٢)"],
    correctIndex: 0,
    explanation: "x=0: y=1, x=1: y=3. Both satisfy y = 2x + 1.",
    explanationAr: "س=٠: ص=١، س=١: ص=٣. كلاهما يحقق ص = ٢س + ١."
  },
  {
    id: "B1-R1", moduleId: "B-1", domain: "R", difficulty: 5,
    stem: "Why is the graph of y = 2x + 1 a straight line?",
    stemAr: "لماذا الرسم البياني لـ ص = ٢س + ١ هو خط مستقيم؟",
    choices: ["Because it has an x variable", "Because the rate of change is constant", "Because it passes through the origin", "Because x is positive"],
    choicesAr: ["لأنه يحتوي على متغير س", "لأن معدل التغير ثابت", "لأنه يمر بنقطة الأصل", "لأن س موجبة"],
    correctIndex: 1,
    explanation: "A linear function has constant rate of change, producing a straight line.",
    explanationAr: "الدالة الخطية لها معدل تغير ثابت، مما ينتج خطاً مستقيماً."
  },

  {
    id: "B2-K1", moduleId: "B-2", domain: "K", difficulty: 1,
    stem: "Point A is at (2, 3). What is its reflection in the y-axis?",
    stemAr: "النقطة أ عند (٢، ٣). ما انعكاسها في محور الصاد؟",
    choices: ["(2, -3)", "(-2, 3)", "(-2, -3)", "(3, 2)"],
    choicesAr: ["(٢، -٣)", "(-٢، ٣)", "(-٢، -٣)", "(٣، ٢)"],
    correctIndex: 1,
    explanation: "Reflection in y-axis: x becomes -x, y stays. (-2, 3)",
    explanationAr: "الانعكاس في محور الصاد: س تصبح -س، ص تبقى. (-٢، ٣)"
  },
  {
    id: "B2-U1", moduleId: "B-2", domain: "U", difficulty: 2,
    stem: "A shape is moved without flipping or resizing. What transformation is this?",
    stemAr: "شكل تم تحريكه بدون قلب أو تغيير حجم. ما نوع هذا التحويل؟",
    choices: ["Reflection", "Rotation", "Translation", "Enlargement"],
    choicesAr: ["انعكاس", "دوران", "انتقال", "تكبير"],
    correctIndex: 2,
    explanation: "Moving without flipping or resizing is a translation.",
    explanationAr: "التحريك بدون قلب أو تغيير حجم هو انتقال."
  },
  {
    id: "B2-A1", moduleId: "B-2", domain: "A", difficulty: 3,
    stem: "On a map, 2 cm represents 1 km. How far is 6 cm in real life?",
    stemAr: "على خريطة، ٢ سم تمثل ١ كم. كم يساوي ٦ سم في الواقع؟",
    choices: ["2 km", "3 km", "4 km", "6 km"],
    choicesAr: ["٢ كم", "٣ كم", "٤ كم", "٦ كم"],
    correctIndex: 1,
    explanation: "6 cm ÷ 2 cm/km = 3 km",
    explanationAr: "٦ سم ÷ ٢ سم/كم = ٣ كم"
  },
  {
    id: "B2-R1", moduleId: "B-2", domain: "R", difficulty: 4,
    stem: "Can two shapes have the same area but different shapes?",
    stemAr: "هل يمكن أن يكون لشكلين نفس المساحة ولكن أشكال مختلفة؟",
    choices: ["No, same area means same shape", "Yes, a 2×6 rectangle and a 3×4 rectangle both have area 12", "Only triangles can do this", "Only if they have the same perimeter"],
    choicesAr: ["لا، نفس المساحة تعني نفس الشكل", "نعم، مستطيل ٢×٦ و ٣×٤ كلاهما مساحته ١٢", "فقط المثلثات يمكنها ذلك", "فقط إذا كان لهما نفس المحيط"],
    correctIndex: 1,
    explanation: "2×6=12 and 3×4=12. Same area, different dimensions.",
    explanationAr: "٢×٦=١٢ و ٣×٤=١٢. نفس المساحة، أبعاد مختلفة."
  },

  {
    id: "B3-K1", moduleId: "B-3", domain: "K", difficulty: 1,
    stem: "What is the mode of: 3, 4, 4, 5, 9?",
    stemAr: "ما المنوال لـ: ٣، ٤، ٤، ٥، ٩؟",
    choices: ["3", "4", "5", "9"],
    choicesAr: ["٣", "٤", "٥", "٩"],
    correctIndex: 1,
    explanation: "4 appears most often (twice).",
    explanationAr: "٤ يتكرر أكثر (مرتين)."
  },
  {
    id: "B3-U1", moduleId: "B-3", domain: "U", difficulty: 2,
    stem: "Which is less affected by outliers: mean or median?",
    stemAr: "أيهما أقل تأثراً بالقيم المتطرفة: المتوسط أم الوسيط؟",
    choices: ["Mean", "Median", "Both equally", "Neither"],
    choicesAr: ["المتوسط", "الوسيط", "كلاهما بالتساوي", "لا أحد منهما"],
    correctIndex: 1,
    explanation: "The median is resistant to extreme values.",
    explanationAr: "الوسيط مقاوم للقيم المتطرفة."
  },
  {
    id: "B3-A1", moduleId: "B-3", domain: "A", difficulty: 3,
    stem: "A die is rolled 30 times and 6 appears 3 times. What is the experimental probability?",
    stemAr: "تم رمي نرد ٣٠ مرة وظهر الرقم ٦ ثلاث مرات. ما الاحتمال التجريبي؟",
    choices: ["1/6", "1/10", "3/30", "6/30"],
    choicesAr: ["١/٦", "١/١٠", "٣/٣٠", "٦/٣٠"],
    correctIndex: 1,
    explanation: "3/30 = 1/10",
    explanationAr: "٣/٣٠ = ١/١٠"
  },
  {
    id: "B3-R1", moduleId: "B-3", domain: "R", difficulty: 5,
    stem: "Why is a larger sample more reliable than a smaller one?",
    stemAr: "لماذا العينة الأكبر أكثر موثوقية من الأصغر؟",
    choices: ["Because it takes longer", "Because it reduces the effect of random variation", "Because it always gives the exact answer", "Because teachers prefer it"],
    choicesAr: ["لأنها تستغرق وقتاً أطول", "لأنها تقلل تأثير التباين العشوائي", "لأنها تعطي الإجابة الدقيقة دائماً", "لأن المعلمين يفضلونها"],
    correctIndex: 1,
    explanation: "Larger samples reduce the effect of random variation.",
    explanationAr: "العينات الأكبر تقلل تأثير التباين العشوائي."
  },

  {
    id: "C1-K1", moduleId: "C-1", domain: "K", difficulty: 1,
    stem: "Solve x² − 5x + 6 = 0",
    stemAr: "حل س² − ٥س + ٦ = ٠",
    choices: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = 1, 5"],
    choicesAr: ["س = ١، ٦", "س = ٢، ٣", "س = -٢، -٣", "س = ١، ٥"],
    correctIndex: 1,
    explanation: "(x-2)(x-3)=0, so x=2 or x=3",
    explanationAr: "(س-٢)(س-٣)=٠، إذن س=٢ أو س=٣"
  },
  {
    id: "C1-U1", moduleId: "C-1", domain: "U", difficulty: 2,
    stem: "If the discriminant b²−4ac = 0, how many times does the graph touch the x-axis?",
    stemAr: "إذا كان المميز ب²−٤أج = ٠، كم مرة يلمس الرسم البياني محور السينات؟",
    choices: ["0", "1", "2", "3"],
    choicesAr: ["٠", "١", "٢", "٣"],
    correctIndex: 1,
    explanation: "Discriminant = 0 means exactly one repeated root (tangent to x-axis).",
    explanationAr: "المميز = ٠ يعني جذر واحد مكرر (مماس لمحور السينات)."
  },
  {
    id: "C1-A1", moduleId: "C-1", domain: "A", difficulty: 3,
    stem: "The graph of y = f(x) is shifted right by 3. What is the new equation?",
    stemAr: "إذا انتقل الرسم البياني لـ ص = د(س) إلى اليمين بمقدار ٣، ما المعادلة الجديدة؟",
    choices: ["y = f(x + 3)", "y = f(x − 3)", "y = f(x) + 3", "y = f(x) − 3"],
    choicesAr: ["ص = د(س + ٣)", "ص = د(س − ٣)", "ص = د(س) + ٣", "ص = د(س) − ٣"],
    correctIndex: 1,
    explanation: "Shifting right by 3: replace x with (x−3).",
    explanationAr: "الانتقال يميناً بمقدار ٣: نعوض س بـ (س−٣)."
  },
  {
    id: "C1-R1", moduleId: "C-1", domain: "R", difficulty: 5,
    stem: "How can the discriminant tell you the number of roots without graphing?",
    stemAr: "كيف يمكن للمميز أن يخبرك بعدد الجذور بدون الرسم؟",
    choices: ["It cannot", "If > 0: 2 roots, = 0: 1 root, < 0: no real roots", "It only works for quadratics with a=1", "You still need to graph"],
    choicesAr: ["لا يمكنه", "إذا > ٠: جذران، = ٠: جذر، < ٠: لا جذور حقيقية", "يعمل فقط للتربيعيات عندما أ=١", "لا تزال بحاجة للرسم"],
    correctIndex: 1,
    explanation: "b²−4ac > 0 means 2 distinct roots, = 0 means 1 repeated root, < 0 means no real roots.",
    explanationAr: "ب²−٤أج > ٠ يعني جذرين مختلفين، = ٠ يعني جذراً مكرراً، < ٠ يعني لا جذور حقيقية."
  },

  {
    id: "C2-K1", moduleId: "C-2", domain: "K", difficulty: 1,
    stem: "Convert 180° to radians.",
    stemAr: "حوّل ١٨٠° إلى راديان.",
    choices: ["π/2", "π", "2π", "π/4"],
    choicesAr: ["ط/٢", "ط", "٢ط", "ط/٤"],
    correctIndex: 1,
    explanation: "180° = π radians",
    explanationAr: "١٨٠° = ط راديان"
  },
  {
    id: "C2-U1", moduleId: "C-2", domain: "U", difficulty: 2,
    stem: "What is the gradient of the line through (1,2) and (3,6)?",
    stemAr: "ما ميل الخط المار بالنقطتين (١،٢) و (٣،٦)؟",
    choices: ["1", "2", "3", "4"],
    choicesAr: ["١", "٢", "٣", "٤"],
    correctIndex: 1,
    explanation: "(6-2)/(3-1) = 4/2 = 2",
    explanationAr: "(٦-٢)/(٣-١) = ٤/٢ = ٢"
  },
  {
    id: "C2-A1", moduleId: "C-2", domain: "A", difficulty: 3,
    stem: "Find the arc length of a sector with radius 5 and angle π/2.",
    stemAr: "أوجد طول القوس لقطاع نصف قطره ٥ وزاويته ط/٢.",
    choices: ["5π/4", "5π/2", "10π", "5"],
    choicesAr: ["٥ط/٤", "٥ط/٢", "١٠ط", "٥"],
    correctIndex: 1,
    explanation: "Arc length = rθ = 5 × π/2 = 5π/2",
    explanationAr: "طول القوس = نق×θ = ٥ × ط/٢ = ٥ط/٢"
  },
  {
    id: "C2-R1", moduleId: "C-2", domain: "R", difficulty: 5,
    stem: "Why does using radians make the arc length formula simpler?",
    stemAr: "لماذا يجعل استخدام الراديان صيغة طول القوس أبسط؟",
    choices: ["It doesn't matter", "Because arc length = radius × angle directly without conversion", "Because radians are bigger", "Because degrees are harder to type"],
    choicesAr: ["لا فرق", "لأن طول القوس = نصف القطر × الزاوية مباشرة بدون تحويل", "لأن الراديان أكبر", "لأن الدرجات أصعب في الكتابة"],
    correctIndex: 1,
    explanation: "With radians, s = rθ directly, no need for degree conversion factor.",
    explanationAr: "بالراديان، ل = نق×θ مباشرة، بدون عامل تحويل الدرجات."
  },

  {
    id: "C3-K1", moduleId: "C-3", domain: "K", difficulty: 1,
    stem: "What is the derivative of y = x³?",
    stemAr: "ما مشتقة ص = س³؟",
    choices: ["x²", "3x²", "3x", "x³"],
    choicesAr: ["س²", "٣س²", "٣س", "س³"],
    correctIndex: 1,
    explanation: "d/dx(x³) = 3x²",
    explanationAr: "مش/مس(س³) = ٣س²"
  },
  {
    id: "C3-U1", moduleId: "C-3", domain: "U", difficulty: 2,
    stem: "What does a stationary point mean?",
    stemAr: "ماذا تعني نقطة السكون؟",
    choices: ["The function is zero", "The gradient is zero", "The function is undefined", "The x value is zero"],
    choicesAr: ["الدالة تساوي صفراً", "الميل يساوي صفراً", "الدالة غير معرفة", "قيمة س تساوي صفراً"],
    correctIndex: 1,
    explanation: "At a stationary point, dy/dx = 0.",
    explanationAr: "عند نقطة السكون، مص/مس = ٠."
  },
  {
    id: "C3-A1", moduleId: "C-3", domain: "A", difficulty: 3,
    stem: "Find the x-coordinate of the stationary point of y = x² − 4x + 1.",
    stemAr: "أوجد إحداثي س لنقطة سكون ص = س² − ٤س + ١.",
    choices: ["x = 1", "x = 2", "x = 4", "x = -2"],
    choicesAr: ["س = ١", "س = ٢", "س = ٤", "س = -٢"],
    correctIndex: 1,
    explanation: "dy/dx = 2x − 4 = 0, x = 2",
    explanationAr: "مص/مس = ٢س − ٤ = ٠، س = ٢"
  },
  {
    id: "C3-R1", moduleId: "C-3", domain: "R", difficulty: 5,
    stem: "If the derivative changes from positive to negative at a point, why is it likely a maximum?",
    stemAr: "إذا تغيرت المشتقة من موجبة إلى سالبة عند نقطة، لماذا من المحتمل أن تكون قمة؟",
    choices: ["Because the function is increasing then decreasing", "Because the function is always positive", "Because the second derivative is positive", "This cannot determine max or min"],
    choicesAr: ["لأن الدالة تتزايد ثم تتناقص", "لأن الدالة دائماً موجبة", "لأن المشتقة الثانية موجبة", "لا يمكن تحديد القمة أو القاع"],
    correctIndex: 0,
    explanation: "Positive → negative gradient means function rises then falls: a local maximum.",
    explanationAr: "ميل موجب → سالب يعني أن الدالة ترتفع ثم تنخفض: قمة محلية."
  },
];
