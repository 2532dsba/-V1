import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Camera,
  GalleryHorizontalEnd,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import IdentityPage from './IdentityPage.jsx'
import './styles.css'

const NAV_ITEMS = [
  ['她是谁', '/changle/identity'],
  ['昭陵', '/zhaoling'],
  ['墓葬结构', '/changle#structure'],
  ['壁画', '/changle#murals'],
  ['随葬器物', '/changle#objects'],
  ['墓志', '/changle#epitaph'],
  ['实地影像', '/changle#field'],
]

const FIELD_IMAGES = [
  '13433506308763937.jpeg',
  '13433506335289195.jpeg',
  '13433506337043775.jpeg',
  '13433506338451261.jpeg',
  '13433506339687606.jpeg',
  '13433506340990643.jpeg',
  '13433506342275244.jpeg',
  '13433506343496462.jpeg',
  '13433506344688595.jpeg',
  '13433506345979344.jpeg',
].map((name) => `/media/changle/field/${name}`)

const BACKGROUND_VIDEOS = [
  { src: '/media/changle/video/changle-01.mp4', label: '影像一', detail: '墓室与时间' },
  { src: '/media/changle/video/changle-02.mp4', label: '影像二', detail: '昭陵与大地' },
  { src: '/media/changle/video/changle-03.mp4', label: '影像三', detail: '遗迹与凝视' },
]

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="topbar">
      <a className="changle-brand" href="/changle" aria-label="返回长乐公主墓专题首页">
        <span className="brand-mark" aria-hidden="true">✥</span>
        <span className="brand-copy">
          <strong>长乐公主墓</strong>
          <small>地下一座墓 · 地上一个时代</small>
        </span>
      </a>

      <nav className="changle-desktop-nav" aria-label="长乐公主墓专题导航">
        {NAV_ITEMS.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <div className="top-actions">
        <a className="back-to-zouling" href="/"><ArrowLeft size={15} /> 走陵首页</a>
        <button
          className="changle-menu-button"
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

function Reveal({ children, delay = 0, className = '', as = 'div', ...props }) {
  const elementRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const Tag = as
  return <Tag ref={elementRef} className={`apex-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...props}>{children}</Tag>
}

function VideoStage({ activeVideo, onChange }) {
  const videoRefs = useRef([])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeVideo) video.play().catch(() => {})
      else video.pause()
    })
  }, [activeVideo])

  return (
    <>
      <div className="apex-video-stage" aria-label="可切换的长乐公主墓影像背景">
        <div className="apex-video-stack">
          {BACKGROUND_VIDEOS.map((video, index) => (
            <video
              ref={(node) => { videoRefs.current[index] = node }}
              className={index === activeVideo ? 'is-active' : ''}
              src={video.src}
              poster="/media/changle/assets/hero-concept.png"
              muted
              loop
              playsInline
              preload={index === activeVideo ? 'auto' : 'metadata'}
              aria-hidden={index !== activeVideo}
              key={video.src}
            />
          ))}
        </div>
        <div className="apex-video-shade" />
        <div className="apex-video-grain" />
      </div>
      <div className="apex-video-switcher" role="group" aria-label="切换背景影像">
        {BACKGROUND_VIDEOS.map((video, index) => (
          <button className={index === activeVideo ? 'is-active' : ''} type="button" onClick={() => onChange(index)} aria-label={`切换到${video.label}：${video.detail}`} aria-pressed={index === activeVideo} key={video.src}>
            <b>0{index + 1}</b>
          </button>
        ))}
      </div>
    </>
  )
}

function CinematicHeader() {
  return (
    <header className="apex-navbar">
      <Reveal as="a" className="apex-logo" href="/changle">
        <span aria-hidden="true">陵</span><strong>长乐公主墓</strong><small>CHANGLE · 643</small>
      </Reveal>
      <Reveal delay={150} className="apex-nav-actions">
        <a href="/">走陵首页</a>
        <a className="apex-pill" href="/changle/identity">她是谁</a>
      </Reveal>
    </header>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const isIdentity = window.location.pathname.replace(/\/+$/, '') === '/changle/identity'

  useEffect(() => {
    const previousTitle = document.title
    document.title = isIdentity ? '她是谁｜长乐公主墓｜走陵' : '长乐公主墓｜数字考古专题｜走陵'
    return () => { document.title = previousTitle }
  }, [isIdentity])

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, selectedImage])
  if (isIdentity) {
    return (
      <div className="site-shell changle-site">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <IdentityPage />
      </div>
    )
  }

  return (
    <main id="top" className="site-shell changle-site">
      <CinematicHeader />
      <div className="apex-scene">
        <VideoStage activeVideo={activeVideo} onChange={setActiveVideo} />
        <div className="apex-story">
          <section className="apex-section apex-hero" aria-labelledby="hero-title">
            <div className="apex-title-lockup">
              <Reveal as="p" className="apex-title-kicker">昭陵陪葬墓 · 贞观十七年</Reveal>
              <h1 id="hero-title"><Reveal as="span" delay={100}>长乐公主</Reveal></h1>
              <Reveal as="p" delay={220} className="apex-title-subtitle">地下一座墓 · 地上一个时代</Reveal>
            </div>
          </section>

          <section className="apex-section apex-second" id="structure">
            <Reveal delay={100} className="apex-second-copy">
              <p>CHANGLE · A TOMB AS A SYSTEM</p>
              <h2>一座墓，<br />保存一个<br />时代。</h2>
              <div className="apex-readiness"><strong>关系</strong><span>历史并非被完整保存，<br />而是在证据关系中被重新读出。</span></div>
            </Reveal>
            <div className="apex-bottom-grid">
              <Reveal delay={400} className="apex-facts">
                <div><strong>1</strong><small>核心人物</small></div>
                <div><strong>6</strong><small>关系节点</small></div>
                <div><strong>10</strong><small>现场影像</small></div>
              </Reveal>
              <Reveal delay={550} className="apex-actions-panel">
                <div className="apex-mini-stats">
                  <div><strong>621</strong><small>出生</small></div>
                  <div><strong>643</strong><small>去世</small></div>
                  <div><strong>3</strong><small>证据类型</small></div>
                  <div><strong>∞</strong><small>仍待回答</small></div>
                </div>
                <div className="apex-cta-row">
                  <a href="#field">查看实地影像</a>
                  <a href="/changle/identity">进入人物关系 <ArrowRight size={16} /></a>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>

      <section className="evidence-section" aria-labelledby="evidence-title">
        <div className="evidence-heading">
          <p>THREE KINDS OF EVIDENCE</p>
          <h2 id="evidence-title">从图像、器物与文字，<br />拼回一座墓中的时代。</h2>
        </div>
        <div className="evidence-grid">
          <article id="murals"><GalleryHorizontalEnd size={22} /><small>01 · 图像</small><h3>壁画</h3><p>人物、服饰、仪仗与建筑细节，让初唐的日常和礼仪秩序重新可见。</p></article>
          <article id="objects"><Sparkles size={22} /><small>02 · 物质</small><h3>随葬器物</h3><p>器物的材质、组合与原始位置，共同构成理解身份与生活方式的证据。</p></article>
          <article id="epitaph"><BookOpenText size={22} /><small>03 · 文字</small><h3>墓志</h3><p>姓名、生平与亲族关系被写入石面，也需要与考古现场彼此印证。</p></article>
        </div>
      </section>

      <section className="field-section" id="field" aria-labelledby="field-title">
        <div className="field-heading">
          <div><p>FIELD ARCHIVE · 2026</p><h2 id="field-title">实地影像</h2></div>
          <p>十帧现场记录，把抽象的空间关系带回真实尺度。点击照片可查看大图。</p>
        </div>
        <div className="field-grid">
          {FIELD_IMAGES.map((image, index) => (
            <button type="button" onClick={() => setSelectedImage(image)} key={image} aria-label={`查看长乐公主墓实地照片 ${index + 1}`}>
              <img src={image} alt={`长乐公主墓实地记录 ${index + 1}`} loading="lazy" />
              <span>现场记录 · {String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="method-section" id="methods">
        <div><Camera size={20} /><p>HOW ARCHAEOLOGY READS</p><h2>看见物，也看见关系。</h2></div>
        <p>考古记录关注的不只是单件文物，也关注它在墓室中的位置、与其他遗物的组合、地层及空间关系。专题中的艺术化概念图用于叙事展示，不作为考古复原结论。</p>
        <a href="/zhaoling">继续了解昭陵系统 <ArrowRight size={17} /></a>
      </section>

      <footer className="changle-footer"><a href="/"><ArrowLeft size={16} /> 返回走陵首页</a><span>长乐公主墓 · 数字考古专题</span></footer>

      {selectedImage && (
        <div className="changle-image-modal" role="dialog" aria-modal="true" aria-label="长乐公主墓实地影像预览" onClick={() => setSelectedImage(null)}>
          <button type="button" onClick={() => setSelectedImage(null)} aria-label="关闭影像"><X size={22} /></button>
          <img src={selectedImage} alt="长乐公主墓实地影像大图" />
        </div>
      )}
    </main>
  )
}

export default App
