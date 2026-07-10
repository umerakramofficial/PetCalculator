import { CalculatorConfig } from '../../types/calculator';
import { dogAge, petPregnancy, dogHeatCycle, petFeeding, petWeight, puppyGrowth, petCalorie, petWaterIntake, petBodyConditionScore, petVaccinationSchedule, formatDate, addDays, addDaysISO } from '../../utils/calculations';

export const dogCalculators: CalculatorConfig[] = [
  {
    id: 'dog-age',
    name: 'Dog Age Calculator',
    title: 'Dog Age to Human Years Calculator',
    description: 'Convert your dog’s age to human years based on size and weight categories, using the latest clinical veterinary guidelines.',
    category: 'dog',
    isPopular: true,
    isFeatured: true,
    inputs: [
      { id: 'age', label: 'Dog Age (years)', type: 'number', defaultValue: 1, min: 0.1, max: 25, step: 0.1, tooltip: 'Enter your dog’s age in years. You can use decimals (e.g. 1.5 for 18 months).' },
      {
        id: 'size',
        label: 'Dog Size Category',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Toy / Small (Under 20 lbs / 9 kg)', value: 'small' },
          { label: 'Medium (20 - 50 lbs / 9 - 23 kg)', value: 'medium' },
          { label: 'Large (51 - 90 lbs / 23 - 41 kg)', value: 'large' },
          { label: 'Giant (Over 90 lbs / 41 kg)', value: 'giant' },
        ],
        tooltip: 'Large and giant breeds mature and age faster than smaller breeds after their first two years.'
      }
    ],
    calculate: (inputs) => dogAge(inputs),
    formula: {
      description: 'Human Years = 15 (for 1st year) + 9 (for 2nd year) + 4 to 7 (per year after, based on breed size).',
      explanation: 'Veterinary research shows that dogs do not age at a simple 7-to-1 ratio. A puppy’s first year equivalent is roughly 15 human years as they develop rapidly, and their second year equivalent is 9 human years. Thereafter, small dogs age about 4 years per calendar year, medium dogs 5 years, large dogs 6 years, and giant dogs 7 years.'
    },
    seo: {
      metaTitle: 'Dog Age Calculator: How Old is Your Dog in Human Years?',
      metaDescription: 'Find out your dog’s true human age equivalent. Our advanced calculator accounts for weight and breed size using the latest AAHA clinical metrics.',
      keywords: ['dog age calculator', 'dog human years', 'canine age conversion', 'puppy age chart', 'dog maturity calculator'],
      educationalContent: `
        <h3>Understanding Canine Aging and the 7-Year Myth</h3>
        <p>For decades, pet owners were told that one dog year equals seven human years. However, clinical research from veterinary groups like the American Animal Hospital Association (AAHA) has disproven this simple formula. In truth, dogs mature much faster in their first two years of life than humans do, after which their aging rate slows down and diverges heavily based on their size and breed.</p>
        
        <h3>How Breed Size Affects Longevity</h3>
        <p>Smaller dogs, such as Chihuahuas and Toy Poodles, have a longer lifespan, often reaching 15–18 years, and they age slower in human equivalents. In contrast, giant breeds like Great Danes and Mastiffs mature later but age rapidly after reaching maturity, often considered seniors by age 5 or 6 and having a life expectancy of 8–10 years. This phenomenon is known as the size-longevity trade-off in canines.</p>
        
        <h3>Life Stages of a Dog</h3>
        <ul>
          <li><strong>Puppyhood:</strong> Birth until rapid skeletal growth ends (usually 6 to 9 months).</li>
          <li><strong>Junior:</strong> From 6–9 months until completion of social maturity (usually 1.5 to 2 years).</li>
          <li><strong>Adult:</strong> Finished growing, stable activity (typically 2 to 6 or 7 years).</li>
          <li><strong>Senior:</strong> The last 25% of their expected lifespan (typically 7+ years for small/medium, 5+ for giant).</li>
        </ul>
        <p>To monitor your dog's growth and nutritional intake at each developmental milestone, use our <a href="/tools/puppy-growth" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Puppy Growth Calculator</a> and verify their recommended daily food portions using the <a href="/tools/dog-feeding" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Dog Feeding Calculator</a>.</p>
      `,
      examples: [
        { title: 'Small Dog (Age 3)', steps: ['First year = 15 human years.', 'Second year = 9 human years (Total 24).', 'Third year = +4 human years (Total 28).'], result: '28 Human Years' },
        { title: 'Giant Dog (Age 5)', steps: ['First year = 15 human years.', 'Second year = 9 human years (Total 24).', 'Years 3 to 5 = 3 * 7 human years (Total 21).', 'Combine: 24 + 21 = 45.'], result: '45 Human Years' }
      ],
      faq: [
        { question: 'Why do small dogs live longer than large dogs?', answer: 'Large dogs grow faster, which can trigger more rapid cellular degradation and higher rates of developmental disorders. Their bodies wear out sooner than small dogs, who experience a much slower metabolic pace.' },
        { question: 'At what age is a dog considered a senior?', answer: 'A dog is considered a senior when they reach the last 25% of their expected breed lifespan. This is around 7-8 years for small/medium breeds, and 5-6 years for large/giant breeds.' },
        { question: 'Is the 1 year = 7 years rule completely wrong?', answer: 'Yes, it is mathematically inaccurate. A 1-year-old dog has reached sexual maturity, which is equivalent to a 15-year-old teenager, not a 7-year-old child.' }
      ]
    },
    references: [
      { title: 'AAHA Canine Life Stage Guidelines', url: 'https://www.aaha.org/guidelines' },
      { title: 'Quantitative Translation of Canine Brain Aging', author: 'Wang et al., Cell Systems Journal' }
    ]
  },
  {
    id: 'dog-pregnancy',
    name: 'Dog Pregnancy Calculator',
    title: 'Dog Pregnancy Due Date & Milestone Calculator',
    description: 'Calculate your dog’s estimated whelping date and track crucial weekly gestational development milestones.',
    category: 'dog',
    inputs: [
      { id: 'matingDate', label: 'Mating Date', type: 'date', defaultValue: () => formatDate(new Date()), tooltip: 'Select the date when your dog mated.' }
    ],
    calculate: (inputs) => petPregnancy(inputs, 'dog'),
    formula: {
      description: 'Estimated Due Date = Mating Date + 63 days.',
      explanation: 'The average gestation period for dogs is 63 days from ovulation, though birth can occur safely between 58 and 68 days. Because sperm can survive in the female reproductive tract for up to 5-7 days, the mating date may not match the exact day of ovulation.'
    },
    seo: {
      metaTitle: 'Dog Pregnancy Calculator: Whelping Date and Calendar',
      metaDescription: 'Find your pregnant dog’s due date and view a week-by-week guide detailing food adjustments, nesting behaviors, and veterinary checkups.',
      keywords: ['dog pregnancy calculator', 'whelping date calculator', 'dog gestation timeline', 'pregnant dog symptoms', 'dog birth date'],
      educationalContent: `
        <h3>Signs and Symptoms of Dog Pregnancy</h3>
        <p>Recognizing pregnancy in dogs can be difficult in the first few weeks. Key indicators include a slight decrease in appetite around week 3, followed by a noticeable increase in appetite and weight gain by week 4. By week 5, the nipples may swell and turn a darker pink color. A clear vaginal discharge is common around week 5-6.</p>
        
        <h3>Week-by-Week Gestational Timeline</h3>
        <p>During the first 3 weeks, fertilization occurs, and the embryos implant in the uterine horns. By Week 4, a vet can palpate the uterus or perform an ultrasound. Week 5 marks the beginning of rapid organ development, where the puppies double in size. Week 7 is when skeletons calcify, meaning a vet can take an X-ray by Week 8 or 9 to count the puppies.</p>
        
        <h3>Preparing for Whelping (Delivery)</h3>
        <p>A quiet nesting whelping box should be set up at least two weeks before the due date. The box should have low sides to let the mother step in easily but keep puppies inside. Keep room temperatures warm (around 85°F/29°C for newborns) during their first week of life.</p>
      `,
      examples: [
        { title: 'Mating on Jan 1st', steps: ['Add 63 days to January 1st.', 'January has 31 days, February has 28 days.', 'Jan 1 + 63 days = March 5th.'], result: 'March 5th' }
      ],
      faq: [
        { question: 'How can a vet confirm my dog is pregnant?', answer: 'A vet can perform an ultrasound around Day 25, check relaxin hormone levels from Day 30, palpate the abdomen between Days 28-35, or perform an X-ray after Day 45 to count fetal skeletons.' },
        { question: 'When should I switch to puppy food?', answer: 'Switch the mother to high-calorie, nutrient-rich puppy food around Week 5 of pregnancy, as she will require extra energy for fetal development and milk production.' },
        { question: 'What is the normal body temperature for a dog in labor?', answer: 'A dog’s normal temperature is 101-102.5°F. About 24 hours before active labor, her rectal temperature will drop below 99°F (37.2°C).' }
      ]
    },
    references: [
      { title: 'Fetal Development and Pregnancy in Canines', author: 'Veterinary Clinics of North America' }
    ]
  },
  {
    id: 'dog-heat-cycle',
    name: 'Dog Heat Cycle Calculator',
    title: 'Dog Heat Cycle & Fertile Window Planner',
    description: 'Track and project your dog’s reproductive cycle, estimating fertile windows and proestrus indicators.',
    category: 'dog',
    inputs: [
      { id: 'lastHeatDate', label: 'Last Heat Start Date', type: 'date', defaultValue: () => formatDate(new Date()), tooltip: 'Enter the first day of your dog’s last heat cycle.' },
      { id: 'intervalMonths', label: 'Typical Cycle Interval (Months)', type: 'number', defaultValue: 6, min: 4, max: 12, step: 0.5, tooltip: 'Most small/medium dogs cycle every 6 months. Large breeds may cycle every 8-12 months.' }
    ],
    calculate: (inputs) => dogHeatCycle(inputs),
    formula: {
      description: 'Next Cycle Start = Last Heat Start + (Interval in Months * 30.4 days). Fertile Window = Days 9 to 15.',
      explanation: 'The canine estrous cycle consists of four distinct phases: Proestrus (bleeding, 9 days), Estrus (fertility, 9 days), Diestrus (post-heat, 60 days), and Anestrus (sexual rest, 3-6 months).'
    },
    seo: {
      metaTitle: 'Dog Heat Cycle Calculator: Next Period & Fertile Window',
      metaDescription: 'Find when your dog will next enter heat and determine the exact fertile period to ensure safe breeding or prevent accidental litters.',
      keywords: ['dog heat cycle calculator', 'dog in heat calendar', 'dog fertile window', 'dog estrous cycle', 'proestrus symptoms'],
      educationalContent: `
        <h3>Understanding the Four Stages of Canine Estrus</h3>
        <p>A female dog’s reproductive cycle is divided into four stages, each characterized by behavioral and physical shifts:</p>
        <ol>
          <li><strong>Proestrus (Days 1–9):</strong> This is the beginning of the heat cycle. The vulva swells and you will notice a bloody discharge. Intact male dogs will be intensely attracted to her, but she will reject their advances.</li>
          <li><strong>Estrus (Days 10–18):</strong> The fertile window. The discharge lightens to a straw-colored fluid, and the female becomes receptive to mating. This is when ovulation occurs.</li>
          <li><strong>Diestrus (Days 19–60):</strong> The body returns to rest, or develops pregnancy. Whether pregnant or not, progesterone levels remain elevated during this phase.</li>
          <li><strong>Anestrus (Months 3–6):</strong> The period of uterine repair and inactive hormones.</li>
        </ol>
        <h3>Caring for a Dog in Heat</h3>
        <p>Keep your dog on a leash at all times, as she may run off seeking a mate. Use diapers indoors to manage bloody discharge, and never leave her unattended in the yard.</p>
      `,
      examples: [
        { title: 'Standard 6-Month Cycle', steps: ['Last heat started March 1st.', 'Add 6 months (182 days).', 'Next heat starts approximately September 1st.'], result: 'September 1st' }
      ],
      faq: [
        { question: 'How long does a dog stay in heat?', answer: 'A dog typically stays in heat for 2 to 3 weeks (18-21 days) total, though the receptive fertile stage lasts about 9 days.' },
        { question: 'When do dogs get their first heat?', answer: 'Small dogs can enter heat as early as 6 months, while large and giant breeds may not experience their first heat until 12 to 24 months.' },
        { question: 'Can a dog get pregnant on her first heat?', answer: 'Yes, she can. However, breeding on the first heat is highly discouraged as she is not fully grown and it poses severe health risks.' }
      ]
    },
    references: [
      { title: 'Reproductive Endocrinology in Canines', author: 'VCA Animal Hospital Research' }
    ]
  },
  {
    id: 'dog-feeding',
    name: 'Dog Feeding Calculator',
    title: 'Dog Feeding & Food Portion Calculator',
    description: 'Calculate exactly how much food (in grams, ounces, or cups) your dog needs based on weight, activity, and food calorie count.',
    category: 'dog',
    isPopular: true,
    inputs: [
      { id: 'weight', label: 'Dog Weight', type: 'number', defaultValue: 15, min: 1, max: 100, step: 0.5, unitType: 'weight', tooltip: 'Enter your dog’s current weight.' },
      {
        id: 'activity',
        label: 'Activity Level',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Sedentary / Spayed / Inactive', value: 'sedentary' },
          { label: 'Normal Activity (30-60 mins play/walk)', value: 'normal' },
          { label: 'Active (1-2 hours exercise)', value: 'active' },
          { label: 'Working / Athletic Dog', value: 'working' }
        ],
        tooltip: 'Highly active or working dogs burn significantly more energy.'
      },
      {
        id: 'ageGroup',
        label: 'Life Stage',
        type: 'select',
        defaultValue: 'adult',
        options: [
          { label: 'Puppy (Rapid Growth)', value: 'puppy' },
          { label: 'Adult Dog', value: 'adult' },
          { label: 'Senior Dog', value: 'senior' }
        ]
      },
      { id: 'calorieDensity', label: 'Food Caloric Density (kcal/kg)', type: 'number', defaultValue: 3600, min: 2000, max: 5000, step: 50, tooltip: 'Check your kibble packaging (usually around 3400-3800 kcal/kg).' }
    ],
    calculate: (inputs, unitSystem) => petFeeding(inputs, unitSystem, 'dog'),
    formula: {
      description: 'Daily Food (g) = (DER / Calorie Density) * 1000. Where RER = 70 * weight_kg^0.75 and DER = RER * activity_multiplier.',
      explanation: 'First, we calculate the Resting Energy Requirement (RER), which is the metabolic energy needed to maintain basic bodily functions. We then apply an activity multiplier to determine the Daily Energy Requirement (DER). Lastly, we divide this caloric need by the caloric density of your dog’s food to get the precise portion size.'
    },
    seo: {
      metaTitle: 'Dog Feeding Calculator: Portions in Cups and Grams',
      metaDescription: 'Calculate the ideal daily food amount for your dog. Standardized veterinary formula based on weight, life stage, and calorie content of food.',
      keywords: ['dog feeding calculator', 'how much to feed my dog', 'dog kibble calculator', 'dog portion size', 'daily dog food amount'],
      educationalContent: `
        <h3>The Dangers of Pet Food Guidelines</h3>
        <p>Generic pet food bags list instructions based on weight ranges alone. They do not account for your dog’s activity level or whether they have been spayed or neutered. Spaying/neutering reduces energy needs by up to 20-30%. Feeding solely based on bag directions often leads to accidental overfeeding and canine obesity.</p>
        
        <h3>Dividing Daily Portions</h3>
        <p>For adult dogs, dividing the daily recommended feeding amount into two separate meals prevents gastric issues and blood sugar drops. Puppies, due to their small stomachs and high energy demand, require their daily amount divided into 3 to 4 smaller meals.</p>
        
        <h3>Adjusting for Treats</h3>
        <p>If you feed your dog training treats, remember the 10% rule: treats must make up no more than 10% of their daily calorie budget. Subtract these calories from their main meal portions to ensure weight maintenance.</p>
        <p>To determine your dog's specific calorie limits, use the <a href="/tools/dog-calorie" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Dog Calorie Calculator</a>, and calculate their daily hydration needs with the <a href="/tools/dog-water" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Dog Water Intake Calculator</a>.</p>
      `,
      examples: [
        { title: '20kg Normal Active Adult', steps: ['RER = 70 * (20 ^ 0.75) = 662 kcal.', 'DER = 662 * 1.6 = 1059 kcal/day.', 'Using 3600 kcal/kg food: (1059 / 3600) * 1000 = 294g daily.'], result: '294 grams per day (~3 cups)' }
      ],
      faq: [
        { question: 'Why is my dog always hungry?', answer: 'Dogs are opportunistic scavengers. In some cases, high feeding rates could indicate parasite infestation or malabsorption, but most often it is simply behavioral. Ensure they get enough fiber.' },
        { question: 'Can I feed my dog once a day?', answer: 'While possible, twice-daily feeding supports digestion, stabilizes blood sugar levels, and decreases the risk of bloat (GDV) in deep-chested breeds.' },
        { question: 'Does wet food contain fewer calories?', answer: 'Yes, because wet food is roughly 75% water, it is less calorie-dense than dry kibble. You will need to feed a larger physical portion of wet food to reach the same calorie target.' }
      ]
    },
    references: [
      { title: 'Nutrient Requirements of Dogs and Cats', author: 'National Research Council (NRC)' }
    ]
  },
  {
    id: 'dog-weight',
    name: 'Dog Weight Calculator',
    title: 'Dog Target Weight Range & Evaluation Calculator',
    description: 'Evaluate if your dog is underweight, overweight, or ideal, and check the target weight range for their category.',
    category: 'dog',
    inputs: [
      { id: 'weight', label: 'Current Weight', type: 'number', defaultValue: 20, min: 0.5, max: 120, step: 0.5, unitType: 'weight', tooltip: 'Enter your dog’s current weight.' },
      {
        id: 'breedSize',
        label: 'Breed Size Category',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Toy Breed (e.g. Pomeranian, Yorkie)', value: 'toy' },
          { label: 'Small Breed (e.g. Pug, Beagle)', value: 'small' },
          { label: 'Medium Breed (e.g. Border Collie, Bulldog)', value: 'medium' },
          { label: 'Large Breed (e.g. German Shepherd, Golden Retriever)', value: 'large' },
          { label: 'Giant Breed (e.g. Great Dane, Saint Bernard)', value: 'giant' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petWeight(inputs, unitSystem, 'dog'),
    formula: {
      description: 'Compares current weight against breed-size standard benchmarks (Toy: 1-4kg, Small: 4-10kg, Medium: 10-25kg, Large: 25-45kg, Giant: 45-90kg).',
      explanation: 'Evaluates the dog’s weight relative to standard veterinary growth limits for each size class, indicating underweight or overweight risk.'
    },
    seo: {
      metaTitle: 'Dog Weight Calculator: Healthy Weight Range Check',
      metaDescription: 'Find if your dog falls within a healthy weight class. Check standard ranges for toy, small, medium, large, and giant dog breeds.',
      keywords: ['dog weight calculator', 'healthy dog weight range', 'is my dog overweight', 'dog size chart', 'ideal dog weight'],
      educationalContent: `
        <h3>Is My Dog Overweight? How to Tell</h3>
        <p>A weight calculator is a helpful benchmark, but a visual check is critical. Stand over your dog and look down. They should have a visible waist tuck behind their ribs. Press your hands along their sides; you should be able to feel each rib under a thin layer of fat without pressing firmly. If you can see the ribs, they may be underweight; if you cannot feel them at all, they are likely overweight.</p>
        
        <h3>Common Health Risks of Overweight Dogs</h3>
        <p>Obesity in dogs is a growing epidemic that reduces life expectancy by up to 2 years. Excess weight strains joints, accelerating arthritis, and increases risks of cardiorespiratory disease, heat stroke, and metabolic conditions like pancreatitis.</p>
      `,
      examples: [
        { title: 'Medium Breed at 30kg', steps: ['Ideal range for medium breeds is 10 to 25 kg.', '30 kg exceeds the maximum ideal threshold by 5 kg.', 'Classifies as Overweight.'], result: 'Overweight' }
      ],
      faq: [
        { question: 'What breeds fall into the giant category?', answer: 'Giant breeds are dogs that mature to over 90 lbs (41 kg). Examples include Great Danes, Mastiffs, Newfoundlands, and Irish Wolfhounds.' },
        { question: 'Why does my dog gain weight so quickly?', answer: 'Factors include overfeeding, lack of daily exercise, thyroid hormone imbalances (hypothyroidism), or slow metabolism following a spay/neuter procedure.' },
        { question: 'How can I safely help my dog lose weight?', answer: 'Consult a vet to rule out medical issues, switch to a weight-management dry food, reduce treats, and slowly increase low-impact daily exercise (like swimming or leash walks).' }
      ]
    },
    references: [
      { title: 'WSAVA Global Nutrition Committee Weight Assessment guidelines', url: 'https://wsava.org/' }
    ]
  },
  {
    id: 'puppy-growth',
    name: 'Puppy Growth Calculator',
    title: 'Puppy Growth Curve & Adult Weight Predictor',
    description: 'Predict your puppy’s mature adult weight based on their current weight, age in weeks, and breed size.',
    category: 'dog',
    isPopular: true,
    inputs: [
      { id: 'weight', label: 'Current Weight', type: 'number', defaultValue: 8, min: 0.2, max: 60, step: 0.2, unitType: 'weight', tooltip: 'Enter your puppy’s current weight.' },
      { id: 'ageWeeks', label: 'Current Age (weeks)', type: 'number', defaultValue: 12, min: 4, max: 104, step: 1, tooltip: 'Puppy age in weeks (1 month is approx 4.3 weeks).' },
      {
        id: 'breedSize',
        label: 'Target Breed Size Category',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Toy Breed (Adult under 10 lbs)', value: 'toy' },
          { label: 'Small Breed (Adult 10 - 22 lbs)', value: 'small' },
          { label: 'Medium Breed (Adult 23 - 55 lbs)', value: 'medium' },
          { label: 'Large Breed (Adult 56 - 99 lbs)', value: 'large' },
          { label: 'Giant Breed (Adult over 100 lbs)', value: 'giant' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => puppyGrowth(inputs, unitSystem),
    formula: {
      description: 'Estimated Adult Weight = Current Weight / Growth Factor. Growth Factor is calculated using a polynomial model mapping weeks of growth.',
      explanation: 'Since different size categories grow at vastly different rates (toy breeds reach maturity at 9 months; giant breeds grow for up to 2 years), our formula uses size-specific sigmoidal curves to determine the percentage of adult weight reached by week X.'
    },
    seo: {
      metaTitle: 'Puppy Growth Calculator: How Big Will My Dog Get?',
      metaDescription: 'Predict your puppy’s adult size. Uses growth factors mapped across toy, small, medium, large, and giant breed growth tables.',
      keywords: ['puppy growth calculator', 'how big will my puppy get', 'puppy weight predictor', 'dog growth chart', 'puppy development schedule'],
      educationalContent: `
        <h3>Puppy Growth Milestones and Timelines</h3>
        <p>Puppies grow at different speeds based on their genetic background. Smaller dogs complete their skeleton growth around 9–10 months of age. Large breed dogs continue to grow and fill out up to 18 months, and giant breeds may grow until their second birthday.</p>
        
        <h3>The Puppy Growth Curve</h3>
        <p>Growth is non-linear. Puppies experience their most dramatic growth spurt between weeks 8 and 20. During this time, they require calorie-dense puppy food to build strong bones, muscles, and support brain development.</p>
      `,
      examples: [
        { title: '12-Week Medium Puppy at 6kg', steps: ['Medium dog growth factor at 12 weeks = ~30%.', 'Adult Weight = 6 / 0.30 = 20kg.'], result: '20 kg Adult Weight' }
      ],
      faq: [
        { question: 'When do puppies stop growing?', answer: 'Toy/small dogs stop growing around 9-12 months. Medium dogs at 12 months. Large dogs at 15-18 months. Giant dogs continue growing up to 24 months.' },
        { question: 'Why is my puppy’s growth rate slowing down?', answer: 'It is normal for growth to decelerate after 6 months. Their height is mostly set, and they will slowly build muscle mass (filling out) over the next few months.' },
        { question: 'How accurate are puppy growth calculators?', answer: 'They are accurate within a 10-15% margin for purebreds with steady genetics. Mixed breeds can show higher variation depending on which parental genes dominate.' }
      ]
    },
    references: [
      { title: 'Growth Curves of Dogs of Different Sizes', author: 'Journal of Nutrition Science' }
    ]
  },
  {
    id: 'dog-calorie',
    name: 'Dog Calorie Calculator',
    title: 'Dog Daily Calorie Requirements (DER/RER) Calculator',
    description: 'Calculate daily energy needs for your dog, with multipliers adjusting for spay/neuter, weight loss, and athletic performance.',
    category: 'dog',
    inputs: [
      { id: 'weight', label: 'Dog Weight', type: 'number', defaultValue: 15, min: 1, max: 120, step: 0.5, unitType: 'weight', tooltip: 'Enter your dog’s weight.' },
      {
        id: 'condition',
        label: 'Current Status / Goals',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Normal Neutered Adult', value: 'normal' },
          { label: 'Active / Intact Adult', value: 'active' },
          { label: 'Inactive / Weight Loss Needed', value: 'sedentary' },
          { label: 'Intense Work / Performance', value: 'working' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petCalorie(inputs, unitSystem, 'dog'),
    formula: {
      description: 'RER = 70 * weight_kg^0.75. DER = RER * status_multiplier.',
      explanation: 'First, the Resting Energy Requirement (RER) is calculated. We then apply specific veterinary multipliers (e.g. 1.6 for neutered adults, 1.0 for weight loss targets) to calculate the Daily Energy Requirement (DER).'
    },
    seo: {
      metaTitle: 'Dog Calorie Calculator: Daily Energy Needs',
      metaDescription: 'Find how many calories your dog needs per day. Computes RER and DER targets to manage feeding or direct weight management programs.',
      keywords: ['dog calorie calculator', 'how many calories does a dog need', 'RER calculator for dogs', 'canine daily energy requirement', 'dog metabolic rate'],
      educationalContent: `
        <h3>What are RER and DER in Vet Medicine?</h3>
        <p>Resting Energy Requirement (RER) is the basal metabolic rate, representing the energy a dog uses for breathing, blood circulation, and digestion at rest. Daily Energy Requirement (DER) is the RER adjusted for exercise, growth, and spaying status. This is the value used to determine daily feeding targets.</p>
        
        <h3>Understanding Metabolic Differences</h3>
        <p>Just like humans, individual dogs have unique metabolisms. An anxious dog may burn 10% more calories than a relaxed companion of the same weight. Keep an eye on your dog’s weight and adjust their calorie intake as needed.</p>
      `,
      examples: [
        { title: '10kg Dog (Normal status)', steps: ['RER = 70 * (10 ^ 0.75) = 393 kcal/day.', 'DER = 393 * 1.6 = 629 kcal/day.'], result: '629 kcal per day' }
      ],
      faq: [
        { question: 'What is the difference between RER and DER?', answer: 'RER is the minimum calories needed for basic life functions at absolute rest. DER includes additional calories for daily activities, growth, and work.' },
        { question: 'Does spaying/neutering reduce calorie needs?', answer: 'Yes. Spaying or neutering reduces metabolic rate and physical activity levels, reducing daily calorie requirements by 20% to 30%.' },
        { question: 'How many calories are in a cup of dog food?', answer: 'It varies from 300 to 450 calories per cup for dry kibble depending on the brand and formula. Always check the kcal/cup rating on the packaging.' }
      ]
    },
    references: [
      { title: 'AAHA Nutritional Assessment Guidelines', url: 'https://www.aaha.org/' }
    ]
  },
  {
    id: 'dog-bmi',
    name: 'Dog BMI / BCS Calculator',
    title: 'Dog Body Condition Score (BCS) & Weight Index Calculator',
    description: 'Determine your dog’s physical body shape index using the standard clinical 9-point Body Condition Score scale.',
    category: 'dog',
    inputs: [
      { id: 'bcs', label: 'Body Shape Assessment (BCS Scale 1-9)', type: 'slider', defaultValue: 5, min: 1, max: 9, step: 1, tooltip: '1 is emaciated, 5 is ideal, 9 is severely obese. Choose the rating that matches your dog.' }
    ],
    calculate: (inputs) => petBodyConditionScore(inputs, 'dog'),
    formula: {
      description: 'Maps the selected 9-point BCS value to clinical category rules.',
      explanation: 'Veterinary clinics use the Body Condition Score (BCS) rather than a BMI index, as muscle mass and skeletal structures vary significantly between dog breeds.'
    },
    seo: {
      metaTitle: 'Dog BCS Calculator: Body Condition Score Guide',
      metaDescription: 'Find your dog’s Body Condition Score (BCS) using the standard clinical scale. Learn to check for ideal ribs, waist, and abdominal shape.',
      keywords: ['dog body condition score', 'dog BCS calculator', 'dog obesity scale', 'is my dog fat', 'dog ribs check'],
      educationalContent: `
        <h3>What is the Body Condition Score (BCS)?</h3>
        <p>The Body Condition Score (BCS) is a 9-point visual and physical assessment tool used by veterinarians to evaluate body fat percentage. A score of 1 represents extreme emaciation, 5 is the ideal weight, and 9 indicates severe obesity.</p>
        
        <h3>How to Perform a BCS Assessment at Home</h3>
        <p>To check your dog’s body condition:</p>
        <ul>
          <li><strong>Rib Check:</strong> Run your palms along their ribcage. The ribs should be easy to feel under a light layer of fat, similar to the back of your hand. If they feel like your knuckles, they are underweight; if they feel like your palm, they are overweight.</li>
          <li><strong>Profile Check:</strong> View your dog from the side. You should see a clear upward curve of the abdomen behind the ribs.</li>
          <li><strong>Overhead Check:</strong> Look down at your dog from above. There should be a visible waistline indent behind the ribs.</li>
        </ul>
      `,
      examples: [
        { title: 'Score 5 (Ideal)', steps: ['Ribs easily felt.', 'Visible waist from above.', 'Abdomen tucked from the side.'], result: 'Ideal Weight' }
      ],
      faq: [
        { question: 'What does a BCS score of 7 mean?', answer: 'A score of 7 means your dog is overweight. Their ribs are hard to feel under a heavy layer of fat, and they have a minimal waistline and abdominal tuck.' },
        { question: 'How can I lower my dog’s BCS score?', answer: 'Slowly reduce their daily calories, cut out table scraps, increase activity (walks/playtime), and consult your vet for a weight management plan.' },
        { question: 'Why is BCS better than weighing my dog?', answer: 'A scale only measures total weight, which does not account for muscle mass vs. fat. BCS checks physical fat deposits, which is a more accurate measure of health.' }
      ]
    },
    references: [
      { title: 'AAHA Canine Body Condition Charts', url: 'https://www.aaha.org/' }
    ]
  },
  {
    id: 'dog-water',
    name: 'Dog Water Intake Calculator',
    title: 'Dog Daily Water Intake & Hydration Calculator',
    description: 'Calculate your dog’s recommended daily water consumption based on weight, activity, diet, and seasonal temperatures.',
    category: 'dog',
    inputs: [
      { id: 'weight', label: 'Dog Weight', type: 'number', defaultValue: 15, min: 1, max: 120, step: 0.5, unitType: 'weight', tooltip: 'Enter your dog’s weight.' },
      {
        id: 'diet',
        label: 'Primary Diet Type',
        type: 'select',
        defaultValue: 'dry',
        options: [
          { label: 'Dry Kibble Only', value: 'dry' },
          { label: 'Wet Canned Food Only', value: 'wet' },
          { label: 'Mixed Dry & Wet Diet', value: 'mixed' }
        ]
      },
      {
        id: 'activity',
        label: 'Activity & Climate',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Sedentary / Cool Climate', value: 'sedentary' },
          { label: 'Normal / Mild Climate', value: 'normal' },
          { label: 'Active / Hot Summer Weather', value: 'active' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petWaterIntake(inputs, unitSystem, 'dog'),
    formula: {
      description: 'Daily Water (mL) = Weight (kg) * 60 * diet_multiplier * activity_multiplier.',
      explanation: 'Healthy dogs require roughly 50 to 60 mL of water per kilogram of body weight daily. Dogs on wet diets absorb moisture from their food, reducing the volume they need to drink from their water bowl. Active dogs or hot weather increase water requirements.'
    },
    seo: {
      metaTitle: 'Dog Water Intake Calculator: Daily Hydration Needs',
      metaDescription: 'Find out how much water your dog should drink per day. Accounts for dry vs wet food diet profiles and activity levels.',
      keywords: ['dog water intake calculator', 'how much water does a dog need', 'dog drinking water calculator', 'dog dehydration symptoms', 'water bowl amount for dogs'],
      educationalContent: `
        <h3>Why Proper Hydration Matters for Dogs</h3>
        <p>Water is essential for digestion, regulating body temperature, lubricating joints, and flushing metabolic wastes through the kidneys. Dehydration can lead to organ failure, while drinking too much water (polydipsia) can indicate underlying conditions like diabetes or kidney issues.</p>
        
        <h3>Signs of Dehydration in Dogs</h3>
        <p>Check if your dog is dehydrated by testing their skin elasticity: gently pinch the skin on the back of their neck. It should snap back instantly. If it stays tented, they are dehydrated. Other signs include dry, sticky gums, dry eyes, and lethargy.</p>
      `,
      examples: [
        { title: '10kg Dog on Dry Kibble', steps: ['Base intake = 10 * 60 = 600 mL.', 'Normal activity factor = 1.0.', 'Dry food factor = 1.0 (no moisture in food).'], result: '600 mL per day (~20 oz)' }
      ],
      faq: [
        { question: 'What is water intoxication in dogs?', answer: 'Water intoxication (hyponatremia) happens when a dog drinks too much water too quickly, diluting sodium levels. This can occur when playing with a hose or fetching toys from a lake.' },
        { question: 'Why is my dog drinking so much water suddenly?', answer: 'Sudden increased thirst (polydipsia) can indicate urinary tract infections, diabetes, Cushing’s disease, kidney issues, or a reaction to medications like steroids.' },
        { question: 'How long can a dog go without water?', answer: 'A dog can only survive 2 to 3 days without water, whereas they can survive much longer without food. Always ensure clean water is available.' }
      ]
    },
    references: [
      { title: 'Fluid Therapy in Canine Medicine', author: 'Veterinary Clinics of North America' }
    ]
  },
  {
    id: 'dog-vaccination',
    name: 'Dog Vaccination Schedule Planner',
    title: 'Puppy & Dog Vaccination Schedule Planner',
    description: 'Calculate due dates for core and non-core canine vaccinations based on your puppy’s age or birth date.',
    category: 'dog',
    inputs: [
      { id: 'ageWeeks', label: 'Puppy Age (Weeks)', type: 'number', defaultValue: 8, min: 4, max: 24, step: 1, tooltip: 'Select your puppy’s current age in weeks.' },
      { id: 'birthdate', label: 'Puppy Birthdate (Optional)', type: 'date', defaultValue: () => addDaysISO(formatDate(new Date()), -8 * 7), tooltip: 'Select birthdate for more precise dates.' }
    ],
    calculate: (inputs) => petVaccinationSchedule(inputs, 'dog'),
    formula: {
      description: 'Calculates vaccine due dates based on age milestones: DHPP at 6, 10, and 14 weeks. Rabies at 14 weeks.',
      explanation: 'Uses AAHA canine vaccination guidelines to plot recommended vaccine windows, transitioning from maternal antibodies to active immunization.'
    },
    seo: {
      metaTitle: 'Puppy Vaccination Schedule Calculator & Planner',
      metaDescription: 'Find when your puppy needs their DHPP booster shots and Rabies vaccines. Complete planner showing core and optional canine immunizations.',
      keywords: ['puppy vaccination schedule', 'dog vaccine planner', 'when does puppy get rabies shot', 'DHPP vaccine timeline', 'puppy shots schedule'],
      educationalContent: `
        <h3>Core vs. Non-Core Canine Vaccines</h3>
        <p>Vaccines are divided into two main categories to ensure your dog is protected against common diseases:</p>
        <ul>
          <li><strong>Core Vaccines:</strong> Crucial for all dogs, regardless of location or lifestyle. These include the <strong>DHPP</strong> combination (Distemper, Hepatitis, Parvovirus, Parainfluenza) and the <strong>Rabies</strong> vaccine, which is required by law in most areas.</li>
          <li><strong>Non-Core (Optional) Vaccines:</strong> Recommended based on risk factors like environment and lifestyle. Examples include <strong>Bordetella</strong> (for boarding/grooming), <strong>Leptospirosis</strong> (for dogs around water or wildlife), and <strong>Lyme disease</strong> (for tick-prone areas).</li>
        </ul>
        
        <h3>Why Puppies Need Multiple Booster Shots</h3>
        <p>Newborn puppies receive protective antibodies from their mother’s milk (colostrum). These antibodies slowly decline over their first 16 weeks. Because the exact timing of this decline varies, puppies receive a series of vaccinations every 3 to 4 weeks starting at 6-8 weeks, ensuring they are protected as maternal immunity fades.</p>
      `,
      examples: [
        { title: 'Puppy born on May 1st', steps: ['First DHPP at 6 weeks (June 12).', 'Second DHPP at 10 weeks (July 10).', 'Third DHPP & Rabies at 14 weeks (August 7).'], result: 'Schedule complete' }
      ],
      faq: [
        { question: 'What is DHPP?', answer: 'DHPP is a combination vaccine protecting against Canine Distemper, Infectious Hepatitis, Parvovirus, and Parainfluenza.' },
        { question: 'When is a puppy safe to go outside?', answer: 'A puppy is not fully protected until 7-10 days after their final puppy booster shot, which is typically given around 14 to 16 weeks of age.' },
        { question: 'How often do dogs need boosters?', answer: 'After the initial 1-year booster, core vaccines like DHPP and Rabies are typically administered every 3 years.' }
      ]
    },
    references: [
      { title: 'AAHA Canine Vaccination Guidelines', url: 'https://www.aaha.org/guidelines' }
    ]
  }
];
