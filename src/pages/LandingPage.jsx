import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Bot,
  Brain,
  ChartLine,
  Check,
  CheckCircle,
  Cloud,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlayCircle,
  Plug,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  User,
  Video,
  Zap,
  Smartphone,
} from "lucide-react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const DEMO_VIDEO_ID = "-M6i2UghyEc8";

const ui = {
  page: "landing-page min-h-screen overflow-x-hidden text-gray-900 [line-height:1.6]",
  container: "mx-auto max-w-[1200px] px-5",
  bgPattern:
    "fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-100 before:absolute before:-right-[200px] before:-top-[200px] before:h-[800px] before:w-[800px] before:animate-[landing-float_20s_ease-in-out_infinite] before:rounded-full before:bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)] after:absolute after:-bottom-[150px] after:-left-[150px] after:h-[600px] after:w-[600px] after:animate-[landing-float_15s_ease-in-out_infinite_reverse] after:rounded-full after:bg-[radial-gradient(circle,rgba(109,40,217,0.08)_0%,transparent_70%)]",
  nav: (scrolled) =>
    cx(
      "fixed left-0 top-0 z-[1000] w-full bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-[10px]",
      scrolled && "bg-white/98 shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
    ),
  navContent: "flex items-center justify-between py-4",
  logo: "flex items-center gap-2 text-2xl font-extrabold text-violet-500 [&_svg]:h-7 [&_svg]:w-7",
  navLinks:
    "hidden gap-8 md:flex [&_a]:cursor-pointer [&_a]:font-semibold [&_a]:text-gray-700 [&_a]:no-underline [&_a]:transition-colors [&_a:hover]:text-violet-500",
  navActions: "hidden gap-4 md:flex",
  mobileMenuButton:
    "block cursor-pointer border-0 bg-transparent text-2xl text-gray-700 md:hidden",
  mobileMenu: (open) =>
    cx(
      "fixed inset-0 z-[999] hidden max-h-screen flex-col overflow-y-auto bg-white px-5 pb-5 pt-[100px]",
      open && "flex",
    ),
  mobileMenuNav:
    "mb-8 flex flex-col gap-6 border-b border-gray-200 pb-8 [&_a]:cursor-pointer [&_a]:font-semibold [&_a]:text-gray-700 [&_a]:no-underline [&_a:hover]:text-violet-600",
  navButtons: "flex flex-col gap-4",
  button:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-0 px-6 py-3 text-base font-semibold no-underline transition-all duration-300",
  primary:
    "bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-[0_4px_6px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(139,92,246,0.4)]",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  outline:
    "border-2 border-violet-500 bg-transparent text-violet-500 hover:bg-violet-500 hover:text-white",
  large:
    "px-8 py-4 text-[1.1rem] max-[480px]:px-6 max-[480px]:py-3.5 max-[480px]:text-base",
  white:
    "bg-white text-violet-500 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]",
  outlineWhite:
    "border-2 border-white bg-transparent text-white hover:bg-white hover:text-violet-500",
  block: "w-full justify-center",
  hero: "flex min-h-screen items-center py-20 pt-[120px]",
  heroContent:
    "hero-content grid grid-cols-1 items-center gap-16 lg:grid-cols-2",
  badge:
    "mb-6 inline-flex animate-[fade-in-up_0.6s_ease-out] items-center gap-2 rounded-[2rem] bg-gradient-to-br from-violet-500/10 to-violet-700/10 px-4 py-2 text-sm font-semibold text-violet-600",
  heroTitle:
    "mb-6 animate-[fade-in-up_0.6s_ease-out_0.1s_backwards] text-[2rem] font-extrabold leading-[1.1] text-gray-900 min-[481px]:text-[2.5rem] lg:text-[3.5rem]",
  gradientText:
    "bg-gradient-to-br from-violet-500 to-violet-700 bg-clip-text text-transparent",
  heroDescription:
    "mb-8 animate-[fade-in-up_0.6s_ease-out_0.2s_backwards] text-xl text-gray-600",
  heroCta:
    "mb-12 flex animate-[fade-in-up_0.6s_ease-out_0.3s_backwards] flex-col gap-4 md:flex-row",
  heroStats:
    "flex animate-[fade-in-up_0.6s_ease-out_0.4s_backwards] flex-col gap-12 md:flex-row",
  stat: "text-center",
  statValue: "block text-3xl font-extrabold text-violet-500",
  statLabel: "text-sm text-gray-600",
  heroImage: "relative animate-[fade-in-up_0.8s_ease-out_0.5s_backwards]",
  floatingCard:
    "absolute z-10 m-0 flex animate-[float-card_3s_ease-in-out_infinite] items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-violet-500 [&_p]:m-0 [&_p]:text-xs [&_p]:text-gray-600 [&_strong]:m-0 [&_strong]:block [&_strong]:text-sm [&_strong]:text-gray-900",
  card1: "left-[-10%] top-[10%]",
  card2: "right-[-10%] top-1/2 [animation-delay:1s]",
  card3: "bottom-[10%] left-0 [animation-delay:2s]",
  heroMockup: "hero-mockup relative z-[5]",
  mockupScreen:
    "rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-transparent",
  mockupHeader:
    "mb-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3",
  mockupDots:
    "flex gap-1.5 [&_span]:h-3 [&_span]:w-3 [&_span]:rounded-full [&_span]:bg-gray-300 dark:[&_span]:bg-gray-600",
  mockupTitle: "text-sm font-semibold text-gray-900 dark:text-white",
  mockupContent: "relative",
  pulseIndicator:
    "absolute right-2.5 top-2.5 h-3 w-3 animate-[landing-pulse_2s_infinite] rounded-full bg-emerald-500 shadow-[0_0_0_0_#10b981]",
  cameraGrid: "grid grid-cols-2 gap-2",
  cameraFeed:
    "relative aspect-video rounded-lg border-2 border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/20",
  cameraFeedActive:
    "border-violet-600 bg-gradient-to-br from-violet-500/30 to-violet-600/30 after:absolute after:right-[5px] after:top-[5px] after:h-2 after:w-2 after:animate-[landing-pulse_1.5s_infinite] after:rounded-full after:bg-red-500",
  section: "py-20",
  whiteSection: "bg-white py-20",
  sectionHeader: "mx-auto mb-16 max-w-[700px] text-center",
  sectionBadge:
    "mb-4 inline-block rounded-[2rem] bg-gradient-to-br from-violet-500/10 to-violet-600/10 px-4 py-2 text-sm font-semibold text-violet-700",
  sectionTitle:
    "mb-4 text-[1.75rem] font-extrabold text-gray-900 min-[481px]:text-[2.5rem]",
  sectionDescription: "text-[1.1rem] text-gray-600",
  demoGrid: "grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.5fr_1fr]",
  videoWrapper: "relative overflow-hidden rounded-2xl",
  videoFrame: "h-full w-full aspect-video border-0",
  videoPlaceholder:
    "flex aspect-video cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/10 transition-all duration-300 hover:border-violet-600 hover:from-violet-500/20 hover:to-blue-500/20 [&_svg]:h-16 [&_svg]:w-16 [&_svg]:text-violet-600 [&_svg]:transition-transform [&_p]:text-2xl [&_p]:font-bold [&_p]:text-gray-900 [&_span]:text-gray-600 hover:[&_svg]:scale-110",
  demoHighlights: "flex flex-col gap-6",
  highlightItem:
    "flex items-start gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:translate-x-2.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]",
  iconBox:
    "flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 text-2xl text-violet-600",
  highlightContent:
    "[&_h4]:mb-2 [&_h4]:text-[1.1rem] [&_h4]:font-bold [&_h4]:text-gray-900 [&_p]:text-[0.95rem] [&_p]:text-gray-600",
  partnersLogos:
    "mb-16 grid grid-cols-1 gap-8 min-[481px]:grid-cols-3 lg:grid-cols-6",
  partnerItem: "flex items-center justify-center",
  partnerBox:
    "flex aspect-[16/10] w-full items-center justify-center rounded-2xl border-2 border-violet-500/10 bg-gradient-to-br from-violet-500/5 to-blue-500/5 font-semibold text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-violet-600 hover:from-violet-500/10 hover:to-blue-500/10",
  partnersStats:
    "grid grid-cols-1 gap-8 min-[481px]:grid-cols-2 lg:grid-cols-4",
  statNumber:
    "bg-gradient-to-br from-violet-600 to-violet-800 bg-clip-text text-[2.5rem] font-extrabold text-transparent",
  statText: "mt-2 text-base text-gray-600",
  featuresGrid: "grid grid-cols-1 gap-8 lg:grid-cols-3",
  featureCard:
    "feature-card rounded-2xl bg-white p-8 shadow-[0_4px_6px_rgba(0,0,0,0.05)] [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_p]:text-gray-600",
  featureIcon:
    "mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-2xl text-2xl",
  featureViolet:
    "bg-gradient-to-br from-violet-500/20 to-violet-600/20 text-violet-600",
  featureBlue:
    "bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-600",
  featureGreen:
    "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-600",
  featureYellow:
    "bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-600",
  featureRed: "bg-gradient-to-br from-red-500/20 to-red-600/20 text-red-600",
  featurePurple:
    "bg-gradient-to-br from-purple-500/20 to-purple-600/20 text-purple-600",
  steps:
    "mx-auto grid max-w-[1180px] grid-cols-1 items-center justify-items-center gap-8 lg:grid-cols-[minmax(260px,1fr)_120px_minmax(260px,1fr)_120px_minmax(260px,1fr)]",
  step: "w-full max-w-[320px] text-center",
  stepNumber:
    "mb-4 bg-gradient-to-br from-violet-600 to-violet-800 bg-clip-text text-5xl font-extrabold text-transparent",
  stepIcon:
    "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-3xl text-white",
  stepContent:
    "[&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:text-gray-900 [&_p]:text-gray-600",
  stepConnector:
    "relative flex h-16 w-full items-center justify-center lg:h-auto lg:flex-col lg:justify-center lg:gap-0",
  stepArrow:
    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/30 animate-[landing-pulse_2.5s_ease-in-out_infinite]",
  pricingCards:
    "mx-auto grid max-w-[1100px] grid-cols-1 gap-8 lg:grid-cols-3 items-start",
  pricingCard:
    "pricing-card relative rounded-3xl bg-white p-10 shadow-[0_4px_6px_rgba(0,0,0,0.05)]",
  pricingFeatured:
    "featured scale-100 bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-[0_20px_40px_rgba(139,92,246,0.3)] lg:scale-105",
  popularBadge:
    "absolute left-1/2 top-[-15px] -translate-x-1/2 rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-500 px-6 py-2 text-sm font-bold text-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]",
  pricingHeader:
    "[&_h3]:mb-2 [&_h3]:text-[1.75rem] [&_p]:mb-6 [&_p]:text-sm [&_p]:opacity-80",
  pricingPrice: "mb-8 flex items-baseline gap-1",
  currency: "text-2xl font-semibold",
  amount: "text-6xl font-extrabold",
  period: "text-xl opacity-70",
  amountCustom: "text-[2.5rem] font-extrabold",
  pricingFeatures:
    "mb-8 list-none [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0 [&_svg]:text-emerald-600 [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:border-b [&_li]:border-black/5 [&_li]:py-3",
  pricingFeaturesFeatured: "[&_svg]:text-emerald-200 [&_li]:border-white/10",
  testimonialsGrid: "grid grid-cols-1 gap-8 lg:grid-cols-3",
  testimonialCard: "testimonial-card rounded-2xl bg-gray-50 p-8",
  testimonialStars: "mb-4 text-amber-400",
  testimonialText: "mb-6 italic leading-[1.7] text-gray-700",
  testimonialAuthor: "flex items-center gap-4",
  authorAvatar:
    "flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-2xl text-white",
  authorInfo:
    "[&_span]:text-sm [&_span]:text-gray-600 [&_strong]:mb-1 [&_strong]:block [&_strong]:text-gray-900",
  cta: "bg-gradient-to-br from-violet-600 to-violet-800 py-20 text-center text-white",
  ctaContent:
    "[&_h2]:mb-4 [&_h2]:text-[2.5rem] [&_h2]:font-extrabold [&_p]:mb-8 [&_p]:text-xl [&_p]:opacity-90",
  ctaButtons: "flex flex-col justify-center gap-4 min-[481px]:flex-row",
  contactGrid: "grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr]",
  contactInfo:
    "[&_h2]:mb-4 [&_h2]:text-[2.5rem] [&_h2]:text-gray-900 [&_p]:mb-8 [&_p]:text-gray-600",
  contactMethods: "flex flex-col gap-6",
  contactMethod:
    "flex items-center gap-4 [&_a]:text-gray-600 [&_a]:no-underline [&_a:hover]:text-violet-600 [&>svg]:h-[50px] [&>svg]:w-[50px] [&>svg]:rounded-xl [&>svg]:bg-gradient-to-br [&>svg]:from-violet-500/20 [&>svg]:to-violet-600/20 [&>svg]:p-3.5 [&>svg]:text-violet-600 [&_span]:text-gray-600 [&_strong]:mb-1 [&_strong]:block [&_strong]:text-gray-900",
  contactFormWrapper:
    "rounded-3xl bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
  contactForm: "grid grid-cols-1 gap-6 min-[481px]:grid-cols-2",
  formGroup:
    "flex flex-col [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-gray-200 [&_input]:p-3 [&_input]:text-base [&_input]:transition-colors [&_input:focus]:border-violet-600 [&_input:focus]:outline-none [&_label]:mb-2 [&_label]:font-semibold [&_label]:text-gray-700 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-gray-200 [&_textarea]:p-3 [&_textarea]:text-base [&_textarea]:transition-colors [&_textarea:focus]:border-violet-600 [&_textarea:focus]:outline-none",
  fullWidth: "col-span-full",
  footer: "bg-gray-900 py-5 pt-[60px] text-white",
  footerContent:
    "mb-12 grid grid-cols-1 gap-12 min-[481px]:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]",
  footerLogo:
    "mb-4 flex items-center gap-2 text-2xl font-extrabold [&_svg]:h-7 [&_svg]:w-7 [&_svg]:text-violet-400",
  footerSection:
    "[&_h4]:mb-4 [&_h4]:text-[1.1rem] [&_li]:mb-3 [&_p]:mb-6 [&_p]:leading-[1.7] [&_p]:opacity-80 [&_ul]:list-none [&_ul]:p-0 [&_a]:text-white/70 [&_a]:no-underline [&_a]:transition-colors [&_a:hover]:text-violet-400",
  socialLinks:
    "flex gap-4 [&_a]:flex [&_a]:h-10 [&_a]:w-10 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:bg-white/10 [&_a]:text-white",
  footerBottom: "border-t border-white/10 pt-8 text-center opacity-70",
};

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    // Handle scroll for navbar effect
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setNavbarScrolled(currentScroll > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Handle body overflow when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".feature-card, .pricing-card, .testimonial-card",
    );
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Parallax effect on hero section
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector(".hero-content");
      const heroMockup = document.querySelector(".hero-mockup");

      if (heroContent && scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
      }

      if (heroMockup && scrolled < 600) {
        heroMockup.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      company: e.target.company.value,
      message: e.target.message.value,
    };

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setContactSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Thank you! We'll get back to you soon.");
      e.target.reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className={ui.page}>
      <div className={ui.bgPattern}></div>

      {/* Navigation */}
      <nav className={cx("navbar", ui.nav(navbarScrolled))}>
        <div className={ui.container}>
          <div className={ui.navContent}>
            <div className={ui.logo}>
              <ShieldCheck aria-hidden="true" />
              <span>Raqib</span>
            </div>
            <div className={ui.navLinks} id="navLinks">
              <a href="#demo" onClick={(e) => handleSmoothScroll(e, "#demo")}>
                Demo
              </a>
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "#features")}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleSmoothScroll(e, "#pricing")}
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
              >
                Contact
              </a>
            </div>
            <div className={ui.navActions}>
              <Link to="/login" className={cx(ui.button, ui.secondary)}>
                Login
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={cx(ui.button, ui.primary)}
              >
                Get Started
              </a>
            </div>
            <button
              className={ui.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cx("mobile-menu", ui.mobileMenu(mobileMenuOpen))}>
        <nav className={ui.mobileMenuNav}>
          <a href="#demo" onClick={(e) => handleSmoothScroll(e, "#demo")}>
            Demo
          </a>
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, "#features")}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
          >
            How It Works
          </a>
          <a href="#pricing" onClick={(e) => handleSmoothScroll(e, "#pricing")}>
            Pricing
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
            Contact
          </a>
        </nav>
        <div className={ui.navButtons}>
          <Link to="/login" className={cx(ui.button, ui.secondary)}>
            Login
          </Link>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className={cx(ui.button, ui.primary)}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className={ui.hero}>
        <div className={ui.container}>
          <div className={ui.heroContent}>
            <div className="hero-text">
              <div className={ui.badge}>
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                AI-Powered Protection
              </div>
              <h1 className={ui.heroTitle}>
                Stop Theft <span className={ui.gradientText}>Before</span> It
                Happens
              </h1>
              <p className={ui.heroDescription}>
                Raqib uses advanced AI and computer vision to detect suspicious
                behavior in real-time, alerting your team instantly and
                preventing losses before they occur.
              </p>
              <div className={ui.heroCta}>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className={cx(ui.button, ui.large, ui.primary)}
                >
                  Start Free Trial
                </a>
                <a
                  href="#demo"
                  onClick={(e) => handleSmoothScroll(e, "#demo")}
                  className={cx(ui.button, ui.large, ui.outline)}
                >
                  Watch Demo
                </a>
              </div>
              <div className={ui.heroStats}>
                <div className={ui.stat}>
                  <span className={ui.statValue}>500+</span>
                  <span className={ui.statLabel}>Active Clients</span>
                </div>
                <div className={ui.stat}>
                  <span className={ui.statValue}>2M+</span>
                  <span className={ui.statLabel}>Incidents Prevented</span>
                </div>
                <div className={ui.stat}>
                  <span className={ui.statValue}>98%</span>
                  <span className={ui.statLabel}>Accuracy Rate</span>
                </div>
              </div>
            </div>
            <div className={ui.heroImage}>
              <div className={cx(ui.floatingCard, ui.card1)}>
                <ShieldCheck aria-hidden="true" />
                <div>
                  <strong>Real-Time</strong>
                  <p>Threat Detection</p>
                </div>
              </div>
              <div className={cx(ui.floatingCard, ui.card2)}>
                <Bell aria-hidden="true" />
                <div>
                  <strong>Instant</strong>
                  <p>Notifications</p>
                </div>
              </div>
              <div className={cx(ui.floatingCard, ui.card3)}>
                <CheckCircle aria-hidden="true" />
                <div>
                  <strong>AI</strong>
                  <p>Powered Security</p>
                </div>
              </div>
              <div className={ui.heroMockup}>
                <div className={ui.mockupScreen}>
                  <div className={ui.mockupHeader}>
                    <div className={ui.mockupDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className={ui.mockupTitle}>Raqib Monitor</div>
                  </div>
                  <div className={ui.mockupContent}>
                    <div className={ui.pulseIndicator}></div>
                    <div className={ui.cameraGrid}>
                      <div
                        className={cx(ui.cameraFeed, ui.cameraFeedActive)}
                      ></div>
                      <div className={ui.cameraFeed}></div>
                      <div className={ui.cameraFeed}></div>
                      <div className={ui.cameraFeed}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className={ui.section} id="demo">
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>See It In Action</div>
            <h2 className={ui.sectionTitle}>
              Watch Raqib <span className={ui.gradientText}>Detect</span> in
              Real-Time
            </h2>
            <p className={ui.sectionDescription}>
              Experience how our AI-powered system identifies suspicious
              behavior and prevents theft before it happens
            </p>
          </div>
          <div className={ui.demoGrid}>
            <div className={ui.videoWrapper}>
              {videoPlaying ? (
                <iframe
                  className={ui.videoFrame}
                  src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
                  title="Raqib product demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className={ui.videoPlaceholder}
                  role="button"
                  tabIndex={0}
                  aria-label="Play demo video"
                  onClick={() => setVideoPlaying(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setVideoPlaying(true);
                    }
                  }}
                >
                  <PlayCircle aria-hidden="true" />
                  <p>Demo Video</p>
                  <span>Click to watch how Raqib protects your business</span>
                </div>
              )}
            </div>
            <div className={ui.demoHighlights}>
              <div className={ui.highlightItem}>
                <div className={ui.iconBox}>
                  <Brain aria-hidden="true" />
                </div>
                <div className={ui.highlightContent}>
                  <h4>Advanced AI</h4>
                  <p>YOLOv8 powered detection with 98% accuracy</p>
                </div>
              </div>
              <div className={ui.highlightItem}>
                <div className={ui.iconBox}>
                  <Zap aria-hidden="true" />
                </div>
                <div className={ui.highlightContent}>
                  <h4>Instant Alerts</h4>
                  <p>Real-time notifications to your team</p>
                </div>
              </div>
              <div className={ui.highlightItem}>
                <div className={ui.iconBox}>
                  <Video aria-hidden="true" />
                </div>
                <div className={ui.highlightContent}>
                  <h4>Multi-Camera</h4>
                  <p>Monitor unlimited cameras simultaneously</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className={ui.whiteSection}>
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>Trusted By</div>
            <h2 className={ui.sectionTitle}>Trusted by Leading Retailers</h2>
            <p className={ui.sectionDescription}>
              Join hundreds of businesses protecting their stores with Raqib
            </p>
          </div>
          <div className={ui.partnersLogos}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={ui.partnerItem}>
                <div className={ui.partnerBox}>Your Logo Here</div>
              </div>
            ))}
          </div>
          <div className={ui.partnersStats}>
            <div className={ui.stat}>
              <div className={ui.statNumber}>500+</div>
              <div className={ui.statText}>Active Clients</div>
            </div>
            <div className={ui.stat}>
              <div className={ui.statNumber}>2M+</div>
              <div className={ui.statText}>Incidents Prevented</div>
            </div>
            <div className={ui.stat}>
              <div className={ui.statNumber}>98%</div>
              <div className={ui.statText}>Satisfaction Rate</div>
            </div>
            <div className={ui.stat}>
              <div className={ui.statNumber}>24/7</div>
              <div className={ui.statText}>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={ui.section} id="features">
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>Features</div>
            <h2 className={ui.sectionTitle}>
              Everything You Need to Protect Your Business
            </h2>
            <p className={ui.sectionDescription}>
              Advanced AI technology meets intuitive design for comprehensive
              theft prevention
            </p>
          </div>

          <div className={ui.featuresGrid}>
            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featureViolet)}>
                <Brain aria-hidden="true" />
              </div>
              <h3>AI Detection</h3>
              <p>
                Advanced computer vision powered by YOLOv8 detects suspicious
                behavior with 98% accuracy
              </p>
            </div>

            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featureBlue)}>
                <Zap aria-hidden="true" />
              </div>
              <h3>Real-Time Alerts</h3>
              <p>
                Instant push notifications to mobile devices and desktop apps
                the moment threats are detected
              </p>
            </div>

            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featureGreen)}>
                <Video aria-hidden="true" />
              </div>
              <h3>Multi-Camera Support</h3>
              <p>
                Monitor unlimited cameras with intelligent prioritization and
                automated threat tracking
              </p>
            </div>

            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featureYellow)}>
                <Smartphone aria-hidden="true" />
              </div>
              <h3>Mobile App</h3>
              <p>
                Manage security on-the-go with our Flutter-powered mobile
                application for iOS and Android
              </p>
            </div>

            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featureRed)}>
                <ChartLine aria-hidden="true" />
              </div>
              <h3>Analytics Dashboard</h3>
              <p>
                Comprehensive insights and reports to identify patterns and
                optimize security strategies
              </p>
            </div>

            <div className={ui.featureCard}>
              <div className={cx(ui.featureIcon, ui.featurePurple)}>
                <Cloud aria-hidden="true" />
              </div>
              <h3>Cloud Backup</h3>
              <p>
                Secure cloud storage for all incidents with automated backups
                and easy retrieval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={ui.whiteSection} id="how-it-works">
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>How It Works</div>
            <h2 className={ui.sectionTitle}>
              Three Steps to Complete Protection
            </h2>
          </div>

          <div className={ui.steps}>
            <div className={ui.step}>
              <div className={ui.stepNumber}>01</div>
              <div className={ui.stepContent}>
                <div className={ui.stepIcon}>
                  <Plug aria-hidden="true" />
                </div>
                <h3>Install & Connect</h3>
                <p>
                  Set up cameras and connect them to the Raqib system in minutes
                </p>
              </div>
            </div>

            <div className={ui.stepConnector} aria-hidden="true">
              <div className={ui.stepArrow}>
                <ArrowRight className="h-4 w-4 hidden lg:block" />
                <ArrowDown className="h-4 w-4 lg:hidden" />
              </div>
            </div>

            <div className={ui.step}>
              <div className={ui.stepNumber}>02</div>
              <div className={ui.stepContent}>
                <div className={ui.stepIcon}>
                  <Bot aria-hidden="true" />
                </div>
                <h3>AI Monitors 24/7</h3>
                <p>
                  Our AI continuously analyzes video feeds for suspicious
                  behavior
                </p>
              </div>
            </div>

            <div className={ui.stepConnector} aria-hidden="true">
              <div className={ui.stepArrow}>
                <ArrowRight className="h-4 w-4 hidden lg:block" />
                <ArrowDown className="h-4 w-4 lg:hidden" />
              </div>
            </div>

            <div className={ui.step}>
              <div className={ui.stepNumber}>03</div>
              <div className={ui.stepContent}>
                <div className={ui.stepIcon}>
                  <Bell aria-hidden="true" />
                </div>
                <h3>Instant Response</h3>
                <p>Get immediate alerts and take action before losses occur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={ui.section} id="pricing">
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>Pricing</div>
            <h2 className={ui.sectionTitle}>Choose Your Protection Plan</h2>
            <p className={ui.sectionDescription}>
              Flexible plans that grow with your business
            </p>
          </div>

          <div className={ui.pricingCards}>
            <div className={ui.pricingCard}>
              <div className={ui.pricingHeader}>
                <h3>Pro</h3>
                <p>Perfect for small to medium businesses</p>
              </div>
              <div className={ui.pricingPrice}>
                <span className={ui.currency}>$</span>
                <span className={ui.amount}>199</span>
                <span className={ui.period}>/month</span>
              </div>
              <ul className={ui.pricingFeatures}>
                <li>
                  <Check aria-hidden="true" /> Up to 10 cameras
                </li>
                <li>
                  <Check aria-hidden="true" /> Real-time AI detection
                </li>
                <li>
                  <Check aria-hidden="true" /> Mobile alerts
                </li>
                <li>
                  <Check aria-hidden="true" /> Local storage
                </li>
                <li>
                  <Check aria-hidden="true" /> 5 user accounts
                </li>
                <li>
                  <Check aria-hidden="true" /> Email support
                </li>
              </ul>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={cx(ui.button, ui.outline, ui.block)}
              >
                Get Started
              </a>
            </div>

            <div className={cx(ui.pricingCard, ui.pricingFeatured)}>
              <div className={ui.popularBadge}>Most Popular</div>
              <div className={ui.pricingHeader}>
                <h3>Ultra</h3>
                <p>For larger operations requiring advanced features</p>
              </div>
              <div className={ui.pricingPrice}>
                <span className={ui.currency}>$</span>
                <span className={ui.amount}>399</span>
                <span className={ui.period}>/month</span>
              </div>
              <ul
                className={cx(ui.pricingFeatures, ui.pricingFeaturesFeatured)}
              >
                <li>
                  <Check aria-hidden="true" /> Unlimited cameras
                </li>
                <li>
                  <Check aria-hidden="true" /> Advanced AI analytics
                </li>
                <li>
                  <Check aria-hidden="true" /> Priority mobile alerts
                </li>
                <li>
                  <Check aria-hidden="true" /> Cloud backup & storage
                </li>
                <li>
                  <Check aria-hidden="true" /> Unlimited users
                </li>
                <li>
                  <Check aria-hidden="true" /> Customer behavior heatmaps
                </li>
                <li>
                  <Check aria-hidden="true" /> 24/7 priority support
                </li>
                <li>
                  <Check aria-hidden="true" /> Custom integrations
                </li>
              </ul>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={cx(ui.button, ui.primary, ui.block)}
              >
                Get Started
              </a>
            </div>

            <div className={ui.pricingCard}>
              <div className={ui.pricingHeader}>
                <h3>Enterprise</h3>
                <p>Custom solutions for large organizations</p>
              </div>
              <div className={ui.pricingPrice}>
                <span className={ui.amountCustom}>Custom</span>
              </div>
              <ul className={ui.pricingFeatures}>
                <li>
                  <Check aria-hidden="true" /> Everything in Ultra
                </li>
                <li>
                  <Check aria-hidden="true" /> Multi-location support
                </li>
                <li>
                  <Check aria-hidden="true" /> Dedicated account manager
                </li>
                <li>
                  <Check aria-hidden="true" /> Custom AI training
                </li>
                <li>
                  <Check aria-hidden="true" /> On-premise deployment
                </li>
                <li>
                  <Check aria-hidden="true" /> SLA guarantee
                </li>
              </ul>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={cx(ui.button, ui.outline, ui.block)}
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={ui.whiteSection} id="testimonials">
        <div className={ui.container}>
          <div className={ui.sectionHeader}>
            <div className={ui.sectionBadge}>Testimonials</div>
            <h2 className={ui.sectionTitle}>Trusted by Businesses Worldwide</h2>
          </div>

          <div className={ui.testimonialsGrid}>
            <div className={ui.testimonialCard}>
              <div className={ui.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="inline h-4 w-4 fill-current"
                  />
                ))}
              </div>
              <p className={ui.testimonialText}>
                "Raqib has reduced our shoplifting incidents by 85% in the first
                3 months. The real-time alerts are a game-changer for our
                security team."
              </p>
              <div className={ui.testimonialAuthor}>
                <div className={ui.authorAvatar}>
                  <User aria-hidden="true" />
                </div>
                <div className={ui.authorInfo}>
                  <strong>John Smith</strong>
                  <span>Store Manager</span>
                </div>
              </div>
            </div>

            <div className={ui.testimonialCard}>
              <div className={ui.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="inline h-4 w-4 fill-current"
                  />
                ))}
              </div>
              <p className={ui.testimonialText}>
                "The AI detection is incredibly accurate. We've caught multiple
                incidents that we would have completely missed with traditional
                security methods."
              </p>
              <div className={ui.testimonialAuthor}>
                <div className={ui.authorAvatar}>
                  <User aria-hidden="true" />
                </div>
                <div className={ui.authorInfo}>
                  <strong>Sarah Johnson</strong>
                  <span>Security Director</span>
                </div>
              </div>
            </div>

            <div className={ui.testimonialCard}>
              <div className={ui.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="inline h-4 w-4 fill-current"
                  />
                ))}
              </div>
              <p className={ui.testimonialText}>
                "Easy to set up, intuitive to use, and the mobile app keeps our
                team connected. Best investment we've made for store security."
              </p>
              <div className={ui.testimonialAuthor}>
                <div className={ui.authorAvatar}>
                  <User aria-hidden="true" />
                </div>
                <div className={ui.authorInfo}>
                  <strong>Mike Chen</strong>
                  <span>Operations Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={ui.cta}>
        <div className={ui.container}>
          <div className={ui.ctaContent}>
            <h2>Ready to Protect Your Business?</h2>
            <p>Start your 30-day free trial today. No credit card required.</p>
            <div className={ui.ctaButtons}>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={cx(ui.button, ui.large, ui.white)}
              >
                Start Free Trial
              </a>
              <Link
                to="/login"
                className={cx(ui.button, ui.large, ui.outlineWhite)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={ui.section} id="contact">
        <div className={ui.container}>
          <div className={ui.contactGrid}>
            <div className={ui.contactInfo}>
              <h2>Get in Touch</h2>
              <p>
                Have questions? We're here to help you protect your business.
              </p>

              <div className={ui.contactMethods}>
                <div className={ui.contactMethod}>
                  <Mail aria-hidden="true" />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:hello@raqib.io">hello@raqib.io</a>
                  </div>
                </div>
                <div className={ui.contactMethod}>
                  <Phone aria-hidden="true" />
                  <div>
                    <strong>Phone</strong>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
                <div className={ui.contactMethod}>
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong>Address</strong>
                    <span>123 Tech Street, San Francisco, CA 94107</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={ui.contactFormWrapper}>
              <form className={ui.contactForm} onSubmit={handleContactSubmit}>
                <div className={ui.formGroup}>
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className={ui.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={ui.formGroup}>
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className={cx(ui.formGroup, ui.fullWidth)}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={cx(ui.button, ui.primary, ui.block, ui.fullWidth)}
                  disabled={contactSubmitting}
                >
                  {contactSubmitting ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={ui.footer}>
        <div className={ui.container}>
          <div className={ui.footerContent}>
            <div className={ui.footerSection}>
              <div className={ui.footerLogo}>
                <ShieldCheck aria-hidden="true" />
                <span>Raqib</span>
              </div>
              <p>
                Advanced AI-powered theft detection system protecting retailers
                worldwide.
              </p>
              <div className={ui.socialLinks}>
                <a href="#" title="Facebook">
                  <Facebook aria-hidden="true" className="h-4 w-4" />
                </a>
                <a href="#" title="Twitter">
                  <Twitter aria-hidden="true" className="h-4 w-4" />
                </a>
                <a href="#" title="LinkedIn">
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                </a>
                <a href="#" title="Instagram">
                  <Instagram aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className={ui.footerSection}>
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#demo">Demo</a>
                </li>
                <li>
                  <a href="#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>

            <div className={ui.footerSection}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>

            <div className={ui.footerSection}>
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">API Docs</a>
                </li>
                <li>
                  <a href="#">Status</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={ui.footerBottom}>
            <p>&copy; 2024 Raqib. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
