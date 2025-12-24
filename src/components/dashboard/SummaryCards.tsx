import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Transaction } from '@/types/transaction';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const balance = income - expense;

    return { income, expense, balance };
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: 'Saldo Total',
      value: summary.balance,
      icon: Wallet,
      gradient: 'bg-gradient-primary',
      valueColor: summary.balance >= 0 ? 'text-primary-foreground' : 'text-primary-foreground',
      bgClass: 'bg-gradient-hero'
    },
    {
      title: 'Receitas',
      value: summary.income,
      icon: TrendingUp,
      gradient: 'bg-gradient-income',
      valueColor: 'text-success-foreground',
      bgClass: 'bg-gradient-income'
    },
    {
      title: 'Despesas',
      value: summary.expense,
      icon: TrendingDown,
      gradient: 'bg-gradient-expense',
      valueColor: 'text-destructive-foreground',
      bgClass: 'bg-gradient-expense'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card 
          key={card.title}
          className={`${card.bgClass} border-0 shadow-elegant overflow-hidden animate-slide-up`}
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${card.valueColor} opacity-80`}>
                  {card.title}
                </p>
                <p className={`text-2xl sm:text-3xl font-bold ${card.valueColor} mt-1`}>
                  {formatCurrency(card.value)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.valueColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
