import React, { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpenText,
  ChevronRight,
  GalleryHorizontalEnd,
  Landmark,
  MapPinned,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  ['她是谁', '#identity'],
  ['昭陵', '#zhaoling'],
  ['墓葬结构', '#structure'],
  ['壁画', '#murals'],
  ['随葬器物', '#objects'],
  ['墓志', '#epitaph'],
  ['盗扰与考古', '#archaeology'],
  ['资料库', '#library'],
]

const FLOATING_CARDS = [
  {
    title: '壁画',
    subtitle: '初唐人物与礼仪图像',
    icon: GalleryHorizontalEnd,
  },
  {
    title: '墓志',
    subtitle: '身份、生平与历史记忆',
    icon: BookOpenText,
  },
  {
    title: '随葬器物',
    subtitle: '从器物看唐代生活',
    icon: Sparkles,
  },
]

const FEATURE_CARDS = [
  {
    id: 'zhaoling',
    eyebrow: '01',
    title: '昭陵空间系统',
    description: '从山陵到陪葬墓，理解长乐公主墓在昭陵系统中的位置。',
    icon: MapPinned,
    visual: 'map',
  },
  {
    id: 'structure',
    eyebrow: '02',
    title: '墓葬结构漫游',
    description: '以剖面与空间节点理解墓道、过洞、天井、甬道与墓室。',
    icon: Landmark,
    visual: 'plan',
  },
  {
    id: 'archaeology',
    eyebrow: '03',
    title: '盗扰前后',
    description: '不展示现实盗掘步骤，只展示盗扰如何破坏考古关系与历史信息。',
    icon: ShieldAlert,
    visual: 'compare',
  },
  {
    id: 'library',
    eyebrow: '04',
    title: '考古如何重建历史',
    description: '从记录、测绘、编号、文献对照到多学科研究，理解考古证据链。',
    icon: BookOpenText,
    visual: 'archive',
  },
]

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="返回首页">
        <span className="brand-mark" aria-hidden="true">✥</span>
        <span className="brand-copy">
          <strong>长乐公主墓</strong>
          <small>地下一座墓 · 地上一个时代</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {NAV_ITEMS.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <div className="top-actions">
        <button className="icon-button" aria-label="搜索"><Search size={18} /></button>
        <button className="lang-button">CN</button>
        <button
          className="menu-button"
          aria-label="打开导航菜单"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-panel">
          <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="关闭菜单">
            <X size={22} />
          </button>
          {NAV_ITEMS.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  )
}

function MiniVisual({ type }) {
  if (type === 'map') {
    return (
      <div className="mini-visual map-visual" aria-hidden="true">
        <span className="mountain mountain-a" />
        <span className="mountain mountain-b" />
        <span className="map-route" />
        <span className="map-pin pin-a" />
        <span className="map-pin pin-b" />
        <b>九嵕山 · 昭陵</b>
      </div>
    )
  }
  if (type === 'plan') {
    return (
      <div className="mini-visual plan-visual" aria-hidden="true">
        <div className="plan-room room-main" />
        <div className="plan-room room-side" />
        <div className="plan-corridor" />
      </div>
    )
  }
  if (type === 'compare') {
    return (
      <div className="mini-visual compare-visual" aria-hidden="true">
        <div className="compare-half compare-before"><span>完整关系</span></div>
        <div className="compare-half compare-after"><span>信息断裂</span></div>
      </div>
    )
  }
  return (
    <div className="mini-visual archive-visual" aria-hidden="true">
      <span className="paper paper-a" />
      <span className="paper paper-b" />
      <span className="paper paper-c" />
      <span className="seal">史</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState('archaeology')
  const modeCopy = useMemo(() => {
    if (mode === 'object') {
      return {
        title: '古董眼光',
        body: '聚焦单件器物的材质、造型与审美。',
      }
    }
    return {
      title: '考古眼光',
      body: '聚焦位置、组合、地层与空间关系。',
    }
  }, [mode])

  return (
    <main id="top" className="site-shell">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" />
        <div className="hero-vignette" />
        <div className="hero-grid" />

        <div className="hero-copy">
          <div className="eyebrow-row">
            <span>昭陵陪葬墓</span>
            <span className="eyebrow-line" />
            <span>初唐 · 数字考古</span>
          </div>

          <h1 id="hero-title">长乐公主墓</h1>
          <h2>一座初唐公主墓，如何保存一个时代？</h2>
          <p>
            从昭陵陪葬墓、壁画、墓志与随葬器物出发，进入一座墓中的唐代世界。
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href="#structure">
              进入墓室 <ArrowRight size={18} />
            </a>
            <a className="secondary-cta" href="#murals">
              <GalleryHorizontalEnd size={18} /> 浏览壁画
            </a>
          </div>

          <div className="perspective-switch" aria-label="视角切换">
            <div className="switch-copy">
              <small>观察方式</small>
              <strong>{modeCopy.title}</strong>
              <span>{modeCopy.body}</span>
            </div>
            <div className="switch-buttons">
              <button
                className={mode === 'object' ? 'active' : ''}
                onClick={() => setMode('object')}
              >
                古董眼光
              </button>
              <button
                className={mode === 'archaeology' ? 'active' : ''}
                onClick={() => setMode('archaeology')}
              >
                考古眼光
              </button>
            </div>
          </div>
        </div>

        <aside className="floating-stack" aria-label="核心内容入口">
          {FLOATING_CARDS.map(({ title, subtitle, icon: Icon }) => (
            <button className="floating-card" key={title}>
              <span className="floating-card-icon"><Icon size={20} /></span>
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <ChevronRight size={18} />
            </button>
          ))}
        </aside>

        <div className="tomb-labels" aria-hidden="true">
          <span style={{ left: '43%' }}>墓道</span>
          <span style={{ left: '49%' }}>前室</span>
          <span style={{ left: '56%' }}>中室</span>
          <span style={{ left: '64%' }}>后室</span>
          <span style={{ left: '71%' }}>甬道</span>
        </div>

        <div className="feature-strip">
          {FEATURE_CARDS.map(({ id, eyebrow, title, description, icon: Icon, visual }) => (
            <article className="feature-card" id={id} key={id}>
              <div className="feature-card-copy">
                <div className="feature-number">{eyebrow}</div>
                <Icon size={18} className="feature-icon" />
                <h3>{title}</h3>
                <p>{description}</p>
                <button className="round-arrow" aria-label={`进入${title}`}>
                  <ArrowRight size={16} />
                </button>
              </div>
              <MiniVisual type={visual} />
            </article>
          ))}
        </div>

        <div className="hero-quote">
          <span className="quote-rule" />
          <div>
            <blockquote>“被盗走的是器物，被摧毁的是关系。”</blockquote>
            <p>考古学研究的不只是文物，更是物与物、人与物、空间与时间之间的联系。</p>
          </div>
          <span className="quote-rule" />
        </div>
      </section>

      <section className="content-spacer" id="identity">
        <div className="placeholder-section">
          <span>下一阶段</span>
          <h2>她是谁 · 长乐公主</h2>
          <p>这里将继续接人物关系、时间轴、墓志释读与昭陵空间系统。</p>
        </div>
      </section>

      <section id="murals" className="hidden-anchor" aria-hidden="true" />
      <section id="objects" className="hidden-anchor" aria-hidden="true" />
      <section id="epitaph" className="hidden-anchor" aria-hidden="true" />
    </main>
  )
}

export default App
