import { PetGuide } from '../types/calculator';

export const petGuides: PetGuide[] = [
  {
    id: 'g1',
    slug: 'puppy-vaccination-roadmap',
    title: 'Puppy Vaccination Roadmap & Safety Guide',
    excerpt: 'A comprehensive visual guide to core and non-core vaccines for puppies in their first year.',
    category: 'dog',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=450&fit=crop',
    sections: [
      {
        title: 'Core vs. Non-Core Vaccines',
        content: 'Core vaccines are medically essential for all dogs. This includes the DHPP shot and the Rabies vaccine. Non-core vaccines are optional, based on lifestyle risk factors like tick exposure or spending time in boarding kennels. Common non-core shots are Bordetella, Leptospirosis, and Lyme disease.'
      },
      {
        title: 'First Year Vaccination Schedule',
        content: 'Puppies need a series of booster shots because their maternal immunity slowly declines over their first 16 weeks. Shots are given at 6-8, 10-12, and 14-16 weeks. A final booster is given at 1 year, and then every 3 years.'
      },
      {
        title: 'Puppy Socialization and Safety',
        content: 'Because puppies are not fully protected until 7-10 days after their final booster, avoid taking them to public parks or letting them meet unvaccinated dogs. Focus on safe socialization inside your home.'
      }
    ]
  },
  {
    id: 'g2',
    slug: 'feline-nutrition-principles',
    title: 'Feline Nutrition: Obligate Carnivore Dietary Guide',
    excerpt: 'Cats have unique metabolic needs. We review why protein, taurine, and hydration are critical for feline health.',
    category: 'cat',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=450&fit=crop',
    sections: [
      {
        title: 'The Obligate Carnivore Diet',
        content: 'Cats are obligate carnivores, meaning their bodies require animal-based protein to survive. They cannot digest plant matter efficiently and require nutrients like taurine, arachidonic acid, and vitamin A, which are only found in meat.'
      },
      {
        title: 'The Importance of Wet Food',
        content: 'Domestic cats have a low thirst drive. Wet canned food is roughly 75% water, providing essential hydration that supports kidney health and prevents bladder stones. Combining wet and dry food is a great way to balance hydration with dental benefits.'
      },
      {
        title: 'Regulating Portion Sizes',
        content: 'Avoid free-feeding dry food, as this is a common cause of feline obesity. Measure dry food portions and offer wet food at set times twice daily.'
      }
    ]
  },
  {
    id: 'g3',
    slug: 'dog-weight-management-blueprint',
    title: 'Canine Weight Management Blueprint',
    excerpt: 'Step-by-step guidance to help your dog reach their ideal weight and reduce joint strain.',
    category: 'dog',
    coverImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=450&fit=crop',
    sections: [
      {
        title: 'Understanding Rib and Waist Checks',
        content: 'A weight calculator is a helpful benchmark, but a visual check is critical. Stand over your dog and look down: you should see a visible waist tuck behind their ribs. Press your hands along their sides: you should be able to feel each rib under a thin layer of fat without pressing firmly.'
      },
      {
        title: 'Reducing Daily Caloric Intake',
        content: 'If your dog is overweight, switch to a weight-management dry food rich in protein and fiber. Measure food using a scale, and limit treats to 10% of their daily calorie budget.'
      },
      {
        title: 'Low-Impact Exercise for Joint Health',
        content: 'Slowly increase activity with low-impact exercises like swimming or leash walks on flat ground. Avoid high-impact jumping, which can strain sore joints.'
      }
    ]
  },
  {
    id: 'g4',
    slug: 'feline-hydration-guide',
    title: 'Feline Hydration Guide: Preventing Urinary Tract Issues',
    excerpt: 'Feline dehydration is a common cause of urinary tract blockages and kidney issues. Learn tips to make your cat drink more.',
    category: 'cat',
    coverImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&h=450&fit=crop',
    sections: [
      {
        title: 'The Feline Thirst Drive',
        content: 'Cats evolved from desert ancestors and have a low thirst drive. If fed dry food, they rarely drink enough water to compensate, which can lead to concentrated urine and kidney stones.'
      },
      {
        title: 'Tips to Increase Water Intake',
        content: 'Provide a combination of wet and dry food. Use a pet fountain (cats prefer running water), keep water bowls separate from food bowls, and add a splash of tuna water or unsalted bone broth to their bowl.'
      },
      {
        title: 'Signs of Feline Dehydration',
        content: 'Check for sticky gums, dry eyes, and lethargy. If your cat’s skin takes more than a second to snap back after a gentle pinch, they may be dehydrated.'
      }
    ]
  }
];

export const getGuideBySlug = (slug: string): PetGuide | undefined => {
  return petGuides.find(guide => guide.slug === slug);
};
