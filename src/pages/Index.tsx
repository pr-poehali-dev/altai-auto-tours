import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/92edbc88-5c7d-4493-8bfa-6eff32836956/files/18be83b7-18d9-473a-b943-0cc7a502a0de.jpg";
const HIKE_IMG = "https://cdn.poehali.dev/projects/92edbc88-5c7d-4493-8bfa-6eff32836956/files/5dad85bb-8f9d-4b2d-b80d-c21efee05625.jpg";
const CAMP_IMG = "https://cdn.poehali.dev/projects/92edbc88-5c7d-4493-8bfa-6eff32836956/files/779f4ed7-32cd-4731-87d5-94488d30c13e.jpg";

const routes = [
  {
    id: 1,
    title: "Золотое кольцо Алтая",
    days: 7,
    price: 180000,
    difficulty: "medium",
    difficultyLabel: "Средний",
    season: "Июнь — Сентябрь",
    desc: "Большое кольцо по главным жемчужинам Горного Алтая: Чемал, Чуйский тракт, плато Укок, Телецкое озеро. Старт и финиш — Горно-Алтайск.",
    highlights: ["Чуйский тракт", "Плато Укок", "Телецкое озеро", "Перевал Кату-Ярык"],
    img: HERO_IMG,
    group: "до 7 чел",
    fullRoute: [
      "Горно-Алтайск (аэропорт)",
      "Чемальский тракт + Чемал",
      "Семинский перевал",
      "Перевал Чике-Таман",
      "Белый Бом, мост Цаплина (Иня)",
      "Яломанские бомы, слияние Чуи и Катуни",
      "Акташ — Гейзерное озеро",
      "Курайская степь — Чуйские Марсы",
      "Северо-Чуйский хребет — Ак-Тру",
      "Природный парк Мажой и Уч-Энмек",
      "Алтайские Марсы, урочище Ак-Кёль",
      "Софийский ледник, Беляши, Джазатор",
      "Чуйская степь — Кош-Агач",
      "Плато Укок",
      "Перевал Кату-Ярык, Каменные грибы",
      "Водопад Куркуре",
      "Озеро Телецкое — паром/катер",
      "Артыбаш — финиш в Горно-Алтайске",
    ],
    included: [
      "Проживание в домиках с удобствами",
      "Питание: завтрак и ужин",
      "Трансфер на всём маршруте",
      "Гид-водитель на весь тур",
    ],
  },
];

const reviews = [
  { name: "Алексей М.", city: "Москва", text: "Невероятное путешествие! Гид знает Алтай как свои пять пальцев. Вернёмся обязательно — уже смотрим на маршрут к Белухе.", stars: 5, tour: "Большое Алтайское кольцо" },
  { name: "Светлана К.", city: "Новосибирск", text: "Ездили всей семьёй с детьми 9 и 12 лет. Всё было организовано идеально: комфортные ночёвки, интересные остановки, безопасный маршрут.", stars: 5, tour: "Семейный Алтай" },
  { name: "Дмитрий П.", city: "Екатеринбург", text: "Перевал Кату-Ярык — это что-то с чем-то! Фотографии не передают масштаб. Отличная группа, профессиональный гид, незабываемые 9 дней.", stars: 5, tour: "Дикие перевалы" },
  { name: "Марина Т.", city: "Санкт-Петербург", text: "Уже второй раз с этой командой. Первый раз — Семейный Алтай, теперь — Золотая осень. Уровень организации растёт с каждым сезоном!", stars: 5, tour: "Золотая осень" },
];

const blogPosts = [
  { date: "15 апреля 2025", title: "Лучшее время для поездки на Алтай: полный гид по сезонам", tag: "Советы", img: HERO_IMG },
  { date: "3 марта 2025", title: "Что взять в автомобильный тур: список снаряжения от наших гидов", tag: "Подготовка", img: HIKE_IMG },
  { date: "20 февраля 2025", title: "Плато Укок: заповедная зона на краю света", tag: "Маршруты", img: CAMP_IMG },
];

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Маршруты", href: "#routes" },
  { label: "О турах", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0-init");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState("");
  const [participants, setParticipants] = useState(2);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [routeModal, setRouteModal] = useState<typeof routes[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((i) => i.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (tourName = "") => {
    setSelectedTour(tourName);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", color: "var(--text-primary)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(19,17,14,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--dark-border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold shimmer-text">АлтайЭкспед</span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)}
                className="nav-link text-sm font-medium transition-colors duration-200"
                style={{ color: activeSection === item.href.replace("#", "") ? "var(--gold)" : "var(--text-muted)" }}>
                {item.label}
              </button>
            ))}
          </div>

          <button onClick={() => openBooking()}
            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
            <Icon name="Calendar" size={15} />
            Забронировать
          </button>

          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--text-primary)" }}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden animate-fade-in px-6 pb-6 flex flex-col gap-4"
            style={{ background: "rgba(19,17,14,0.97)", borderTop: "1px solid var(--dark-border)" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)}
                className="text-left text-base py-2 nav-link"
                style={{ color: "var(--text-muted)" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => { openBooking(); setMobileOpen(false); }}
              className="mt-2 py-3 rounded-full font-semibold text-sm"
              style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
              Забронировать тур
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden flex items-end">
        <div ref={heroRef} className="absolute inset-0 hero-parallax">
          <img src={HERO_IMG} alt="Горный Алтай" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
          <div className="animate-fade-up opacity-0-init">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
              Горный Алтай · С 2018 года
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6 animate-fade-up opacity-0-init delay-200">
            Путешествие<br />
            <em className="shimmer-text not-italic">к сердцу гор</em>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-10 animate-fade-up opacity-0-init delay-400"
            style={{ color: "rgba(237,232,223,0.7)" }}>
            Многодневные автомобильные экспедиции по самым живописным маршрутам Горного Алтая. Малые группы. Опытные гиды.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up opacity-0-init delay-600">
            <button onClick={() => scrollTo("#routes")}
              className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
              Смотреть маршруты
            </button>
            <button onClick={() => openBooking()}
              className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
              style={{ border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold)", background: "transparent" }}>
              Забронировать место
            </button>
          </div>

          <div className="flex gap-10 mt-14 animate-fade-up opacity-0-init delay-700">
            {[["150+", "туристов за сезон"], ["1", "флагманский маршрут"], ["7", "лет на Алтае"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>{num}</div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
          <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: "1px solid rgba(201,168,76,0.4)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--gold)" }} />
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0-init">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Наши маршруты</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">Выбери своё приключение</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Авторский маршрут «Золотое кольцо Алтая» — 18 точек, 7 дней, группа до 7 человек
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {routes.map((r, i) => (
              <div key={r.id}
                className="card-hover rounded-2xl overflow-hidden scroll-reveal opacity-0-init col-span-1 md:col-span-2 xl:col-span-3"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", animationDelay: `${i * 0.1}s` }}>
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,25,21,0.8) 0%, transparent 50%)" }} />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${r.difficulty === "easy" ? "badge-easy" : r.difficulty === "medium" ? "badge-medium" : "badge-hard"}`}>
                      {r.difficultyLabel}
                    </span>
                    <div className="absolute bottom-4 left-4 flex gap-3 text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={12} /> {r.days} дней</span>
                      <span className="flex items-center gap-1"><Icon name="Users" size={12} /> {r.group}</span>
                      <span className="flex items-center gap-1"><Icon name="Sun" size={12} /> {r.season}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-3xl font-bold mb-3">{r.title}</h3>
                      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {r.highlights.map((h) => (
                          <span key={h} className="text-xs px-2 py-1 rounded-md"
                            style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.15)" }}>
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-2 mb-6">
                        {r.included.map((inc) => (
                          <div key={inc} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                            <span style={{ color: "var(--text-muted)" }}>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="divider-gold mb-5" />
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-display text-4xl font-bold" style={{ color: "var(--gold)" }}>
                            {r.price.toLocaleString("ru")} ₽
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>с человека за тур</div>
                        </div>
                        <div className="text-right text-xs" style={{ color: "var(--text-muted)" }}>
                          Группа {r.group}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setRouteModal(r)}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                          style={{ border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold)", background: "transparent" }}>
                          Весь маршрут
                        </button>
                        <button onClick={() => openBooking(r.title)}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                          style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
                          Забронировать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 70% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal opacity-0-init">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>О наших турах</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-6">Почему выбирают нас</h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Мы организуем авторские автомобильные экспедиции по Горному Алтаю с 2018 года.
              Небольшие группы, индивидуальный подход и маршруты, разработанные людьми, влюблёнными в эти горы.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Shield", title: "Полная безопасность", desc: "Все транспортные средства подготовлены для горных дорог. Первая помощь, страховка." },
                { icon: "Map", title: "Авторские маршруты", desc: "Места, которых нет в путеводителях — разработаны нашими гидами за 7 лет экспедиций." },
                { icon: "Users", title: "Малые группы", desc: "Максимум 10–12 человек. Живое общение, гибкий темп, личное внимание каждому." },
                { icon: "Star", title: "Всё включено", desc: "Трансфер, проживание в лагере, питание, гид — один платёж без скрытых расходов." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start p-4 rounded-xl transition-colors"
                  style={{ border: "1px solid var(--dark-border)" }}>
                  <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.12)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative scroll-reveal opacity-0-init">
            <div className="rounded-3xl overflow-hidden aspect-[4/5]"
              style={{ border: "1px solid var(--dark-border)" }}>
              <img src={HIKE_IMG} alt="Тур по Алтаю" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl"
              style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
              <div className="font-display text-4xl font-bold mb-1" style={{ color: "var(--gold)" }}>4.9</div>
              <div className="flex gap-0.5 mb-1" style={{ color: "var(--gold)" }}>★★★★★</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>средний рейтинг туров</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 scroll-reveal opacity-0-init">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Галерея</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-3">Живые кадры</h2>
            <p style={{ color: "var(--text-muted)" }}>Горный Алтай — лучшие моменты наших экспедиций</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 scroll-reveal opacity-0-init">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden h-80 cursor-pointer group"
              style={{ border: "1px solid var(--dark-border)" }}>
              <img src={HERO_IMG} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            {[HIKE_IMG, CAMP_IMG, HIKE_IMG, CAMP_IMG, HERO_IMG].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: i < 2 ? "9.5rem" : "13rem", border: "1px solid var(--dark-border)" }}>
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 scroll-reveal opacity-0-init">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Отзывы</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-3">Что говорят путешественники</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl scroll-reveal opacity-0-init"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
                <div className="flex gap-0.5 mb-4" style={{ color: "var(--gold)", fontSize: "1.1rem" }}>
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-base leading-relaxed mb-5">"{r.text}"</p>
                <div className="divider-gold mb-5" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{r.city}</div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    {r.tour}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div className="scroll-reveal opacity-0-init">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Блог</span>
              <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3">Статьи и советы</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm nav-link scroll-reveal opacity-0-init"
              style={{ color: "var(--gold)" }}>
              Все статьи <Icon name="ArrowRight" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div key={i} className="card-hover rounded-2xl overflow-hidden cursor-pointer scroll-reveal opacity-0-init"
                style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", animationDelay: `${i * 0.1}s` }}>
                <div className="h-48 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-1 rounded-md"
                      style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)" }}>
                      {post.tag}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                  </div>
                  <h3 className="font-semibold leading-snug">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 30% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal opacity-0-init">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Контакты</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-6">Давай поговорим</h2>
            <p className="mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Есть вопросы о маршрутах или хочешь подобрать тур под свои пожелания? Напишите нам — ответим в течение часа.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "+7 (913) 000-00-00" },
                { icon: "Mail", label: "info@altai-expedition.ru" },
                { icon: "MapPin", label: "г. Горно-Алтайск, ул. Ленина, 1" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.12)" }}>
                    <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} />
                  </div>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              {[
                { icon: "MessageCircle", label: "Telegram" },
                { icon: "Youtube", label: "YouTube" },
              ].map((s) => (
                <button key={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid var(--dark-border)", color: "var(--text-muted)" }}
                  title={s.label}>
                  <Icon name={s.icon} size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="scroll-reveal opacity-0-init">
            <form className="p-8 rounded-3xl space-y-4"
              style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
              onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-display text-2xl font-bold mb-2">Напишите нам</h3>
              <input className="input-dark" type="text" placeholder="Ваше имя" required />
              <input className="input-dark" type="email" placeholder="Email" required />
              <input className="input-dark" type="tel" placeholder="Телефон" />
              <textarea className="input-dark" rows={4} placeholder="Вопрос или пожелание по маршруту..." />
              <button type="submit"
                className="w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-bold shimmer-text">АлтайЭкспед</span>
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            © 2025 АлтайЭкспед · Многодневные туры по Горному Алтаю
          </p>
          <div className="flex gap-6">
            {["Маршруты", "Галерея", "Контакты"].map((l) => (
              <span key={l} className="text-xs cursor-pointer nav-link" style={{ color: "var(--text-muted)" }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ROUTE DETAIL MODAL */}
      {routeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setRouteModal(null); }}>
          <div className="w-full max-w-2xl rounded-3xl animate-scale-in overflow-hidden"
            style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="relative h-56">
              <img src={routeModal.img} alt={routeModal.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,25,21,1) 0%, rgba(28,25,21,0.3) 100%)" }} />
              <button onClick={() => setRouteModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)", color: "white" }}>
                <Icon name="X" size={18} />
              </button>
              <div className="absolute bottom-5 left-6">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block ${routeModal.difficulty === "easy" ? "badge-easy" : routeModal.difficulty === "medium" ? "badge-medium" : "badge-hard"}`}>
                  {routeModal.difficultyLabel}
                </span>
                <h2 className="font-display text-3xl font-bold">{routeModal.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-6 mb-6 text-sm">
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <Icon name="Clock" size={14} style={{ color: "var(--gold)" }} /> {routeModal.days} дней
                </span>
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <Icon name="Users" size={14} style={{ color: "var(--gold)" }} /> {routeModal.group}
                </span>
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <Icon name="Sun" size={14} style={{ color: "var(--gold)" }} /> {routeModal.season}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="MapPin" size={16} style={{ color: "var(--gold)" }} /> Маршрут по точкам
                </h3>
                <div className="relative pl-5">
                  <div className="absolute left-1.5 top-2 bottom-2 w-px" style={{ background: "var(--dark-border)" }} />
                  {routeModal.fullRoute.map((point, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 mb-3">
                      <div className="absolute -left-4 top-1.5 w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: idx === 0 || idx === routeModal.fullRoute.length - 1 ? "var(--gold)" : "var(--dark-border)", border: "2px solid var(--gold)", zIndex: 1 }} />
                      <span className="text-xs mr-1 font-mono" style={{ color: "var(--text-muted)", minWidth: "1.2rem" }}>{idx + 1}.</span>
                      <span className="text-sm leading-snug" style={{ color: idx === 0 || idx === routeModal.fullRoute.length - 1 ? "var(--text-primary)" : "var(--text-muted)" }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Package" size={16} style={{ color: "var(--gold)" }} /> Что включено
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {routeModal.included.map((inc) => (
                    <div key={inc} className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle" size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                      <span style={{ color: "var(--text-muted)" }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider-gold mb-5" />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>
                    {routeModal.price.toLocaleString("ru")} ₽
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>с человека за тур</div>
                </div>
              </div>
              <button onClick={() => { setRouteModal(null); openBooking(routeModal.title); }}
                className="w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
                Забронировать этот тур
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setBookingOpen(false); }}>
          <div className="w-full max-w-lg rounded-3xl p-8 animate-scale-in"
            style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl font-bold">Бронирование</h2>
              <button onClick={() => setBookingOpen(false)} style={{ color: "var(--text-muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(201,168,76,0.15)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Заявка отправлена!</h3>
                <p style={{ color: "var(--text-muted)" }}>Мы свяжемся с вами в течение часа для подтверждения бронирования.</p>
                <button className="mt-6 px-6 py-3 rounded-full font-semibold"
                  onClick={() => setBookingOpen(false)}
                  style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>Выбор маршрута</label>
                  <select className="input-dark"
                    value={selectedTour}
                    onChange={(e) => setSelectedTour(e.target.value)}
                    required
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--dark-border)", color: "var(--text-primary)", borderRadius: "8px", padding: "12px 16px", width: "100%" }}>
                    <option value="" style={{ background: "var(--dark-card)" }}>— Выберите маршрут —</option>
                    {routes.map((r) => (
                      <option key={r.id} value={r.title} style={{ background: "var(--dark-card)" }}>
                        {r.title} ({r.days} дней)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>Желаемая дата начала</label>
                  <input className="input-dark" type="date" value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)} required />
                </div>

                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>
                    Количество участников: <strong style={{ color: "var(--gold)" }}>{participants}</strong>
                  </label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all hover:scale-110"
                      style={{ border: "1px solid var(--dark-border)", color: "var(--text-primary)", background: "transparent" }}>−</button>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--dark-border)" }}>
                      <div className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${(participants / 12) * 100}%`, background: "var(--gold)" }} />
                    </div>
                    <button type="button" onClick={() => setParticipants(Math.min(12, participants + 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all hover:scale-110"
                      style={{ border: "1px solid var(--dark-border)", color: "var(--text-primary)", background: "transparent" }}>+</button>
                  </div>
                </div>

                <input className="input-dark" type="text" placeholder="Ваше имя" required />
                <input className="input-dark" type="tel" placeholder="Телефон для связи" required />
                <input className="input-dark" type="email" placeholder="Email" required />
                <textarea className="input-dark" rows={3} placeholder="Дополнительные пожелания..." />

                {selectedTour && (
                  <div className="p-4 rounded-xl" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Стоимость тура</div>
                    <div className="font-display text-2xl font-bold" style={{ color: "var(--gold)" }}>
                      {(routes.find((r) => r.title === selectedTour)?.price || 0).toLocaleString("ru")} ₽
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                      с человека · {participants} чел. = {((routes.find((r) => r.title === selectedTour)?.price || 0) * participants).toLocaleString("ru")} ₽ итого
                    </div>
                  </div>
                )}

                <button type="submit"
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                  style={{ background: "var(--gold)", color: "var(--dark-bg)" }}>
                  Отправить заявку на бронирование
                </button>
                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  Мы свяжемся с вами в течение часа для подтверждения
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;