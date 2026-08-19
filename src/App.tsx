import { useMemo, useState } from 'react'
import './App.css'

type Plan = 'Free' | 'Bronze' | 'Silver' | 'Gold'
type Video = { id: number; title: string; category: string; duration: string; size: string; image: string; downloaded?: string }
const videos: Video[] = [
  { id: 1, title: 'The quiet architecture of a great day', category: 'Mindfulness', duration: '18 min', size: '412 MB', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85', downloaded: 'Today, 09:42' },
  { id: 2, title: 'Making space for better ideas', category: 'Creative practice', duration: '24 min', size: '688 MB', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', downloaded: 'Yesterday, 16:08' },
  { id: 3, title: 'A field guide to slow travel', category: 'Travel', duration: '31 min', size: '1.2 GB', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85' },
  { id: 4, title: 'The craft of paying attention', category: 'Documentary', duration: '42 min', size: '1.8 GB', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85' },
  { id: 5, title: 'Notes from a blue hour', category: 'Film', duration: '12 min', size: '290 MB', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85' },
]
const planLimits: Record<Plan, number> = { Free: 1, Bronze: 5, Silver: 15, Gold: 40 }

function App() {
  const [plan] = useState<Plan>('Silver')
  const [used, setUsed] = useState(7)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'Library' | 'Downloads'>('Library')
  const [notice, setNotice] = useState('')
  const remaining = planLimits[plan] - used
  const filteredVideos = useMemo(() => videos.filter((video) => video.title.toLowerCase().includes(query.toLowerCase()) || video.category.toLowerCase().includes(query.toLowerCase())), [query])
  const download = (video: Video) => {
    if (video.downloaded) return setNotice('Already downloaded within the 24-hour duplicate window.')
    if (remaining <= 0) return setNotice('Your Silver quota is used up. Your quota resets tomorrow.')
    setUsed((current) => current + 1)
    setNotice(`${video.title} is being prepared for offline viewing.`)
  }

  return (
    <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">S</span><span>streamline</span></div><p className="eyebrow">YOUR SPACE</p><nav><button className={activeTab === 'Library' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('Library')}>◈ <span>Library</span></button><button className={activeTab === 'Downloads' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('Downloads')}>↓ <span>Downloads</span><b>3</b></button><button className="nav-item">♡ <span>Saved</span></button></nav><p className="eyebrow collections-label">COLLECTIONS</p><nav><button className="nav-item"><i className="dot coral" />Focus / work</button><button className="nav-item"><i className="dot yellow" />Weekend</button><button className="nav-item"><i className="dot green" />For later</button></nav><div className="sidebar-bottom"><div className="help-card"><strong>Need more room?</strong><span>Upgrade your plan for more offline downloads.</span><button>View plans <span>↗</span></button></div><button className="nav-item"><span className="avatar small">JM</span><span>Jamie Miller</span><span className="more">•••</span></button></div></aside><main className="content"><header className="topbar"><div className="mobile-brand">streamline</div><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search library" /></label><div className="top-actions"><button className="icon-button">⌘</button><button className="icon-button">◔</button><span className="avatar">JM</span></div></header><div className="page-heading"><div><p className="kicker">WEDNESDAY, APRIL 24</p><h1>{activeTab === 'Library' ? 'Good morning, Jayanth.' : 'Your downloads.'}</h1><p className="intro">{activeTab === 'Library' ? 'A little inspiration for wherever today takes you.' : 'Everything you have made available offline.'}</p></div><button className="filter-button">Recently added <span>⌄</span></button></div>{activeTab === 'Library' ? <><section className="quota-panel"><div className="quota-copy"><span className="plan-tag">{plan} plan</span><h2>Your offline library</h2><p>Downloads renew daily. Unfinished downloads won't count toward your quota.</p></div><div className="quota-number"><strong>{remaining}</strong><span>downloads left</span><small>of {planLimits[plan]} this month</small></div><div className="progress"><span style={{ width: `${(used / planLimits[plan]) * 100}%` }} /></div><div className="quota-reset">Quota resets in <strong>08:42:16</strong></div></section><div className="section-header"><div><h2>Made for you</h2><p>Curated to match your pace</p></div><button className="text-button">See all <span>→</span></button></div><section className="video-grid">{filteredVideos.map((video) => <article className="video-card" key={video.id}><div className="thumb"><img src={video.image} alt="" /><span className="duration">{video.duration}</span><button className="play">▶</button></div><div className="card-info"><p className="category">{video.category}</p><h3>{video.title}</h3><div className="meta"><span>{video.size}</span>{video.downloaded ? <span className="downloaded">✓ Downloaded {video.downloaded}</span> : <button onClick={() => download(video)}>↓ Download</button>}</div></div></article>)}</section></> : <section className="downloads-list"><div className="download-summary"><strong>3 files</strong><span> · 2.3 GB stored offline</span><button className="text-button">Manage storage</button></div>{videos.filter((video) => video.downloaded).map((video) => <article className="download-row" key={video.id}><img src={video.image} alt="" /><div className="download-title"><strong>{video.title}</strong><span>{video.category} · {video.duration}</span></div><span className="status"><i /> Available offline</span><span className="download-date">{video.downloaded}</span><button className="more-button">•••</button></article>)}</section>}{notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')}>×</button></div>}</main></div>
  )
}

export default App
