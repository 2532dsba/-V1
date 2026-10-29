import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Menu, X } from 'lucide-react'
import './mausoleums.css'

const navigation = [
  ['首页', '/'],
  ['唐十八陵', '/tang18'],
  ['长乐公主墓', '/changle'],
  ['走陵足迹', '/#mausoleums'],
  ['影像志', '/#gallery'],
]

const cardImages = [
  '/media/mausoleums/zhaoling-card.png',
  '/media/mausoleums/hanyangling-card.png',
  '/media/mausoleums/qianling-card.png',
]

export default function MausoleumsPage({ mausoleums }) {
  const [selected, setSelected] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const featuredMausoleums = mausoleums.slice(0, 3)

  useEffect(() => {
    document.body.style.overflow = selected || previewImage || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected, previewImage, menuOpen])

  const openMausoleum = (item, index) => {
    if (item.route) {
      window.location.assign(item.route)
      return
    }
    setSelected({ ...item, image: cardImages[index] })
  }

  return (
    <div className="mausoleums-page">
      <div className="archive-atmosphere" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/media/zhaoling-hero.mp4" type="video/mp4" />
        </video>
      </div>

      <header className="archive-page-nav">
        <a className="archive-brand" href="/" aria-label="返回走陵首页">
          <span className="archive-brand-seal">陵</span>
          <span className="archive-brand-name"><strong>走陵</strong><small>山陵行记</small></span>
        </a>

        <nav className="archive-desktop-nav" aria-label="主导航">
          {navigation.map(([label, href], index) => (
            <a className={index === 0 ? 'active' : ''} href={href} key={label}>{label}</a>
          ))}
        </nav>

        <a className="archive-nav-cta" href="#archive-cards">开始行走 <ArrowUpRight size={18} /></a>
        <button className="archive-menu-button" type="button" aria-label="打开导航" onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="archive-mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="关闭导航" onClick={() => setMenuOpen(false)}><X /></button>
            <p>WALKING THROUGH HISTORY</p>
            <nav aria-label="移动端导航">
              {navigation.map(([label, href], index) => (
                <motion.a href={href} key={label} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }}>
                  <span>0{index + 1}</span>{label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="archive-main">
        <section className="archive-intro" aria-labelledby="archive-title">
          <motion.h1 id="archive-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: 'easeOut' }}>
            <span>每一座山，</span><span>都是一部未合上的史书。</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .12, ease: 'easeOut' }}>
            山陵不只是帝王的归宿，<br />更是历史、地理、信仰与时代的交汇之处。<br />我们沿着古道，走进陵墓的现场，<br />在山川与遗迹之间，重新阅读中国的过去。
          </motion.p>
        </section>

        <section className="archive-page-grid" id="archive-cards" aria-label="山陵档案列表">
          {featuredMausoleums.map((item, index) => (
            <motion.button
              className="archive-page-card"
              type="button"
              onClick={() => openMausoleum(item, index)}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .16 + index * .1, ease: 'easeOut' }}
              key={item.name}
              aria-label={item.route ? `进入${item.name}数字考古平台` : `查看${item.name}档案`}
            >
              <img src={cardImages[index]} alt={`${item.name}陵区景观`} />
              <span className="archive-card-shade" />
              <span className="archive-card-index">0{index + 1}</span>
              <span className="archive-card-arrow"><ArrowUpRight /></span>
              <span className="archive-card-copy">
                <small>{item.dynasty}</small>
                <strong>{item.name}</strong>
                <span><MapPin size={17} /> {item.place}</span>
              </span>
            </motion.button>
          ))}
        </section>
      </main>

      <AnimatePresence>{selected && <motion.div className="detail-modal" role="dialog" aria-modal="true" aria-label={selected.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="detail-image" initial={{ x: '-8%' }} animate={{ x: 0 }} exit={{ x: '-8%' }} style={{ backgroundImage: `url(${selected.image})` }}>{selected.coverVideo && <video autoPlay muted loop playsInline poster={selected.image}><source src={selected.coverVideo} type="video/mp4" /></video>}</motion.div>
        <motion.div className="detail-copy" initial={{ x: '8%' }} animate={{ x: 0 }} exit={{ x: '8%' }}><button type="button" className="modal-close" aria-label="关闭" onClick={() => setSelected(null)}><X /></button><p className="section-kicker">MAUSOLEUM ARCHIVE</p><span>{selected.dynasty}</span><h2>{selected.name}</h2><p className="modal-place"><MapPin size={16} /> {selected.place}</p><p>{selected.text}</p><div className="highlights"><small>现场要点</small>{selected.highlights.map((item) => <span key={item}>{item}</span>)}</div>{selected.gallery && <div className="mausoleum-gallery" aria-label={`${selected.name}实拍照片`}>{selected.gallery.map((image, index) => <button type="button" onClick={() => setPreviewImage(image)} aria-label={`查看实拍照片 ${index + 1}`} key={image}><img src={image} alt="" /></button>)}</div>}<button type="button" className="primary-button" onClick={() => setSelected(null)}>继续浏览 <ArrowUpRight size={18} /></button></motion.div>
      </motion.div>}</AnimatePresence>

      <AnimatePresence>{previewImage && <motion.div className="image-modal" role="dialog" aria-modal="true" aria-label="实拍影像预览" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewImage(null)}><button type="button" aria-label="关闭影像"><X /></button><motion.img src={previewImage} alt="陵墓实拍影像" initial={{ scale: .92 }} animate={{ scale: 1 }} exit={{ scale: .92 }} /></motion.div>}</AnimatePresence>
    </div>
  )
}
