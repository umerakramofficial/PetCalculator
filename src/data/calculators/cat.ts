import { CalculatorConfig } from '../../types/calculator';
import { catAge, petPregnancy, catHeatCycle, petFeeding, petWeight, kittenGrowth, petCalorie, petWaterIntake, petBodyConditionScore, petVaccinationSchedule, formatDate, addDays, addDaysISO } from '../../utils/calculations';

export const catCalculators: CalculatorConfig[] = [
  {
    id: 'cat-age',
    name: 'Cat Age Calculator',
    title: 'Cat Age to Human Years Calculator',
    description: 'Convert your cat’s age to human years using clinical feline development stages.',
    category: 'cat',
    isPopular: true,
    isFeatured: true,
    inputs: [
      { id: 'age', label: 'Cat Age (years)', type: 'number', defaultValue: 1, min: 0.1, max: 30, step: 0.1, tooltip: 'Enter your cat’s age in years. Decimals are accepted.' }
    ],
    calculate: (inputs) => catAge(inputs),
    formula: {
      description: 'Human Years = 15 (for 1st year) + 9 (for 2nd year) + 4 (per year after).',
      explanation: 'Feline maturation is extremely rapid in the first 24 months. A 1-year-old cat is roughly equivalent to a 15-year-old human. By age 2, they reach full physical maturity, equivalent to a 24-year-old human. Each calendar year after that represents approximately 4 human years.'
    },
    seo: {
      metaTitle: 'Cat Age Calculator: How Old is Your Cat in Human Years?',
      metaDescription: 'Find out your cat’s true human age equivalent. Our advanced calculator accounts for feline development guidelines from the AAFP.',
      keywords: ['cat age calculator', 'cat human years', 'feline age conversion', 'kitten age chart', 'cat age comparison'],
      educationalContent: `
        <h3>Understanding Feline Maturation and Life Stages</h3>
        <p>Unlike dogs, cat breeds do not vary wildly in size, meaning all domestic cats age at a similar rate. However, their development is highly accelerated in their initial life phases. Within six months, a kitten reaches adolescence; by one year, they are physically equivalent to a 15-year-old human.</p>
        
        <h3>Feline Life Stages Classified by Veterinarians</h3>
        <ul>
          <li><strong>Kitten:</strong> Birth to 6 months. Rapid growth phase.</li>
          <li><strong>Junior:</strong> 7 months to 2 years. Reaches physical and sexual maturity.</li>
          <li><strong>Prime:</strong> 3 to 6 years. Health remains stable.</li>
          <li><strong>Mature:</strong> 7 to 10 years. Activity may start to slow down.</li>
          <li><strong>Senior:</strong> 11 to 14 years. Equivalent to 60-72 human years.</li>
          <li><strong>Geriatric:</strong> 15+ years. Requires closer medical monitoring.</li>
        </ul>
        <p>To monitor your kitten's growth curves and development milestones, use our <a href="/tools/kitten-growth" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Kitten Growth Calculator</a> and verify their specific daily nutrition needs with the <a href="/tools/cat-feeding" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Cat Feeding Calculator</a>.</p>
      `,
      examples: [
        { title: 'Cat (Age 1)', steps: ['Rapid kitten phase.', '1 year equivalent = 15 human years.'], result: '15 Human Years' },
        { title: 'Senior Cat (Age 12)', steps: ['First 2 years = 24 human years.', '10 subsequent years = 10 * 4 = 40 human years.', 'Combine: 24 + 40 = 64.'], result: '64 Human Years' }
      ],
      faq: [
        { question: 'Do indoor cats live longer than outdoor cats?', answer: 'Yes. Indoor cats typically live 12-15 years (some up to 20), while outdoor cats face risks like cars, predators, and infections, averaging only 2-5 years.' },
        { question: 'What is the oldest cat on record?', answer: 'The oldest cat on record was Creme Puff from Texas, who lived to be 38 years and 3 days old (equivalent to over 160 human years).' },
        { question: 'How can I tell my cat’s age without records?', answer: 'A vet can estimate age by checking dental wear and tartar build-up, cloudiness in the eyes, and joint flexibility.' }
      ]
    },
    references: [
      { title: 'AAFP/AAHA Feline Life Stage Guidelines', url: 'https://www.catvets.com/' }
    ]
  },
  {
    id: 'cat-pregnancy',
    name: 'Cat Pregnancy Calculator',
    title: 'Cat Pregnancy Due Date & Milestone Calculator',
    description: 'Calculate your pregnant cat’s estimated due date (queening date) and track key weekly milestones.',
    category: 'cat',
    inputs: [
      { id: 'matingDate', label: 'Mating Date', type: 'date', defaultValue: () => formatDate(new Date()), tooltip: 'Select the date when your cat mated or went out of heat.' }
    ],
    calculate: (inputs) => petPregnancy(inputs, 'cat'),
    formula: {
      description: 'Estimated Due Date = Mating Date + 65 days.',
      explanation: 'Feline pregnancy ranges from 63 to 67 days, with 65 days being the average. Ovulation is induced by mating, meaning fertilization usually occurs within 24-48 hours of mating.'
    },
    seo: {
      metaTitle: 'Cat Pregnancy Calculator: Due Date & Queening Timeline',
      metaDescription: 'Find when your pregnant cat will deliver. View our complete week-by-week calendar of kitten development and nutritional needs.',
      keywords: ['cat pregnancy calculator', 'queening date calculator', 'cat gestation timeline', 'pregnant cat signs', 'cat labor signs'],
      educationalContent: `
        <h3>Signs Your Cat is Pregnant</h3>
        <p>A pregnant cat is called a queen. The first sign is often "pinking up" around week 3: her nipples become enlarged and turn a darker pink. Other symptoms include morning sickness, gradual weight gain, and a swollen abdomen. She may also become exceptionally affectionate.</p>
        
        <h3>Preparing for the Kittens’ Arrival</h3>
        <p>Set up a clean, warm nesting box lined with soft towels in a quiet room, away from family noise and other pets. The queen will seek this spot as she prepares to give birth (queening).</p>
      `,
      examples: [
        { title: 'Mating on June 1st', steps: ['Add 65 days to June 1st.', 'June has 30 days, July has 31 days.', 'June 1 + 65 days = August 5th.'], result: 'August 5th' }
      ],
      faq: [
        { question: 'How many kittens are in a typical litter?', answer: 'A typical litter size is 4 to 6 kittens, though first-time queens often have smaller litters of 1 to 3.' },
        { question: 'What should I feed my pregnant cat?', answer: 'Feed her high-calorie kitten food starting from week 4. She will need the extra protein and fat for fetal development and nursing.' },
        { question: 'How do I know my cat is in labor?', answer: 'Signs include nesting behavior, restlessness, loud yowling, grooming her genitals, and a drop in body temperature.' }
      ]
    },
    references: [
      { title: 'Feline Reproduction and Gestation', author: 'Cornell Feline Health Center' }
    ]
  },
  {
    id: 'cat-heat-cycle',
    name: 'Cat Heat Cycle Calculator',
    title: 'Cat Heat Cycle & Estrus Rebound Planner',
    description: 'Track your cat’s heat cycle and estimate when she will next cycle based on seasonal patterns.',
    category: 'cat',
    inputs: [
      { id: 'lastHeatDate', label: 'Last Heat Start Date', type: 'date', defaultValue: () => formatDate(new Date()), tooltip: 'Enter the start date of her last heat cycle.' }
    ],
    calculate: (inputs) => catHeatCycle(inputs),
    formula: {
      description: 'Next Heat Estimate = Last Heat Start + 18 days.',
      explanation: 'Cats are seasonally polyestrus, meaning they cycle repeatedly during breeding season (spring to autumn) if they do not mate. A typical cycle lasts 18 days, with active heat behavior lasting 7 days.'
    },
    seo: {
      metaTitle: 'Cat Heat Cycle Calculator: Next Period & Receptive Calendar',
      metaDescription: 'Find when your cat will next enter heat. Learn about typical vocal behavior and how to handle a cycling female.',
      keywords: ['cat heat cycle calculator', 'cat in heat symptoms', 'how often do cats go in heat', 'cat estrus cycle', 'feline reproductive calendar'],
      educationalContent: `
        <h3>Recognizing a Cat in Heat</h3>
        <p>A female cat in heat (estrus) displays distinct behavioral changes. She will vocalize loudly (yowling), rub her body against furniture and your legs, roll on the floor, and lift her tail while pressing her hindquarters down. These behaviors are normal reproductive instincts.</p>
        
        <h3>Managing a Cat in Heat</h3>
        <p>Keep her indoors and ensure all windows and doors are securely closed, as she will try to escape to find a mate. Keep intact male cats away. Spaying is the only permanent solution to stop these cycles.</p>
      `,
      examples: [
        { title: 'Cycle start on Feb 10th', steps: ['Add 18 days for the next estrus interval.', 'Feb 10 + 18 days = Feb 28th.'], result: 'Feb 28th' }
      ],
      faq: [
        { question: 'Do female cats bleed when in heat?', answer: 'No, cats do not shed the uterine lining like dogs or humans do, so there is no bloody discharge.' },
        { question: 'How often do cats go into heat?', answer: 'Cats go into heat every 2 to 3 weeks during breeding season (spring and summer) if they do not mate.' },
        { question: 'Can a cat get pregnant while nursing?', answer: 'Yes. A female cat can enter heat and get pregnant as early as 4 weeks after giving birth, even while nursing kittens.' }
      ]
    },
    references: [
      { title: 'Cat Estrous Behavior and Physiology', author: 'UC Davis Veterinary Medicine' }
    ]
  },
  {
    id: 'cat-feeding',
    name: 'Cat Feeding Calculator',
    title: 'Cat Feeding & Portion Size Calculator',
    description: 'Calculate daily wet and dry food amounts based on target calories and food types.',
    category: 'cat',
    isPopular: true,
    inputs: [
      { id: 'weight', label: 'Cat Weight', type: 'number', defaultValue: 4, min: 1, max: 20, step: 0.2, unitType: 'weight', tooltip: 'Enter your cat’s current weight.' },
      {
        id: 'activity',
        label: 'Activity Profile',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Indoor / Neutered Adult (Inactive)', value: 'sedentary' },
          { label: 'Moderately Active (Daily Play)', value: 'normal' },
          { label: 'Highly Active / Intact Cat', value: 'active' }
        ]
      },
      {
        id: 'ageGroup',
        label: 'Life Stage',
        type: 'select',
        defaultValue: 'adult',
        options: [
          { label: 'Kitten (Rapid Growth)', value: 'kitten' },
          { label: 'Adult Cat', value: 'adult' },
          { label: 'Senior Cat', value: 'senior' }
        ]
      },
      { id: 'calorieDensity', label: 'Dry Food Calorie Density (kcal/kg)', type: 'number', defaultValue: 3800, min: 3000, max: 4800, step: 50, tooltip: 'Check dry kibble caloric density (usually 3600-4000 kcal/kg).' }
    ],
    calculate: (inputs, unitSystem) => petFeeding(inputs, unitSystem, 'cat'),
    formula: {
      description: 'Daily Food (g) = (DER / Calorie Density) * 1000. Where RER = 70 * weight_kg^0.75 and DER = RER * multiplier.',
      explanation: 'Calculates the Resting Energy Requirement (RER) and applies specific feline multipliers to find daily energy requirements. Portion size is calculated by dividing calories by the food’s caloric density.'
    },
    seo: {
      metaTitle: 'Cat Feeding Calculator: Daily Dry & Wet Portion portions',
      metaDescription: 'Find out how much food to feed your cat daily in cups and grams. Personalized based on weight, activity, and life stage.',
      keywords: ['cat feeding calculator', 'how much dry food for cat', 'wet cat food portion', 'kitten feeding chart', 'feline food calculator'],
      educationalContent: `
        <h3>Feline Nutrition Needs</h3>
        <p>Cats are obligate carnivores, meaning their bodies are designed to process animal-based proteins and fats. Unlike dogs, they cannot digest carbohydrates efficiently. Look for cat food formulas where meat is the first ingredient, and ensure they get essential nutrients like taurine.</p>
        
        <h3>Dry vs. Wet Food Portions</h3>
        <p>Wet food is highly recommended for cats. It has a high water content (~75%), supporting kidney health and preventing urinary tract issues. Combining wet and dry food is a great way to balance hydration with dental benefits from kibble.</p>
        <p>To determine your cat's specific daily metabolic targets, use the <a href="/tools/cat-calorie" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Cat Calorie Calculator</a>, and check their required moisture guidelines using the <a href="/tools/cat-water" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Cat Water Intake Calculator</a>.</p>
      `,
      examples: [
        { title: '4kg Normal Active Adult Cat', steps: ['RER = 70 * (4 ^ 0.75) = 198 kcal.', 'DER = 198 * 1.2 = 237 kcal/day.', 'Using 3800 kcal/kg food: (237 / 3800) * 1000 = 62g daily.'], result: '62 grams per day (~0.6 cups)' }
      ],
      faq: [
        { question: 'How many times a day should I feed my cat?', answer: 'Feed adult cats 2 to 3 times daily. Kittens require 4 to 5 small meals per day due to their smaller stomachs.' },
        { question: 'Why does my cat leave food in the middle of the bowl?', answer: 'This is often due to "whisker fatigue." A cat’s whiskers are highly sensitive; if they rub against the sides of a deep bowl, it can cause discomfort. Try using a shallow, flat plate instead.' },
        { question: 'Can cats eat dog food?', answer: 'No. Dog food lacks taurine, arachidonic acid, and Vitamin A, which are essential nutrients cats need to survive. A diet of dog food can lead to blindness and heart failure in cats.' }
      ]
    },
    references: [
      { title: 'AAFP Feline Feeding and Nutrition Guidelines', url: 'https://catvets.com/' }
    ]
  },
  {
    id: 'cat-weight',
    name: 'Cat Weight Calculator',
    title: 'Cat Ideal Weight & Classification Calculator',
    description: 'Check if your cat is at their ideal weight based on breed standard ranges.',
    category: 'cat',
    inputs: [
      { id: 'weight', label: 'Current Weight', type: 'number', defaultValue: 4, min: 0.5, max: 20, step: 0.1, unitType: 'weight', tooltip: 'Enter your cat’s current weight.' },
      {
        id: 'breed',
        label: 'Cat Breed / Type',
        type: 'select',
        defaultValue: 'domestic',
        options: [
          { label: 'Domestic Shorthair / Longhair (Standard)', value: 'domestic' },
          { label: 'Singapura / Toy (Very Small)', value: 'singapura' },
          { label: 'Maine Coon / Norwegian Forest (Giant)', value: 'maine_coon' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petWeight(inputs, unitSystem, 'cat'),
    formula: {
      description: 'Compares weight against standards (Singapura: 2-3.5kg, Standard domestic: 3.6-5.4kg, Maine Coon: 5.5-11kg).',
      explanation: 'Evaluates if the cat’s current weight falls within the breed standard range, flagging them as underweight, overweight, or ideal.'
    },
    seo: {
      metaTitle: 'Cat Weight Calculator: Ideal Weight Range Checker',
      metaDescription: 'Find out if your cat is overweight or underweight. View standard weight ranges for domestic cats and large breeds like Maine Coons.',
      keywords: ['cat weight calculator', 'average cat weight', 'is my cat fat', 'maine coon weight range', 'ideal cat weight'],
      educationalContent: `
        <h3>Evaluating Feline Weight</h3>
        <p>A standard domestic cat should weigh between 8 and 12 pounds (3.6 to 5.4 kg). However, body structure varies by breed. Maine Coons can weigh up to 25 pounds (11 kg) and be perfectly healthy, while small breeds like Singapuras may weigh only 5 pounds (2.2 kg).</p>
        
        <h3>Health Risks of Obesity in Cats</h3>
        <p>Overweight cats have a higher risk of developing feline Type 2 diabetes, hepatic lipidosis (fatty liver disease), urinary tract blockages, osteoarthritis, and skin issues due to grooming difficulties.</p>
      `,
      examples: [
        { title: 'Standard Cat at 7kg', steps: ['Ideal range is 3.6 to 5.4 kg.', '7 kg exceeds the maximum ideal threshold.', 'Classifies as Overweight.'], result: 'Overweight' }
      ],
      faq: [
        { question: 'Why is my cat losing weight?', answer: 'Weight loss in senior cats can be a sign of hyperthyroidism, chronic kidney disease (CKD), diabetes, or gastrointestinal issues. Have them checked by a vet.' },
        { question: 'What is a saggy belly flap on cats?', answer: 'This is called the primordial pouch. It is a normal layer of skin and fat that protects their belly during fights and allows them to stretch fully when running.' },
        { question: 'How can I help my cat lose weight?', answer: 'Regulate their portions, limit dry food, increase high-protein wet food, and encourage daily play with toys.' }
      ]
    },
    references: [
      { title: 'Cornell Feline Health Weight Management Guide', url: 'https://www.vet.cornell.edu/' }
    ]
  },
  {
    id: 'kitten-growth',
    name: 'Kitten Growth Calculator',
    title: 'Kitten Growth Milestone & Weight Predictor',
    description: 'Track your kitten’s growth and project their adult weight based on age in weeks.',
    category: 'cat',
    inputs: [
      { id: 'weight', label: 'Current Weight', type: 'number', defaultValue: 1, min: 0.1, max: 10, step: 0.1, unitType: 'weight', tooltip: 'Enter your kitten’s current weight.' },
      { id: 'ageWeeks', label: 'Current Age (Weeks)', type: 'number', defaultValue: 8, min: 2, max: 52, step: 1, tooltip: 'Kitten age in weeks (1 month is approx 4.3 weeks).' }
    ],
    calculate: (inputs, unitSystem) => kittenGrowth(inputs, unitSystem),
    formula: {
      description: 'Adult Weight = Current Weight / Growth Factor. Growth factor is based on average kitten growth percentages from 2 to 52 weeks.',
      explanation: 'Estimates adult weight using growth milestones. Most kittens reach ~20-25% of their adult weight by 8 weeks, 45-50% by 16 weeks, and reach full maturity by 12 months.'
    },
    seo: {
      metaTitle: 'Kitten Growth Calculator: How Big Will My Cat Get?',
      metaDescription: 'Predict your kitten’s adult size. Track weight milestones and learn about growth stages from birth to 12 months.',
      keywords: ['kitten growth calculator', 'kitten weight chart', 'how big will my kitten get', 'feline growth stages', 'cat growth timeline'],
      educationalContent: `
        <h3>Kitten Growth Stages and Milestones</h3>
        <p>A kitten’s weight increases rapidly during their first few months of life. Newborns weigh roughly 100 grams and gain about 100 grams per week. By 8 weeks, a healthy kitten should weigh around 2 pounds (1 kg).</p>
        
        <h3>Feeding for Steady Growth</h3>
        <p>Kittens have small stomachs but high energy requirements. Feed them specialized kitten food 4 to 5 times daily. Ensure they get enough DHA to support brain and eye development.</p>
      `,
      examples: [
        { title: '8-Week Kitten at 0.9kg', steps: ['8-week growth factor = ~22%.', 'Adult Weight = 0.9 / 0.22 = 4.1kg.'], result: '4.1 kg Adult Weight' }
      ],
      faq: [
        { question: 'When do kittens stop growing?', answer: 'Most domestic cats reach full size by 12 months, though larger breeds like Maine Coons can continue growing for up to 3 years.' },
        { question: 'Why is my kitten not gaining weight?', answer: 'This can be caused by intestinal parasites (roundworms), poor nutrition, or infections. Consult your vet if weight gain stalls.' },
        { question: 'How much should a 12-week-old kitten weigh?', answer: 'A healthy 12-week-old kitten typically weighs between 2.5 and 3.5 pounds (1.1 to 1.6 kg).' }
      ]
    },
    references: [
      { title: 'Waltham Kitten Growth Charts', url: 'https://www.waltham.com/' }
    ]
  },
  {
    id: 'cat-calorie',
    name: 'Cat Calorie Calculator',
    title: 'Cat Daily Calorie Needs (RER/DER) Calculator',
    description: 'Calculate resting and active daily energy requirements for cats, adjusting for indoor/neutered status.',
    category: 'cat',
    inputs: [
      { id: 'weight', label: 'Cat Weight', type: 'number', defaultValue: 4, min: 1, max: 20, step: 0.2, unitType: 'weight', tooltip: 'Enter your cat’s weight.' },
      {
        id: 'condition',
        label: 'Current Status / Goals',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Indoor / Neutered Adult', value: 'normal' },
          { label: 'Active / Intact Adult', value: 'active' },
          { label: 'Weight Loss Target', value: 'loss' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petCalorie(inputs, unitSystem, 'cat'),
    formula: {
      description: 'RER = 70 * weight_kg^0.75. DER = RER * feline_multiplier.',
      explanation: 'First, the Resting Energy Requirement (RER) is calculated. We then apply specific feline multipliers (e.g. 1.2 for neutered adults, 0.8 for weight loss) to find the Daily Energy Requirement (DER).'
    },
    seo: {
      metaTitle: 'Cat Calorie Calculator: Feline Daily Energy Needs',
      metaDescription: 'Find out how many calories your cat needs per day. Calculate RER and DER targets to maintain a healthy weight.',
      keywords: ['cat calorie calculator', 'how many calories does a cat need', 'feline RER', 'cat metabolic rate', 'feline daily calories'],
      educationalContent: `
        <h3>Understanding Feline Energy Needs</h3>
        <p>Resting Energy Requirement (RER) is the energy needed to support vital organs at rest. Daily Energy Requirement (DER) includes calories for physical activity, spay status, and age. Because indoor cats are relatively inactive, they have low DER multipliers, making them prone to weight gain if overfed.</p>
      `,
      examples: [
        { title: '5kg Neutered Cat', steps: ['RER = 70 * (5 ^ 0.75) = 234 kcal/day.', 'DER = 234 * 1.2 = 281 kcal/day.'], result: '281 kcal per day' }
      ],
      faq: [
        { question: 'Why do spayed cats need fewer calories?', answer: 'Spaying/neutering alters hormones, reducing metabolic rate and activity levels, which lowers daily energy needs by up to 25%.' },
        { question: 'How many calories are in a wet food can?', answer: 'Most 3 oz wet food cans contain between 70 and 100 calories. Check the label for the exact kcal/can rating.' },
        { question: 'What is the minimum calories for a dieting cat?', answer: 'Never starve a cat. Rapid calorie restriction can trigger hepatic lipidosis, a fatal liver disease. Weight loss diets must be managed carefully.' }
      ]
    },
    references: [
      { title: 'AAFP/ISFM Feline Life Stage Guidelines', url: 'https://catvets.com/' }
    ]
  },
  {
    id: 'cat-water',
    name: 'Cat Water Intake Calculator',
    title: 'Cat Daily Water Intake & Hydration Calculator',
    description: 'Calculate daily moisture requirements for your cat, factoring in dry and wet food hydration contributions.',
    category: 'cat',
    isPopular: true,
    inputs: [
      { id: 'weight', label: 'Cat Weight', type: 'number', defaultValue: 4, min: 1, max: 20, step: 0.2, unitType: 'weight', tooltip: 'Enter your cat’s weight.' },
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
        label: 'Activity Level',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Low / Inactive', value: 'sedentary' },
          { label: 'Average / Active Play', value: 'normal' }
        ]
      }
    ],
    calculate: (inputs, unitSystem) => petWaterIntake(inputs, unitSystem, 'cat'),
    formula: {
      description: 'Daily Water (mL) = Weight (kg) * 45 * diet_multiplier * activity_multiplier.',
      explanation: 'Cats require roughly 45 to 50 mL of water per kilogram of body weight daily. Cats eating wet food get most of their water from their food, meaning they need to drink less from their bowl. Cats on dry kibble must drink to meet their hydration needs.'
    },
    seo: {
      metaTitle: 'Cat Water Intake Calculator: Feline Moisture Needs',
      metaDescription: 'Calculate how much water your cat needs to drink daily. Learn why cats are prone to dehydration and how wet food helps.',
      keywords: ['cat water intake calculator', 'how much water does a cat need', 'cat dehydration signs', 'how to make cat drink water', 'feline hydration'],
      educationalContent: `
        <h3>The Feline Thirst Drive and Hydration</h3>
        <p>Domestic cats evolved from desert-dwelling ancestors and have a low thirst drive. They are biologically adapted to get moisture from their prey (which is ~70-75% water). If fed dry food (~10% moisture), cats rarely drink enough water to compensate, leading to concentrated urine and risks of kidney disease and bladder stones.</p>
        
        <h3>Tips to Increase Feline Hydration</h3>
        <ul>
          <li>Provide a combination of wet and dry food.</li>
          <li>Use a pet fountain; cats prefer running water.</li>
          <li>Keep water bowls separate from food bowls.</li>
          <li>Add a splash of tuna water or unsalted bone broth to their bowl.</li>
        </ul>
      `,
      examples: [
        { title: '4kg Cat on Mixed Diet', steps: ['Base intake = 4 * 45 = 180 mL.', 'Mixed diet factor = 0.65 (food provides 35% of moisture).', 'Required drinking = 180 * 0.65 = 117 mL.'], result: '117 mL drinking water per day' }
      ],
      faq: [
        { question: 'Why does my cat prefer running tap water?', answer: 'Instinct tells cats that running water is fresh and safe, whereas standing water in a bowl may be stagnant or contaminated.' },
        { question: 'What are the signs of dehydration in cats?', answer: 'Signs include dry, tacky gums, lethargy, poor skin elasticity, and concentrated, strong-smelling urine.' },
        { question: 'Why are cats prone to kidney disease?', answer: 'Their desert origin means their kidneys are highly efficient at concentrating urine, which puts a heavy strain on the kidneys over time if they are chronically dehydrated.' }
      ]
    },
    references: [
      { title: 'Feline Lower Urinary Tract Disease (FLUTD) Hydration Study', author: 'Journal of Feline Medicine and Surgery' }
    ]
  },
  {
    id: 'cat-bmi',
    name: 'Cat Body Condition Score',
    title: 'Cat Body Condition Score (BCS) Calculator',
    description: 'Determine your cat’s body fat index using the standard 9-point feline Body Condition Score scale.',
    category: 'cat',
    inputs: [
      { id: 'bcs', label: 'Body Shape Assessment (BCS Scale 1-9)', type: 'slider', defaultValue: 5, min: 1, max: 9, step: 1, tooltip: 'Select the rating that matches your cat’s shape. 5 is ideal.' }
    ],
    calculate: (inputs) => petBodyConditionScore(inputs, 'cat'),
    formula: {
      description: 'Maps the selected 9-point BCS value to clinical category rules.',
      explanation: 'Feline Body Condition Score (BCS) is a standardized visual and physical scale used to evaluate body fat percentage. A score of 5 is ideal, 1-3 is underweight, and 6-9 is overweight/obese.'
    },
    seo: {
      metaTitle: 'Cat BCS Calculator: Body Condition Score Guide',
      metaDescription: 'Find your cat’s Body Condition Score (BCS) using the standard clinical scale. Learn to check for ideal ribs, waist, and abdominal shape.',
      keywords: ['cat body condition score', 'cat BCS calculator', 'feline obesity scale', 'is my cat overweight', 'cat ribs check'],
      educationalContent: `
        <h3>Checking Your Cat’s Body Condition</h3>
        <p>A weight scale only measures total weight, which does not account for muscle mass vs. fat. Veterinarians use the Body Condition Score (BCS) to assess physical fat deposits:</p>
        <ul>
          <li><strong>Rib Check:</strong> Run your palms along their ribcage. You should feel the ribs easily under a light layer of fat.</li>
          <li><strong>Profile Check:</strong> View your cat from the side. You should see a clear abdominal tuck behind the ribs.</li>
          <li><strong>Overhead Check:</strong> Look down at your cat from above. There should be a visible waistline indent behind the ribs.</li>
        </ul>
      `,
      examples: [
        { title: 'Score 5 (Ideal)', steps: ['Ribs easily felt.', 'Visible waist from above.', 'Abdomen tucked from the side.'], result: 'Ideal Weight' }
      ],
      faq: [
        { question: 'What is a saggy belly flap on cats?', answer: 'This is the primordial pouch, a normal layer of skin and fat that protects their belly during fights and allows them to stretch fully when running.' },
        { question: 'Why is BCS better than weighing my cat?', answer: 'A scale only measures total weight, which does not account for muscle mass vs. fat. BCS checks physical fat deposits, which is a more accurate measure of health.' },
        { question: 'How can I lower my cat’s BCS score?', answer: 'Reduce their daily calories, limit dry food, increase high-protein wet food, and encourage play.' }
      ]
    },
    references: [
      { title: 'AAHA Feline Body Condition Assessment Guidelines', url: 'https://catvets.com/' }
    ]
  },
  {
    id: 'cat-vaccination',
    name: 'Cat Vaccination Schedule Planner',
    title: 'Kitten & Cat Vaccination Schedule Planner',
    description: 'Calculate due dates for core and non-core feline vaccinations based on age or birth date.',
    category: 'cat',
    inputs: [
      { id: 'ageWeeks', label: 'Kitten Age (Weeks)', type: 'number', defaultValue: 8, min: 4, max: 24, step: 1, tooltip: 'Select your kitten’s current age in weeks.' },
      { id: 'birthdate', label: 'Kitten Birthdate (Optional)', type: 'date', defaultValue: () => addDaysISO(formatDate(new Date()), -8 * 7), tooltip: 'Select birthdate for more precise dates.' }
    ],
    calculate: (inputs) => petVaccinationSchedule(inputs, 'cat'),
    formula: {
      description: 'Calculates vaccine due dates based on age milestones: FVRCP at 8, 12, and 16 weeks. Rabies at 16 weeks.',
      explanation: 'Uses AAFP feline vaccination guidelines to plot recommended vaccine windows, transitioning from maternal antibodies to active immunization.'
    },
    seo: {
      metaTitle: 'Kitten Vaccination Schedule Calculator & Planner',
      metaDescription: 'Find when your kitten needs their FVRCP booster shots and Rabies vaccines. Complete planner showing core and optional feline immunizations.',
      keywords: ['kitten vaccination schedule', 'cat vaccine planner', 'when does kitten get rabies shot', 'FVRCP vaccine timeline', 'kitten shots schedule'],
      educationalContent: `
        <h3>Core vs. Non-Core Feline Vaccines</h3>
        <p>Vaccines are divided into two main categories to ensure your cat is protected against common diseases:</p>
        <ul>
          <li><strong>Core Vaccines:</strong> Crucial for all cats, regardless of lifestyle. These include the <strong>FVRCP</strong> combination (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) and the <strong>Rabies</strong> vaccine, which is required by law in most areas.</li>
          <li><strong>Non-Core (Optional) Vaccines:</strong> Recommended based on risk factors like environment and lifestyle. Examples include <strong>FeLV</strong> (Feline Leukemia Virus) for outdoor cats.</li>
        </ul>
      `,
      examples: [
        { title: 'Kitten born on May 1st', steps: ['First FVRCP at 8 weeks (June 26).', 'Second FVRCP at 12 weeks (July 24).', 'Third FVRCP & Rabies at 16 weeks (August 21).'], result: 'Schedule complete' }
      ],
      faq: [
        { question: 'What is FVRCP?', answer: 'FVRCP is a combination vaccine protecting against Feline Rhinotracheitis, Calicivirus, and Panleukopenia.' },
        { question: 'When is a kitten safe to go outside?', answer: 'A kitten is not fully protected until 7-10 days after their final puppy booster shot, which is typically given around 16 weeks of age.' },
        { question: 'How often do cats need boosters?', answer: 'After the initial 1-year booster, core vaccines like FVRCP and Rabies are typically administered every 3 years.' }
      ]
    },
    references: [
      { title: 'AAFP Feline Vaccination Guidelines', url: 'https://catvets.com/guidelines' }
    ]
  }
];
