import { CalculatorResult, ChartDataPoint, PetType } from '../types/calculator';

// Helper to add days to a date string
export const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'N/A';
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Helper to format Date into YYYY-MM-DD
export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Helper to add days to a date string and return YYYY-MM-DD
export const addDaysISO = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return formatDate(new Date());
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

export const dogAge = (inputs: Record<string, any>): { results: CalculatorResult[]; chartData: ChartDataPoint[] } => {
  const age = Number(inputs.age || 1);
  const size = inputs.size || 'medium'; // small, medium, large, giant
  
  let humanAge = 0;
  if (age <= 1) {
    humanAge = age * 15;
  } else if (age <= 2) {
    humanAge = 15 + (age - 1) * 9;
  } else {
    let factor = 5;
    if (size === 'small') factor = 4;
    else if (size === 'medium') factor = 5;
    else if (size === 'large') factor = 6;
    else if (size === 'giant') factor = 7;
    humanAge = 24 + (age - 2) * factor;
  }

  let stage = 'Adult';
  let badgeColor: 'success' | 'warning' | 'info' | 'danger' = 'success';
  if (age < 1) {
    stage = 'Puppy';
    badgeColor = 'info';
  } else if (age <= 2) {
    stage = 'Junior';
    badgeColor = 'info';
  } else if (age >= 7) {
    stage = 'Senior';
    badgeColor = 'warning';
  }

  const chartData: ChartDataPoint[] = [];
  for (let i = 1; i <= Math.max(15, age + 2); i++) {
    let hAge = 0;
    if (i <= 1) hAge = 15;
    else if (i <= 2) hAge = 24;
    else {
      let factor = 5;
      if (size === 'small') factor = 4;
      else if (size === 'medium') factor = 5;
      else if (size === 'large') factor = 6;
      else if (size === 'giant') factor = 7;
      hAge = 24 + (i - 2) * factor;
    }
    chartData.push({ name: `Yr ${i}`, 'Human Age': hAge });
  }

  return {
    results: [
      { label: 'Human Age Equivalent', value: Math.round(humanAge), unit: 'years', description: `Your dog is ${Math.round(humanAge)} in human terms.`, badge: badgeColor },
      { label: 'Life Stage', value: stage, description: `Based on a dog age of ${age} years.`, badge: badgeColor },
    ],
    chartData,
  };
};

export const catAge = (inputs: Record<string, any>): { results: CalculatorResult[]; chartData: ChartDataPoint[] } => {
  const age = Number(inputs.age || 1);
  
  let humanAge = 0;
  if (age <= 1) {
    humanAge = age * 15;
  } else if (age <= 2) {
    humanAge = 15 + (age - 1) * 9; // 24 at age 2
  } else {
    humanAge = 24 + (age - 2) * 4;
  }

  let stage = 'Adult';
  let badgeColor: 'success' | 'warning' | 'info' | 'danger' = 'success';
  if (age < 1) {
    stage = 'Kitten';
    badgeColor = 'info';
  } else if (age <= 2) {
    stage = 'Junior';
    badgeColor = 'info';
  } else if (age >= 11) {
    stage = 'Senior';
    badgeColor = 'warning';
  } else if (age >= 15) {
    stage = 'Geriatric';
    badgeColor = 'danger';
  }

  const chartData: ChartDataPoint[] = [];
  for (let i = 1; i <= Math.max(15, age + 2); i++) {
    let hAge = 0;
    if (i <= 1) hAge = 15;
    else if (i <= 2) hAge = 24;
    else hAge = 24 + (i - 2) * 4;
    chartData.push({ name: `Yr ${i}`, 'Human Age': hAge });
  }

  return {
    results: [
      { label: 'Human Age Equivalent', value: Math.round(humanAge), unit: 'years', description: `Your cat is ${Math.round(humanAge)} in human terms.`, badge: badgeColor },
      { label: 'Life Stage', value: stage, description: `Based on a cat age of ${age} years.`, badge: badgeColor },
    ],
    chartData,
  };
};

export const petPregnancy = (inputs: Record<string, any>, type: PetType): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const matingDateStr = inputs.matingDate || formatDate(new Date());
  const matingDate = new Date(matingDateStr);
  const gestationDays = type === 'dog' ? 63 : 65; // Cats: 63-67 (avg 65)
  
  const dueDateStr = addDays(matingDateStr, gestationDays);
  
  const today = new Date();
  const diffTime = today.getTime() - matingDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, gestationDays - diffDays);
  const currentWeek = Math.min(Math.ceil(diffDays / 7), Math.ceil(gestationDays / 7));

  const chartData: ChartDataPoint[] = [
    { name: 'Start', Progress: 0 },
    { name: 'Week 3', Progress: 33 },
    { name: 'Week 6', Progress: 66 },
    { name: 'Due Date', Progress: 100 },
  ];

  const tips = type === 'dog' ? [
    'Feed standard premium food until week 5, then transition to energy-dense puppy kibble.',
    'At day 45, get a vet X-ray to count the puppy skeletons and prepare for delivery.',
    'Prepare a quiet nesting whelping box in a warm, draft-free room.',
    'Monitor rectal temperature twice daily starting at day 60. A drop below 99°F/37.2°C indicates labor is within 24 hours.'
  ] : [
    'Provide high-calorie kitten food to the queen during the final 3 weeks.',
    'Cats will seek a dark, hidden nesting spot. Provide a cardboard box lined with clean towels in a quiet closet.',
    'Avoid handling the pregnant cat excessively during the final 2 weeks.',
    'The gestation period for cats is usually 63 to 67 days. Contact a vet if she goes past 68 days.'
  ];

  return {
    results: [
      { label: 'Estimated Due Date', value: dueDateStr, description: 'Based on standard gestation.', badge: 'success' },
      { label: 'Gestation Progress', value: diffDays, unit: `/${gestationDays} days`, description: `Week ${currentWeek} of gestation.` },
      { label: 'Days Until Whelping/Queening', value: daysRemaining, unit: 'days', badge: daysRemaining < 7 ? 'danger' : 'info' },
    ],
    chartData,
    tips,
  };
};

export const dogHeatCycle = (inputs: Record<string, any>): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const lastHeatStr = inputs.lastHeatDate || formatDate(new Date());
  const cycleIntervalMonths = Number(inputs.intervalMonths || 6);
  
  const nextHeatStartStr = addDays(lastHeatStr, Math.round(cycleIntervalMonths * 30.4));
  const fertileStartStr = addDays(nextHeatStartStr, 9); // Day 9 to 15 of cycle is most fertile
  const fertileEndStr = addDays(nextHeatStartStr, 15);

  const tips = [
    'Proestrus (Days 1–9): Swelling, bloody discharge. Males will be attracted, but female is not receptive.',
    'Estrus (Days 10–18): Discharge becomes lighter/pinkish. The female is receptive and fertile. Keep her strictly secured!',
    'Diestrus (Days 19–60): Female is no longer receptive. Pregnancy or false pregnancy occurs here.',
    'Always leash your female dog when she is in heat. Intact male dogs can sense a female in heat from miles away.'
  ];

  return {
    results: [
      { label: 'Next Estimated Heat Start', value: nextHeatStartStr, badge: 'success' },
      { label: 'Estimated Fertile Window', value: `${fertileStartStr} - ${fertileEndStr}`, description: 'Best period for mating or strictest safety isolation.', badge: 'warning' },
      { label: 'Average Cycle Interval', value: cycleIntervalMonths, unit: 'months' }
    ],
    chartData: [
      { name: 'Proestrus', Days: 9 },
      { name: 'Estrus (Fertile)', Days: 9 },
      { name: 'Diestrus', Days: 60 }
    ],
    tips,
  };
};

export const catHeatCycle = (inputs: Record<string, any>): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const lastHeatStr = inputs.lastHeatDate || formatDate(new Date());
  
  // Cats are seasonally polyestrus. In season, they cycle every 2-3 weeks (14-21 days) if they do not mate.
  const nextHeatStartStr = addDays(lastHeatStr, 18);
  const heatDurationStr = '5 - 10 Days';

  const tips = [
    'Unlike dogs, cats do not have a bloody discharge when in heat.',
    'Typical heat behaviors: Loud yowling (calling), excessive rubbing, rolling on floors, and raising the hindquarters when petted.',
    'Cats are induced ovulators: mating induces egg release. If she does not mate, the heat will recur in 2-3 weeks.',
    'Spaying is the best way to prevent heat cycles and vocal behavior.'
  ];

  return {
    results: [
      { label: 'Next Heat Estimate', value: nextHeatStartStr, badge: 'success' },
      { label: 'Estimated Duration', value: heatDurationStr, description: 'Duration of cycle behavior.' },
      { label: 'Recurrence Cycle', value: '14 - 21', unit: 'days', description: 'If not pregnant or spayed.' }
    ],
    chartData: [
      { name: 'In Heat (Estrus)', Days: 7 },
      { name: 'Interestrus (Rest)', Days: 10 }
    ],
    tips,
  };
};

export const petFeeding = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial', type: PetType): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const weight = Number(inputs.weight || 10);
  const activity = inputs.activity || 'normal';
  const ageGroup = inputs.ageGroup || 'adult'; // puppy/kitten, adult, senior
  const calorieDensity = Number(inputs.calorieDensity || 3600); // kcal per kg
  
  // Convert weight to kg for clinical formulas
  const weightKg = unitSystem === 'imperial' ? weight * 0.453592 : weight;
  
  // Resting Energy Requirement (RER)
  const RER = 70 * Math.pow(weightKg, 0.75);
  
  // Daily Energy Requirement Multipliers
  let multiplier = 1.4;
  if (type === 'dog') {
    if (ageGroup === 'puppy') {
      multiplier = 2.0;
    } else if (ageGroup === 'senior') {
      multiplier = 1.2;
    } else { // adult
      if (activity === 'sedentary') multiplier = 1.2;
      else if (activity === 'normal') multiplier = 1.6;
      else if (activity === 'active') multiplier = 1.8;
      else if (activity === 'working') multiplier = 2.5;
    }
  } else { // cat
    if (ageGroup === 'kitten') {
      multiplier = 2.0;
    } else if (ageGroup === 'senior') {
      multiplier = 1.0;
    } else { // adult
      if (activity === 'sedentary') multiplier = 1.0;
      else if (activity === 'normal') multiplier = 1.2;
      else if (activity === 'active') multiplier = 1.4;
    }
  }

  const DER = RER * multiplier;
  
  // Calculate dry food feeding amounts
  // 1 cup of dry food is roughly 120 grams, or ~350-400 kcal.
  // We calculate food in grams first: (DER / calorieDensity) * 1000
  const dailyFoodGrams = (DER / calorieDensity) * 1000;
  const foodCups = dailyFoodGrams / 100; // estimated 100g per cup of pet food

  const formattedFoodAmount = unitSystem === 'imperial' 
    ? `${(dailyFoodGrams * 0.035274).toFixed(1)} oz (${foodCups.toFixed(1)} cups)`
    : `${Math.round(dailyFoodGrams)} grams (${foodCups.toFixed(1)} cups)`;

  const tips = type === 'dog' ? [
    'Divide the daily feeding portion into 2 meals (morning and evening).',
    'Puppies should be fed 3–4 times daily, while senior dogs might benefit from smaller, moist portions.',
    'Always measure food with a scale or standard cup, not by eye, to prevent weight gain.',
    'Fresh clean water must be available at all times.'
  ] : [
    'Cats prefer eating small, frequent meals throughout the day.',
    'A combination of wet and dry food is ideal for cats to support hydration and dental health.',
    'Clean the feeding bowls daily to prevent feline acne.',
    'Avoid feeding milk, as most adult cats are lactose intolerant.'
  ];

  return {
    results: [
      { label: 'Daily Calorie Requirement', value: Math.round(DER), unit: 'kcal/day', badge: 'success' },
      { label: 'Recommended Food Portion', value: formattedFoodAmount, description: 'Based on food energy density.' },
      { label: 'Resting Energy Requirement (RER)', value: Math.round(RER), unit: 'kcal/day', description: 'Calorie needs at absolute rest.' }
    ],
    chartData: [
      { name: 'RER Base', Calories: Math.round(RER) },
      { name: 'Total Needs (DER)', Calories: Math.round(DER) }
    ],
    tips,
  };
};

export const petWeight = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial', type: PetType): { results: CalculatorResult[]; tips: string[] } => {
  const weight = Number(inputs.weight || 5);
  const breedSize = inputs.breedSize || 'medium'; // small, medium, large, giant (dogs only)
  
  let minIdeal = 0;
  let maxIdeal = 0;
  
  if (type === 'dog') {
    if (breedSize === 'toy') { minIdeal = 1; maxIdeal = 4; }
    else if (breedSize === 'small') { minIdeal = 4; maxIdeal = 10; }
    else if (breedSize === 'medium') { minIdeal = 10; maxIdeal = 25; }
    else if (breedSize === 'large') { minIdeal = 25; maxIdeal = 45; }
    else { minIdeal = 45; maxIdeal = 90; }
  } else {
    // domestic cats
    const breed = inputs.breed || 'domestic';
    if (breed === 'singapura' || breed === 'toy') { minIdeal = 2; maxIdeal = 3.5; }
    else if (breed === 'maine_coon' || breed === 'giant') { minIdeal = 5.5; maxIdeal = 11; }
    else { minIdeal = 3.6; maxIdeal = 5.4; } // domestic shorthair standard
  }

  // If imperial, convert ideal ranges to lbs
  const conversionFactor = 2.20462;
  const displayMin = unitSystem === 'imperial' ? (minIdeal * conversionFactor).toFixed(1) : minIdeal.toString();
  const displayMax = unitSystem === 'imperial' ? (maxIdeal * conversionFactor).toFixed(1) : maxIdeal.toString();
  const unit = unitSystem === 'imperial' ? 'lbs' : 'kg';

  let status = 'Ideal';
  let badgeColor: 'success' | 'warning' | 'danger' = 'success';
  if (weight < minIdeal) {
    status = 'Underweight';
    badgeColor = 'warning';
  } else if (weight > maxIdeal) {
    status = 'Overweight';
    badgeColor = 'danger';
  }

  const tips = type === 'dog' ? [
    'You should be able to easily feel, but not see, your dog’s ribs.',
    'An overweight dog has a higher risk of joint disease, diabetes, and shortened lifespan.',
    'Increase activity or adjust portion sizes to help your dog reach their ideal weight.',
    'Always consult a vet before starting any major weight loss diet.'
  ] : [
    'A cat at their ideal weight should have a noticeable waistline when viewed from above.',
    'Feline obesity is closely linked to Type 2 diabetes and osteoarticular pain.',
    'Use puzzle feeders to slow down feeding and stimulate natural hunting behaviors.',
    'Encourage exercise with feather toys, laser pointers, and climbing shelves.'
  ];

  return {
    results: [
      { label: 'Evaluation Status', value: status, badge: badgeColor, description: `Compared to typical standards.` },
      { label: 'Estimated Ideal Range', value: `${displayMin} - ${displayMax}`, unit: unit, description: 'Based on breed size category.' },
      { label: 'Current Weight Checked', value: weight, unit: unit }
    ],
    tips,
  };
};

export const puppyGrowth = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial'): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const currentWeight = Number(inputs.weight || 5);
  const currentAgeWeeks = Number(inputs.ageWeeks || 12);
  const breedSize = inputs.breedSize || 'medium'; // toy, small, medium, large, giant
  
  // Estimation of puppy adult weight:
  // Adult Weight = (Current Weight / Puppy Growth Factor at week X)
  // Growth factor is approximated from growth curves of small, medium, large dogs.
  // Toy: reaches adult weight at ~40 weeks
  // Small: reaches adult weight at ~48 weeks
  // Medium: reaches adult weight at ~52 weeks
  // Large: reaches adult weight at ~78 weeks (18 months)
  // Giant: reaches adult weight at ~104 weeks (2 years)
  
  let adultWeeks = 52;
  if (breedSize === 'toy') adultWeeks = 36;
  else if (breedSize === 'small') adultWeeks = 44;
  else if (breedSize === 'medium') adultWeeks = 52;
  else if (breedSize === 'large') adultWeeks = 78;
  else if (breedSize === 'giant') adultWeeks = 104;

  // Growth factor function (simplistic sigmoid model)
  const x = currentAgeWeeks / adultWeeks;
  let growthFactor = x; // linear fallback
  if (x >= 1) {
    growthFactor = 1.0;
  } else {
    // typical canine growth curve is steep initially, then flattens
    // e.g. at 50% of adult age (26w for medium), puppy is roughly 75% of adult weight.
    // Let's use a standard polynomial curve: y = -0.5*x^2 + 1.5*x
    growthFactor = -0.5 * Math.pow(x, 2) + 1.5 * x;
    growthFactor = Math.max(0.1, Math.min(0.99, growthFactor));
  }

  const adultWeightEstimate = currentWeight / growthFactor;
  const unit = unitSystem === 'imperial' ? 'lbs' : 'kg';

  const chartData: ChartDataPoint[] = [];
  // Build a projection chart of growth
  const step = Math.ceil(adultWeeks / 5);
  for (let w = 4; w <= adultWeeks; w += step) {
    const frac = w / adultWeeks;
    const gf = -0.5 * Math.pow(frac, 2) + 1.5 * frac;
    const projectedWeight = Math.min(adultWeightEstimate, adultWeightEstimate * Math.max(0.1, gf));
    chartData.push({ name: `Wk ${w}`, Weight: Math.round(projectedWeight) });
  }
  chartData.push({ name: 'Adult', Weight: Math.round(adultWeightEstimate) });

  const tips = [
    'Puppies grow fastest in the first 6 months. Maintain puppy food to support skeletal growth.',
    'Overfeeding large-breed puppies can cause rapid growth, leading to skeletal disorders.',
    'Keep an eye on their joints and ensure they do not perform high-impact jumping during growth phases.',
    'Weigh your puppy weekly to track weight against their target growth curve.'
  ];

  return {
    results: [
      { label: 'Estimated Adult Weight', value: adultWeightEstimate.toFixed(1), unit: unit, badge: 'success', description: `Estimated weight at mature age.` },
      { label: 'Growth Progress', value: Math.round(growthFactor * 100), unit: '%', description: 'Percentage of adult weight reached.' },
      { label: 'Target Adult Age', value: Math.round(adultWeeks / 4.3), unit: 'months', description: 'Estimated time to reach full maturity.' }
    ],
    chartData,
    tips,
  };
};

export const kittenGrowth = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial'): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const currentWeight = Number(inputs.weight || 1);
  const currentAgeWeeks = Number(inputs.ageWeeks || 8);
  
  // Kittens gain ~100 grams (3.5 oz) per week up to 24 weeks (6 months)
  // Reaches adult weight at 40-52 weeks. Average domestic cat adult weight is 4kg.
  // Formula: Estimate adult weight based on current weight relative to growth milestones.
  // 8 weeks: ~20% of adult weight
  // 12 weeks: ~30%
  // 16 weeks: ~45%
  // 24 weeks: ~70%
  // 36 weeks: ~90%
  
  let growthFactor = 0.5;
  if (currentAgeWeeks <= 4) growthFactor = 0.1;
  else if (currentAgeWeeks <= 8) growthFactor = 0.22;
  else if (currentAgeWeeks <= 12) growthFactor = 0.35;
  else if (currentAgeWeeks <= 16) growthFactor = 0.48;
  else if (currentAgeWeeks <= 20) growthFactor = 0.60;
  else if (currentAgeWeeks <= 24) growthFactor = 0.72;
  else if (currentAgeWeeks <= 36) growthFactor = 0.88;
  else if (currentAgeWeeks <= 48) growthFactor = 0.98;
  else growthFactor = 1.0;

  const adultWeightEstimate = currentWeight / growthFactor;
  const unit = unitSystem === 'imperial' ? 'lbs' : 'kg';

  const chartData: ChartDataPoint[] = [
    { name: '4 Wks', Weight: Math.round(adultWeightEstimate * 0.1) },
    { name: '12 Wks', Weight: Math.round(adultWeightEstimate * 0.35) },
    { name: '24 Wks', Weight: Math.round(adultWeightEstimate * 0.72) },
    { name: 'Adult', Weight: Math.round(adultWeightEstimate) }
  ];

  const tips = [
    'Kittens require specialized growth formulas rich in DHA and taurine.',
    'By 8 weeks, kittens should be fully weaned and consuming solid food.',
    'A kitten should gain approximately 10 to 15 grams per day.',
    'Kittens reach their full skeletal size between 10 and 12 months, though some large breeds (like Maine Coons) continue growing for up to 3 years.'
  ];

  return {
    results: [
      { label: 'Estimated Adult Weight', value: adultWeightEstimate.toFixed(1), unit: unit, badge: 'success' },
      { label: 'Growth Progress', value: Math.round(growthFactor * 100), unit: '%' },
      { label: 'Target Maturity Age', value: '12', unit: 'months' }
    ],
    chartData,
    tips,
  };
};

export const petCalorie = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial', type: PetType): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  // Similar to feeding but returns detailed calorie charts and options
  const weight = Number(inputs.weight || 10);
  const weightKg = unitSystem === 'imperial' ? weight * 0.453592 : weight;
  
  const RER = 70 * Math.pow(weightKg, 0.75);
  
  const factors = type === 'dog' 
    ? [
        { label: 'Weight Loss / Inactive', multiplier: 1.0 },
        { label: 'Neutered Adult', multiplier: 1.6 },
        { label: 'Intact Adult / Active', multiplier: 1.8 },
        { label: 'Puppy Growth', multiplier: 2.0 },
        { label: 'Performance / Working', multiplier: 3.0 }
      ]
    : [
        { label: 'Weight Loss / Inactive', multiplier: 0.8 },
        { label: 'Neutered Adult', multiplier: 1.2 },
        { label: 'Intact Adult', multiplier: 1.4 },
        { label: 'Active Adult', multiplier: 1.6 },
        { label: 'Kitten Growth', multiplier: 2.5 }
      ];

  const results: CalculatorResult[] = [
    { label: 'Resting Energy Requirement (RER)', value: Math.round(RER), unit: 'kcal/day', badge: 'success', description: 'Base calories needed to sustain vital organ functions.' }
  ];

  const currentCondition = inputs.condition || 'normal';
  let targetMultiplier = 1.6;
  if (type === 'dog') {
    if (currentCondition === 'sedentary') targetMultiplier = 1.2;
    else if (currentCondition === 'active') targetMultiplier = 1.8;
    else if (currentCondition === 'loss') targetMultiplier = 1.0;
  } else {
    if (currentCondition === 'sedentary') targetMultiplier = 1.0;
    else if (currentCondition === 'active') targetMultiplier = 1.4;
    else if (currentCondition === 'loss') targetMultiplier = 0.8;
  }
  
  const calculatedDER = RER * targetMultiplier;
  results.unshift({ label: 'Target Calorie Intake', value: Math.round(calculatedDER), unit: 'kcal/day', badge: 'info', description: 'Recommended calories for your pet’s profile.' });

  const chartData: ChartDataPoint[] = factors.map(f => ({
    name: f.label,
    Calories: Math.round(RER * f.multiplier)
  }));

  const tips = [
    'Carbohydrates, fats, and proteins are the three sources of calories. Ensure protein is high.',
    'Treats should never make up more than 10% of your pet’s daily caloric intake.',
    'Calorie needs decrease by about 10-15% after spaying/neutering due to metabolic changes.',
    'Keep a daily log of food, treats, and exercise to check consistency.'
  ];

  return {
    results,
    chartData,
    tips,
  };
};

export const petWaterIntake = (inputs: Record<string, any>, unitSystem: 'metric' | 'imperial', type: PetType): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const weight = Number(inputs.weight || 10);
  const diet = inputs.diet || 'dry'; // dry, wet, mixed
  const activity = inputs.activity || 'normal'; // sedentary, normal, active
  
  const weightKg = unitSystem === 'imperial' ? weight * 0.453592 : weight;
  
  // Base water need:
  // Dogs: ~60 mL/kg
  // Cats: ~45 mL/kg
  let baseHydrationRate = type === 'dog' ? 60 : 45;
  let baseIntake = weightKg * baseHydrationRate;

  // Diet factor
  // Dry food provides 0 hydration, requiring full water intake.
  // Wet food is ~75% water, reducing required drinking volume.
  let dietFactorMultiplier = 1.0;
  let foodHydrationContribution = 0;
  if (diet === 'wet') {
    dietFactorMultiplier = 0.3; // 70% of needs met by wet food
    foodHydrationContribution = baseIntake * 0.7;
  } else if (diet === 'mixed') {
    dietFactorMultiplier = 0.65;
    foodHydrationContribution = baseIntake * 0.35;
  }

  // Activity factor
  let activityMultiplier = 1.0;
  if (activity === 'active') activityMultiplier = 1.3;
  else if (activity === 'sedentary') activityMultiplier = 0.95;

  const finalDrinkNeeds = baseIntake * dietFactorMultiplier * activityMultiplier;
  
  const mlToOz = 0.033814;
  const displayTotal = unitSystem === 'imperial' 
    ? `${(baseIntake * activityMultiplier * mlToOz).toFixed(1)} fl oz`
    : `${Math.round(baseIntake * activityMultiplier)} mL`;

  const displayDrinking = unitSystem === 'imperial'
    ? `${(finalDrinkNeeds * mlToOz).toFixed(1)} fl oz`
    : `${Math.round(finalDrinkNeeds)} mL`;

  const chartData: ChartDataPoint[] = [
    { name: 'Water from Bowl', Volume: Math.round(finalDrinkNeeds) },
    { name: 'Water from Food', Volume: Math.round(foodHydrationContribution) }
  ];

  const tips = type === 'dog' ? [
    'A dog drinking excessively could be a sign of diabetes, Cushing’s, or kidney disease.',
    'Always wash water bowls daily with soap to prevent bacterial biofilms.',
    'Provide multiple water sources in different rooms if you have a large home.',
    'Add ice cubes to the bowl on hot summer days.'
  ] : [
    'Cats have a low thirst drive and are prone to chronic kidney diseases; encourage drinking.',
    'Use cat water fountains; many cats prefer running water to standing water.',
    'Keep water bowls separate from food bowls and litter boxes.',
    'Add a tablespoon of unsalted bone broth to the water to encourage hydration.'
  ];

  return {
    results: [
      { label: 'Net Drinking Water Needed', value: displayDrinking, badge: 'success', description: 'Recommended amount of water to drink from bowl.' },
      { label: 'Total Hydration Requirement', value: displayTotal, description: 'Total daily moisture intake required.' },
      { label: 'Diet Hydration Support', value: Math.round(foodHydrationContribution), unit: 'mL', description: 'Moisture content retrieved from food.' }
    ],
    chartData,
    tips,
  };
};

export const petBodyConditionScore = (inputs: Record<string, any>, type: PetType): { results: CalculatorResult[]; tips: string[] } => {
  const bcs = Number(inputs.bcs || 5); // 1-9 scale
  
  let evaluation = 'Ideal';
  let badgeColor: 'success' | 'warning' | 'danger' = 'success';
  let desc = 'Your pet is in ideal physical condition, with ribs that are easily felt, a visible waist, and a tucked abdomen.';

  if (bcs <= 3) {
    evaluation = 'Underweight';
    badgeColor = 'warning';
    desc = 'Your pet is underweight. Ribs, spine, and pelvis are easily visible, and there is a loss of muscle mass. Increase portion sizes.';
  } else if (bcs >= 6 && bcs <= 7) {
    evaluation = 'Overweight';
    badgeColor = 'warning';
    desc = 'Your pet is overweight. Ribs are difficult to feel, the waist is barely visible, and the abdomen has a heavy fat cover.';
  } else if (bcs >= 8) {
    evaluation = 'Obese';
    badgeColor = 'danger';
    desc = 'Your pet is clinically obese. Thick fat layer covers ribs, no waist is visible, and abdominal distension is prominent.';
  }

  const tips = type === 'dog' ? [
    'A score of 4 or 5 is the goal for most dogs.',
    'You should look for a clear abdominal tuck behind the ribs from a profile view.',
    'Increase high-quality protein and reduce caloric filler foods for overweight dogs.',
    'Consult your veterinarian to confirm the BCS assessment.'
  ] : [
    'A score of 5 is ideal for domestic cats.',
    'A cat’s belly should have a minimal fat pad; excessive abdominal sag points to score 6+.',
    'Underweight cats should be checked for thyroid issues, kidney disease, or parasite load.',
    'Spayed cats have a slower metabolism and require strict portion regulation.'
  ];

  return {
    results: [
      { label: 'BCS Classification', value: evaluation, badge: badgeColor, description: desc },
      { label: 'Selected BCS Score', value: `${bcs} / 9` }
    ],
    tips,
  };
};

export const petVaccinationSchedule = (inputs: Record<string, any>, type: PetType): { results: CalculatorResult[]; chartData: ChartDataPoint[]; tips: string[] } => {
  const ageWeeks = Number(inputs.ageWeeks || 8);
  const birthdateStr = inputs.birthdate || addDays(formatDate(new Date()), -ageWeeks * 7);
  
  const schedules: { name: string; due: string; status: string; core: boolean }[] = [];
  
  if (type === 'dog') {
    schedules.push(
      { name: 'DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) - Dose 1', due: addDays(birthdateStr, 6 * 7), status: ageWeeks >= 6 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'DHPP - Dose 2', due: addDays(birthdateStr, 10 * 7), status: ageWeeks >= 10 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'DHPP - Dose 3 + Rabies Vaccine', due: addDays(birthdateStr, 14 * 7), status: ageWeeks >= 14 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'Bordetella (Kennel Cough) - Recommended', due: addDays(birthdateStr, 10 * 7), status: ageWeeks >= 10 ? 'Completed / Past Due' : 'Upcoming', core: false },
      { name: 'Leptospirosis (L4) - Dose 1', due: addDays(birthdateStr, 12 * 7), status: ageWeeks >= 12 ? 'Completed / Past Due' : 'Upcoming', core: false },
      { name: 'Leptospirosis (L4) - Booster', due: addDays(birthdateStr, 16 * 7), status: ageWeeks >= 16 ? 'Completed / Past Due' : 'Upcoming', core: false },
      { name: 'Annual DHPP & Rabies Booster', due: addDays(birthdateStr, 52 * 7), status: 'Upcoming (Annual)', core: true }
    );
  } else {
    schedules.push(
      { name: 'FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) - Dose 1', due: addDays(birthdateStr, 8 * 7), status: ageWeeks >= 8 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'FVRCP - Dose 2', due: addDays(birthdateStr, 12 * 7), status: ageWeeks >= 12 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'FVRCP - Dose 3 + Rabies Vaccine', due: addDays(birthdateStr, 16 * 7), status: ageWeeks >= 16 ? 'Completed / Past Due' : 'Upcoming', core: true },
      { name: 'FeLV (Feline Leukemia Virus) - Dose 1', due: addDays(birthdateStr, 8 * 7), status: ageWeeks >= 8 ? 'Completed / Past Due' : 'Upcoming', core: false },
      { name: 'FeLV - Booster', due: addDays(birthdateStr, 12 * 7), status: ageWeeks >= 12 ? 'Completed / Past Due' : 'Upcoming', core: false },
      { name: 'Annual FVRCP Booster', due: addDays(birthdateStr, 52 * 7), status: 'Upcoming (Annual)', core: true }
    );
  }

  const results: CalculatorResult[] = schedules.map(s => ({
    label: s.name,
    value: s.due,
    description: `${s.core ? 'Core' : 'Non-Core'} vaccine. Status: ${s.status}`,
    badge: s.core ? 'success' : 'info'
  }));

  const chartData: ChartDataPoint[] = schedules.map(s => ({
    name: s.name.split(' - ')[0],
    AgeWeeks: Math.round((new Date(s.due).getTime() - new Date(birthdateStr).getTime()) / (1000 * 60 * 60 * 24 * 7))
  }));

  const tips = type === 'dog' ? [
    'Rabies vaccination is legally required in most jurisdictions.',
    'Socializing puppies with other dogs is dangerous until they have finished all three DHPP doses.',
    'Bordetella is required by most dog boarding and grooming facilities.',
    'Keep your dog’s vaccine certificate in a safe place for travel or boarding.'
  ] : [
    'FVRCP protects against three highly contagious and lifethreatening viral diseases.',
    'Feline Leukemia (FeLV) is strongly recommended for outdoor cats or cats in multi-cat households.',
    'Keep indoor cats vaccinated: viruses can be brought home on shoes or clothes.',
    'Vaccines help build crucial immune memory before your kitten matures.'
  ];

  return {
    results,
    chartData,
    tips,
  };
};
