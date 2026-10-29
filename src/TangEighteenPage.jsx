import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Mountain, ScrollText, X } from 'lucide-react'
import './tang-eighteen.css'

const covers = {
  xianling: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1800&q=88',
  zhaoling: 'https://images.unsplash.com/photo-1510332981392-36692ea3a195?auto=format&fit=crop&w=1800&q=88',
  qianling: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=88',
  tailing: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1800&q=88',
  jingling: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=88',
}

const mausoleums = [
  { id: 'xianling', number: '01', name: '献陵', emperor: '唐高祖 · 李渊', theme: '大唐帝国的起点', story: '晋阳起兵，建立唐朝，开启三百年大唐历史。', era: '开国', image: covers.xianling },
  { id: 'zhaoling', number: '02', name: '昭陵', emperor: '唐太宗 · 李世民', theme: '贞观盛世的历史坐标', story: '玄武门之后开创贞观之治，昭陵成为盛唐象征。', era: '贞观', image: covers.zhaoling, route: '/zhaoling' },
  { id: 'qianling', number: '03', name: '乾陵', emperor: '唐高宗 · 李治、武则天', theme: '帝后合葬的传奇', story: '中国历史上罕见的帝后合葬陵，见证大唐权力与时代风云。', era: '永徽', image: covers.qianling, video: '/media/qianling-cover.mp4' },
  { id: 'tailing', number: '04', name: '泰陵', emperor: '唐玄宗 · 李隆基', theme: '盛唐巅峰与转折', story: '开元盛世与安史之乱的重要历史坐标。', era: '开元', image: covers.tailing },
  { id: 'jingling', number: '05', name: '靖陵', emperor: '唐僖宗 · 李儇', theme: '大唐最后的背影', story: '黄巢起义之后，唐帝国走向终章。', era: '晚唐', image: covers.jingling },
]

const timeline = [
  ['618', '唐高祖李渊建立唐朝'],
  ['626', '玄武门之变，李世民即位'],
  ['627', '贞观元年，盛世开启'],
  ['683', '唐高宗李治入葬乾陵'],
  ['712', '唐玄宗开元时代'],
  ['755', '安史之乱，盛唐转折'],
  ['907', '唐朝灭亡'],
]

export default function TangEighteenPage() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = '唐十八陵·帝国山河记｜走陵'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="tang-page">
      <header className="tang-nav">
        <a className="tang-brand" href="/" aria-label="返回走陵首页"><span className="brand-seal">陵</span><span><strong>走陵</strong><small>唐十八陵专题</small></span></a>
        <nav aria-label="唐十八陵页面导航"><a href="#chapters">帝陵五卷</a><a href="#timeline">大唐长卷</a><a href="/zhaoling">数字昭陵</a></nav>
        <a className="tang-back" href="/"><ArrowLeft size={17} /> 返回首页</a>
      </header>

      <main>
        <section className="tang-hero">
          <div className="tang-hero-media" style={{ backgroundImage: `url(${covers.zhaoling})` }} />
          <div className="tang-hero-shade" />
          <div className="tang-hero-mark">唐</div>
          <motion.div className="tang-hero-copy" initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
            <p className="tang-kicker">THE EIGHTEEN IMPERIAL MAUSOLEUMS</p>
            <h1>唐十八陵<br /><em>帝国山河记</em></h1>
            <p>十八座陵墓，十八个历史坐标。沿着帝陵前行，重返大唐三百年。</p>
            <div><a href="#chapters">展开首批五卷 <ArrowRight size={18} /></a><span>618—907 · 长安以北</span></div>
          </motion.div>
          <div className="tang-hero-count"><strong>18</strong><span>座帝陵<br />横亘关中山河</span></div>
        </section>

        <section className="tang-intro" id="chapters">
          <div className="tang-section-heading"><p className="tang-kicker">01 / IMPERIAL CHAPTERS</p><h2>五座陵，<br /><em>读懂大唐的起落。</em></h2><p>当前代码包首批收录五座关键帝陵。从开国、贞观与乾陵传奇，到开元转折和晚唐背影，组成一条可行走的帝国叙事线。</p></div>
          <div className="tang-card-grid">
            {mausoleums.map((item, index) => <motion.button type="button" className={`tang-card tang-card-${index + 1}`} onClick={() => item.route ? window.location.assign(item.route) : setSelected(item)} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65, delay: index * .06 }} key={item.id} aria-label={item.route ? `进入${item.name}数字考古平台` : `阅读${item.name}专题`}>
              {item.video ? <video autoPlay muted loop playsInline preload="metadata" poster={item.image}><source src={item.video} type="video/mp4" /></video> : <img src={item.image} alt="" />}
              <span className="tang-card-shade" /><span className="tang-card-number">{item.number}</span><span className="tang-era">{item.era}</span>
              <span className="tang-card-copy"><small>{item.emperor}</small><strong>{item.name}</strong><span>{item.theme}</span><p>{item.story}</p></span>
              <span className="tang-card-arrow"><ArrowRight /></span>
            </motion.button>)}
          </div>
        </section>

        <section className="tang-river" aria-label="唐十八陵专题说明">
          <div><Mountain /><p className="tang-kicker">MOUNTAINS AS MONUMENTS</p><h2>帝陵不是孤立的墓葬，<br />而是写进山河的国家史。</h2></div>
          <p>唐代帝陵散布于关中北部山原。山势、神道、石刻与陪葬墓群，共同记录王朝制度、人物命运与时代转折。</p>
        </section>

        <section className="tang-timeline" id="timeline">
          <div className="tang-timeline-head"><div><p className="tang-kicker">02 / THE TANG DYNASTY</p><h2>大唐生命长卷</h2></div><CalendarDays /></div>
          <div className="tang-time-track">{timeline.map(([year, event], index) => <motion.article initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} key={year}><span>0{index + 1}</span><strong>{year}</strong><i /><p>{event}</p></motion.article>)}</div>
        </section>
      </main>

      <footer className="tang-footer"><div><ScrollText /><span><strong>唐十八陵 · 帝国山河记</strong><small>走陵专题档案 · 首批五卷</small></span></div><div><a href="/zhaoling">进入数字昭陵 <ArrowRight size={16} /></a><a href="/">回到走陵首页 <ArrowRight size={16} /></a></div></footer>

      <AnimatePresence>{selected && <motion.div className="tang-modal" role="dialog" aria-modal="true" aria-label={`${selected.name}专题`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="tang-modal-media" initial={{ scale: 1.06 }} animate={{ scale: 1 }} exit={{ scale: 1.06 }} style={{ backgroundImage: `url(${selected.image})` }}>{selected.video && <video autoPlay muted loop playsInline poster={selected.image}><source src={selected.video} type="video/mp4" /></video>}</motion.div>
        <motion.div className="tang-modal-copy" initial={{ x: 50 }} animate={{ x: 0 }} exit={{ x: 50 }}><button type="button" onClick={() => setSelected(null)} aria-label="关闭专题"><X /></button><p className="tang-kicker">CHAPTER {selected.number}</p><span>{selected.emperor}</span><h2>{selected.name}</h2><h3>{selected.theme}</h3><p>{selected.story}</p><div><MapPin size={17} /><span>唐十八陵 · 关中帝陵带</span></div><button className="tang-modal-close" type="button" onClick={() => setSelected(null)}>返回五卷 <ArrowRight size={17} /></button></motion.div>
      </motion.div>}</AnimatePresence>
    </div>
  )
}
