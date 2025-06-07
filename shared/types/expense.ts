export enum ExpenseCategory {
  // Food & Beverage
  FOOD = 'FOOD',
  GROCERIES = 'GROCERIES',
  RESTAURANTS = 'RESTAURANTS',
  DRINKS = 'DRINKS',
  ALCOHOL = 'ALCOHOL',
  COFFEE = 'COFFEE',
  TEA = 'TEA',
  SNACKS = 'SNACKS',

  // Transportation & Housing
  TRANSPORTATION = 'TRANSPORTATION',
  HOUSING = 'HOUSING',
  UTILITIES = 'UTILITIES',

  // Lifestyle & Entertainment
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  SUBSCRIPTION = 'SUBSCRIPTION',
  GIFTS = 'GIFTS',

  // Health & Education
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  TRAVEL = 'TRAVEL',

  // Other
  OTHER = 'OTHER',
}

export function getExpenseCategoryDisplayName(category: ExpenseCategory): string {
  const displayNames: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD]: 'Food',
    [ExpenseCategory.GROCERIES]: 'Groceries',
    [ExpenseCategory.RESTAURANTS]: 'Restaurants',
    [ExpenseCategory.DRINKS]: 'Drinks',
    [ExpenseCategory.ALCOHOL]: 'Alcohol',
    [ExpenseCategory.COFFEE]: 'Coffee',
    [ExpenseCategory.TEA]: 'Tea',
    [ExpenseCategory.SNACKS]: 'Snacks',
    [ExpenseCategory.TRANSPORTATION]: 'Transportation',
    [ExpenseCategory.HOUSING]: 'Housing',
    [ExpenseCategory.UTILITIES]: 'Utilities',
    [ExpenseCategory.ENTERTAINMENT]: 'Entertainment',
    [ExpenseCategory.SHOPPING]: 'Shopping',
    [ExpenseCategory.SUBSCRIPTION]: 'Subscriptions',
    [ExpenseCategory.GIFTS]: 'Gifts',
    [ExpenseCategory.HEALTH]: 'Health',
    [ExpenseCategory.EDUCATION]: 'Education',
    [ExpenseCategory.TRAVEL]: 'Travel',
    [ExpenseCategory.OTHER]: 'Other',
  };

  return displayNames[category];
}
