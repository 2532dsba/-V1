import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, X } from 'lucide-react'
import './mausoleums.css'

export default function MausoleumsPage({ mausoleums }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="mausoleums-page">
      <header className="archive-page-nav">
        <a className="brand" href="/" aria-label="返回走陵首页"><span className="brand-seal">陵</span><span><strong>走陵</strong><small>山陵行记</small></span></a>
        <a className="back-home" href="/"><ArrowLeft size={17} /> 返回首页</a>
      </header>

      <main>
        <section className="archive-page-hero">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <p className="section-kicker">01 / IMPERIAL MAUSOLEUMS</p>
            <h1>每一座山，<br /><em>都是一部未合上的史书。</em></h1>
            <p>四次实地抵达，四种理解历史的方式。沿着山势、神道与墓志，进入帝陵背后的地理、人物和时代。</p>
          </motion.div>
          <span className="archive-page-count">04 <small>ARCHIVES</small></span>
        </section>

        <section className="archive-page-grid" aria-label="山陵档案列表">
          {mausoleums.map((item, index) => (
            <motion.button className="archive-page-card" type="button" onClick={() => setSelected(item)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, delay: index * .08 }} key={item.name}>
              <img src={item.image} alt="" /><span className="card-gradient" /><span className="archive-card-index">0{index + 1}</span>
              <span className="archive-card-copy"><small>{item.dynasty}</small><strong>{item.name}</strong><span><MapPin size={14} /> {item.place}</span><p>{item.text}</p></span>
              <span className="round-arrow"><ArrowUpRight /></span>
            </motion.button>
          ))}
        </section>

        <section className="archive-page-footer"><p>下一站 · THE NEXT STOP</p><h2>北宋皇陵</h2><span>河南巩义 · 即将启程</span><a href="/">回到走陵首页 <ArrowRight size={17} /></a></section>
      </main>

      <AnimatePresence>{selected && <motion.div className="detail-modal" role="dialog" aria-modal="true" aria-label={selected.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="detail-image" initial={{ x: '-8%' }} animate={{ x: 0 }} exit={{ x: '-8%' }} style={{ backgroundImage: `url(${selected.image})` }} />
        <motion.div className="detail-copy" initial={{ x: '8%' }} animate={{ x: 0 }} exit={{ x: '8%' }}><button type="button" className="modal-close" aria-label="关闭" onClick={() => setSelected(null)}><X /></button><p className="section-kicker">MAUSOLEUM ARCHIVE</p><span>{selected.dynasty}</span><h2>{selected.name}</h2><p className="modal-place"><MapPin size={16} /> {selected.place}</p><p>{selected.text}</p><div className="highlights"><small>现场要点</small>{selected.highlights.map((item) => <span key={item}>{item}</span>)}</div><button type="button" className="primary-button" onClick={() => setSelected(null)}>继续浏览 <ArrowRight size={18} /></button></motion.div>
      </motion.div>}</AnimatePresence>
    </div>
  )
}
