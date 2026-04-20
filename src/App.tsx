/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp,
  Menu,
  X,
  Send,
  Mail,
  Share2,
  Instagram,
  ChevronDown,
  Search,
  ArrowUp,
  Sun,
  Moon,
  UserPlus,
  Settings2,
  PlayCircle
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent, memo, useRef } from "react";
import { supabase } from "./lib/supabase";

const logo = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/logo.png";
const imgPainel = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/painel.png";
const imgMetas = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/metas.png";
const imgProjecoes = "/projecoes.png";
const imgTelaInicial = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/tela%20inicial.png";
const imgTutorial = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/tutorial.png";
const imgCriarConta = "https://clkqilqqpqybnrpieqyo.supabase.co/storage/v1/object/public/assets/criar%20conta.png";

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato de ${name} - Controle Fácil`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:comercial@appcontrolefacil.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 blur-[80px] rounded-full" />
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-text-muted hover:text-brand-accent transition-colors z-10">
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-8">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6">
            <Mail className="w-6 h-6 text-brand-accent" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">Falar com Consultor</h2>
          <p className="text-brand-text-muted">Envie sua mensagem ou contate-nos diretamente em <span className="text-brand-accent font-medium">comercial@appcontrolefacil.com</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-bold text-brand-text-muted mb-2">Seu Nome</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors"
              placeholder="Como podemos te chamar?"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-bold text-brand-text-muted mb-2">Mensagem</label>
            <textarea 
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 focus:border-brand-accent outline-none transition-colors resize-none"
              placeholder="Em que podemos te ajudar?"
            />
          </div>
          <button type="submit" className="cta-btn w-full bg-brand-accent text-white py-4 flex items-center justify-center gap-2 hover:opacity-90">
            Enviar Mensagem
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const FeatureCard = memo(({ icon: Icon, title, description, className = "", label = "" }: { icon: any, title: string, description: string, className?: string, label?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    viewport={{ once: true }}
    className={`bento-card group cursor-default ${className}`}
  >
    <div>
      {label && <div className="text-[11px] uppercase tracking-widest text-brand-accent mb-2 font-bold">{label}</div>}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-brand-text-muted leading-relaxed text-sm">{description}</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <div className="w-10 h-10 rounded-lg bg-brand-glass flex items-center justify-center border border-brand-border group-hover:border-brand-accent transition-colors">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex items-end gap-1 h-8">
        {[40, 60, 85, 70, 95, 50, 65].map((h, i) => (
          <div key={i} className={`w-1 rounded-t-sm bg-brand-border ${i % 2 === 0 ? 'bg-brand-accent/40' : ''}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  </motion.div>
));

const NavLink = memo(({ href, children }: { href: string, children: ReactNode }) => (
  <a href={href} className="text-[13px] font-semibold uppercase tracking-widest text-brand-text-muted hover:text-brand-accent transition-colors duration-300">
    {children}
  </a>
));

const ResponsiveImage = memo(({ 
  src, 
  alt, 
  className, 
  loading = "lazy",
  priority = false
}: { 
  src: string, 
  alt: string, 
  className?: string,
  loading?: "lazy" | "eager",
  priority?: boolean
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
    
    // Safety timeout to force show image after 2 seconds
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-brand-surface/30 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
           <div className="w-8 h-8 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin" />
        </div>
      )}
      <motion.img 
        ref={imgRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        src={src} 
        alt={alt} 
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        // @ts-ignore
        fetchPriority={priority ? "high" : "auto"}
        className={`${className} w-full h-auto block`}
      />
    </div>
  );
});

const DetailedFeature = memo(({ 
  title, 
  description, 
  image, 
  reverse = false 
}: { 
  title: string, 
  description: string, 
  image: string, 
  reverse?: boolean 
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Controle Fácil - ${title}`,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 py-16 md:py-24`}>
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">{title}</h3>
        <p className="text-brand-text-muted text-lg leading-relaxed mb-8">{description}</p>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-accent hover:text-white transition-colors group"
        >
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Compartilhar Recurso
        </button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex-1 w-full"
      >
        <div className="glass rounded-[2rem] overflow-hidden shadow-2xl border border-brand-border/50 group relative min-h-[300px] flex items-center justify-center bg-brand-surface/50">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <ResponsiveImage 
            src={image} 
            alt={title} 
            loading="lazy"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
});

const FAQItem = memo(({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="border-b border-brand-border/50 last:border-0"
    >
      <button 
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none focus:text-brand-accent"
      >
        <span className="text-lg font-bold group-hover:text-brand-accent transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-text-muted transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brand-text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const ComparisonSection = memo(() => (
  <section className="py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <div className="badge">Eficiência</div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Controle Fácil vs. Planilhas</h2>
      <p className="text-brand-text-muted max-w-2xl mx-auto">
        Por que abandonar o Excel e migrar para uma solução dedicada e inteligente?
      </p>
    </div>

    <div className="glass rounded-[2.5rem] overflow-hidden border border-brand-border/50">
      <div className="grid grid-cols-3 bg-brand-accent/5 border-b border-brand-border">
        <div className="p-6 font-bold text-[10px] uppercase tracking-widest opacity-50">Recurso</div>
        <div className="p-6 font-bold text-[10px] uppercase tracking-widest text-center">Planilhas (Excel/Google)</div>
        <div className="p-6 font-bold text-[10px] uppercase tracking-widest text-center text-brand-accent">Controle Fácil</div>
      </div>
      
      {[
        { feature: "Lançamentos", excel: "Manual e demorado", app: "Rápido e intuitivo" },
        { feature: "Relatórios", excel: "Exige fórmulas complexas", app: "Automáticos e visuais" },
        { feature: "Acesso Mobile", excel: "Difícil de visualizar/editar", app: "100% Responsivo" },
        { feature: "Segurança", excel: "Fácil de perder ou corromper", app: "Nuvem com backup diário" },
        { feature: "Previsibilidade", excel: "Difícil de projetar", app: "Fluxo de caixa de 12 meses" },
        { feature: "Suporte", excel: "Você está por conta própria", app: "Equipe dedicada via e-mail" }
      ].map((item, i) => (
        <div key={i} className="grid grid-cols-3 border-b border-brand-border/30 last:border-0 hover:bg-brand-accent/5 transition-colors">
          <div className="p-6 font-semibold text-sm flex items-center text-[var(--text-main)]">{item.feature}</div>
          <div className="p-6 text-sm text-brand-text-muted text-center border-x border-brand-border/30 flex items-center justify-center">{item.excel}</div>
          <div className="p-6 text-sm font-medium text-center flex items-center justify-center gap-2 text-[var(--text-main)]">
            <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
            {item.app}
          </div>
        </div>
      ))}
    </div>
  </section>
));

const HowItWorks = memo(() => (
  <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <div className="badge">Passo a Passo</div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Como começar sua transformação</h2>
      <p className="text-brand-text-muted max-w-2xl mx-auto">
        Em menos de 5 minutos você já terá uma visão clara das suas finanças.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
      {[
        { 
          icon: UserPlus, 
          title: "1. Cadastro Rápido", 
          desc: "Crie sua conta em segundos usando seu e-mail. Sem burocracia e pronto para usar.",
          image: imgCriarConta
        },
        { 
          icon: Settings2, 
          title: "2. Perfil Profissional", 
          desc: "Configure os dados da sua atividade para personalizar o sistema para sua realidade de negócio.",
          image: imgTelaInicial
        },
        { 
          icon: PlayCircle, 
          title: "3. Tutorial Guiado", 
          desc: "Após a conclusão do cadastro você é direcionado ao tutorial, para entender as principais funcionalidades na prática.",
          image: imgTutorial
        }
      ].map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          transition={{ 
            delay: i * 0.2,
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          className="relative z-10 flex flex-col items-center text-center group cursor-default"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-brand-surface border border-brand-border flex items-center justify-center mb-8 group hover:border-brand-accent transition-all duration-500 shadow-xl">
            <step.icon className="w-8 h-8 text-brand-accent group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-xl font-bold mb-4">{step.title}</h3>
          <p className="text-brand-text-muted leading-relaxed mb-8">{step.desc}</p>
          
          {step.image && (
            <motion.div 
              whileHover={{ y: -10 }}
              className="rounded-2xl overflow-hidden border border-brand-border shadow-2xl bg-brand-surface"
            >
              <img 
                src={step.image} 
                alt={step.title} 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover" 
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  </section>
));

const PricingCard = memo(({ 
  title, 
  price, 
  subtitle, 
  features, 
  buttonText, 
  footerText, 
  highlight = false,
  accentColor = "border-brand-border"
}: { 
  title: string, 
  price: string, 
  subtitle: string, 
  features: { text: string, included: boolean, icon?: any }[], 
  buttonText: string, 
  footerText: string, 
  highlight?: boolean,
  accentColor?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: highlight ? 1.06 : 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    viewport={{ once: true }}
    className={`flex flex-col rounded-3xl overflow-hidden border ${highlight ? 'border-brand-accent z-10 shadow-2xl shadow-brand-accent/10' : 'border-brand-border'} glass h-full transition-all duration-500`}
  >
    <div className={`p-8 text-center border-b border-brand-border ${highlight ? 'bg-brand-accent/10' : 'bg-white/5'}`}>
      <h3 className={`text-sm font-bold mb-4 uppercase tracking-[0.2em] ${highlight ? 'text-brand-accent' : 'text-brand-text-muted'}`}>{title}</h3>
      <div className="text-4xl font-bold mb-2">{price}</div>
      <div className="text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">{subtitle}</div>
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((f, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm transition-opacity duration-300 ${f.included ? 'opacity-100' : 'opacity-30 line-through'}`}>
            {f.icon ? <f.icon className={`w-5 h-5 shrink-0 ${f.included ? 'text-brand-accent' : 'opacity-20'}`} /> : <CheckCircle2 className={`w-5 h-5 shrink-0 ${f.included ? 'text-brand-accent' : 'opacity-20'}`} />}
            <span className="leading-tight">{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <a 
          href="https://controlefacil.base44.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`cta-btn w-full py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 inline-block text-center ${highlight ? 'bg-brand-accent text-white hover:opacity-90' : 'bg-[var(--text-main)] text-brand-bg hover:opacity-90'}`}
        >
          {buttonText}
        </a>
        <p className="text-[9px] text-center mt-4 text-brand-text-muted uppercase tracking-widest font-bold opacity-60">
          {footerText}
        </p>
      </div>
    </div>
  </motion.div>
));

const FAQ_DATA = [
  {
    question: "O sistema serve para qualquer negócio?",
    answer: "Sim, é adaptável e personalizável. Funciona para microempreendedores, autônomos, prestadores de serviço, produtores artesanais, advogados e donos de pequenos comércios."
  },
  {
    question: "Posso usar sem nota fiscal?",
    answer: "Sim, você pode registrar qualquer gasto ou entrada de dinheiro. Não há exigência de documentos fiscais, tornando o controle mais simples e prático."
  },
  {
    question: "Como cancelo?",
    answer: "Basta acessar a área 'Cancelar Assinatura' no menu lateral dentro da plataforma. O cancelamento é simples e pode ser feito a qualquer momento, sem multas."
  },
  {
    question: "O ControleFácil substitui um sistema fiscal ou um escritório de contabilidade?",
    answer: "Não, o ControleFácil não tem fins fiscais ou contábeis. Ele foi criado para ajudar você a entender melhor como o dinheiro entra e sai do seu negócio, de forma simples, como um caderno digital inteligente."
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. Utilizamos criptografia de ponta a ponta e servidores seguros para garantir que suas informações financeiras estejam sempre protegidas e acessíveis apenas por você."
  },
  {
    question: "Posso acessar pelo celular?",
    answer: "Com certeza! O Controle Fácil é totalmente responsivo e funciona perfeitamente no seu smartphone, tablet ou computador, sem precisar instalar nada."
  },
  {
    question: "Existe suporte em caso de dúvidas?",
    answer: "Sim, oferecemos suporte para todos os nossos clientes. Você pode tirar suas dúvidas ou solicitar ajuda enviando um e-mail para nossa equipe de atendimento."
  },
  {
    question: "Posso exportar meus dados?",
    answer: "Sim, você pode exportar seus relatórios e lançamentos para planilhas de Excel (CSV) a qualquer momento, facilitando a integração com outras ferramentas ou envio para seu contador."
  },
  {
    question: "Existe limite de lançamentos?",
    answer: "Nos planos pagos (Básico e Premium), não há limite de lançamentos. No plano Grátis, você tem acesso às funcionalidades essenciais para começar sua organização."
  },
  {
    question: "Como funciona o período de teste?",
    answer: "Oferecemos 30 dias de teste grátis nos planos pagos. Você pode explorar todas as funcionalidades e, se não estiver satisfeito, cancelar antes da primeira cobrança."
  },
  {
    question: "Preciso instalar algum software?",
    answer: "Não. O Controle Fácil é uma plataforma 100% online (SaaS). Você acessa diretamente pelo seu navegador preferido, garantindo praticidade e segurança."
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Por se tratar de uma assinatura recorrente, no momento aceitamos pagamentos exclusivamente via cartão de crédito através do Mercado Pago, garantindo que seu acesso nunca seja interrompido."
  },
  {
    question: "O que acontece se houver atraso no pagamento?",
    answer: "Caso haja algum problema no processamento do pagamento, oferecemos uma tolerância de 10 dias para regularização. Se o pagamento não for confirmado após esse período, sua assinatura será automaticamente transformada no Plano Grátis, e você perderá o acesso às funcionalidades exclusivas dos planos pagos."
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleFaqs, setVisibleFaqs] = useState(6);
  const [faqSearch, setFaqSearch] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const filteredFaqs = FAQ_DATA.filter(faq => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  useEffect(() => {
    // Test Supabase connection
    const testSupabase = async () => {
      try {
        const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
          console.warn('Supabase Connection Status:', error.message);
        } else {
          console.log('Supabase Connected Successfully');
        }
      } catch (err) {
        console.error('Supabase Setup Error:', err);
      }
    };
    testSupabase();

    // Apply theme to document
    document.documentElement.classList.toggle("light", theme === "light");
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
      setShowFloatingCTA(window.scrollY > 600);
      
      // Infinite scroll logic for FAQ
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        const rect = faqSection.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight + 100 && visibleFaqs < FAQ_DATA.length) {
          setVisibleFaqs(prev => Math.min(prev + 3, FAQ_DATA.length));
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleFaqs, theme]);

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-white overflow-x-hidden flex flex-col relative">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-white/5 blur-[100px] rounded-full" />
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center border-b border-brand-border ${isScrolled ? "bg-brand-bg/60 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-brand-accent/10 border border-brand-border">
              <ResponsiveImage 
                src={logo} 
                alt="ControleFácil Logo" 
                className="w-full h-full object-cover" 
                loading="eager"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">Controle<span className="text-brand-accent">Fácil</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Soluções</NavLink>
            <NavLink href="#how-it-works">Como Funciona</NavLink>
            <NavLink href="#about">Segurança</NavLink>
            <NavLink href="#pricing">Planos</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-brand-glass border border-brand-border flex items-center justify-center hover:border-brand-accent transition-colors"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="cta-btn bg-[var(--text-main)] text-brand-bg hover:opacity-90"
            >
              Falar com Consultor
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 md:hidden"
        >
          <nav className="flex flex-col gap-8 text-center">
            <a href="#features" className="text-lg uppercase tracking-widest font-bold" onClick={() => setMobileMenuOpen(false)}>Soluções</a>
            <a href="#how-it-works" className="text-lg uppercase tracking-widest font-bold" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
            <a href="#about" className="text-lg uppercase tracking-widest font-bold" onClick={() => setMobileMenuOpen(false)}>Segurança</a>
            <a href="#pricing" className="text-lg uppercase tracking-widest font-bold" onClick={() => setMobileMenuOpen(false)}>Planos</a>
            <a href="#faq" className="text-lg uppercase tracking-widest font-bold" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <button 
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="cta-btn bg-[var(--text-main)] text-brand-bg w-full py-4 text-lg"
            >
              Falar com Consultor
            </button>
            <button 
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-3 text-brand-text-muted font-bold uppercase tracking-widest"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              Alternar Tema
            </button>
          </nav>
        </motion.div>
      )}

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="badge"
            >
              Software Financeiro Premium
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif font-bold leading-[0.95] tracking-tighter mb-8 text-[var(--text-main)]"
            >
              Gestão Financeira Inteligente para sua Empresa.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-brand-text-muted mb-10 leading-relaxed"
            >
              A clareza que sua pequena empresa precisa para crescer com segurança. Linguagem direta, resultados reais.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-4 mb-6">
                <a 
                  href="https://controlefacil.base44.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-btn bg-brand-accent text-white hover:opacity-90 inline-block text-center"
                >
                  Criar Conta Grátis
                </a>
                <a 
                  href="https://youtu.be/u2ZltzQXz0I" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-btn border border-brand-border text-white hover:bg-brand-glass inline-block text-center"
                >
                  Ver Demonstração
                </a>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 relative group"
              >
                {/* Animated Gradient Border */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-accent/0 via-brand-accent/50 to-brand-accent/0 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                
                <div className="relative glass py-4 px-6 rounded-2xl border border-brand-accent/40 bg-brand-accent/10 flex items-center gap-4 overflow-hidden">
                  {/* Subtle moving light effect */}
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 skew-x-12 pointer-events-none"
                  />
                  
                  <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-brand-accent animate-bounce" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed font-medium">
                    Temos tanta certeza da transformação que o Controle Fácil trará para sua empresa, que oferecemos <span className="text-brand-accent font-bold underline decoration-brand-accent/30 underline-offset-4">30 dias de acesso total grátis</span>. <span className="hidden sm:inline">Comece agora e comprove a diferença.</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 h-full">
            <FeatureCard 
              className="row-span-2"
              label="Fluxo de Caixa"
              icon={BarChart3}
              title="Previsibilidade de 12 meses."
              description="Saiba exatamente para onde cada centavo está indo."
            />
            <FeatureCard 
              label="Inteligência"
              icon={Zap}
              title="Relatórios"
              description="Organização impecável."
            />
            <FeatureCard 
              label="Segurança"
              icon={ShieldCheck}
              title="Criptografia"
              description="Sistemas Operacionais."
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative border-y border-brand-border">
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-20">
              <div className="badge">Recursos</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Tudo o que você precisa.</h2>
              <p className="text-brand-text-muted max-w-2xl mx-auto">Criamos uma interface que qualquer pessoa consegue entender, sem precisar de um MBA em finanças.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={BarChart3}
                title="Relatórios Visuais"
                description="Gráficos que contam a história do seu dinheiro de forma clara."
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="Segurança Bancária"
                description="Seus dados protegidos com criptografia de ponta a ponta."
              />
              <FeatureCard 
                icon={Users}
                title="Gestão de Equipe"
                description="Controle acessos e permissões de forma simples."
              />
            </div>

            {/* Detailed Features */}
            <div className="mt-32 space-y-12">
              <DetailedFeature 
                title="Painel Dashboard"
                description="Você terá o resumo de suas operações com diversas dicas e análises detalhadas para tomar as melhores decisões para o seu negócio."
                image={imgPainel}
              />
              <DetailedFeature 
                reverse
                title="Metas Financeiras"
                description="Crie metas personalizadas para investimentos e reduções de gastos. Acompanhe o progresso em tempo real diretamente no seu painel principal."
                image={imgMetas}
              />
              <DetailedFeature 
                title="Projeções Financeiras"
                description="Com base em seus dados históricos, acompanhe a projeção do seu saldo futuro e avalie a melhor maneira de gerir seus resultados a longo prazo."
                image={imgProjecoes}
              />
            </div>
          </div>
        </section>

        <ComparisonSection />

        <HowItWorks />

        {/* About Section */}
        <section id="about" className="py-32 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Simplificando a vida do empreendedor.
            </h2>
            <p className="text-brand-text-muted mb-8 leading-relaxed text-lg">
              Sabemos que gerir uma pequena empresa é um desafio constante. Por isso, eliminamos a complexidade desnecessária dos softwares financeiros tradicionais.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Interface limpa e livre de distrações",
                "Suporte humanizado em português",
                "Gestão de fluxo de caixa simplificada",
                "Relatórios visuais intuitivos"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-border">
            <ResponsiveImage 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1974" 
              alt="Equipe Controle Fácil trabalhando em gestão financeira inteligente" 
              loading="lazy"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="badge">Nossos Planos</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Escolha o plano ideal <br />para o seu negócio.</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto">Transparência total, sem taxas escondidas ou contratos complicados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <PricingCard 
              title="Plano Grátis"
              price="R$ 0"
              subtitle="Sempre grátis"
              features={[
                { text: "Dashboard básico", included: true },
                { text: "Lançamento de entradas", included: true },
                { text: "Lançamento de gastos", included: true },
                { text: "Saldo em tempo real", included: true },
                { text: "Relatórios avançados", included: false },
                { text: "Exportação para planilha", included: false },
              ]}
              buttonText="Começar Grátis"
              footerText="Sem cartão de crédito"
            />
            <PricingCard 
              title="Plano Básico"
              price="R$ 49,90"
              subtitle="Por mês"
              features={[
                { text: "Controle de entradas e saídas", included: true },
                { text: "Relatórios básicos", included: true },
                { text: "Painel de controle", included: true },
                { text: "Exportação para planilha", included: true },
                { text: "30 dias grátis (trial)", included: true },
                { text: "Cancelamento a qualquer momento", included: true },
              ]}
              buttonText="Começar Teste Grátis"
              footerText="Pagamento seguro pelo Mercado Pago"
            />
            <PricingCard 
              highlight
              title="Plano Premium"
              price="R$ 99,90"
              subtitle="Por mês"
              features={[
                { text: "Projeções Financeiras Inteligentes", included: true, icon: TrendingUp },
                { text: "Orçamentos Dinâmicos com IA", included: true, icon: Zap },
                { text: "Análise de Metas Financeiras", included: true, icon: ShieldCheck },
                { text: "Relatórios Personalizados Avançados", included: true, icon: BarChart3 },
                { text: "Todas as funcionalidades do básico", included: true },
                { text: "30 dias grátis (trial)", included: true },
                { text: "Cancelamento a qualquer momento", included: true },
              ]}
              buttonText="Assinar Premium →"
              footerText="Pagamento seguro pelo Mercado Pago"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="badge">Dúvidas Frequentes</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Perguntas Comuns</h2>
            <p className="text-brand-text-muted mb-10">Tudo o que você precisa saber sobre o Controle Fácil.</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
              <input 
                type="text" 
                placeholder="Buscar dúvida..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-brand-glass border border-brand-border rounded-2xl py-4 pl-12 pr-4 focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-brand-border/50">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.slice(0, visibleFaqs).map((faq, index) => (
                  <FAQItem 
                    key={faq.question}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <p className="text-brand-text-muted">Nenhuma pergunta encontrada para sua busca.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {visibleFaqs < filteredFaqs.length && (
              <div className="mt-8 text-center">
                <p className="text-brand-text-muted text-sm animate-pulse">Role para ver mais dúvidas...</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 relative z-10">
              Pronto para ter o controle total?
            </h2>
            <p className="text-brand-text-muted text-lg mb-12 max-w-xl mx-auto relative z-10">
              Junte-se a mais de 2.000 pequenas empresas que simplificaram suas finanças com o Controle Fácil.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a 
                href="https://controlefacil.base44.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-btn bg-brand-accent text-white px-12 py-5 text-lg inline-block text-center"
              >
                Começar Agora
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="cta-btn border border-brand-border text-white px-12 py-5 text-lg hover:bg-brand-glass"
              >
                Falar com Consultor
              </button>
            </div>
            
            <div className="mt-16 pt-16 border-t border-brand-border/30 relative z-10">
              <p className="text-sm uppercase tracking-[0.2em] font-bold text-brand-text-muted mb-6">Siga no Instagram para ver mais</p>
              <a 
                href="https://www.instagram.com/_controlefacil/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif font-bold hover:text-brand-accent transition-colors group"
              >
                <Instagram className="w-8 h-8 text-brand-accent group-hover:scale-110 transition-transform" />
                @_controlefacil
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-brand-border bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[11px] text-brand-text-muted uppercase tracking-widest font-bold">
            Copyright 2026 Micro Saas Financeiro | ControleFácil • Desenvolvido por ASdzign
          </div>
          <div className="flex items-center gap-8 text-[11px] text-brand-text-muted uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-brand-accent transition-colors">Acessibilidade</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:left-auto md:right-24 md:translate-x-0"
          >
            <a
              href="https://controlefacil.base44.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-accent text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-brand-accent/40 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 group whitespace-nowrap"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-brand-accent text-white shadow-2xl shadow-brand-accent/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-label="Voltar ao início"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
