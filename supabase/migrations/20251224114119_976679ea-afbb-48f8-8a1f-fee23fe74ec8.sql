-- Create transactions table for financial control
CREATE TABLE public.transactions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL DEFAULT 'Outros',
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (CRITICAL for multi-user isolation)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can only insert their own transactions
CREATE POLICY "Users can insert their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only update their own transactions
CREATE POLICY "Users can update their own transactions"
ON public.transactions
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policy: Users can only delete their own transactions
CREATE POLICY "Users can delete their own transactions"
ON public.transactions
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for better query performance on user_id
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);

-- Create index for date filtering
CREATE INDEX idx_transactions_date ON public.transactions(date);