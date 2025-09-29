import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  Bot,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Database,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';
// --- Helper Components ---
const Logo = () => (
  <a href="#" className="flex items-center space-x-2">
    <Bot className="h-8 w-8 text-primary" />
    <span className="text-2xl font-bold font-display tracking-tighter text-foreground">
      AetherAI
    </span>
  </a>
);
const navLinks = [
  { id: 'services', title: 'Services' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
];
// --- Main Page Component ---
export function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="bg-background text-foreground font-sans antialiased">
      <Header isScrolled={isScrolled} onNavLinkClick={handleNavLinkClick} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer onNavLinkClick={handleNavLinkClick} />
    </div>
  );
}
// --- Section Components ---
const Header = ({ isScrolled, onNavLinkClick, isMobileMenuOpen, setIsMobileMenuOpen }: { isScrolled: boolean; onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void; isMobileMenuOpen: boolean; setIsMobileMenuOpen: (isOpen: boolean) => void; }) => (
  <header
    className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
    )}
  >
    <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />
      <nav className="hidden items-center space-x-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => onNavLinkClick(e, link.id)}
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {link.title}
          </a>
        ))}
      </nav>
      <div className="hidden md:block">
        <Button asChild>
          <a href="#contact" onClick={(e) => onNavLinkClick(e, 'contact')}>
            Get In Touch <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-4">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-1 flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => onNavLinkClick(e, link.id)}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
              <Button asChild size="lg" className="w-full">
                <a href="#contact" onClick={(e) => onNavLinkClick(e, 'contact')}>
                  Get In Touch
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);
const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
const HeroSection = () => (
  <section className="relative overflow-hidden py-32 md:py-48">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_40%)]"
      />
    </div>
    <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl md:text-8xl">
          Intelligence, <span className="text-primary">Amplified.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          AetherAI partners with visionary companies to build transformative AI solutions, turning complex challenges into competitive advantages.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#contact">
              Schedule a Consultation
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">
              Explore Our Services <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
const services = [
  {
    icon: BrainCircuit,
    title: 'Custom AI Solutions',
    description: 'We design and build bespoke AI models and systems tailored to your unique business needs and data.',
  },
  {
    icon: Database,
    title: 'Data Strategy & Engineering',
    description: 'Unlock the value of your data with robust pipelines, modern infrastructure, and strategic insights.',
  },
  {
    icon: Cpu,
    title: 'MLOps & Deployment',
    description: 'We ensure your AI models are scalable, reliable, and seamlessly integrated into your production environment.',
  },
];
const ServicesSection = () => (
  <section id="services" className="bg-secondary py-24 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From strategy to deployment, we provide end-to-end AI services to accelerate your innovation.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="rounded-lg bg-primary p-3">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);
const AboutSection = () => (
  <section id="about" className="py-24 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Mission
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            "To empower organizations with state-of-the-art artificial intelligence, fostering innovation and driving measurable growth. We believe in a future where intelligent technology is an accessible, ethical, and powerful force for good in every industry."
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);
const ContactSection = () => {
  // The state logic is no longer needed for a simple mailto form,
  // but we preserve the structure to avoid breaking changes.
  // A real implementation would use a form submission service.
  const [status, setStatus] = useState('');

  return (
    <section id="contact" className="bg-secondary py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let's Build Together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind or just want to learn more? We'd love to hear from you.
            </p>
          </div>
          <Card className="mx-auto mt-16 max-w-xl">
            <CardContent className="p-6 sm:p-8">
              <form
                action="mailto:contact@aetherai.example.com"
                method="POST"
                encType="text/plain"
                className="space-y-6"
              >
                <div>
                  <Input type="text" name="name" id="name" placeholder="Your Name" required />
                </div>
                <div>
                  <Input type="email" name="email" id="email" placeholder="Your Email" required />
                </div>
                <div>
                  <Textarea name="message" id="message" rows={4} placeholder="Your Message" required />
                </div>
                <div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};
const Footer = ({ onNavLinkClick }: { onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void; }) => (
  <footer className="bg-background border-t">
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Logo />
          <p className="text-muted-foreground">Intelligence, Amplified.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => onNavLinkClick(e, link.id)}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AetherAI. All rights reserved. Built with ❤️ at Cloudflare.</p>
      </div>
    </div>
  </footer>
);