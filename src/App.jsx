import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, BookOpen, Camera, ChevronDown, Compass, EyeOff,
  Footprints, ListMusic, MapPin, Menu, Mountain, Music2, Pause, Play, SkipBack,
  SkipForward, Sparkles, X,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MausoleumsPage from './MausoleumsPage.jsx'
import './style.css'

const images = {
  hero: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=2200&q=90',
  wall: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=86',
  temple: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1600&q=86',
  stone: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=86',
  mountain: 'https://images.unsplash.com/photo-1510332981392-36692ea3a195?auto=format&fit=crop&w=1600&q=86',
}

const mausoleums = [
  { name: '唐昭陵', dynasty: '贞观十年 · 636', place: '陕西礼泉 · 九嵕山', image: images.mountain, text: '凿山为陵，唐太宗李世民与文德皇后的长眠之地。山势、石刻与庞大的陪葬墓群，共同构成盛唐最辽阔的地上史书。', highlights: ['九嵕山陵山', '昭陵六骏', '陪葬墓群'] },
  { name: '汉阳陵', dynasty: '西汉 · 前153', place: '陕西咸阳 · 渭河北岸', image: images.stone, text: '汉景帝刘启与王皇后合葬陵园。隔着玻璃行走于地下遗址之上，陶俑、动物与生活器物复原出两千年前的国家日常。', highlights: ['地下博物馆', '裸体陶俑', '南区从葬坑'] },
  { name: '唐乾陵', dynasty: '弘道元年 · 683', place: '陕西乾县 · 梁山', image: images.wall, text: '唐高宗李治与武则天合葬之陵。由山门至无字碑，一条漫长神道将自然山势转化为帝国秩序与礼仪空间。', highlights: ['无字碑', '六十一蕃臣像', '述圣纪碑'] },
  { name: '上官婉儿墓', dynasty: '景云元年 · 710', place: '陕西西安 · 咸阳原', image: images.temple, text: '一座并不宏大的唐墓，却留下女性政治、宫廷文学与命运转折的复杂证词。墓志让被简化的历史重新拥有声音。', highlights: ['唐代墓志', '女性政治', '宫廷文学'] },
]

const journey = [
  { day: '01', title: '抵达山前', label: '看山势', text: '先远观陵山与地平线，理解古人如何让自然成为纪念碑。', image: images.mountain },
  { day: '02', title: '沿神道行走', label: '读秩序', text: '从阙门、石人到碑刻，在步行距离中感受礼制的层层展开。', image: images.wall },
  { day: '03', title: '进入遗址', label: '见细节', text: '观察陶俑、墓志与建筑残迹，让宏大叙事落回真实生活。', image: images.stone },
  { day: '04', title: '记录与回望', label: '写手记', text: '用照片、路线和文字保存现场，也留下仍未解答的问题。', image: images.temple },
]

const navItems = [['首页', '#top'], ['走陵足迹', '#mausoleums'], ['行走路线', '#journey'], ['影像志', '#gallery'], ['手记', '#notes']]
const tracks = [
  { title: '天地缓缓', artist: '东韵 Dongyun · 古琴', src: '/media/tiandi-huanhuan.mp3' },
  { title: '精卫', artist: '琵琶版', src: '/media/jingwei-pipa.mp3' },
  { title: '精卫（万物终归向海）', artist: 'Xavier', src: '/media/jingwei-xavier.mp3' },
]

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path === '/mausoleums' ? <MausoleumsPage mausoleums={mausoleums} /> : <HomePage />
}

function HomePage() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const journeyRef = useRef(null)
  const playerBoundsRef = useRef(null)
  const audioRef = useRef(null)
  const resumeAfterSwitchRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedMausoleum, setSelectedMausoleum] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [playerMinimized, setPlayerMinimized] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedMausoleum || selectedImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, selectedMausoleum, selectedImage])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (resumeAfterSwitchRef.current) audio.play().catch(() => setIsPlaying(false))
  }, [currentTrack])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const ctx = gsap.context(() => {
      gsap.to('.hero-backdrop', { yPercent: 18, scale: 1.12, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-word', { yPercent: 38, opacity: 0, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '75% top', scrub: 1 } })
      gsap.to('.hero-foreground', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.utils.toArray('[data-reveal]').forEach((element) => gsap.fromTo(element, { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
      const media = gsap.matchMedia()
      media.add('(min-width: 861px)', () => {
        const track = journeyRef.current?.querySelector('.journey-track')
        if (!track) return undefined
        const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 96)
        const tween = gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { trigger: journeyRef.current, start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: 1, invalidateOnRefresh: true } })
        return () => tween.kill()
      })
      return () => media.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => setIsPlaying(false))
    else audio.pause()
  }
  const changeTrack = (nextIndex, keepPlaying = isPlaying) => {
    resumeAfterSwitchRef.current = keepPlaying
    setCurrentTrack((nextIndex + tracks.length) % tracks.length)
  }

  return (
    <div className="site" ref={rootRef}>
      <header className="floating-nav">
        <a className="brand" href="/"><span className="brand-seal">陵</span><span><strong>走陵</strong><small>山陵行记</small></span></a>
        <nav className="desktop-nav" aria-label="主导航">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="nav-cta" href="#mausoleums">开始行走 <ArrowUpRight size={16} /></a>
        <button className="menu-button" type="button" aria-label="打开导航" onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <div className="player-drag-bounds" ref={playerBoundsRef}>
        <motion.aside className={`music-player ${isPlaying ? 'is-playing' : ''} ${playerMinimized ? 'is-minimized' : ''}`} aria-label="可拖动的背景音乐播放器" drag dragConstraints={playerBoundsRef} dragMomentum={false} dragElastic={.06} whileDrag={{ scale: 1.03, cursor: 'grabbing' }} onDragStart={() => setPlaylistOpen(false)}>
          <audio ref={audioRef} preload="metadata" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => changeTrack(currentTrack + 1, true)}><source src={tracks[currentTrack].src} type="audio/mpeg" /></audio>
          {playerMinimized ? (
            <button className="restore-player" type="button" aria-label="显示音乐播放器" onClick={() => setPlayerMinimized(false)}><Music2 size={19} /></button>
          ) : <>
            <button className="hide-player" type="button" aria-label="隐藏音乐播放器" onClick={() => { setPlayerMinimized(true); setPlaylistOpen(false) }}><EyeOff size={12} /></button>
            <button className="track-summary" type="button" onClick={() => setPlaylistOpen((open) => !open)} aria-expanded={playlistOpen}>
              <span className="music-disc"><Music2 size={16} /></span><span className="track-text"><strong>{tracks[currentTrack].title}</strong><small>{tracks[currentTrack].artist}</small></span><ListMusic size={17} />
            </button>
            <div className="player-controls">
              <button type="button" aria-label="上一首" onClick={() => changeTrack(currentTrack - 1)}><SkipBack size={16} /></button>
              <button className="play-button" type="button" aria-label={isPlaying ? '暂停' : '播放'} onClick={togglePlayback}>{isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button>
              <button type="button" aria-label="下一首" onClick={() => changeTrack(currentTrack + 1)}><SkipForward size={16} /></button>
            </div>
            <AnimatePresence>{playlistOpen && <motion.div className="track-list" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><p>山陵歌单 · 3 TRACKS</p>{tracks.map((track, index) => <button className={index === currentTrack ? 'active' : ''} type="button" onClick={() => { changeTrack(index); setPlaylistOpen(false) }} key={track.src}><span>0{index + 1}</span><span><strong>{track.title}</strong><small>{track.artist}</small></span>{index === currentTrack && <span className="playing-bars"><i /><i /><i /></span>}</button>)}</motion.div>}</AnimatePresence>
          </>}
        </motion.aside>
      </div>

      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button type="button" aria-label="关闭导航" onClick={() => setMenuOpen(false)}><X /></button><div><p>WALKING THROUGH HISTORY</p>{navItems.map(([label, href], index) => <motion.a href={href} key={href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 * index }}><span>0{index + 1}</span>{label}</motion.a>)}</div></motion.div>}</AnimatePresence>

      <main id="top">
        <section className="hero" ref={heroRef}>
          <div className="hero-backdrop"><video autoPlay muted loop playsInline preload="auto"><source src="/media/zhaoling-hero.mp4" type="video/mp4" /></video></div>
          <div className="hero-grain" /><div className="hero-word">走陵</div><div className="hero-foreground" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: .25 }}>
            <div className="hero-bottom"><p>从汉唐帝陵到无名墓志，沿着山脊与神道，在真实的大地上重新阅读中国历史。</p><div className="hero-actions"><a className="primary-button" href="#mausoleums">探索山陵 <ArrowRight size={18} /></a><a className="text-button" href="#journey">查看行程 <span>↘</span></a></div></div>
          </motion.div>
          <a className="scroll-cue" href="#mausoleums"><span>SCROLL TO DISCOVER</span><ChevronDown /></a><div className="hero-index">VOL. 01 <span>陕西 · 中国</span></div>
        </section>

        <section className="intro" id="mausoleums">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">01 / IMPERIAL MAUSOLEUMS</p>
            <h2>每一座山，<br />都是一部未合上的史书。</h2>
            <p className="section-lead">四次实地抵达，四种理解历史的方式。点击卡片，进入陵墓的地理、人物与现场细节。</p>
          </div>

          <div className="destination-grid" data-reveal>
            {mausoleums.slice(0, 3).map((item, index) => (
              <motion.button className="destination-card" type="button" onClick={() => setSelectedMausoleum(item)} whileHover="hover" key={item.name}>
                <motion.img variants={{ hover: { scale: 1.08 } }} transition={{ duration: .7 }} src={item.image} alt="" />
                <span className="card-number">0{index + 1}</span><span className="card-gradient" />
                <span className="card-copy"><small>{item.dynasty}</small><strong>{item.name}</strong><span><MapPin size={14} /> {item.place}</span></span>
                <span className="round-arrow"><ArrowUpRight /></span>
              </motion.button>
            ))}
          </div>

          <button className="wide-feature" type="button" onClick={() => setSelectedMausoleum(mausoleums[3])} data-reveal>
            <img src={mausoleums[3].image} alt="" /><span className="card-gradient" />
            <span className="wide-copy"><small>特别档案 · SPECIAL ARCHIVE</small><strong>上官婉儿墓</strong><span>一方墓志，如何改写一个人的历史形象？</span></span>
            <span className="round-arrow"><ArrowUpRight /></span>
          </button>
        </section>

        <section className="routes-section" id="routes">
          <div className="section-heading compact" data-reveal><p className="section-kicker">02 / FIELD ROUTES</p><h2>选择一种<br /><em>抵达历史</em>的方式。</h2></div>
          <div className="route-grid" data-reveal>
            <article><div className="route-icon"><Footprints /></div><p>HALF DAY · 轻量</p><h3>陵园漫步</h3><strong>半日</strong><span>从入口到核心遗址，适合第一次走陵</span><ul><li>现场路线图</li><li>核心遗迹导读</li><li>摄影机位建议</li></ul><a href="#journey">查看路线 <ArrowRight size={16} /></a></article>
            <article className="featured-route"><div className="popular">推荐路线</div><div className="route-icon"><Mountain /></div><p>FULL DAY · 深入</p><h3>山陵一日</h3><strong>一日</strong><span>从山势、神道到博物馆，建立完整空间感</span><ul><li>日出山势观察</li><li>神道与石刻行走</li><li>博物馆重点文物</li></ul><a href="#journey">查看路线 <ArrowRight size={16} /></a></article>
            <article><div className="route-icon"><BookOpen /></div><p>TWO DAYS · 研究</p><h3>田野研习</h3><strong>两日</strong><span>为历史、考古与建筑爱好者设计的专题行程</span><ul><li>陵墓制度背景</li><li>陪葬墓专题</li><li>现场记录方法</li></ul><a href="#journey">查看路线 <ArrowRight size={16} /></a></article>
          </div>
        </section>

        <section className="experience-section"><div className="experience-image" data-reveal><img src={images.wall} alt="云雾中的山脊与古建筑" /><span>01</span></div><div className="experience-copy" data-reveal><p className="section-kicker">READ THE LANDSCAPE</p><Compass /><h2>先看山，<br />再看陵。</h2><p>帝陵从不是孤立的建筑。山脉走向、河流、城郭与道路，共同决定了它在大地上的位置。现场行走，是理解这种关系最直接的方法。</p><a href="#journey">进入行走方法 <ArrowUpRight size={17} /></a></div></section>

        <section className="journey-section" id="journey" ref={journeyRef}><div className="journey-header"><p className="section-kicker">03 / THE JOURNEY</p><h2>一次走陵，<em>四段观看。</em></h2><span>横向浏览 →</span></div><div className="journey-track">{journey.map((step) => <article className="journey-card" key={step.day}><img src={step.image} alt="" /><span className="card-gradient" /><div className="journey-number">{step.day}</div><div className="journey-copy"><small>{step.label}</small><h3>{step.title}</h3><p>{step.text}</p></div></article>)}<div className="journey-end"><Sparkles /><p>在终点回望</p><h3>历史并未沉默，<br />只是等待被走近。</h3><a href="#notes">阅读手记 <ArrowRight /></a></div></div></section>

        <section className="stats-section"><div data-reveal><strong>4</strong><span>座山陵</span><p>已完成实地记录</p></div><div data-reveal><strong>1,163</strong><span>公里</span><p>累计行走与抵达</p></div><div data-reveal><strong>287</strong><span>帧影像</span><p>现场照片与细节</p></div><div data-reveal><strong>∞</strong><span>个问题</span><p>继续走下去的理由</p></div></section>

        <section className="gallery-section" id="gallery"><div className="section-heading gallery-heading" data-reveal><p className="section-kicker">04 / VISUAL ARCHIVE</p><h2>光落在石头上，<br /><em>时间显出形状。</em></h2></div><div className="gallery-grid" data-reveal>{[images.hero, images.stone, images.wall, images.temple, images.mountain].map((image, index) => <button type="button" onClick={() => setSelectedImage(image)} key={image} aria-label={`打开影像 ${index + 1}`}><img src={image} alt="山陵行走影像" /><span>0{index + 1}</span></button>)}</div></section>

        <section className="notes-section" id="notes"><div className="notes-backdrop" style={{ backgroundImage: `url(${images.mountain})` }} /><div className="notes-overlay" /><div className="notes-content" data-reveal><Camera /><p className="section-kicker">FIELD NOTE · 2026</p><blockquote>“陵墓不是历史的终点，<br />而是文明留下的问题。”</blockquote><p>山风掠过石像生，远处村庄的炊烟照常升起。过去从未真正离开，它只是成为了今天风景的一部分。</p><a href="#top">返回卷首 <ArrowUpRight size={17} /></a></div></section>
      </main>

      <footer><div className="footer-brand"><span className="brand-seal">陵</span><strong>走陵</strong><p>在大地上，读历史。</p></div><div className="footer-links"><p>EXPLORE</p>{navItems.slice(1).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div className="footer-note"><p>THE NEXT STOP</p><strong>北宋皇陵</strong><span>河南巩义 · 即将启程</span></div><div className="footer-bottom"><span>© 2026 走陵 · 我的山陵行记</span><span>WALKING THROUGH CHINESE HISTORY</span></div></footer>

      <AnimatePresence>{selectedMausoleum && <motion.div className="detail-modal" role="dialog" aria-modal="true" aria-label={selectedMausoleum.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="detail-image" initial={{ x: '-8%' }} animate={{ x: 0 }} exit={{ x: '-8%' }} style={{ backgroundImage: `url(${selectedMausoleum.image})` }} />
        <motion.div className="detail-copy" initial={{ x: '8%' }} animate={{ x: 0 }} exit={{ x: '8%' }}><button type="button" className="modal-close" aria-label="关闭" onClick={() => setSelectedMausoleum(null)}><X /></button><p className="section-kicker">MAUSOLEUM ARCHIVE</p><span>{selectedMausoleum.dynasty}</span><h2>{selectedMausoleum.name}</h2><p className="modal-place"><MapPin size={16} /> {selectedMausoleum.place}</p><p>{selectedMausoleum.text}</p><div className="highlights"><small>现场要点</small>{selectedMausoleum.highlights.map((item) => <span key={item}>{item}</span>)}</div><button type="button" className="primary-button" onClick={() => setSelectedMausoleum(null)}>继续浏览 <ArrowRight size={18} /></button></motion.div>
      </motion.div>}</AnimatePresence>

      <AnimatePresence>{selectedImage && <motion.div className="image-modal" role="dialog" aria-modal="true" aria-label="影像预览" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}><button type="button" aria-label="关闭影像"><X /></button><motion.img src={selectedImage} alt="山陵影像大图" initial={{ scale: .92 }} animate={{ scale: 1 }} exit={{ scale: .92 }} /></motion.div>}</AnimatePresence>
    </div>
  )
}
