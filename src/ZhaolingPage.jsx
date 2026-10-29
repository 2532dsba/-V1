import { useEffect, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Bot, Box, Compass, Map, MapPin, Mountain,
  RotateCcw, Send, Sparkles,
} from 'lucide-react'
import './zhaoling.css'

const events = [
  { year: '626', title: '玄武门之变', text: '李世民即位前的关键转折，随后开启贞观时代。' },
  { year: '627', title: '贞观元年', text: '唐太宗改元贞观，帝国政治秩序逐渐成形。' },
  { year: '636', title: '长孙皇后葬昭陵', text: '昭陵营建由此开始，开创唐代“因山为陵”的制度。' },
  { year: '649', title: '李世民入葬', text: '唐太宗归葬九嵕山，昭陵成为盛唐陵寝制度的重要样本。' },
]

const sitesGIS = [
  { name: '昭陵主峰', lon: 108.25, lat: 34.65, type: '帝陵核心', x: 455, y: 235 },
  { name: '昭陵六骏', lon: 108.251, lat: 34.651, type: '石刻遗存', x: 486, y: 215 },
  { name: '陪葬墓群', lon: 108.24, lat: 34.66, type: '墓葬群', x: 210, y: 105 },
]

const track = [
  [140, 360], [250, 300], [430, 225], [535, 190],
]

const quickQuestions = ['昭陵六骏是什么？', '为什么因山为陵？', '陪葬墓群有何意义？']

function guideAnswer(question) {
  if (question.includes('六骏')) return '昭陵六骏是为纪念唐太宗征战功绩而雕刻的六件战马浮雕，原置于昭陵北司马门，是唐代石刻艺术的重要代表。'
  if (question.includes('因山') || question.includes('制度')) return '“因山为陵”利用天然山体营造玄宫，以九嵕山的山势构成陵寝主体，也让帝王陵墓与广阔地理景观融为一体。'
  if (question.includes('陪葬')) return '昭陵周边分布大量功臣、宗室与贵族陪葬墓。它们不仅体现唐初政治关系，也保存了研究服饰、壁画、墓志和中外交流的重要材料。'
  return '我是昭陵数字讲解员。你可以询问昭陵六骏、因山为陵、陪葬墓群，或输入一个与唐昭陵有关的问题。'
}

export default function ZhaolingPage() {
  const [activeSite, setActiveSite] = useState(sitesGIS[0])
  const [angle, setAngle] = useState(18)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('选择一个问题，开始数字导览。')

  useEffect(() => {
    const previousTitle = document.title
    document.title = '唐昭陵数字考古平台｜走陵'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  const ask = (value = question) => {
    const next = value.trim()
    if (!next) return
    setQuestion(next)
    setAnswer(guideAnswer(next))
  }

  return (
    <div className="zhaoling-page">
      <header className="zhaoling-nav">
        <a className="zhaoling-brand" href="/" aria-label="返回走陵首页">
          <span className="brand-seal">陵</span>
          <span><strong>唐昭陵</strong><small>DIGITAL ARCHAEOLOGY</small></span>
        </a>
        <nav aria-label="唐昭陵页面导航">
          <a href="#chronology">历史坐标</a>
          <a href="#gis">遗址 GIS</a>
          <a href="#model">数字陵园</a>
          <a href="#guide">AI 讲解</a>
        </nav>
        <a className="zhaoling-back" href="/"><ArrowLeft size={17} /> 返回走陵</a>
      </header>

      <main>
        <section className="zhaoling-hero">
          <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/media/zhaoling-hero.mp4" type="video/mp4" />
          </video>
          <div className="zhaoling-hero-overlay" />
          <div className="zhaoling-hero-grid" />
          <div className="zhaoling-hero-copy">
            <p className="zhaoling-kicker"><span /> ZHAOLING · 34.650°N / 108.250°E</p>
            <h1>唐昭陵<br /><em>数字考古平台</em></h1>
            <p>沿九嵕山势读取帝陵格局，从历史时间、遗址坐标与数字模型重新认识唐太宗昭陵。</p>
            <div className="zhaoling-hero-actions">
              <a href="#gis">进入遗址地图 <ArrowRight size={18} /></a>
              <span><i /> 数据档案 V3 已接入</span>
            </div>
          </div>
          <div className="zhaoling-coordinates"><span>主峰海拔</span><strong>1,188<small>m</small></strong><span>礼泉 · 九嵕山</span></div>
        </section>

        <section className="zhaoling-section chronology" id="chronology">
          <div className="zhaoling-section-head">
            <div><p className="zhaoling-kicker">01 / CHRONOLOGY</p><h2>四个年份，<br />一座帝陵的形成。</h2></div>
            <p>时间轴来自唐昭陵数字考古平台 V3，用关键事件串联昭陵的政治背景与营建过程。</p>
          </div>
          <div className="timeline-line">
            {events.map((event, index) => <article key={event.year}>
              <span>0{index + 1}</span><strong>{event.year}</strong><i /><h3>{event.title}</h3><p>{event.text}</p>
            </article>)}
          </div>
        </section>

        <section className="zhaoling-section gis-section" id="gis">
          <div className="zhaoling-section-head light">
            <div><p className="zhaoling-kicker">02 / FIELD GIS</p><h2>把遗址放回<br />真实的山势。</h2></div>
            <p>点击地图点位，查看主峰、六骏与陪葬墓群的坐标关系；黄色轨迹对应代码包中的现场路线数据。</p>
          </div>
          <div className="gis-console">
            <div className="gis-map" role="img" aria-label="唐昭陵遗址点位与考察路线示意图">
              <div className="gis-toolbar"><span><Map size={16} /> 九嵕山遗址图层</span><span>3 SITES · 4 GPS POINTS</span></div>
              <svg viewBox="0 0 700 460" aria-hidden="true">
                <defs>
                  <linearGradient id="mapGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c4d52a" stopOpacity=".16" /><stop offset="1" stopColor="#c4d52a" stopOpacity="0" /></linearGradient>
                  <filter id="pinGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <rect width="700" height="460" fill="url(#mapGlow)" />
                <g className="contours">
                  <path d="M34 354C108 280 160 316 222 242S370 134 445 166s116 20 220-74" />
                  <path d="M12 392c94-84 162-40 226-120s152-118 218-75 123 11 220-65" />
                  <path d="M68 430c94-74 154-43 226-119s128-83 198-67 106-11 174-60" />
                  <path d="M92 270c56-54 108-42 151-94s116-75 174-49 110 5 170-59" />
                  <path d="M180 410c24-63 73-76 127-89s96-46 116-95 81-83 146-78" />
                </g>
                <polyline className="gps-track" points={track.map((point) => point.join(',')).join(' ')} />
                {track.map(([x, y], index) => <circle className="track-point" cx={x} cy={y} r="4" key={`${x}-${y}`}><title>路线点 {index + 1}</title></circle>)}
                {sitesGIS.map((site) => <g className={`site-pin ${activeSite.name === site.name ? 'active' : ''}`} transform={`translate(${site.x} ${site.y})`} onClick={() => setActiveSite(site)} key={site.name}>
                  <circle className="pin-wave" r="20" /><circle className="pin-dot" r="7" filter="url(#pinGlow)" /><text x="14" y="-12">{site.name}</text>
                </g>)}
              </svg>
              <div className="map-compass"><Compass size={18} /><span>N</span></div>
            </div>
            <aside className="gis-sidebar">
              <p>遗址点位 / SITES</p>
              {sitesGIS.map((site, index) => <button type="button" className={activeSite.name === site.name ? 'active' : ''} onClick={() => setActiveSite(site)} key={site.name}>
                <span>0{index + 1}</span><span><strong>{site.name}</strong><small>{site.type}</small></span><MapPin size={17} />
              </button>)}
              <div className="site-readout"><span>当前坐标</span><strong>{activeSite.lat.toFixed(3)}°N</strong><strong>{activeSite.lon.toFixed(3)}°E</strong><p>{activeSite.name} · {activeSite.type}</p></div>
            </aside>
          </div>
        </section>

        <section className="zhaoling-section model-section" id="model">
          <div className="zhaoling-section-head">
            <div><p className="zhaoling-kicker">03 / DIGITAL TOMB</p><h2>九嵕山<br />数字陵园。</h2></div>
            <p>根据原代码包的 3D 山体概念重构为无需额外模型即可浏览的地形视图。拖动角度控制，观察陵山与墓群关系。</p>
          </div>
          <div className="model-console">
            <div className="terrain-stage">
              <div className="terrain-status"><span><i /> MODEL ONLINE</span><span>CONTOUR / RELIEF</span></div>
              <svg viewBox="0 0 720 520" className="terrain-model" style={{ transform: `rotate(${angle - 18}deg)` }} aria-label="九嵕山数字地形模型">
                <defs>
                  <linearGradient id="mountainFace" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ddea55" /><stop offset=".46" stopColor="#708022" /><stop offset="1" stopColor="#142022" /></linearGradient>
                  <linearGradient id="mountainSide" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#839224" /><stop offset="1" stopColor="#263318" /></linearGradient>
                </defs>
                <ellipse cx="360" cy="410" rx="280" ry="65" fill="#020707" opacity=".72" />
                <path d="M104 392 354 76 620 398 360 474Z" fill="url(#mountainFace)" />
                <path d="M354 76 620 398 360 474Z" fill="url(#mountainSide)" opacity=".8" />
                <g className="terrain-contours">
                  <path d="M146 356Q355 432 576 360" /><path d="M176 318Q350 383 548 323" /><path d="M207 278Q352 335 516 282" /><path d="M238 238Q353 285 486 243" /><path d="M274 193Q354 228 450 198" /><path d="M308 148Q354 169 414 153" />
                </g>
                <g className="terrain-label"><circle cx="354" cy="92" r="8" /><path d="m362 92 78-30" /><text x="450" y="64">昭陵玄宫 · 1,188m</text></g>
                <g className="terrain-tombs">{[160, 220, 280, 340, 400, 460, 520].map((x, index) => <rect x={x} y={414 + (index % 2) * 14} width="12" height="8" rx="2" key={x} />)}</g>
              </svg>
              <div className="terrain-axis"><span>W</span><i /><span>E</span></div>
            </div>
            <aside className="model-controls">
              <Box />
              <p>观察角度</p><strong>{angle}°</strong>
              <input aria-label="调整数字陵园观察角度" type="range" min="0" max="36" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
              <button type="button" onClick={() => setAngle(18)}><RotateCcw size={16} /> 重置视角</button>
              <div><span><i className="core" /> 帝陵核心</span><span><i className="tombs" /> 陪葬墓群</span><span><i className="contour" /> 等高线</span></div>
            </aside>
          </div>
        </section>

        <section className="zhaoling-section guide-section" id="guide">
          <div className="guide-intro"><p className="zhaoling-kicker">04 / AI GUIDE</p><Bot /><h2>昭陵数字<br />讲解员</h2><p>从第二个代码包接入的问答功能，可快速了解帝陵制度、石刻与陪葬墓。</p></div>
          <div className="guide-chat">
            <div className="guide-answer"><span><Sparkles size={17} /> ZHAOLING GUIDE</span><p>{answer}</p></div>
            <div className="quick-questions">{quickQuestions.map((item) => <button type="button" onClick={() => ask(item)} key={item}>{item}</button>)}</div>
            <form onSubmit={(event) => { event.preventDefault(); ask() }}><label htmlFor="zhaoling-question">输入你的问题</label><div><input id="zhaoling-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：昭陵六骏是什么？" /><button type="submit" aria-label="发送问题"><Send size={18} /></button></div></form>
          </div>
        </section>
      </main>

      <footer className="zhaoling-footer"><div><Mountain /><span><strong>唐昭陵数字考古平台</strong><small>九嵕山下的帝国记忆</small></span></div><a href="/">返回走陵首页 <ArrowRight size={17} /></a></footer>
    </div>
  )
}
