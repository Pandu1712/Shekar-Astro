import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Compass,
  Facebook,
  Flame,
  Globe,
  Headphones,
  Heart,
  Instagram,
  Landmark,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PenLine,
  Phone,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  User,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import CosmicParticles from '@/CosmicParticles';
import { useScrollY, useReveal, useScrolled } from '@/useScrollEffects';
import logoImg from './assets/logo.jpeg';
import heroBg from './assets/hero_bg.jpg';
import horoscopeHeroBg from './assets/horoscope_hero_bg.jpg';
import vedicKundaliImg from './assets/vedic_kundali_chart.jpg';
import aboutHeroBg from './assets/about_hero_bg.jpg';
import masterShekarPortrait from './assets/master_shekar_portrait.jpg';
import vedicScriptureDiya from './assets/vedic_scripture_diya.jpg';
import blogHeroBg from './assets/blog_hero_bg.jpg';
import blogBirthChartImg from './assets/blog_birth_chart.jpg';
import blogRemediesImg from './assets/blog_remedies.jpg';
import blogMantraImg from './assets/blog_mantra.jpg';
import blogTempleFestivalImg from './assets/blog_temple_festival.jpg';
import blogSaturnImg from './assets/blog_saturn.jpg';
import blogMoonSignImg from './assets/blog_moon_sign.jpg';

const heroSlides = [
  { url: 'https://images.pexels.com/photos/257092/pexels-photo-257092.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Temple sunrise in the mountains', label: 'Sacred dawns' },
  { url: 'https://images.pexels.com/photos/18275863/pexels-photo-18275863.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Golden Temple at sunset', label: 'Divine light' },
  { url: 'https://images.pexels.com/photos/30428756/pexels-photo-30428756.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Floating lotus candles', label: 'Inner peace' },
  { url: 'https://images.pexels.com/photos/982378/nature-milky-way-galaxy-stars-982378.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Milky Way galaxy', label: 'Cosmic wisdom' },
];

const allServices = [
  { title: 'Vedic Astrology Consultation', description: 'Decode your cosmic blueprint and find clarity in every major life decision.', icon: '✦' },
  { title: 'Kundali Matching', description: 'Understand the deeper harmony between two souls before you take the next step.', icon: '∞' },
  { title: 'Marriage Astrology', description: 'Navigate the sacred bond of marriage with celestial insight and timing.', icon: '❤' },
  { title: 'Career Guidance', description: 'Align your professional path with the planets to unlock your true potential.', icon: '★' },
  { title: 'Business Astrology', description: 'Choose the right ventures, partnerships, and timing for prosperity.', icon: '◈' },
  { title: 'Love & Relationship', description: 'Heal emotional bonds and invite deeper connection into your relationships.', icon: '♡' },
  { title: 'Health Astrology', description: 'Understand the mind-body connection through your astrological profile.', icon: '✿' },
  { title: 'Numerology Consultation', description: 'Discover the hidden vibrations of your numbers and their influence.', icon: '#' },
  { title: 'Palm Reading', description: 'The lines of your hands tell a story — let them reveal your path.', icon: '✋' },
  { title: 'Tarot Guidance', description: 'Draw insight from the ancient cards when you seek a fresh perspective.', icon: '♣' },
  { title: 'Spiritual Healing', description: 'Release stagnant energy and return to a state of peace and balance.', icon: '☼' },
  { title: 'Meditation Guidance', description: 'Learn to still the mind and reconnect with your innermost self.', icon: '☮' },
  { title: 'Negative Energy Removal', description: 'Clear the shadows that hold you back and restore your natural radiance.', icon: '⚡' },
  { title: 'Vastu Consultation', description: 'Harmonize your living and working spaces with cosmic architecture.', icon: '⌂' },
  { title: 'Gemstone Recommendation', description: 'Wear the right stones to amplify your strengths and protect your aura.', icon: '◆' },
  { title: 'Family Problem Solutions', description: 'Restore harmony at home with compassionate, practical guidance.', icon: '♨' },
  { title: 'Child Astrology', description: 'Understand your child\'s nature and nurture their unique gifts.', icon: '☀' },
  { title: 'Foreign Settlement', description: 'Discover the astrological timing and remedies for moving abroad.', icon: '✈' },
];

const whyChooseUs = [
  { title: '15+ Years Experience', description: 'Over a decade of dedicated practice in Vedic astrology and spiritual healing.', icon: '✦' },
  { title: '100% Confidential', description: 'Every consultation is held in the strictest privacy and trust.', icon: '◈' },
  { title: 'Accurate Predictions', description: 'Precise, insightful readings grounded in authentic Vedic methods.', icon: '★' },
  { title: '24/7 Support', description: 'Divine guidance is always available, whenever you need it most.', icon: '☼' },
  { title: '5,000+ Happy Clients', description: 'Thousands of souls guided across Mauritius and around the world.', icon: '♡' },
  { title: 'Spiritual Healing Expert', description: 'Deep expertise in clearing negative energy and restoring balance.', icon: '✿' },
  { title: 'Worldwide Consultation', description: 'Online sessions available for clients across every time zone.', icon: '✈' },
  { title: 'Personalized Approach', description: 'Every reading is tailored uniquely to your chart and your story.', icon: '☮' },
];

export interface ZodiacDetails {
  sign: string;
  symbol: string;
  glyph: string;
  dateRange: string;
  element: string;
  rulingPlanet: string;
  prediction: string;
  love: string;
  career: string;
  health: string;
  finance: string;
  luckyNumber: string;
  luckyColor: string;
  luckyDay: string;
  gemstone: string;
}

const detailedHoroscopeData: ZodiacDetails[] = [
  {
    sign: 'Aries',
    symbol: '♈',
    glyph: '♈',
    dateRange: 'March 21 - April 19',
    element: 'Fire',
    rulingPlanet: 'Mars',
    prediction: "Today brings new energy and creativity. It's a great time to take initiative on important tasks. Trust your instincts and stay focused on your goals. Avoid impulsive decisions in relationships.",
    love: 'Positive energy in relationships.',
    career: 'New opportunities are on the horizon.',
    health: 'Focus on your well-being.',
    finance: 'Good time for financial planning.',
    luckyNumber: '9',
    luckyColor: 'Red',
    luckyDay: 'Tuesday',
    gemstone: 'Red Coral',
  },
  {
    sign: 'Taurus',
    symbol: '♉',
    glyph: '♉',
    dateRange: 'April 20 - May 20',
    element: 'Earth',
    rulingPlanet: 'Venus',
    prediction: 'Patience and steady effort will yield wonderful rewards today. Financial clarity is emerging, and a warm conversation brings peace to your personal life. Stay grounded.',
    love: 'Deep mutual understanding blooming.',
    career: 'Steady progress on long-term projects.',
    health: 'Nourish your body and rest well.',
    finance: 'Favorable conditions for investments.',
    luckyNumber: '6',
    luckyColor: 'Green',
    luckyDay: 'Friday',
    gemstone: 'Emerald',
  },
  {
    sign: 'Gemini',
    symbol: '♊',
    glyph: '♊',
    dateRange: 'May 21 - June 20',
    element: 'Air',
    rulingPlanet: 'Mercury',
    prediction: 'Your communication skills are at an all-time peak. Creative ideas flow naturally, making this an excellent day for brainstorming, networking, and heartfelt conversations.',
    love: 'Meaningful dialogue deepens ties.',
    career: 'Express your innovative concepts.',
    health: 'Practice mindfulness to calm the mind.',
    finance: 'Explore multiple income avenues.',
    luckyNumber: '5',
    luckyColor: 'Yellow',
    luckyDay: 'Wednesday',
    gemstone: 'Emerald / Agate',
  },
  {
    sign: 'Cancer',
    symbol: '♋',
    glyph: '♋',
    dateRange: 'June 21 - July 22',
    element: 'Water',
    rulingPlanet: 'Moon',
    prediction: 'Trust your intuitive guidance today. Domestic harmony and family matters bring deep comfort. Take time to honor your emotional needs and nurture your inner peace.',
    love: 'Warmth and emotional closeness.',
    career: 'Intuitive choices lead to success.',
    health: 'Hydrate and enjoy quiet reflection.',
    finance: 'Prudent saving ensures security.',
    luckyNumber: '2',
    luckyColor: 'Silver',
    luckyDay: 'Monday',
    gemstone: 'Pearl / Moonstone',
  },
  {
    sign: 'Leo',
    symbol: '♌',
    glyph: '♌',
    dateRange: 'July 23 - August 22',
    element: 'Fire',
    rulingPlanet: 'Sun',
    prediction: 'Your natural charisma and leadership shine brightly today. Others look to you for inspiration. Step forward with confidence, but remain generous and receptive to advice.',
    love: 'Romantic sparks and joyful moments.',
    career: 'Leadership initiatives are recognized.',
    health: 'Stay active and energized.',
    finance: 'Generosity brings unexpected abundance.',
    luckyNumber: '1',
    luckyColor: 'Gold',
    luckyDay: 'Sunday',
    gemstone: 'Ruby',
  },
  {
    sign: 'Virgo',
    symbol: '♍',
    glyph: '♍',
    dateRange: 'August 23 - September 22',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    prediction: 'Your keen attention to detail will solve a complex problem today. Organization and structured routines give you great satisfaction and clear the path for fresh growth.',
    love: 'Thoughtful gestures speak volumes.',
    career: 'Precision brings accolades at work.',
    health: 'Balanced diet and restful sleep.',
    finance: 'Organize budgets and accounts.',
    luckyNumber: '5',
    luckyColor: 'Navy',
    luckyDay: 'Wednesday',
    gemstone: 'Emerald / Peridot',
  },
  {
    sign: 'Libra',
    symbol: '♎',
    glyph: '♎',
    dateRange: 'September 23 - October 22',
    element: 'Air',
    rulingPlanet: 'Venus',
    prediction: 'Harmony, balance, and aesthetic joy define your day. A partnership or collaboration brings auspicious outcomes. Trust in fairness and beauty as your guiding compass.',
    love: 'Harmony and charm surround your bond.',
    career: 'Diplomatic solutions win allies.',
    health: 'Restore inner equilibrium and peace.',
    finance: 'Fair dealings bring prosperity.',
    luckyNumber: '6',
    luckyColor: 'Pink',
    luckyDay: 'Friday',
    gemstone: 'Diamond / Opal',
  },
  {
    sign: 'Scorpio',
    symbol: '♏',
    glyph: '♏',
    dateRange: 'October 23 - November 21',
    element: 'Water',
    rulingPlanet: 'Mars / Pluto',
    prediction: 'Deep transformation and powerful focus are your gifts today. Uncover hidden truths and channel your passion into meaningful breakthroughs. Release what no longer serves.',
    love: 'Passionate and loyal connections.',
    career: 'Transform challenges into mastery.',
    health: 'Detoxify and release tension.',
    finance: 'Lucrative hidden opportunities arise.',
    luckyNumber: '9',
    luckyColor: 'Maroon',
    luckyDay: 'Tuesday',
    gemstone: 'Red Coral / Topaz',
  },
  {
    sign: 'Sagittarius',
    symbol: '♐',
    glyph: '♐',
    dateRange: 'November 22 - December 21',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    prediction: 'An expansive and optimistic vision opens exciting new horizons today. Your thirst for wisdom and adventure is rewarded with serendipitous encounters and joyful insights.',
    love: 'Spontaneous adventures together.',
    career: 'Global or philosophical reach expands.',
    health: 'Outdoor movement lifts your spirits.',
    finance: 'Positive outlook attracts abundance.',
    luckyNumber: '3',
    luckyColor: 'Purple',
    luckyDay: 'Thursday',
    gemstone: 'Yellow Sapphire',
  },
  {
    sign: 'Capricorn',
    symbol: '♑',
    glyph: '♑',
    dateRange: 'December 22 - January 19',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    prediction: 'Disciplined determination and strategic planning build solid foundations today. Your perseverance earns the respect of mentors and colleagues. Trust the long-term vision.',
    love: 'Loyalty and enduring dedication.',
    career: 'Milestones achieved with patience.',
    health: 'Stretching and posture care.',
    finance: 'Solid long-term investments bear fruit.',
    luckyNumber: '8',
    luckyColor: 'Brown',
    luckyDay: 'Saturday',
    gemstone: 'Blue Sapphire',
  },
  {
    sign: 'Aquarius',
    symbol: '♒',
    glyph: '♒',
    dateRange: 'January 20 - February 18',
    element: 'Air',
    rulingPlanet: 'Saturn / Uranus',
    prediction: 'Your visionary ideas and humanitarian spirit find receptive ears today. Connect with community and embrace original thinking. A sudden insight illuminates your path forward.',
    love: 'Celebrate intellectual kindred spirits.',
    career: 'Innovative methods set you apart.',
    health: 'Fresh air and deep breathing.',
    finance: 'Future-focused tech or projects pay.',
    luckyNumber: '4',
    luckyColor: 'Electric Blue',
    luckyDay: 'Saturday',
    gemstone: 'Blue Sapphire / Amethyst',
  },
  {
    sign: 'Pisces',
    symbol: '♓',
    glyph: '♓',
    dateRange: 'February 19 - March 20',
    element: 'Water',
    rulingPlanet: 'Jupiter / Neptune',
    prediction: 'Compassion, spiritual grace, and artistic creativity flow effortlessly today. Trust your dreams and subtle feelings. A sacred sense of connection fills your heart with serenity.',
    love: 'Soulful intimacy and tender empathy.',
    career: 'Creative and healing arts flourish.',
    health: 'Water therapy and gentle rest.',
    finance: 'Intuitive decisions protect wealth.',
    luckyNumber: '7',
    luckyColor: 'Sea Green',
    luckyDay: 'Thursday',
    gemstone: 'Yellow Sapphire / Aquamarine',
  },
];

const galleryImages = [
  { url: 'https://images.pexels.com/photos/10182772/pexels-photo-10182772.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Traditional Diwali diyas', label: 'Sacred lamps' },
  { url: 'https://images.pexels.com/photos/30428756/pexels-photo-30428756.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Floating lotus candles', label: 'Lotus blessings' },
  { url: 'https://images.pexels.com/photos/8981374/pexels-photo-8981374.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Meditation by the sea', label: 'Meditation' },
  { url: 'https://images.pexels.com/photos/4040639/pexels-photo-4040639.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Crystals and gemstones', label: 'Sacred gemstones' },
  { url: 'https://images.pexels.com/photos/6944923/pexels-photo-6944923.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Tarot cards and candles', label: 'Tarot guidance' },
  { url: 'https://images.pexels.com/photos/982378/nature-milky-way-galaxy-stars-982378.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Milky Way night sky', label: 'Cosmic dance' },
];

const blogCategories = [
  { id: 'All Posts', label: 'All Posts', icon: 'grid' },
  { id: 'Vedic Astrology', label: 'Vedic Astrology', icon: 'star' },
  { id: 'Spirituality', label: 'Spirituality', icon: 'lotus' },
  { id: 'Rituals & Remedies', label: 'Rituals & Remedies', icon: 'diya' },
  { id: 'Festivals', label: 'Festivals', icon: 'temple' },
  { id: 'Life Guidance', label: 'Life Guidance', icon: 'heart' },
];

const detailedBlogPosts = [
  {
    id: 1,
    title: 'Understanding Your Birth Chart',
    excerpt: 'Your birth chart is a cosmic snapshot of the sky at the moment you were born. Discover how it reveals your strengths and life purpose.',
    category: 'Vedic Astrology',
    date: '01 May 2025',
    readTime: '5 min read',
    image: blogBirthChartImg,
  },
  {
    id: 2,
    title: 'Powerful Remedies for Planetary Challenges',
    excerpt: 'Simple yet powerful Vedic remedies to balance planetary energies and bring peace, prosperity, and protection into your life.',
    category: 'Rituals & Remedies',
    date: '28 Apr 2025',
    readTime: '4 min read',
    image: blogRemediesImg,
  },
  {
    id: 3,
    title: 'The Power of Mantra in Daily Life',
    excerpt: 'Mantras are divine vibrations that calm the mind and uplift the soul. Learn how chanting can transform your energy.',
    category: 'Spirituality',
    date: '22 Apr 2025',
    readTime: '6 min read',
    image: blogMantraImg,
  },
  {
    id: 4,
    title: 'Akshaya Tritiya – The Day of Eternal Blessings',
    excerpt: 'Akshaya Tritiya is a highly auspicious day for new beginnings, wealth, and spiritual growth. Know its significance and rituals.',
    category: 'Festivals',
    date: '18 Apr 2025',
    readTime: '4 min read',
    image: blogTempleFestivalImg,
  },
  {
    id: 5,
    title: 'Saturn Transit 2025: What to Expect',
    excerpt: 'Saturn\'s movement brings important lessons and opportunities. Understand how this transit may impact your zodiac sign.',
    category: 'Vedic Astrology',
    date: '10 Apr 2025',
    readTime: '5 min read',
    image: blogSaturnImg,
  },
  {
    id: 6,
    title: 'Lessons from the Bhagavad Gita',
    excerpt: 'Timeless wisdom from the Gita to help you face life\'s challenges with clarity, courage, and compassion.',
    category: 'Life Guidance',
    date: '05 Apr 2025',
    readTime: '4 min read',
    image: vedicScriptureDiya,
  },
];

const popularPosts = [
  {
    id: 1,
    title: 'Signs You Are on the Right Spiritual Path',
    date: '18 Apr 2025',
    image: 'https://images.pexels.com/photos/8981374/pexels-photo-8981374.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    title: 'Rahu in Astrology: Myths and Truths',
    date: '12 Apr 2025',
    image: 'https://images.pexels.com/photos/982378/nature-milky-way-galaxy-stars-982378.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 3,
    title: 'Daily Habits for a Positive Mindset',
    date: '08 Apr 2025',
    image: 'https://images.pexels.com/photos/4040639/pexels-photo-4040639.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const blogTags = ['Astrology', 'Remedies', 'Spirituality', 'Mantras', 'Festivals', 'Planets', 'Meditation', 'Vedic Wisdom'];

const testimonials = [
  { quote: 'Master Shekar Ji gave me the clarity I needed at a turning point in my life. His guidance felt precise, gentle, and deeply personal.', name: 'Anisha R.', place: 'Mauritius', initials: 'AR' },
  { quote: 'The consultation was a beautiful experience. I left with a calmer mind and a clear direction for my career and family.', name: 'Rahul M.', place: 'Dubai', initials: 'RM' },
  { quote: 'There is a rare warmth in his approach. It never feels like a prediction — it feels like being shown the light ahead.', name: 'Meera S.', place: 'London', initials: 'MS' },
  { quote: 'After years of struggle, the gemstone remedy and guidance brought a visible shift in my energy and confidence.', name: 'Priya K.', place: 'Mumbai', initials: 'PK' },
  { quote: 'The Kundali matching was thorough and honest. It gave our families confidence and brought us closer together.', name: 'Vikram T.', place: 'USA', initials: 'VT' },
  { quote: 'I was skeptical at first, but the accuracy of his predictions and the compassion in his words won me over completely.', name: 'Sarah L.', place: 'UK', initials: 'SL' },
];

const faqs: [string, string][] = [
  ['How does an online consultation work?', 'Once you choose a time, you share your birth details securely. Your private session takes place over WhatsApp or video call, wherever you are in the world.'],
  ['What information do I need to provide?', 'Your name, date of birth, exact birth time if available, and place of birth. A clear question or intention helps make the reading more focused.'],
  ['Is my consultation confidential?', 'Absolutely. Every conversation is treated with complete discretion, compassion, and respect.'],
  ['Do you offer consultations outside Mauritius?', 'Yes. Master Shekar Ji offers worldwide online consultations with flexible hours to suit different time zones.'],
  ['What languages are consultations available in?', 'Consultations are available in English, Hindi, and several other languages upon request.'],
  ['How accurate are the predictions?', 'Vedic astrology is a profound science. With accurate birth details, the readings are remarkably precise and insightful.'],
];

const signs = [
  ['♈', 'Aries'], ['♉', 'Taurus'], ['♊', 'Gemini'], ['♋', 'Cancer'], ['♌', 'Leo'], ['♍', 'Virgo'],
  ['♎', 'Libra'], ['♏', 'Scorpio'], ['♐', 'Sagittarius'], ['♑', 'Capricorn'], ['♒', 'Aquarius'], ['♓', 'Pisces'],
];

const navItems = ['About', 'Services', 'Horoscope', 'Gallery', 'Blog', 'FAQ'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedHoroscope, setSelectedHoroscope] = useState(0);
  const [activeNav, setActiveNav] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('All Posts');
  const [blogSearch, setBlogSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const scrollY = useScrollY();
  const scrolled = useScrolled(40);
  useReveal();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveNav(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const parallaxOffset = scrollY * 0.4;
  const heroFade = Math.max(0, 1 - scrollY / 600);
  const currentHoro = detailedHoroscopeData[selectedHoroscope] || detailedHoroscopeData[0];

  const filteredBlogPosts = detailedBlogPosts.filter((post) => {
    const matchesCategory = selectedBlogCategory === 'All Posts' || post.category === selectedBlogCategory;
    const matchesSearch = blogSearch.trim() === '' ||
      post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
      post.category.toLowerCase().includes(blogSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="site-shell">
      {/* ===== TOP ANNOUNCEMENT & CONTACT BAR ===== */}
      <div className="top-announcement-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="sparkle-gold-icon">✦</span>
            <span className="welcome-text">WELCOME TO MASTER SHEKAR JI</span>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-item">
              <Clock size={13} className="top-icon" />
              <span>Consultation Available 9AM - 8PM</span>
            </div>
            <span className="top-divider">|</span>
            <a href="tel:+919876543210" className="top-bar-item">
              <Phone size={13} className="top-icon" />
              <span>+91 98765 43210</span>
            </a>
            <span className="top-divider">|</span>
            <a href="mailto:support@mastershekarji.com" className="top-bar-item">
              <Mail size={13} className="top-icon" />
              <span>support@mastershekarji.com</span>
            </a>
            <span className="top-divider">|</span>
            <div className="top-bar-social">
              <span className="follow-label">Follow us:</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={12} /></a>
              <a href="https://instagram.com/mastershekarji.official" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={12} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={12} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <header className={scrolled ? 'main-header scrolled' : 'main-header'}>
        <div className="header-container">
          <a className="brand-logo-wrap" href="#home" aria-label="Master Shekar Ji home">
            <img className="brand-avatar" src={logoImg} alt="Master Shekar Ji" />
            <div className="brand-titles">
              <strong className="brand-name">MASTER SHEKAR JI</strong>
              <small className="brand-tagline">VEDIC WISDOM · SPIRITUAL GUIDANCE</small>
            </div>
          </a>

          <nav className={menuOpen ? 'nav-menu-links open' : 'nav-menu-links'}>
            <a className={activeNav === 'home' ? 'nav-item-link active' : 'nav-item-link'} href="#home" onClick={() => { setActiveNav('home'); setMenuOpen(false); }}>HOME</a>
            <a className={activeNav === 'about' ? 'nav-item-link active' : 'nav-item-link'} href="#about" onClick={() => { setActiveNav('about'); setMenuOpen(false); }}>ABOUT</a>
            <div className="nav-dropdown-trigger">
              <a className={activeNav === 'services' ? 'nav-item-link with-chevron active' : 'nav-item-link with-chevron'} href="#services" onClick={() => { setActiveNav('services'); setMenuOpen(false); }}>
                SERVICES <ChevronDown size={13} className="inline-chevron" />
              </a>
            </div>
            <a className={activeNav === 'horoscope' ? 'nav-item-link active' : 'nav-item-link'} href="#horoscope" onClick={() => { setActiveNav('horoscope'); setMenuOpen(false); }}>HOROSCOPE</a>
            <a className={activeNav === 'gallery' ? 'nav-item-link active' : 'nav-item-link'} href="#gallery" onClick={() => { setActiveNav('gallery'); setMenuOpen(false); }}>GALLERY</a>
            <a className={activeNav === 'blog' ? 'nav-item-link active' : 'nav-item-link'} href="#blog" onClick={() => { setActiveNav('blog'); setMenuOpen(false); }}>BLOG</a>
            <a className={activeNav === 'faq' ? 'nav-item-link active' : 'nav-item-link'} href="#faq" onClick={() => { setActiveNav('faq'); setMenuOpen(false); }}>FAQ</a>
            <a className={activeNav === 'contact' ? 'nav-item-link active' : 'nav-item-link'} href="#contact" onClick={() => { setActiveNav('contact'); setMenuOpen(false); }}>CONTACT</a>
          </nav>

          <div className="header-right-action">
            <a className="journey-pill-btn" href="#contact">
              BEGIN YOUR JOURNEY <ArrowRight size={14} />
            </a>
            <button className="mobile-toggle-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="hero-spiritual-wrap" id="home">
          {/* Panoramic Sunrise Background Layer */}
          <div className="hero-bg-layer" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-light-overlay" />
          </div>

          {/* Sacred Celestial Mandala Overlay in the sky */}
          <div className="sacred-celestial-mandala" aria-hidden="true">
            <div className="mandala-glow-field" />
            <div className="mandala-outer-orbit">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, index) => (
                <div
                  key={index}
                  className="mandala-orbit-node"
                  style={{
                    transform: `rotate(${deg}deg) translate(145px) rotate(-${deg}deg)`,
                  }}
                >
                  <div className="node-glyph">
                    {index === 0 && <span className="glyph-txt">☸</span>}
                    {index === 1 && <span className="glyph-txt">✦</span>}
                    {index === 2 && <span className="glyph-txt">☼</span>}
                    {index === 3 && <span className="glyph-txt">☽</span>}
                    {index === 4 && <span className="glyph-txt">ॐ</span>}
                    {index === 5 && <span className="glyph-txt">★</span>}
                    {index === 6 && <span className="glyph-txt">◈</span>}
                    {index === 7 && <span className="glyph-txt">☯</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mandala-concentric-ring ring-l3" />
            <div className="mandala-concentric-ring ring-l2" />
            <div className="mandala-concentric-ring ring-l1" />
            <div className="mandala-lotus-core">
              <span className="mandala-om-symbol">ॐ</span>
            </div>
          </div>

          {/* Hero Copy Container */}
          <div className="hero-content-container">
            <div className="hero-text-block">
              {/* Eyebrow */}
              <div className="sacred-eyebrow">
                <span className="eyebrow-arrow-left">⟵</span>
                <span className="eyebrow-text">A SACRED SPACE FOR YOUR NEXT CHAPTER</span>
                <span className="eyebrow-arrow-right">⟶</span>
              </div>

              {/* Title */}
              <h1 className="hero-main-title">
                Find the <span className="clarity-gold-text">clarity</span>
                <br />
                <span className="hero-title-line2">already within you.</span>
              </h1>

              {/* Lotus Ornamental Divider */}
              <div className="hero-lotus-divider">
                <span className="divider-line" />
                <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#c59146" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(197, 145, 70, 0.15)" />
                  <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                  <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  <path d="M6 14C3 15.5 1.5 17.5 3 19C4.5 20 7.5 19.5 9.5 18" />
                  <path d="M18 14C21 15.5 22.5 17.5 21 19C19.5 20 16.5 19.5 14.5 18" />
                </svg>
                <span className="divider-line" />
              </div>

              {/* Description */}
              <p className="hero-description-text">
                Authentic Vedic wisdom and soulful guidance to help you move through life with more trust,
                purpose, and peace.
              </p>

              {/* Action Buttons */}
              <div className="hero-btn-group">
                <a className="hero-primary-btn" href="#contact">
                  BOOK A CONSULTATION <ArrowRight size={15} />
                </a>
                <a className="hero-secondary-btn" href="#about">
                  <span className="play-circle-icon"><Play size={10} fill="currentColor" /></span>
                  DISCOVER THE APPROACH
                </a>
              </div>
            </div>
          </div>

          {/* Floating 4-Pillars Card at Bottom */}
          <div className="hero-pillars-floating-bar">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg className="pillar-icon-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" stroke="#e5c07b" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.8"/>
                  <circle cx="20" cy="20" r="12" stroke="#e5c07b" strokeWidth="1.2"/>
                  <polygon points="20,8 24,16 32,20 24,24 20,32 16,24 8,20 16,16" stroke="#e5c07b" strokeWidth="1.2" fill="none"/>
                  <circle cx="20" cy="20" r="3" fill="#e5c07b"/>
                  <circle cx="20" cy="8" r="1.5" fill="#e5c07b"/>
                  <circle cx="32" cy="20" r="1.5" fill="#e5c07b"/>
                  <circle cx="20" cy="32" r="1.5" fill="#e5c07b"/>
                  <circle cx="8" cy="20" r="1.5" fill="#e5c07b"/>
                </svg>
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">VEDIC ASTROLOGY</h4>
                <p className="pillar-desc">Accurate insights rooted in ancient wisdom.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg className="pillar-icon-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" stroke="#e5c07b" strokeWidth="1" strokeDasharray="1 3" opacity="0.6"/>
                  <path d="M20 10C20 10 16 16 16 22C16 25 18 27 20 27C22 27 24 25 24 22C24 16 20 10 20 10Z" stroke="#e5c07b" strokeWidth="1.3" fill="none"/>
                  <path d="M16 17C13 19 10 23 11 26C12 28 15 28 17 26.5C18.5 25.5 19.5 24 20 22.5" stroke="#e5c07b" strokeWidth="1.3"/>
                  <path d="M24 17C27 19 30 23 29 26C28 28 25 28 23 26.5C21.5 25.5 20.5 24 20 22.5" stroke="#e5c07b" strokeWidth="1.3"/>
                  <path d="M12 22C8 24 6 27 8 28.5C10 29.5 14 29 17 27" stroke="#e5c07b" strokeWidth="1.2" opacity="0.8"/>
                  <path d="M28 22C32 24 34 27 32 28.5C30 29.5 26 29 23 27" stroke="#e5c07b" strokeWidth="1.2" opacity="0.8"/>
                  <circle cx="20" cy="29" r="1.5" fill="#e5c07b"/>
                </svg>
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">SPIRITUAL HEALING</h4>
                <p className="pillar-desc">Energy healing for mind, body and soul.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg className="pillar-icon-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" stroke="#e5c07b" strokeWidth="1" strokeDasharray="1 3" opacity="0.6"/>
                  <path d="M14 28C16 26 18 24 20 24C23 24 26 25 28 27" stroke="#e5c07b" strokeWidth="1.3"/>
                  <path d="M12 24C14 22 17 21 21 21C24 21 27 22 29 24" stroke="#e5c07b" strokeWidth="1.3"/>
                  <circle cx="20" cy="14" r="4" stroke="#e5c07b" strokeWidth="1.3"/>
                  <path d="M20 7V9M20 19V21M13 14H15M25 14H27" stroke="#e5c07b" strokeWidth="1.2"/>
                </svg>
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">LIFE GUIDANCE</h4>
                <p className="pillar-desc">Clarity and direction for a meaningful life.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg className="pillar-icon-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" stroke="#e5c07b" strokeWidth="1" strokeDasharray="1 3" opacity="0.6"/>
                  <path d="M20 7C20 13 22 17 28 20C22 23 20 27 20 33C20 27 18 23 12 20C18 17 20 13 20 7Z" stroke="#e5c07b" strokeWidth="1.4" fill="rgba(229, 192, 123, 0.15)"/>
                  <circle cx="20" cy="20" r="2" fill="#e5c07b"/>
                  <circle cx="29" cy="11" r="1" fill="#e5c07b"/>
                  <circle cx="11" cy="29" r="1" fill="#e5c07b"/>
                </svg>
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">POSITIVE TRANSFORMATION</h4>
                <p className="pillar-desc">Empowering you to create a better tomorrow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION: CELESTIAL HERO & STORY ===== */}
        <section className="about-page-wrap" id="about">
          {/* 1. About Hero Banner */}
          <div className="about-hero-banner" style={{ backgroundImage: `url(${aboutHeroBg})` }}>
            <div className="about-hero-overlay" />
            <div className="about-hero-inner">
              <div className="about-hero-content">
                <div className="sacred-eyebrow light-eyebrow">
                  <span className="eyebrow-arrow-left">⟵</span>
                  <span className="eyebrow-text">ABOUT MASTER SHEKAR JI</span>
                  <span className="eyebrow-arrow-right">⟶</span>
                </div>
                <h2 className="about-hero-title">
                  Guiding Souls.
                  <br />
                  <span className="about-gold-highlight">Lighting</span> Paths.
                </h2>
                <div className="hero-lotus-divider light-divider">
                  <span className="divider-line" />
                  <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                    <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                    <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  </svg>
                  <span className="divider-line" />
                </div>
                <p className="about-hero-desc">
                  Master Shekar Ji is a trusted Vedic astrologer, spiritual guide, and life mentor, helping seekers find clarity, purpose, and peace through the timeless wisdom of the Vedas.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Know More About Us / Profile Section */}
          <div className="about-profile-section">
            <div className="about-profile-container">
              <div className="about-profile-grid">
                {/* Left Portrait Column */}
                <div className="about-portrait-card">
                  <div className="portrait-image-wrapper">
                    <img src={masterShekarPortrait} alt="Master Shekar Ji - Vedic Astrologer & Spiritual Guide" />
                    <span className="guru-signature-mark">Master Shekar Ji</span>
                  </div>
                  <div className="about-experience-badge">
                    <div className="badge-guru-icon">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e5c07b" strokeWidth="1.5">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                        <path d="M12 11v4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="badge-text">
                      <strong className="badge-years">20+</strong>
                      <small className="badge-label">Years of Experience</small>
                    </div>
                  </div>
                </div>

                {/* Right Story Column */}
                <div className="about-story-content">
                  <div className="eyebrow-accent">
                    <span className="accent-line" />
                    <span>KNOW MORE ABOUT US</span>
                    <span className="accent-line" />
                  </div>
                  <h3 className="about-story-title">
                    About Master <span className="story-gold-name">Shekar Ji</span>
                  </h3>
                  <div className="hero-lotus-divider compact-divider">
                    <span className="divider-line" />
                    <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(197, 145, 70, 0.15)" />
                      <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                      <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                    </svg>
                    <span className="divider-line" />
                  </div>
                  <p className="story-lead-para">
                    With over two decades of experience in Vedic astrology, spirituality, and divine guidance, Master Shekar Ji has dedicated his life to helping individuals navigate life's challenges and discover their true purpose.
                  </p>
                  <p className="story-secondary-para">
                    His profound knowledge of Vedic scriptures, planetary influences, and spiritual healing has transformed thousands of lives across the globe.
                  </p>

                  <div className="story-checkpoints-list">
                    <div className="checkpoint-item">
                      <div className="check-gold-icon">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span>Expertise in Vedic Astrology &amp; Kundli Analysis</span>
                    </div>
                    <div className="checkpoint-item">
                      <div className="check-gold-icon">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span>Specialized in Spiritual Healing &amp; Remedies</span>
                    </div>
                    <div className="checkpoint-item">
                      <div className="check-gold-icon">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span>Guidance Rooted in Vedic Scriptures</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 4-Metric Stats Counter Banner */}
          <div className="about-stats-banner">
            <div className="about-stats-inner">
              <div className="stat-counter-item">
                <div className="stat-icon-circle">
                  <Users size={20} className="stat-svg" />
                </div>
                <div className="stat-info">
                  <h4 className="stat-number">25K+</h4>
                  <p className="stat-title">Happy Clients</p>
                </div>
              </div>

              <div className="stat-counter-item">
                <div className="stat-icon-circle">
                  <Star size={20} className="stat-svg" />
                </div>
                <div className="stat-info">
                  <h4 className="stat-number">20+</h4>
                  <p className="stat-title">Years of Experience</p>
                </div>
              </div>

              <div className="stat-counter-item">
                <div className="stat-icon-circle">
                  <Globe size={20} className="stat-svg" />
                </div>
                <div className="stat-info">
                  <h4 className="stat-number">15+</h4>
                  <p className="stat-title">Countries Reached</p>
                </div>
              </div>

              <div className="stat-counter-item">
                <div className="stat-icon-circle">
                  <svg className="stat-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                    <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                    <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h4 className="stat-number">100+</h4>
                  <p className="stat-title">Workshops &amp; Events</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Our Philosophy Section (Ancient Wisdom, Modern Guidance) */}
          <div className="about-philosophy-section">
            <div className="philosophy-container">
              <div className="philosophy-grid">
                {/* Left Column: Heading & Mission */}
                <div className="philosophy-intro-col">
                  <div className="eyebrow-accent">
                    <span className="accent-line" />
                    <span>OUR PHILOSOPHY</span>
                    <span className="accent-line" />
                  </div>
                  <h3 className="philosophy-main-title">
                    Ancient Wisdom.
                    <br />
                    <span className="philosophy-gold-word">Modern</span> Guidance.
                  </h3>
                  <div className="hero-lotus-divider compact-divider">
                    <span className="divider-line" />
                    <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(197, 145, 70, 0.15)" />
                      <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                      <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                    </svg>
                    <span className="divider-line" />
                  </div>
                  <p className="philosophy-desc-text">
                    We believe that ancient Vedic wisdom holds the keys to modern life's challenges. Our mission is to bridge the gap between timeless scriptures and contemporary living.
                  </p>
                  <a className="philosophy-cta-btn" href="#services">
                    OUR SERVICES <ArrowRight size={14} />
                  </a>
                </div>

                {/* Middle Column: 4 Pillar Items */}
                <div className="philosophy-pillars-col">
                  <div className="philosophy-pillar-card">
                    <div className="pillar-circle-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v18" />
                        <path d="M3 12h18" />
                      </svg>
                    </div>
                    <div className="pillar-details">
                      <h4>Clarity</h4>
                      <p>Helping you gain clarity in life's important decisions.</p>
                    </div>
                  </div>

                  <div className="philosophy-pillar-card">
                    <div className="pillar-circle-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5">
                        <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                        <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5" />
                        <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5" />
                      </svg>
                    </div>
                    <div className="pillar-details">
                      <h4>Healing</h4>
                      <p>Providing spiritual healing for mind, body, and soul.</p>
                    </div>
                  </div>

                  <div className="philosophy-pillar-card">
                    <div className="pillar-circle-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
                        <path d="M12 2v2" />
                      </svg>
                    </div>
                    <div className="pillar-details">
                      <h4>Guidance</h4>
                      <p>Offering right direction aligned with your destiny.</p>
                    </div>
                  </div>

                  <div className="philosophy-pillar-card">
                    <div className="pillar-circle-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5">
                        <path d="M12 20V10" />
                        <path d="M18 14c0-3.3-2.7-6-6-6s-6 2.7-6 6" />
                        <path d="M12 4v2" />
                      </svg>
                    </div>
                    <div className="pillar-details">
                      <h4>Growth</h4>
                      <p>Empowering you to grow spiritually and personally.</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Vedic Scripture & Diya Lamp Photo */}
                <div className="philosophy-image-col">
                  <div className="scripture-frame">
                    <img src={vedicScriptureDiya} alt="Ancient Vedic manuscript book and burning brass diya oil lamp" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Our Values Section */}
          <div className="about-values-section">
            <div className="values-container">
              <div className="values-header">
                <h3 className="values-title">
                  Our <span className="values-gold-word">Values</span>
                </h3>
                <div className="hero-lotus-divider light-divider compact-divider">
                  <span className="divider-line" />
                  <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                  </svg>
                  <span className="divider-line" />
                </div>
              </div>

              <div className="values-cards-grid">
                <div className="value-card-box">
                  <div className="value-icon-circle">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#e5c07b" strokeWidth="1.5">
                      <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                      <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5" />
                      <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5" />
                    </svg>
                  </div>
                  <h4>Authenticity</h4>
                  <p>We follow the true essence of Vedic scriptures and authentic practices.</p>
                </div>

                <div className="value-card-box">
                  <div className="value-icon-circle">
                    <Heart size={24} className="value-svg" />
                  </div>
                  <h4>Compassion</h4>
                  <p>Every individual is treated with empathy, respect, and understanding.</p>
                </div>

                <div className="value-card-box">
                  <div className="value-icon-circle">
                    <ShieldCheck size={24} className="value-svg" />
                  </div>
                  <h4>Integrity</h4>
                  <p>Honest guidance and transparent practices you can always trust.</p>
                </div>

                <div className="value-card-box">
                  <div className="value-icon-circle">
                    <Sparkles size={24} className="value-svg" />
                  </div>
                  <h4>Empowerment</h4>
                  <p>We empower you with knowledge to create a better tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES (18) ===== */}
        <section className="services-section section-pad" id="services">
          <CosmicParticles count={25} />
          <div className="section-heading reveal"><div><div className="eyebrow"><span /> What we explore <span /></div><h2>A softer way to <em>see forward.</em></h2></div><p>Each session is tailored to your story — combining ancient insight with grounded, practical guidance for modern life.</p></div>
          <div className="service-grid-full">{allServices.map((service, i) => (
            <article className="service-card reveal" key={service.title}>
              <div className="service-top"><span className="service-number">{String(i + 1).padStart(2, '0')}</span><span className="service-icon">{service.icon}</span></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <a href="#contact">Book Now <ArrowRight size={15} /></a>
            </article>
          ))}</div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="why-section section-pad">
          <div className="section-heading centered reveal"><div><div className="eyebrow eyebrow-dark"><span /> Why choose us <span /></div><h2>Trust earned through <em>devotion.</em></h2></div><p>Every reading is delivered with integrity, precision, and a genuine commitment to your wellbeing.</p></div>
          <div className="why-grid">{whyChooseUs.map((item) => (
            <div className="why-card reveal" key={item.title}>
              <span className="why-icon">{item.icon}</span>
              <h3>{item.title}</h3><p>{item.description}</p>
            </div>
          ))}</div>
        </section>

        {/* ===== HOROSCOPE SECTION: CELESTIAL HERO ===== */}
        <section className="horoscope-page-wrap" id="horoscope">
          <div className="horoscope-hero-banner" style={{ backgroundImage: `url(${horoscopeHeroBg})` }}>
            <div className="horoscope-hero-overlay" />
            <div className="horoscope-hero-inner">
              <div className="horoscope-hero-content">
                <div className="sacred-eyebrow light-eyebrow">
                  <span className="eyebrow-arrow-left">⟵</span>
                  <span className="eyebrow-text">COSMIC INSIGHTS, PERSONAL GUIDANCE</span>
                  <span className="eyebrow-arrow-right">⟶</span>
                </div>
                <h2 className="horoscope-hero-title">
                  Your Horoscope,
                  <br />
                  <span className="horo-gold-path">Your Path.</span>
                </h2>
                <div className="hero-lotus-divider light-divider">
                  <span className="divider-line" />
                  <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                    <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                    <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  </svg>
                  <span className="divider-line" />
                </div>
                <p className="horoscope-hero-desc">
                  The stars hold guidance for your journey.
                  <br />
                  Explore what the universe has in store for you today.
                </p>
              </div>

              {/* Celestial Glowing Zodiac Wheel on Right */}
              <div className="horoscope-celestial-wheel-box" aria-hidden="true">
                <div className="celestial-glow-halo" />
                <div className="zodiac-rotating-wheel">
                  <div className="zodiac-ring ring-outer" />
                  <div className="zodiac-ring ring-mid" />
                  <div className="zodiac-ring ring-inner" />
                  {detailedHoroscopeData.map((item, idx) => {
                    const angle = idx * 30;
                    return (
                      <div
                        key={item.sign}
                        className="zodiac-wheel-node"
                        style={{
                          transform: `rotate(${angle}deg) translate(145px) rotate(-${angle}deg)`,
                        }}
                      >
                        <span className="zodiac-node-glyph">{item.symbol}</span>
                      </div>
                    );
                  })}
                  <div className="zodiac-center-lotus-core">
                    <svg className="center-lotus-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" stroke="#e5c07b" strokeWidth="1" strokeDasharray="2 3" opacity="0.6"/>
                      <path d="M20 8C20 8 16 14 16 20C16 23 18 25 20 25C22 25 24 23 24 20C24 14 20 8 20 8Z" fill="#e5c07b" fillOpacity="0.3" stroke="#e5c07b" strokeWidth="1.2"/>
                      <path d="M16 15C13 17 10 21 11 24C12 26 15 26 17 24.5C18.5 23.5 19.5 22 20 20.5" stroke="#e5c07b" strokeWidth="1.2"/>
                      <path d="M24 15C27 17 30 21 29 24C28 26 25 26 23 24.5C21.5 23.5 20.5 22 20 20.5" stroke="#e5c07b" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 2. READ YOUR SIGN SELECTOR & DETAIL CARD ===== */}
          <div className="read-your-sign-section">
            <div className="read-sign-container">
              {/* Heading */}
              <div className="read-sign-heading">
                <div className="eyebrow-accent">
                  <span className="accent-line" />
                  <span>DAILY HOROSCOPE</span>
                  <span className="accent-line" />
                </div>
                <h2>Read Your Sign</h2>
              </div>

              {/* 12-Sign Carousel Bar */}
              <div className="signs-carousel-wrap">
                <button
                  className="sign-nav-btn prev-btn"
                  onClick={() => setSelectedHoroscope((selectedHoroscope - 1 + detailedHoroscopeData.length) % detailedHoroscopeData.length)}
                  aria-label="Previous sign"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="signs-list-track">
                  {detailedHoroscopeData.map((h, index) => {
                    const isActive = index === selectedHoroscope;
                    return (
                      <button
                        key={h.sign}
                        className={isActive ? 'sign-chip-btn active' : 'sign-chip-btn'}
                        onClick={() => setSelectedHoroscope(index)}
                      >
                        <div className="sign-chip-icon-wrap">
                          <span className="sign-chip-symbol">{h.symbol}</span>
                        </div>
                        <span className="sign-chip-name">{h.sign}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  className="sign-nav-btn next-btn"
                  onClick={() => setSelectedHoroscope((selectedHoroscope + 1) % detailedHoroscopeData.length)}
                  aria-label="Next sign"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Selected Sign Detailed Card (Split Layout) */}
              <div className="horoscope-split-card" key={currentHoro.sign}>
                {/* Left Dark Column */}
                <div className="sign-profile-dark-col">
                  <div className="sign-profile-medallion">
                    <div className="medallion-outer-glow" />
                    <div className="medallion-circle">
                      <span className="medallion-main-symbol">{currentHoro.symbol}</span>
                      <span className="medallion-mini-star s1">✦</span>
                      <span className="medallion-mini-star s2">✦</span>
                      <span className="medallion-mini-star s3">✦</span>
                    </div>
                  </div>

                  <h3 className="sign-profile-name">{currentHoro.sign}</h3>
                  <div className="sign-profile-stars">✦ ❖ ✦</div>
                  <p className="sign-date-range">{currentHoro.dateRange}</p>

                  <div className="sign-meta-pills">
                    <span>Element: <strong>{currentHoro.element}</strong></span>
                    <span className="meta-dot">•</span>
                    <span>Ruling Planet: <strong>{currentHoro.rulingPlanet}</strong></span>
                  </div>

                  <a className="sign-detailed-btn" href="#contact">
                    VIEW DETAILED PREDICTION <ArrowRight size={14} />
                  </a>
                </div>

                {/* Right Light Column */}
                <div className="sign-prediction-light-col">
                  <div className="prediction-col-top">
                    <h4 className="prediction-heading">Today's Horoscope</h4>
                    <div className="prediction-date-badge">
                      <CalendarDays size={14} className="cal-icon" />
                      <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <p className="prediction-body-text">{currentHoro.prediction}</p>

                  {/* 4 Aspect Cards Grid */}
                  <div className="aspect-cards-grid">
                    <div className="aspect-card">
                      <div className="aspect-icon-wrap">
                        <svg className="aspect-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </div>
                      <div className="aspect-info">
                        <h5>Love</h5>
                        <p>{currentHoro.love}</p>
                      </div>
                    </div>

                    <div className="aspect-card">
                      <div className="aspect-icon-wrap">
                        <svg className="aspect-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      </div>
                      <div className="aspect-info">
                        <h5>Career</h5>
                        <p>{currentHoro.career}</p>
                      </div>
                    </div>

                    <div className="aspect-card">
                      <div className="aspect-icon-wrap">
                        <svg className="aspect-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                          <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                          <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                        </svg>
                      </div>
                      <div className="aspect-info">
                        <h5>Health</h5>
                        <p>{currentHoro.health}</p>
                      </div>
                    </div>

                    <div className="aspect-card">
                      <div className="aspect-icon-wrap">
                        <svg className="aspect-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <ellipse cx="12" cy="6" rx="8" ry="3"/>
                          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
                          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
                        </svg>
                      </div>
                      <div className="aspect-info">
                        <h5>Finance</h5>
                        <p>{currentHoro.finance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Lucky Attributes Bar */}
                  <div className="lucky-attributes-dark-bar">
                    <div className="lucky-attr-col">
                      <span className="lucky-label">Lucky Number</span>
                      <strong className="lucky-val">{currentHoro.luckyNumber}</strong>
                    </div>
                    <div className="lucky-attr-col">
                      <span className="lucky-label">Lucky Color</span>
                      <strong className="lucky-val">{currentHoro.luckyColor}</strong>
                    </div>
                    <div className="lucky-attr-col">
                      <span className="lucky-label">Lucky Day</span>
                      <strong className="lucky-val">{currentHoro.luckyDay}</strong>
                    </div>
                    <div className="lucky-attr-col">
                      <span className="lucky-label">Gemstone</span>
                      <strong className="lucky-val">{currentHoro.gemstone}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== 3. PERSONALIZED HOROSCOPE READING BANNER ===== */}
              <div className="personalized-reading-banner">
                <div className="reading-banner-content">
                  <div className="go-deeper-tag">
                    <span>GO DEEPER</span>
                    <span className="tag-arrow">⟶</span>
                  </div>
                  <h3>Get Your Personalized Horoscope Reading</h3>
                  <p>
                    Get detailed insights based on your birth chart and experience personalized guidance for your life.
                  </p>
                  <a className="reading-cta-btn" href="#contact">
                    BOOK A CONSULTATION <ArrowRight size={14} />
                  </a>
                </div>
                <div className="reading-banner-image">
                  <img src={vedicKundaliImg} alt="Vedic Kundali birth chart and antique astrolabe compass" />
                </div>
              </div>
            </div>
          </div>

          {/* ===== 4. SACRED WISDOM STRIP ===== */}
          <div className="horoscope-wisdom-ribbon">
            <div className="ribbon-inner">
              <span className="ribbon-sparkle">✦</span>
              <span className="ribbon-om">ॐ</span>
              <p className="ribbon-text">
                The stars incline, they do not compel.
                <br />
                You hold the power to shape your destiny.
              </p>
              <span className="ribbon-om">ॐ</span>
              <span className="ribbon-sparkle">✦</span>
            </div>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section className="gallery-section section-pad" id="gallery">
          <div className="section-heading centered reveal"><div><div className="eyebrow eyebrow-dark"><span /> Sacred moments <span /></div><h2>A glimpse of the <em>divine.</em></h2></div><p>Sacred lamps, lotus blessings, meditation, gemstones, and the cosmic dance above us all.</p></div>
          <div className="gallery-grid">{galleryImages.map((img, i) => (
            <div className={i === 0 ? 'gallery-item gallery-large reveal' : 'gallery-item reveal'} key={i}>
              <img src={img.url} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay"><span>{img.label}</span></div>
            </div>
          ))}</div>
        </section>

        {/* ===== BLOG & INSIGHTS (MATCHING REFERENCE DESIGN) ===== */}
        <section className="blog-page-wrap" id="blog">
          {/* 1. Blog Hero Banner */}
          <div className="blog-hero-banner" style={{ backgroundImage: `url(${blogHeroBg})` }}>
            <div className="blog-hero-overlay" />
            <div className="blog-hero-inner">
              <div className="blog-hero-content">
                <div className="sacred-eyebrow light-eyebrow">
                  <span className="eyebrow-arrow-left">⟵</span>
                  <span className="eyebrow-text">BLOG &amp; INSIGHTS</span>
                  <span className="eyebrow-arrow-right">⟶</span>
                </div>
                <h2 className="blog-hero-title">
                  Wisdom to <span className="blog-gold-word">Inspire.</span>
                  <br />
                  Guidance to <span className="blog-gold-word">Transform.</span>
                </h2>
                <div className="hero-lotus-divider light-divider">
                  <span className="divider-line" />
                  <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                    <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                    <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  </svg>
                  <span className="divider-line" />
                </div>
                <p className="blog-hero-desc">
                  Explore articles on Vedic astrology, spiritual growth, rituals, and timeless wisdom to help you live a more meaningful life.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Blog Main Section */}
          <div className="blog-main-section">
            <div className="blog-container">
              {/* Category Filter Pills & Search Bar */}
              <div className="blog-filter-search-bar">
                <div className="blog-filter-pills">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat.id}
                      className={selectedBlogCategory === cat.id ? 'blog-filter-btn active' : 'blog-filter-btn'}
                      onClick={() => setSelectedBlogCategory(cat.id)}
                    >
                      {cat.icon === 'grid' && <LayoutGrid size={13} />}
                      {cat.icon === 'star' && <Star size={13} />}
                      {cat.icon === 'lotus' && (
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                        </svg>
                      )}
                      {cat.icon === 'diya' && <Flame size={13} />}
                      {cat.icon === 'temple' && <Landmark size={13} />}
                      {cat.icon === 'heart' && <Heart size={13} />}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                <div className="blog-search-box">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                  />
                  <Search size={15} className="search-icon" />
                </div>
              </div>

              {/* Blog Content Layout: Left Cards + Right Sidebar */}
              <div className="blog-content-layout">
                {/* Left Column: 6 Cards */}
                <div className="blog-posts-column">
                  <div className="blog-cards-grid">
                    {filteredBlogPosts.map((post) => (
                      <article className="blog-card-item" key={post.id}>
                        <div className="blog-card-thumb">
                          <img src={post.image} alt={post.title} loading="lazy" />
                          <span className="card-category-badge">{post.category}</span>
                        </div>
                        <div className="blog-card-details">
                          <div className="blog-card-meta">
                            <span className="meta-date">{post.date}</span>
                            <span className="meta-sep">•</span>
                            <span className="meta-read">{post.readTime}</span>
                          </div>
                          <h3 className="blog-card-title">{post.title}</h3>
                          <p className="blog-card-excerpt">{post.excerpt}</p>
                          <a className="blog-read-more" href="#contact">
                            Read More <ArrowRight size={13} />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>

                  {filteredBlogPosts.length === 0 && (
                    <div className="no-blog-results">
                      <p>No articles found matching "{blogSearch}".</p>
                      <button className="reset-filter-btn" onClick={() => { setBlogSearch(''); setSelectedBlogCategory('All Posts'); }}>
                        Clear Search
                      </button>
                    </div>
                  )}

                  {/* Pagination Bar */}
                  <div className="blog-pagination">
                    <button className="page-btn arrow-btn" disabled>
                      <ChevronLeft size={14} />
                    </button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-dots">...</span>
                    <button className="page-btn">8</button>
                    <button className="page-btn arrow-btn">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Sidebar */}
                <aside className="blog-sidebar-col">
                  {/* Featured Article Card */}
                  <div className="featured-article-card">
                    <div className="featured-card-header">
                      <span>Featured Article</span>
                      <span className="featured-arrow">⟵</span>
                    </div>
                    <div className="featured-thumb">
                      <img src={blogMoonSignImg} alt="How Your Moon Sign Shapes Your Emotions" />
                    </div>
                    <div className="featured-card-body">
                      <h4 className="featured-title">How Your Moon Sign Shapes Your Emotions</h4>
                      <p className="featured-desc">The Moon governs your mind and emotions. Learn how your Moon sign influences your inner world.</p>
                      <a className="featured-read-btn" href="#contact">
                        Read Full Article <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Popular Posts Widget */}
                  <div className="sidebar-widget-card">
                    <h4 className="widget-title">Popular Posts</h4>
                    <div className="popular-posts-list">
                      {popularPosts.map((pop) => (
                        <a className="popular-item" key={pop.id} href="#contact">
                          <img className="pop-thumb" src={pop.image} alt={pop.title} />
                          <div className="pop-info">
                            <h5 className="pop-title">{pop.title}</h5>
                            <span className="pop-date">{pop.date}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Tags Widget */}
                  <div className="sidebar-widget-card">
                    <h4 className="widget-title">Tags</h4>
                    <div className="tags-cloud">
                      {blogTags.map((tag) => (
                        <button
                          key={tag}
                          className="tag-pill"
                          onClick={() => {
                            setBlogSearch(tag);
                            setSelectedBlogCategory('All Posts');
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>

              {/* 3. Stay Inspired Newsletter Banner */}
              <div className="newsletter-stay-inspired-banner">
                <div className="newsletter-left">
                  <div className="newsletter-icon-circle">
                    <Mail size={22} className="mail-gold-icon" />
                  </div>
                  <div className="newsletter-text">
                    <h3 className="newsletter-title">Stay Inspired</h3>
                    <p className="newsletter-sub">
                      Subscribe to receive spiritual insights, astrology updates, and exclusive content straight to your inbox.
                    </p>
                  </div>
                </div>

                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setNewsletterSubscribed(true); }}>
                  {newsletterSubscribed ? (
                    <div className="newsletter-success">
                      <CheckCircle2 size={16} />
                      <span>Thank you for subscribing! Blessings sent.</span>
                    </div>
                  ) : (
                    <div className="newsletter-input-group">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <button type="submit" className="newsletter-submit-btn">
                        SUBSCRIBE <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="testimonial-section section-pad" id="stories">
          <div className="section-heading centered reveal"><div><div className="eyebrow eyebrow-dark"><span /> Kind words <span /></div><h2>Stories of <em>new beginnings.</em></h2></div></div>
          <div className="testimonial-grid">{testimonials.map((testimonial) => <article className="testimonial reveal" key={testimonial.name}><div className="stars">★★★★★</div><p>"{testimonial.quote}"</p><div className="person"><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>{testimonial.place}</small></div></div></article>)}</div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="process-section section-pad">
          <div className="process-intro reveal"><div className="eyebrow"><span /> The experience <span /></div><h2>Simple, personal,<br /><em>spacious.</em></h2><p>There is no need to have the perfect question. Just bring what is alive for you right now.</p></div>
          <div className="process-steps">{[['01', 'Choose your focus', 'Select the area of life where you are seeking clarity.'], ['02', 'Share your details', 'Tell us a little about your birth chart and your intention.'], ['03', 'Receive guidance', 'Meet privately and leave with insight you can truly use.']].map(([number, title, text]) => <div className="process-step reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="faq-section section-pad" id="faq"><div className="section-heading reveal"><div><div className="eyebrow eyebrow-dark"><span /> You may be wondering <span /></div><h2>Make space for your <em>questions.</em></h2></div><p>Everything you need to feel comfortable before your first consultation.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={activeFaq === index ? 'faq-item active' : 'faq-item'} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{activeFaq === index && <p>{answer}</p>}</div>)}</div></section>

        {/* ===== CONTACT PAGE (MATCHING REFERENCE DESIGN) ===== */}
        <section className="contact-page-wrap" id="contact">
          {/* 1. Contact Hero Banner */}
          <div className="contact-hero-banner" style={{ backgroundImage: `url(${blogHeroBg})` }}>
            <div className="contact-hero-overlay" />
            <div className="contact-hero-inner">
              <div className="contact-hero-grid">
                {/* Left Column: Info & Hours */}
                <div className="contact-hero-intro">
                  <div className="sacred-eyebrow light-eyebrow">
                    <span className="eyebrow-arrow-left">⟵</span>
                    <span className="eyebrow-text">GET IN TOUCH</span>
                    <span className="eyebrow-arrow-right">⟶</span>
                  </div>
                  <h2 className="contact-hero-title">
                    We're Here
                    <br />
                    to <span className="contact-gold-word">Help You</span>
                  </h2>
                  <div className="hero-lotus-divider light-divider">
                    <span className="divider-line" />
                    <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                      <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                      <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                      <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                    </svg>
                    <span className="divider-line" />
                  </div>
                  <p className="contact-hero-desc">
                    Have a question, need guidance, or want to book a consultation? We'd love to hear from you. Reach out to us and we'll get back to you as soon as possible.
                  </p>

                  {/* 3-Pill Quick Info Box */}
                  <div className="contact-quick-bar">
                    <div className="quick-info-col">
                      <Headphones size={18} className="quick-icon-gold" />
                      <div className="quick-meta">
                        <strong className="quick-label">Consultation Hours</strong>
                        <span className="quick-val">9AM - 8PM<br />(All Days)</span>
                      </div>
                    </div>

                    <div className="quick-divider-line" />

                    <div className="quick-info-col">
                      <Phone size={18} className="quick-icon-gold" />
                      <div className="quick-meta">
                        <strong className="quick-label">Call Us</strong>
                        <a href="tel:+919876543210" className="quick-val link-val">+91 98765 43210</a>
                      </div>
                    </div>

                    <div className="quick-divider-line" />

                    <div className="quick-info-col">
                      <Mail size={18} className="quick-icon-gold" />
                      <div className="quick-meta">
                        <strong className="quick-label">Email Us</strong>
                        <a href="mailto:support@mastershekarji.com" className="quick-val link-val">support@mastershekarji.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Send Us a Message Card */}
                <div className="contact-form-card-wrap">
                  <div className="send-message-card">
                    <h3 className="card-heading-title">Send Us a Message</h3>
                    <div className="heading-gold-dash" />

                    {submitted ? (
                      <div className="form-success-box">
                        <div className="success-icon-circle">
                          <Check size={28} />
                        </div>
                        <h4>Your Message is Received</h4>
                        <p>Thank you for reaching out. Master Shekar Ji's team will connect with you shortly with divine perspective and guidance.</p>
                        <button className="reset-form-btn" onClick={() => setSubmitted(false)}>
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form className="contact-message-form" onSubmit={handleSubmit}>
                        <div className="form-inputs-grid">
                          <div className="input-with-icon">
                            <User size={15} className="field-icon" />
                            <input required type="text" placeholder="Your Name" />
                          </div>

                          <div className="input-with-icon">
                            <Mail size={15} className="field-icon" />
                            <input required type="email" placeholder="Your Email" />
                          </div>

                          <div className="input-with-icon">
                            <Phone size={15} className="field-icon" />
                            <input type="tel" placeholder="Your Phone Number" />
                          </div>

                          <div className="input-with-icon">
                            <Tag size={15} className="field-icon" />
                            <input type="text" placeholder="Subject" />
                          </div>
                        </div>

                        <div className="textarea-with-icon">
                          <PenLine size={15} className="field-icon textarea-icon" />
                          <textarea required placeholder="Your Message" rows={4} />
                        </div>

                        <button type="submit" className="contact-submit-btn">
                          SEND MESSAGE <ArrowRight size={14} />
                        </button>

                        <div className="privacy-reassurance">
                          <ShieldCheck size={14} className="shield-icon" />
                          <span>Your information is safe with us. We respect your privacy.</span>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. "Connect With Us" Section */}
          <div className="connect-with-us-section">
            <div className="connect-container">
              <div className="connect-header">
                <h3 className="connect-main-title">Connect With Us</h3>
                <div className="hero-lotus-divider compact-divider">
                  <span className="divider-line" />
                  <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#c59146" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(197, 145, 70, 0.15)" />
                    <path d="M9 10C7 11.5 4 14.5 5 17C6 18.5 8.5 18.5 10 17.5C11 16.8 11.7 15.5 12 14.5" />
                    <path d="M15 10C17 11.5 20 14.5 19 17C18 18.5 15.5 18.5 14 17.5C13 16.8 12.3 15.5 12 14.5" />
                  </svg>
                  <span className="divider-line" />
                </div>
              </div>

              <div className="connect-split-grid">
                {/* Left 4 Pillars */}
                <div className="connect-pillars-grid">
                  <div className="connect-info-box">
                    <div className="connect-icon-circle">
                      <MapPin size={20} className="connect-gold-svg" />
                    </div>
                    <h4>Our Office</h4>
                    <p>B-123, Spiritual Street,<br />Rishikesh, Uttarakhand - 249201<br />India</p>
                  </div>

                  <div className="connect-info-box">
                    <div className="connect-icon-circle">
                      <Phone size={20} className="connect-gold-svg" />
                    </div>
                    <h4>Call Us</h4>
                    <p><a href="tel:+919876543210">+91 98765 43210</a><br /><a href="tel:+919876543211">+91 98765 43211</a></p>
                  </div>

                  <div className="connect-info-box">
                    <div className="connect-icon-circle">
                      <Mail size={20} className="connect-gold-svg" />
                    </div>
                    <h4>Email Us</h4>
                    <p><a href="mailto:support@mastershekarji.com">support@mastershekarji.com</a><br /><a href="mailto:info@mastershekarji.com">info@mastershekarji.com</a></p>
                  </div>

                  <div className="connect-info-box">
                    <div className="connect-icon-circle">
                      <Clock size={20} className="connect-gold-svg" />
                    </div>
                    <h4>Consultation Hours</h4>
                    <p>9AM - 8PM<br />(All Days)</p>
                  </div>
                </div>

                {/* Right Framed Spiritual Image */}
                <div className="connect-photo-col">
                  <div className="connect-frame-card">
                    <img src={vedicScriptureDiya} alt="Sacred Diya and Spiritual Journey Plaque" />
                    <div className="spiritual-journey-overlay-plaque">
                      <div className="plaque-inner-box">
                        <span className="plaque-corner top-left">✦</span>
                        <span className="plaque-corner top-right">✦</span>
                        <p className="plaque-quote-text">
                          We are here
                          <br />
                          to guide you on
                          <br />
                          your spiritual
                          <br />
                          journey.
                        </p>
                        <div className="plaque-lotus">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                            <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" fill="rgba(229, 192, 123, 0.2)" />
                          </svg>
                        </div>
                        <span className="plaque-corner bottom-left">✦</span>
                        <span className="plaque-corner bottom-right">✦</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Sacred Wisdom Ribbon */}
          <div className="contact-wisdom-ribbon">
            <div className="wisdom-ribbon-inner">
              <div className="ribbon-om-badge">
                <span className="sacred-om-char">ॐ</span>
              </div>

              <div className="ribbon-quote-block">
                <blockquote className="ribbon-quote-phrase">
                  "When the seeker is ready, the guide appears."
                </blockquote>
                <div className="ribbon-lotus-mark">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e5c07b" strokeWidth="1.3">
                    <path d="M12 4C12 4 9 9 9 14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14C15 9 12 4 12 4Z" />
                  </svg>
                </div>
              </div>

              <a className="ribbon-book-btn" href="#contact">
                <CalendarDays size={15} className="btn-cal-icon" />
                <span>BOOK A CONSULTATION</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== LUXURY FOOTER (MATCHING REFERENCE DESIGN) ===== */}
      <footer className="footer-luxury-wrap">
        <div className="footer-luxury-container">
          <div className="footer-luxury-grid">
            {/* Col 1: Brand & Philosophy */}
            <div className="footer-col-brand">
              <a className="footer-brand-header" href="#home">
                <img className="footer-logo-img" src={logoImg} alt="Master Shekar Ji" />
                <div className="footer-brand-names">
                  <strong className="footer-brand-title">MASTER SHEKAR JI</strong>
                  <small className="footer-brand-subtitle">VEDIC WISDOM · SPIRITUAL GUIDANCE</small>
                </div>
              </a>
              <p className="footer-brand-desc">
                Guiding souls with ancient Vedic wisdom and spiritual practices for a life of clarity, purpose, and peace.
              </p>
              <div className="footer-social-circles">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={14} /></a>
                <a href="https://instagram.com/mastershekarji.official" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={14} /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={14} /></a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={14} /></a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="footer-col-links">
              <h4 className="footer-col-heading">Quick Links</h4>
              <ul className="footer-nav-list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#horoscope">Horoscope</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div className="footer-col-links">
              <h4 className="footer-col-heading">Our Services</h4>
              <ul className="footer-nav-list">
                <li><a href="#services">Vedic Astrology</a></li>
                <li><a href="#services">Kundli Analysis</a></li>
                <li><a href="#services">Puja &amp; Rituals</a></li>
                <li><a href="#services">Spiritual Healing</a></li>
                <li><a href="#services">Remedies</a></li>
                <li><a href="#services">Life Guidance</a></li>
              </ul>
            </div>

            {/* Col 4: Helpful Links */}
            <div className="footer-col-links">
              <h4 className="footer-col-heading">Helpful Links</h4>
              <ul className="footer-nav-list">
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms &amp; Conditions</a></li>
                <li><a href="#shipping">Shipping &amp; Delivery</a></li>
                <li><a href="#refund">Refund Policy</a></li>
              </ul>
            </div>

            {/* Col 5: Contact Us */}
            <div className="footer-col-contact">
              <h4 className="footer-col-heading">Contact Us</h4>
              <div className="footer-contact-items">
                <div className="contact-item-row">
                  <MapPin size={15} className="contact-gold-icon" />
                  <span>B-123, Spiritual Street, Rishikesh, Uttarakhand - 249201, India</span>
                </div>
                <div className="contact-item-row">
                  <Phone size={15} className="contact-gold-icon" />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="contact-item-row">
                  <Mail size={15} className="contact-gold-icon" />
                  <a href="mailto:support@mastershekarji.com">support@mastershekarji.com</a>
                </div>
                <div className="contact-item-row">
                  <Clock size={15} className="contact-gold-icon" />
                  <span>Consultation Available 9AM - 8PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Ribbon with Sacred Om */}
          <div className="footer-bottom-ribbon">
            <p className="copyright-text">© 2025 Master Shekar Ji. All Rights Reserved.</p>
            <div className="footer-sacred-flourish">
              <span className="flourish-line" />
              <span className="flourish-om">ॐ</span>
              <span className="flourish-line" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky WhatsApp Button (Icon Only) */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

export default App;
