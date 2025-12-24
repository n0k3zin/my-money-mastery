import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { TransactionFormData, Transaction } from '@/types/transaction';

const DEFAULT_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Investimentos',
  'Salário',
  'Freelance',
  'Outros'
];

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
  existingCategories: string[];
}

export default function TransactionModal({ 
  open, 
  onOpenChange, 
  onSubmit,
  existingCategories 
}: TransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  const allCategories = useMemo(() => {
    const combined = [...new Set([...DEFAULT_CATEGORIES, ...existingCategories])];
    return combined.sort();
  }, [existingCategories]);

  const filteredCategories = useMemo(() => {
    if (!categorySearch) return allCategories;
    return allCategories.filter(cat => 
      cat.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [allCategories, categorySearch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) return;
    if (!category.trim()) return;

    setLoading(true);

    try {
      await onSubmit({
        amount: parseFloat(amount),
        type,
        category: category.trim(),
        description: description.trim(),
        date
      });

      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setType('expense');
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (value: string) => {
    setCategory(value);
    setCategoryOpen(false);
  };

  const handleCreateCategory = () => {
    if (categorySearch.trim()) {
      setCategory(categorySearch.trim());
      setCategoryOpen(false);
      setCategorySearch('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Selection */}
          <div className="space-y-3">
            <Label>Tipo</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as 'income' | 'expense')}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="expense"
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  type === 'expense' 
                    ? "border-destructive bg-destructive/10 text-destructive" 
                    : "border-border hover:border-destructive/50"
                )}
              >
                <RadioGroupItem value="expense" id="expense" className="sr-only" />
                <TrendingDown className="w-5 h-5" />
                <span className="font-medium">Despesa</span>
              </Label>
              <Label
                htmlFor="income"
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  type === 'income' 
                    ? "border-success bg-success/10 text-success" 
                    : "border-border hover:border-success/50"
                )}
              >
                <RadioGroupItem value="income" id="income" className="sr-only" />
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Receita</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-11 text-lg"
            />
          </div>

          {/* Category with Combobox */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="w-full justify-between h-11"
                >
                  {category || "Selecione ou digite..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Buscar ou criar categoria..." 
                    value={categorySearch}
                    onValueChange={setCategorySearch}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <button
                        type="button"
                        onClick={handleCreateCategory}
                        className="w-full p-2 text-left hover:bg-accent rounded-md"
                      >
                        Criar "{categorySearch}"
                      </button>
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredCategories.map((cat) => (
                        <CommandItem
                          key={cat}
                          value={cat}
                          onSelect={() => handleSelectCategory(cat)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category === cat ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {cat}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Adicione uma descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            variant={type === 'income' ? 'success' : 'destructive'}
            className="w-full h-11"
            disabled={loading || !amount || !category}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                {type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                Adicionar {type === 'income' ? 'Receita' : 'Despesa'}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
