export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string | null;
  date: string;
  created_at: string;
}

export interface TransactionFormData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}
