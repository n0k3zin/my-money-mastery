import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/dashboard/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import Charts from '@/components/dashboard/Charts';
import TransactionTable from '@/components/dashboard/TransactionTable';
import TransactionModal from '@/components/dashboard/TransactionModal';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Transaction, TransactionFormData } from '@/types/transaction';

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch transactions for current user
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user,
  });

  // Add transaction mutation
  const addMutation = useMutation({
    mutationFn: async (data: TransactionFormData) => {
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: data.amount,
          type: data.type,
          category: data.category,
          description: data.description || null,
          date: data.date,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transação adicionada com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao adicionar transação: ' + error.message);
    },
  });

  // Delete transaction mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transação excluída!');
    },
    onError: (error) => {
      toast.error('Erro ao excluir transação: ' + error.message);
    },
  });

  // Get unique categories for the combobox
  const existingCategories = useMemo(() => {
    return [...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  const handleAddTransaction = async (data: TransactionFormData) => {
    await addMutation.mutateAsync(data);
  };

  const handleDeleteTransaction = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Action Button */}
        <div className="flex justify-end">
          <Button variant="hero" onClick={() => setModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Nova Transação
          </Button>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Charts */}
        <Charts transactions={transactions} />

        {/* Transaction History */}
        <TransactionTable 
          transactions={transactions} 
          onDelete={handleDeleteTransaction}
        />
      </main>

      {/* Transaction Modal */}
      <TransactionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleAddTransaction}
        existingCategories={existingCategories}
      />
    </div>
  );
}
