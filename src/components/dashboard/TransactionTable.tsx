import { useMemo, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Transaction } from '@/types/transaction';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export default function TransactionTable({ transactions, onDelete }: TransactionTableProps) {
  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const months = useMemo(() => {
    const uniqueMonths = [...new Set(
      transactions.map(t => format(parseISO(t.date), 'yyyy-MM'))
    )].sort().reverse();
    return uniqueMonths;
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesMonth = monthFilter === 'all' || 
        format(parseISO(t.date), 'yyyy-MM') === monthFilter;
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      return matchesMonth && matchesType;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, monthFilter, typeFilter]);

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, page]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMM, yyyy", { locale: ptBR });
  };

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), "MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <Card className="shadow-elegant animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          Histórico de Transações
        </CardTitle>

        <div className="flex items-center gap-3">
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os meses</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month}>
                  {formatMonthLabel(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Receitas</SelectItem>
              <SelectItem value="expense">Despesas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {paginatedTransactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Nenhuma transação encontrada</p>
            <p className="text-sm mt-1">Adicione sua primeira transação clicando no botão acima</p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px]">Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="group">
                      <TableCell>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          transaction.type === 'income' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.description || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${
                        transaction.type === 'income' ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(Number(transaction.amount))}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. A transação será permanentemente removida.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => onDelete(transaction.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {((page - 1) * ITEMS_PER_PAGE) + 1} a {Math.min(page * ITEMS_PER_PAGE, filteredTransactions.length)} de {filteredTransactions.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm px-3">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
