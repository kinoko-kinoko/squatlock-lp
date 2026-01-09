import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Lock,
  Activity,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Zap,
  Download
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [howItWorksSlide, setHowItWorksSlide] = useState(0);
  const videoRef = useRef(null);

  // ABテスト: CTAボタンのバリアント (A or B)
  const [abVariant, setAbVariant] = useState(() => {
    // LocalStorageから既存のバリアントを取得、なければランダムに決定
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ab_cta_variant');
      if (stored === 'A' || stored === 'B') return stored;
      const newVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('ab_cta_variant', newVariant);
      return newVariant;
    }
    return 'A';
  });

  // ABテスト: ページ読み込み時にdataLayerにイベントを送信
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ab_test',
        experiment_id: 'cta_button_v1',
        variant: abVariant
      });
    }
  }, [abVariant]);

  const slides = ['/lock.png', '/squat.png', '/success.png'];
  // How it Works: 画像2枚 + 動画1つ (type: 'image' or 'video')
  const howItWorksContent = [
    { type: 'image', src: '/step1_select.png' },
    { type: 'image', src: '/step2_count.png' },
    { type: 'video', src: '/demo.m4v' }
  ];


  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slideshow auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // How it Works slideshow auto-advance (longer for video)
  useEffect(() => {
    const currentContent = howItWorksContent[howItWorksSlide];
    const duration = currentContent.type === 'video' ? 6000 : 3000;
    const timeout = setTimeout(() => {
      setHowItWorksSlide((prev) => (prev + 1) % howItWorksContent.length);
    }, duration);
    return () => clearTimeout(timeout);
  }, [howItWorksSlide, howItWorksContent.length]);

  // UTMパラメータを取得
  const getUtmParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
    };
  };

  // App Storeクリックイベントをトラッキング (GA4)
  const handleDownloadClick = (location) => {
    const utm = getUtmParams();

    // GA4にイベント送信（ABテストバリアント情報を含む）
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'app_store_click', {
        event_category: 'engagement',
        event_label: location,
        page: 'landing',
        experiment_id: 'cta_button_v1',
        variant: abVariant,
        ...utm,
      });
    }

    // dataLayerにもイベントを送信（GTM用）
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        experiment_id: 'cta_button_v1',
        variant: abVariant,
        click_location: location
      });
    }

    console.log(`GA4 Event: app_store_click from ${location}, variant: ${abVariant}`, utm);
    window.open('https://apps.apple.com/jp/app/squatlock/id6754959979', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-green selection:text-black overflow-x-hidden">
      {/* Custom Style for Neon Green */}
      <style>{`
        .text-neon-green { color: #ccff00; }
        .bg-neon-green { background-color: #ccff00; }
        .border-neon-green { border-color: #ccff00; }
        .hover\\:bg-neon-green:hover { background-color: #ccff00; }
        .hover\\:text-black:hover { color: #000000; }
        .shadow-neon { box-shadow: 0 0 20px rgba(204, 255, 0, 0.3); }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* App Icon Image */}
            {/* Change src="/app-icon.png" to your actual file path */}
            <img
              src="/app-icon.jpg"
              alt="SquatLock Icon"
              className="w-10 h-10 rounded-xl shadow-neon"
            />
            <span className="text-2xl font-bold tracking-tighter">Squat<span className="text-neon-green">Lock</span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 -z-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-neon-green rounded-full blur-[150px] opacity-20 -z-10"></div>

        {/* Giant Background Text for Depth */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-10 -z-10 select-none pointer-events-none">
          <span className="text-[20vw] font-black text-zinc-900 opacity-50 leading-none block">SQUAT</span>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16 relative">
          <div className="md:w-1/2 z-10">
            <div className="relative space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border-l-2 border-neon-green bg-white/5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">iOS App Store</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                STOP SCROLLING. <br />
                <span className="text-neon-green drop-shadow-[0_0_35px_rgba(204,255,0,0.5)]">START SQUATTING.</span>
              </h1>

              {/* Description with side accent */}
              <div className="border-l border-zinc-700 pl-6 py-2">
                <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                  SquatLock forces you to perform physical exercises to unlock your addictive apps. Build discipline, not dopamine loops.<br />
                  <span className="text-white font-bold">No squats, no access.</span>
                </p>
              </div>

              {/* CTA Button Area - ABテスト対応 */}
              <div className="pt-6 w-full max-w-lg">
                {abVariant === 'A' ? (
                  // バリアントA: 現行デザイン（緑背景・英語）
                  <button
                    onClick={() => handleDownloadClick('Hero Primary')}
                    className="w-full group relative inline-flex items-center justify-center gap-4 bg-neon-green text-black px-6 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                  >
                    {/* Apple Logo SVG */}
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                    </svg>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Download on the</span>
                      <span className="text-2xl font-black tracking-tighter">App Store</span>
                    </div>
                  </button>
                ) : (
                  // バリアントB: 白背景・日本語
                  <button
                    onClick={() => handleDownloadClick('Hero Primary')}
                    className="w-full group relative inline-flex items-center justify-center gap-4 bg-white text-black border-2 border-neon-green px-6 py-4 rounded-xl hover:bg-neon-green transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(204,255,0,0.4)]"
                  >
                    {/* Apple Logo SVG */}
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                    </svg>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">完全無料</span>
                      <span className="text-2xl font-black tracking-tighter">ダウンロード</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center">
            {/* Phone Mockup Representation */}
            {/* Switched to Image Display */}
            <div className="relative w-72 h-[550px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl flex flex-col items-center overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 w-40 h-6 bg-zinc-800 rounded-b-2xl z-20"></div>

              {/* Screen Content - Slideshow */}
              {slides.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`SquatLock App Screen ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 -right-12 bg-zinc-800/80 backdrop-blur-md p-4 rounded-xl border border-zinc-700 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <div className="absolute bottom-1/3 -left-12 bg-zinc-800/80 backdrop-blur-md p-4 rounded-xl border border-zinc-700 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <Activity className="w-8 h-8 text-neon-green" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution (Features) */}
      <section id="features" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Reclaim Your <span className="text-neon-green">Digital Life</span></h2>
            <p className="text-gray-400 text-lg">Your phone is a tool, not a trap. SquatLock helps you break the cycle of unconscious scrolling by adding a physical cost to digital consumption.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-neon-green/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-white group-hover:text-neon-green transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">Hard Lock Technology</h3>
              <p className="text-gray-400 leading-relaxed">
                Select your "Problem Apps". Once locked, there is no bypass code. The only key is your physical effort.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-neon-green/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white group-hover:text-neon-green transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">Track Your Progress</h3>
              <p className="text-gray-400 leading-relaxed">
                Track your squat count and streaks with medals. Visualize your effort stacking up day by day.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-neon-green/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white group-hover:text-neon-green transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">High-Precision Detection</h3>
              <p className="text-gray-400 leading-relaxed">
                Leverages device sensors to accurately detect squat movement. Shallow dips won't count—designed to prevent cheating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-zinc-900 border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Simple Setup.<br />Powerful Results.</h2>

              <div className="space-y-8">
                {[
                  { title: "Select Apps", desc: "Choose the apps that drain your time (Instagram, X, TikTok, etc)." },
                  { title: "Set Your Squats", desc: "Decide how many squats (e.g., 20) are required to unlock them." },
                  { title: "Get Moving", desc: "When you try to open a locked app, drop down and give us 20." }
                ].map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-neon-green flex items-center justify-center font-bold text-neon-green text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative flex justify-center">
              {/* Single Phone Mockup with Image+Video Slideshow */}
              <div className="relative w-64 h-[520px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden">


                {/* Content slides */}
                {howItWorksContent.map((item, index) => (
                  item.type === 'image' ? (
                    <img
                      key={item.src}
                      src={item.src}
                      alt={`Step ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${index === howItWorksSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  ) : (
                    <video
                      key={item.src}
                      ref={videoRef}
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === howItWorksSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  )
                ))}

                {/* Slide indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {howItWorksContent.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${index === howItWorksSlide ? 'bg-neon-green' : 'bg-white/30'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-green/10 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-green/10 -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-green blur-[150px] opacity-30 -z-10"></div>

        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Don't Scroll.<br />
            <span className="text-neon-green">Take Control.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Break free from dopamine slavery. Build stronger legs and better focus.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Footer Icon */}
            <img
              src="/app-icon.jpg"
              alt="SquatLock Icon"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold">SquatLock</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-400">
            <a href="https://www.saki-paru.com/squatlockapp-support-privacy-policy/" target="_blank" className="hover:text-white transition-colors">Privacy Policy</a>

            <a href="https://www.saki-paru.com/squatlockapp-support-privacy-policy/" target="_blank" className="hover:text-white transition-colors">Support</a>
          </div>

          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} SquatLock. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
