import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  PieChart, 
  Wallet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Controle Total',
    description: 'Gerencie receitas e despesas em um só lugar com interface intuitiva.'
  },
  {
    icon: PieChart,
    title: 'Gráficos Inteligentes',
    description: 'Visualize seus gastos por categoria e acompanhe sua evolução mensal.'
  },
  {
    icon: Shield,
    title: 'Segurança Máxima',
    description: 'Seus dados são criptografados e protegidos com tecnologia de ponta.'
  },
  {
    icon: TrendingUp,
    title: 'Metas Financeiras',
    description: 'Defina objetivos e acompanhe seu progresso rumo à independência.'
  }
];

const benefits = [
  'Cadastro gratuito e sem burocracia',
  'Dados 100% privados e seguros',
  'Acesse de qualquer dispositivo',
  'Relatórios e insights automáticos'
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">FinanceFlow</span>
          </div>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth?mode=signup">
                Criar Conta
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Controle financeiro simplificado
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Organize suas finanças
              <br />
              <span className="text-gradient">de forma inteligente</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Registre suas receitas e despesas, visualize gráficos detalhados e 
              tome decisões financeiras mais conscientes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/auth">
                  Já tenho conta
                </Link>
              </Button>
            </div>
          </div>

          {/* Benefits List */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-0 animate-fade-in stagger-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tudo que você precisa para{' '}
              <span className="text-gradient">controlar suas finanças</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ferramentas poderosas em uma interface simples e elegante
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border/50 shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-1 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                Comece a controlar suas finanças hoje
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro.
              </p>
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 shadow-xl"
                asChild
              >
                <Link to="/auth?mode=signup">
                  Criar minha conta gratuita
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2024 FinanceFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
