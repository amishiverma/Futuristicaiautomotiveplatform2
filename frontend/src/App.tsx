import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { VoiceAgent } from './components/VoiceAgent';
import { ManufacturingInsights } from './components/ManufacturingInsights';
import { Security } from './components/Security';
import { InnovationFeatures } from './components/InnovationFeatures';
import { Button } from './components/ui/button';
import { 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  Factory, 
  Shield, 
  Sparkles,
  Menu,
  X,
  Zap
} from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'voice-agent' | 'manufacturing' | 'security' | 'innovation';

const navigation = [
  { id: 'landing' as Page, label: 'Home', icon: Home },
  { id: 'dashboard' as Page, label: 'Live Dashboard', icon: LayoutDashboard },
  { id: 'voice-agent' as Page, label: 'Voice Agent', icon: MessageSquare },
  { id: 'manufacturing' as Page, label: 'Manufacturing', icon: Factory },
  { id: 'security' as Page, label: 'Security & UEBA', icon: Shield },
  { id: 'innovation' as Page, label: 'Innovation', icon: Sparkles },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'voice-agent':
        return <VoiceAgent />;
      case 'manufacturing':
        return <ManufacturingInsights />;
      case 'security':
        return <Security />;
      case 'innovation':
        return <InnovationFeatures />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setCurrentPage('landing');
                setMobileMenuOpen(false);
              }}
            >
              <div className="relative w-10 h-10">
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                      '0 0 30px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-background" />
                </div>
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AutoAI
                </h1>
                <p className="text-xs text-muted-foreground">Predictive Maintenance</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Button
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    className={`gap-2 ${
                      currentPage === item.id 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navigation.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? 'default' : 'ghost'}
                      className={`w-full justify-start gap-2 ${
                        currentPage === item.id 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[73px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Quick Access Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 255, 0.5)',
              '0 0 40px rgba(0, 255, 255, 0.8)',
              '0 0 20px rgba(0, 255, 255, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => setCurrentPage('voice-agent')}
        >
          <MessageSquare className="w-6 h-6 text-background" />
        </motion.button>
      </motion.div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
