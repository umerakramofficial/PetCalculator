import { CalculatorConfig } from '../../types/calculator';
import { dogCalculators } from './dog';
import { catCalculators } from './cat';

export const allCalculators: CalculatorConfig[] = [
  ...dogCalculators,
  ...catCalculators
];

export const getCalculatorById = (id: string): CalculatorConfig | undefined => {
  return allCalculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category: 'dog' | 'cat'): CalculatorConfig[] => {
  return allCalculators.filter(calc => calc.category === category);
};

export { dogCalculators, catCalculators };
