import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Sparkles,
  X,
  Youtube,
} from 'lucide-react';
import CosmicParticles from '@/CosmicParticles';
import { useScrollY, useReveal, useScrolled } from '@/useScrollEffects';
import logoImg from './assets/logo.jpeg';

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

const horoscopeData: { sign: string; symbol: string; color: string; number: string; career: string; love: string; health: string; money: string }[] = [
  { sign: 'Aries', symbol: '♈', color: 'Red', number: '9', career: 'A bold move opens doors today.', love: 'Speak from the heart.', health: 'Channel your energy wisely.', money: 'Avoid impulsive spending.' },
  { sign: 'Taurus', symbol: '♉', color: 'Green', number: '6', career: 'Steady progress brings rewards.', love: 'Deepen your connection.', health: 'Rest and nourish your body.', money: 'A good day for investments.' },
  { sign: 'Gemini', symbol: '♊', color: 'Yellow', number: '5', career: 'Communication is your superpower.', love: 'A meaningful conversation awaits.', health: 'Calm your restless mind.', money: 'Diversify your interests.' },
  { sign: 'Cancer', symbol: '♋', color: 'Silver', number: '2', career: 'Trust your intuition at work.', love: 'Home is where the heart blooms.', health: 'Prioritize emotional wellness.', money: 'Save for a rainy day.' },
  { sign: 'Leo', symbol: '♌', color: 'Gold', number: '1', career: 'Your leadership shines brightly.', love: 'Express your generous spirit.', health: 'Stay active and vibrant.', money: 'Generosity returns to you.' },
  { sign: 'Virgo', symbol: '♍', color: 'Navy', number: '5', career: 'Attention to detail pays off.', love: 'Show your care through actions.', health: 'A balanced routine heals.', money: 'Organize your finances today.' },
  { sign: 'Libra', symbol: '♎', color: 'Pink', number: '6', career: 'Seek harmony in partnerships.', love: 'Beauty surrounds your bond.', health: 'Find your inner equilibrium.', money: 'Fairness brings prosperity.' },
  { sign: 'Scorpio', symbol: '♏', color: 'Maroon', number: '9', career: 'Transform challenges into power.', love: 'Passion runs deep today.', health: 'Release what no longer serves.', money: 'A hidden opportunity emerges.' },
  { sign: 'Sagittarius', symbol: '♐', color: 'Purple', number: '3', career: 'Expand your horizons fearlessly.', love: 'Adventure calls you together.', health: 'Move your body with joy.', money: 'Optimism attracts abundance.' },
  { sign: 'Capricorn', symbol: '♑', color: 'Brown', number: '8', career: 'Discipline builds your empire.', love: 'Loyalty is your greatest gift.', health: 'Structure supports your wellbeing.', money: 'Long-term plans bear fruit.' },
  { sign: 'Aquarius', symbol: '♒', color: 'Blue', number: '4', career: 'Innovation sets you apart.', love: 'Celebrate your unique bond.', health: 'Breathe and release tension.', money: 'Future-focused thinking pays.' },
  { sign: 'Pisces', symbol: '♓', color: 'Sea Green', number: '7', career: 'Creativity flows effortlessly.', love: 'Compassion deepens your connection.', health: 'Water heals and restores you.', money: 'Trust your gentle instincts.' },
];

const galleryImages = [
  { url: 'https://images.pexels.com/photos/10182772/pexels-photo-10182772.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Traditional Diwali diyas', label: 'Sacred lamps' },
  { url: 'https://images.pexels.com/photos/30428756/pexels-photo-30428756.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Floating lotus candles', label: 'Lotus blessings' },
  { url: 'https://images.pexels.com/photos/8981374/pexels-photo-8981374.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Meditation by the sea', label: 'Meditation' },
  { url: 'https://images.pexels.com/photos/4040639/pexels-photo-4040639.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Crystals and gemstones', label: 'Sacred gemstones' },
  { url: 'https://images.pexels.com/photos/6944923/pexels-photo-6944923.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Tarot cards and candles', label: 'Tarot guidance' },
  { url: 'https://images.pexels.com/photos/982378/nature-milky-way-galaxy-stars-982378.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Milky Way night sky', label: 'Cosmic dance' },
];

const blogPosts = [
  { title: 'What is Vedic Astrology?', excerpt: 'Discover the ancient science of Jyotish and how it illuminates the path of your soul through the stars.', date: 'Aug 15, 2025', tag: 'Astrology 101' },
  { title: 'Benefits of Spiritual Healing', excerpt: 'Explore how energy work can release blockages, restore balance, and bring peace to your daily life.', date: 'Aug 10, 2025', tag: 'Healing' },
  { title: 'The Power of Rudraksha', excerpt: 'Learn about the sacred beads worn for centuries to calm the mind and deepen spiritual practice.', date: 'Aug 5, 2025', tag: 'Spiritual Tools' },
  { title: 'Importance of Horoscope Matching', excerpt: 'Why Kundali matching matters before marriage and what the stars reveal about compatibility.', date: 'Jul 28, 2025', tag: 'Relationships' },
  { title: 'How Planets Affect Your Life', excerpt: 'Understand the influence of the Navagraha and how each planet shapes your journey.', date: 'Jul 20, 2025', tag: 'Cosmic Science' },
  { title: 'Meditation Tips for Inner Peace', excerpt: 'Simple, practical techniques to quiet the mind and reconnect with your true self.', date: 'Jul 12, 2025', tag: 'Wellness' },
  { title: 'A Beginner\'s Gemstone Guide', excerpt: 'Which stones suit your sign, how to wear them, and the energies they carry.', date: 'Jul 5, 2025', tag: 'Gemstones' },
];

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
  const scrollY = useScrollY();
  const scrolled = useScrolled(40);
  useReveal();

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
  const currentHoro = horoscopeData[selectedHoroscope];

  return (
    <div className="site-shell">
      <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
        <a className="brand" href="#home" aria-label="Master Shekar Ji home">
          <img src={logoImg} alt="Master Shekar Ji" />
          <span><strong>MASTER SHEKAR JI</strong><small>Vedic wisdom · spiritual guidance</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Begin your journey <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero" id="home">
          <div className="hero-carousel" aria-hidden="true">
            {heroSlides.map((slide, i) => (
              <div key={i} className={i === currentSlide ? 'carousel-slide active' : 'carousel-slide'}
                style={{ backgroundImage: `url(${slide.url})`, transform: `scale(1.12) translateY(${parallaxOffset * 0.3}px)` }} />
            ))}
            <div className="carousel-overlay" />
            <CosmicParticles count={45} />
          </div>
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-stars">✦ · ✧ · ✦ · ✧ · ✦</div>
          <div className="hero-copy reveal" style={{ opacity: heroFade, transform: `translateY(${scrollY * 0.15}px)` }}>
            <div className="eyebrow"><span /> A sacred space for your next chapter <span /></div>
            <p className="hero-kicker">Astrologer · Spiritual Healer · Life Coach</p>
            <h1>Find the <em>clarity</em><br />already within you.</h1>
            <p className="hero-intro">Authentic Vedic wisdom and soulful guidance to help you move through life with more trust, purpose, and peace.</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">Book a consultation <ArrowRight size={17} /></a><a className="button button-ghost" href="#about"><span className="play-icon"><Play size={11} fill="currentColor" /></span> Discover the approach</a></div>
            <div className="hero-note"><span className="live-dot" /> Private consultations · Mauritius & worldwide</div>
          </div>
          <div className="hero-art" aria-hidden="true" style={{ opacity: heroFade * 0.95, transform: `translateY(${scrollY * -0.12}px) scale(${1 - scrollY * 0.0002})` }}>
            <div className="art-glow" /><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="om-symbol">ॐ</div><div className="lotus">♧</div><div className="art-caption">ॐ <span>As above, so within</span> ॐ</div>
          </div>
          <div className="carousel-controls">
            <button onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide"><ChevronLeft size={20} /></button>
            <div className="carousel-dots">{heroSlides.map((slide, i) => <button key={i} className={i === currentSlide ? 'dot active' : 'dot'} onClick={() => setCurrentSlide(i)} aria-label={`Show ${slide.label}`} />)}</div>
            <button onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)} aria-label="Next slide"><ChevronRight size={20} /></button>
          </div>
          <div className="hero-bottom"><div><strong>5,000+</strong><span>souls guided</span></div><div><strong>15</strong><span>years of wisdom</span></div><div><strong>24/7</strong><span>divine support</span></div></div>
        </section>

        <section className="trust-strip"><span>Guidance rooted in</span><strong>Vedic Astrology</strong><i /> <strong>Spiritual Healing</strong><i /> <strong>Conscious Living</strong><span className="trust-mark">✦</span></section>

        {/* ===== ABOUT ===== */}
        <section className="split-section section-pad" id="about">
          <div className="portrait-frame reveal" style={{ transform: `translateY(${Math.max(-40, (scrollY - 500) * -0.05)}px)` }}>
            <div className="portrait-inner"><img src={logoImg} alt="Master Shekar Ji spiritual practice" /></div>
            <div className="portrait-badge"><Sparkles size={18} /><span>Guiding you<br /><strong>towards a better tomorrow</strong></span></div>
          </div>
          <div className="section-copy reveal"><div className="eyebrow eyebrow-dark"><span /> The guide <span /></div><h2>Wisdom that meets you <em>where you are.</em></h2><p>Master Shekar Ji believes that astrology is not about fear or fixed fate. It is a sacred mirror — a way to understand your nature, your seasons, and the beautiful choices that remain yours to make.</p><p>With over 15 years of practice, every consultation is a private, compassionate space to bring your questions, receive perspective, and reconnect with your inner knowing.</p><a className="text-link" href="#contact">Meet your guide <ArrowRight size={16} /></a><div className="signature">Shekar Ji <span>ॐ</span></div></div>
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

        {/* ===== WISDOM QUOTE ===== */}
        <section className="wisdom-section" id="wisdom">
          <div className="mandala" style={{ transform: `rotate(${scrollY * 0.05}deg)` }}>✺</div>
          <CosmicParticles count={20} />
          <div className="wisdom-content reveal"><div className="eyebrow"><span /> A daily reflection <span /></div><blockquote>"When the mind is still, the path becomes visible."</blockquote><p>Take a breath. Release the need to know everything at once. Your next step does not need to be loud to be right.</p><div className="wisdom-author">— Master Shekar Ji <span /></div></div>
        </section>

        {/* ===== DAILY HOROSCOPE ===== */}
        <section className="horoscope-section section-pad" id="horoscope">
          <div className="section-heading centered reveal"><div><div className="eyebrow eyebrow-dark"><span /> Daily horoscope <span /></div><h2>What the stars <em>whisper today.</em></h2></div><p>Select your sign to reveal your daily guidance across every area of life.</p></div>
          <div className="horoscope-signs-bar reveal">
            {horoscopeData.map((h, i) => (
              <button key={h.sign} className={i === selectedHoroscope ? 'horo-sign-btn active' : 'horo-sign-btn'} onClick={() => setSelectedHoroscope(i)}>
                <span className="horo-symbol">{h.symbol}</span><small>{h.sign}</small>
              </button>
            ))}
          </div>
          <div className="horoscope-detail reveal" key={selectedHoroscope}>
            <div className="horo-detail-header">
              <span className="horo-big-symbol">{currentHoro.symbol}</span>
              <div><h3>{currentHoro.sign}</h3><small>Today's Reading</small></div>
            </div>
            <div className="horo-detail-grid">
              <div className="horo-detail-item"><span className="horo-label">Career</span><p>{currentHoro.career}</p></div>
              <div className="horo-detail-item"><span className="horo-label">Love</span><p>{currentHoro.love}</p></div>
              <div className="horo-detail-item"><span className="horo-label">Health</span><p>{currentHoro.health}</p></div>
              <div className="horo-detail-item"><span className="horo-label">Money</span><p>{currentHoro.money}</p></div>
            </div>
            <div className="horo-lucky">
              <div><small>Lucky Color</small><strong>{currentHoro.color}</strong></div>
              <div><small>Lucky Number</small><strong>{currentHoro.number}</strong></div>
            </div>
            <a className="text-link" href="#contact">Get your full reading <ArrowRight size={16} /></a>
          </div>
        </section>

        {/* ===== ZODIAC WHEEL ===== */}
        <section className="zodiac-section section-pad">
          <div className="section-heading centered reveal"><div><div className="eyebrow eyebrow-dark"><span /> Your cosmic map <span /></div><h2>What is the sky <em>whispering?</em></h2></div><p>Explore your sun sign as a starting point for self-reflection. Your complete birth chart reveals the richer story.</p></div>
          <div className="zodiac-layout">
            <div className="zodiac-wheel reveal" style={{ transform: `translateY(${Math.max(-30, (scrollY - 1400) * -0.03)}px) rotate(${scrollY * 0.01}deg)` }}>
              <div className="wheel-core"><span>ॐ</span><small>{selectedSign}</small></div>
              {signs.map(([symbol, name], index) => <button key={name} className={selectedSign === name ? 'zodiac-point active' : 'zodiac-point'} style={{ '--i': index } as React.CSSProperties} onClick={() => setSelectedSign(name)}><span>{symbol}</span><small>{name}</small></button>)}
            </div>
            <div className="sign-reading reveal"><div className="reading-label">Your sign today</div><div className="reading-title"><span>{signs.find(([, name]) => name === selectedSign)?.[0]}</span><h3>{selectedSign}</h3></div><p>There is strength in choosing what brings you back to yourself. Let your natural gifts lead the way, and allow patience to shape the outcome.</p><div className="reading-details"><div><small>Guiding element</small><strong>Fire · Renewal</strong></div><div><small>Today's intention</small><strong>Move with trust</strong></div></div><a className="text-link" href="#contact">Read your full chart <ArrowRight size={16} /></a></div>
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

        {/* ===== BLOG ===== */}
        <section className="blog-section section-pad" id="blog">
          <div className="section-heading reveal"><div><div className="eyebrow eyebrow-dark"><span /> Wisdom journal <span /></div><h2>Read, reflect, <em>rise.</em></h2></div><p>Articles and guides to deepen your understanding of Vedic astrology and spiritual living.</p></div>
          <div className="blog-grid">{blogPosts.map((post) => (
            <article className="blog-card reveal" key={post.title}>
              <div className="blog-card-top"><span className="blog-tag">{post.tag}</span><span className="blog-date">{post.date}</span></div>
              <h3>{post.title}</h3><p>{post.excerpt}</p>
              <a href="#contact">Read article <ArrowRight size={15} /></a>
            </article>
          ))}</div>
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

        {/* ===== CONTACT ===== */}
        <section className="contact-section section-pad" id="contact"><div className="contact-card"><div className="contact-info reveal"><div className="eyebrow"><span /> Begin your journey <span /></div><h2>Come with a question.<br /><em>Leave with a path.</em></h2><p>Book a private consultation with Master Shekar Ji and take the next step with a little more light.</p><div className="contact-list"><a href="tel:+23055144217"><Phone size={17} /> +230 551 44217</a><a href="https://wa.me/23055144217"><MessageCircle size={17} /> Chat on WhatsApp</a><a href="mailto:mastershekarji.astrology@gmail.com"><Mail size={17} /> mastershekarji.astrology@gmail.com</a><span><MapPin size={17} /> Mauritius · Worldwide online</span></div></div><div className="booking-form-wrap">{submitted ? <div className="success-state"><div><Check size={28} /></div><h3>Your intention is received.</h3><p>Thank you for reaching out. Master Shekar Ji's team will connect with you shortly.</p><button className="button button-primary" onClick={() => setSubmitted(false)}>Send another message</button></div> : <form className="booking-form reveal" onSubmit={handleSubmit}><div className="form-heading"><CalendarDays size={18} /><strong>Request a consultation</strong><small>Usually replies within a few hours</small></div><div className="form-row"><label>Your name<input required placeholder="Full name" /></label><label>WhatsApp number<input required type="tel" placeholder="+230 ..." /></label></div><div className="form-row"><label>Email<input type="email" placeholder="your@email.com" /></label><label>Country<input placeholder="Your country" /></label></div><div className="form-row"><label>Date of birth<input type="date" /></label><label>Time of birth<input type="time" /></label></div><label>Place of birth<input placeholder="City, Country" /></label><label>What would you like guidance on?<select defaultValue=""><option value="" disabled>Select a focus</option>{allServices.map((s) => <option key={s.title}>{s.title}</option>)}</select></label><label>Tell us a little more<textarea placeholder="What is on your heart? (optional)" rows={3} /></label><button className="button button-primary form-submit">Send my request <ArrowRight size={16} /></button></form>}</div></div></section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home"><img src={logoImg} alt="Master Shekar Ji" /><span><strong>MASTER SHEKAR JI</strong><small>Guiding you towards a better tomorrow</small></span></a>
          <div className="footer-social"><a href="https://instagram.com/mastershekarji.official" aria-label="Instagram"><Instagram size={18} /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook size={18} /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube size={18} /></a></div>
        </div>
        <div className="footer-links">
          <div><strong>Quick Links</strong>{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div>
          <div><strong>Services</strong>{allServices.slice(0, 6).map((s) => <a key={s.title} href="#services">{s.title}</a>)}</div>
          <div><strong>Contact</strong><a href="tel:+23055144217">+230 551 44217</a><a href="mailto:mastershekarji.astrology@gmail.com">Email Us</a><span>Mauritius · Worldwide</span><span>24 Hours Available</span></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Master Shekar Ji. Made with devotion.</span><span>Private guidance · Worldwide consultations</span><span><Heart size={13} fill="currentColor" /> With intention</span></div>
      </footer>
      <a className="floating-whatsapp" href="https://wa.me/23055144217"><MessageCircle size={20} /><span>Chat with Master Shekar Ji</span></a>
    </div>
  );
}

export default App;
