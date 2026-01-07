import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'
import Links from './Links.jsx'

// PostHog設定
// 注意: VITE_POSTHOG_KEYを.envファイルに設定してください
const posthogKey = import.meta.env.VITE_POSTHOG_KEY || ''
const posthogOptions = {
  api_host: 'https://app.posthog.com',
  // ページビューを自動的にトラッキング
  capture_pageview: true,
  // ページ離脱時のイベントをトラッキング
  capture_pageleave: true,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider
      apiKey={posthogKey}
      options={posthogOptions}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
)
