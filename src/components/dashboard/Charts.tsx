import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction } from '@/types/transaction';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = [
  'hsl(165, 60%, 40%)',
  'hsl(200, 80%, 50%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 72%, 51%)',
  'hsl(280, 60%, 50%)',
  'hsl(120, 50%, 45%)',
  'hsl(220, 70%, 55%)',
  'hsl(340, 70%, 50%)',
];

export default function Charts({ transactions }: ChartsProps) {
  // Category breakdown (expenses only)
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const byCategory: Record<string, number> = {};
    
    expenses.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] || 0) + Number(t.amount);
    });

    return Object.entries(byCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [transactions]);

  // Monthly data
  const monthlyData = useMemo(() => {
    const byMonth: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach(t => {
      const monthKey = format(parseISO(t.date), 'yyyy-MM');
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        byMonth[monthKey].income += Number(t.amount);
      } else {
        byMonth[monthKey].expense += Number(t.amount);
      }
    });

    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, data]) => ({
        month: format(new Date(month + '-01'), 'MMM', { locale: ptBR }),
        receitas: data.income,
        despesas: data.expense,
      }));
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
    }).format(value);
  };

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Pie Chart */}
      <Card className="shadow-elegant animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <p>Nenhuma despesa registrada</p>
            </div>
          ) : (
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--card))',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex-1 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate flex-1">{item.name}</span>
                    <span className="text-muted-foreground font-medium">
                      {((item.value / totalExpenses) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Bar Chart */}
      <Card className="shadow-elegant animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
        <CardHeader>
          <CardTitle>Evolução Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <p>Nenhuma transação registrada</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} barGap={8}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => formatCurrency(value)}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="receitas" 
                  fill="hsl(145, 60%, 42%)" 
                  radius={[4, 4, 0, 0]}
                  name="Receitas"
                />
                <Bar 
                  dataKey="despesas" 
                  fill="hsl(0, 72%, 51%)" 
                  radius={[4, 4, 0, 0]}
                  name="Despesas"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
