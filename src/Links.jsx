import React from 'react';
import { usePostHog } from 'posthog-js/react';
import { ExternalLink, Download, Globe, Twitter } from 'lucide-react';

const Links = () => {
  const posthog = usePostHog();

  // UTMパラメータを取得
  const getUtmParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
    };
  };

  const handleLinkClick = (linkName, url) => {
    const utm = getUtmParams();
    posthog?.capture('link_click', {
      link_name: linkName,
      page: 'links',
      ...utm,
    });
    window.open(url, '_blank');
  };

  const links = [
    {
      name: 'App Store',
      label: 'アプリをダウンロード',
      url: 'https://apps.apple.com/jp/app/squatlock/id6754959979',
      icon: Download,
      primary: true,
    },
    {
      name: 'Website',
      label: '公式サイト',
      url: 'https://squatlock.saki-paru.com',
      icon: Globe,
      primary: false,
    },
    {
      name: 'Developer X',
      label: '開発者のX (Twitter)',
      url: 'https://x.com/rich_hare1260',
      icon: Twitter,
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Custom Style */}
      <style>{`
        .text-neon-green { color: #ccff00; }
        .bg-neon-green { background-color: #ccff00; }
        .border-neon-green { border-color: #ccff00; }
        .shadow-neon { box-shadow: 0 0 20px rgba(204, 255, 0, 0.3); }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-green rounded-full blur-[150px] opacity-20 -z-10"></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* App Icon & Name */}
        <div className="flex flex-col items-center mb-12">
          <img
            src="/app-icon.jpg"
            alt="SquatLock Icon"
            className="w-24 h-24 rounded-3xl shadow-neon mb-4"
          />
          <h1 className="text-3xl font-bold tracking-tighter">
            Squat<span className="text-neon-green">Lock</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">スクワットでスマホ依存を断つ</p>
        </div>

        {/* Links */}
        <div className="w-full max-w-sm space-y-4">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.name, link.url)}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${link.primary
                  ? 'bg-neon-green text-black font-bold shadow-neon hover:bg-white'
                  : 'bg-zinc-900 text-white border border-zinc-800 hover:border-neon-green/50 hover:bg-zinc-800'
                }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="text-lg">{link.label}</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} SquatLock
      </footer>
    </div>
  );
};

export default Links;
