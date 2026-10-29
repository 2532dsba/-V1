import React, { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronRight,
  CircleDot,
  Crown,
  GitBranch,
  Landmark,
  MapPinned,
  Network,
  ScrollText,
  Sparkles,
} from 'lucide-react'
import './identity.css'

const railItems = [
  ['01', '人物概览', '她是谁', 'overview'],
  ['02', '家族网络', '她的世界', 'network'],
  ['03', '生平时间线', '她的一生', 'timeline'],
  ['04', '时代背景', '她所处的大唐', 'era'],
  ['05', '墓葬与身份', '她为何被如此安葬', 'burial'],
  ['06', '系统视角', '一个节点的意义', 'system'],
]

const timeline = [
  { year: '621', title: '出生', sub: '唐太宗之女', img: '/media/changle/assets/timeline-birth.jpg' },
  { year: '贞观年间', title: '册封', sub: '封长乐公主', img: '/media/changle/assets/timeline-title.jpg' },
  { year: '贞观年间', title: '婚姻', sub: '嫁长孙冲', img: '/media/changle/assets/timeline-marriage.jpg' },
  { year: '643', title: '去世', sub: '年二十三', img: '/media/changle/assets/timeline-death.jpg' },
  { year: '643', title: '陪葬昭陵', sub: '进入昭陵陪葬体系', img: '/media/changle/assets/timeline-burial.jpg' },
  { year: '20世纪', title: '考古发现', sub: '墓葬重新进入研究视野', img: '/media/changle/assets/timeline-excavation.jpg' },
]

const systemNodes = [
  { key: 'taizong', name: '唐太宗', role: '父亲 / 皇权', img: '/media/changle/assets/avatar-taizong.jpg', x: 50, y: 8 },
  { key: 'empress', name: '长孙皇后', role: '母亲 / 后族', img: '/media/changle/assets/avatar-empress.jpg', x: 78, y: 8 },
  { key: 'changle', name: '长乐公主', role: '核心节点', img: '/media/changle/assets/identity-portrait.jpg', x: 64, y: 42, hero: true },
  { key: 'spouse', name: '长孙冲', role: '婚姻 / 勋贵', img: '/media/changle/assets/avatar-spouse.jpg', x: 33, y: 44 },
  { key: 'zhaoling', name: '昭陵', role: '陵园系统', icon: Landmark, x: 48, y: 76 },
  { key: 'society', name: '初唐社会', role: '礼制 · 门阀 · 文化', icon: Crown, x: 78, y: 77 },
]

const systemEdges = [
  ['taizong', 'changle', '父女'],
  ['empress', 'changle', '母女'],
  ['spouse', 'changle', '婚姻'],
  ['changle', 'zhaoling', '陪葬'],
  ['changle', 'society', '身份'],
  ['zhaoling', 'society', '制度'],
  ['taizong', 'empress', '皇室'],
]

function LeftRail({ active, onChange }) {
  return (
    <aside className="identity-rail" aria-label="人物页面导航">
      <div className="rail-line" />
      {railItems.map(([num, title, sub, id]) => (
        <button
          key={id}
          className={`rail-item ${active === id ? 'is-active' : ''}`}
          onClick={() => {
            onChange(id)
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          <span className="rail-dot" />
          <span className="rail-num">{num}</span>
          <span className="rail-copy">
            <strong>{title}</strong>
            <small>{sub}</small>
          </span>
        </button>
      ))}
      <div className="rail-quote">
        <span aria-hidden="true">“</span>
        她短暂的一生，连接着一个伟大的时代。
      </div>
    </aside>
  )
}

function RelationshipGraph() {
  const byKey = useMemo(() => Object.fromEntries(systemNodes.map(n => [n.key, n])), [])
  return (
    <div className="relation-graph" aria-label="长乐公主关系网络">
      <svg className="relation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {systemEdges.map(([a, b]) => {
          const s = byKey[a]
          const t = byKey[b]
          return <line key={`${a}-${b}`} x1={s.x} y1={s.y} x2={t.x} y2={t.y} />
        })}
      </svg>
      {systemNodes.map(node => {
        const Icon = node.icon
        return (
          <div
            key={node.key}
            className={`relation-node ${node.hero ? 'hero-node' : ''}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="node-avatar">
              {node.img ? <img src={node.img} alt="" /> : <Icon size={26} />}
            </div>
            <strong>{node.name}</strong>
            <small>{node.role}</small>
          </div>
        )
      })}
      <span className="edge-label edge-father">父女</span>
      <span className="edge-label edge-mother">母女</span>
      <span className="edge-label edge-marriage">夫妻</span>
      <span className="edge-label edge-burial">陪葬</span>
      <span className="edge-label edge-politics">宗室</span>
    </div>
  )
}

function IdentityPage() {
  const [active, setActive] = useState('overview')
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <main className="identity-page">
      <div className="identity-bg" />
      <div className="identity-texture" />

      <div className="identity-topline">
        <a href="/changle" className="changle-back-home"><ArrowLeft size={16} /> 返回专题首页</a>
        <span>人物档案 / 系统关系 / 昭陵语境</span>
      </div>

      <LeftRail active={active} onChange={setActive} />

      <section id="overview" className="identity-main-panel identity-section">
        <div className="profile-copy">
          <p className="identity-kicker">人物概览 · PERSONA</p>
          <h1>她是谁</h1>
          <h2>长乐公主 · 李丽质</h2>
          <div className="life-date">621 — 643</div>
          <p className="profile-intro">
            长乐公主李丽质，是唐太宗李世民与长孙皇后之女。她的一生并不长，
            但她所处的位置异常关键：皇室、长孙氏、婚姻网络、礼制与昭陵陪葬体系，
            都在这个节点上相互连接。
          </p>
          <p className="profile-intro secondary">
            因此，这一页不只回答“她是谁”，还试图解释：一个人的身份如何被制度、
            亲族、空间与墓葬共同塑造。
          </p>
          <div className="profile-actions">
            <button className="identity-primary" onClick={() => scrollTo('timeline')}>查看完整时间线 <ArrowRight size={16} /></button>
            <button className="identity-secondary" onClick={() => scrollTo('burial')}><ScrollText size={16} /> 阅读墓志专题</button>
          </div>
        </div>

        <div className="portrait-panel" aria-label="长乐公主艺术化人物视觉">
          <img src="/media/changle/assets/identity-portrait.jpg" alt="长乐公主人物艺术化视觉" />
          <div className="portrait-caption">
            <span>艺术化复原视觉</span>
            <small>用于人物叙事，不作为考古复原结论</small>
          </div>
        </div>
      </section>

      <section id="network" className="network-panel identity-section">
        <div className="identity-section-heading is-compact">
          <p>系统节点 · RELATIONSHIP NETWORK</p>
          <h3>她的关系网络</h3>
          <span>一个人的身份，从来不是孤立的。</span>
        </div>
        <RelationshipGraph />
      </section>

      <aside className="context-column">
        <section id="era" className="context-card identity-section">
          <div className="context-title"><Crown size={18} /><span>她所处的时代</span></div>
          <h3>一个走向鼎盛的王朝</h3>
          <img src="/media/changle/assets/tang-capital.jpg" alt="唐代都城氛围视觉" />
          <p>
            贞观时期的政治秩序、宗室体系与贵族婚姻共同塑造了长乐公主的身份。
            她既是一个个体，也是初唐制度网络中的一环。
          </p>
          <button className="context-link">了解贞观之治 <ArrowRight size={14} /></button>
        </section>

        <section id="burial" className="context-card identity-section">
          <div className="context-title"><MapPinned size={18} /><span>她的墓葬位置</span></div>
          <h3>昭陵陵园中的一环</h3>
          <div className="map-frame">
            <img src="/media/changle/assets/zhaoling-map.jpg" alt="昭陵与长乐公主墓空间关系示意视觉" />
            <span className="map-badge badge-changle">长乐公主墓</span>
            <span className="map-badge badge-zhaoling">昭陵主陵</span>
          </div>
          <p>空间不是背景，而是身份秩序的一部分。陪葬关系把个人重新嵌入皇陵系统。</p>
          <button className="context-link">查看昭陵陵园全图 <ArrowRight size={14} /></button>
        </section>

        <section id="system" className="context-card system-card identity-section">
          <div className="context-title"><Network size={18} /><span>系统视角</span></div>
          <h3>她是一个节点</h3>
          <p>
            从系统论看，长乐公主不是孤立个体，而是一个连接皇室、门阀、陵园、礼制、
            文化与历史记忆的关键节点。研究她，就是研究这些关系如何共同运作。
          </p>
          <div className="system-tags">
            <span>皇室</span><span>婚姻</span><span>礼制</span><span>空间</span><span>墓葬</span>
          </div>
          <button className="context-link">进入系统分析 <GitBranch size={14} /></button>
        </section>
      </aside>

      <section id="timeline" className="identity-timeline identity-section">
        <div className="timeline-heading">
          <div><p>TIME AS A SYSTEM</p><h3>她的一生</h3></div>
          <span>短暂，却处在关系最密集的位置</span>
        </div>
        <div className="timeline-track">
          <div className="changle-timeline-line" />
          {timeline.map((item, index) => (
            <article className="timeline-item" key={`${item.year}-${item.title}`}>
              <div className="timeline-point"><CircleDot size={16} /></div>
              <div className="timeline-year">{item.year}</div>
              <h4>{item.title}</h4>
              <small>{item.sub}</small>
              <img src={item.img} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="system-summary">
        <Sparkles size={18} />
        <p>
          系统论的关键不在“列出多少人物”，而在“看见关系”：身份由亲族、制度、空间、
          时代与物质遗存共同构成；墓葬则把这些关系固定为可被考古重新读取的结构。
        </p>
      </section>
    </main>
  )
}

export default IdentityPage
