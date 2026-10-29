import { useEffect } from 'react'

const BUILD_STEPS = [
  {
    num: '01',
    title: '网站构思',
    para: [
      '先想清楚这个站给谁看、要留下什么。「走陵」两个字定下来之后，主题就清晰了——不是旅游攻略，也不是考古报告，而是一个普通行走者眼中的山陵现场。',
      '栏目拆成三块：陵墓档案（去了哪几座）、现场手记（看到了什么）、影像志（拍下了什么）。后来又加了长乐公主墓、唐十八陵两个专题，把单次行走扩成可以连续走的系列。',
    ],
  },
  {
    num: '02',
    title: '内容创作',
    para: [
      '每一座陵都要先做功课：查墓志、查考古简报、查地方志里的山水位置。把这些材料按「人物 — 空间 — 现场 — 疑问」四类归到一个文件夹里，再动笔。',
      '图片统一从 Wikimedia Commons 选 CC 授权的实地照片，拍摄对象必须和档案里那座陵对得上。所有图都会裁成同一比例、加一层暗角，保证卡片墙看起来整齐。',
    ],
  },
  {
    num: '03',
    title: '网站开发',
    para: [
      '技术栈选了最轻的组合：Vite + React + Framer Motion + GSAP。深色底（#050b0d）配一点荧光绿（#c4d52a），标题用瘦金体，正文用宋体系，让山陵的沉静感落到屏幕上。',
      '首屏用一段昭陵的现场视频当背景，滚动时有视差。卡片 hover 会轻微放大，长页面用 GSAP ScrollTrigger 做横向滑动和渐入动画。所有动效都尊重系统的「减少动态效果」设置。',
    ],
  },
  {
    num: '04',
    title: 'GitHub 上传与部署',
    para: [
      '代码推到 GitHub 私有仓库，再用 Vercel 连着仓库自动部署。每次 git push，Vercel 就重新构建一次，几十秒后线上站点就跟着更新，不需要自己碰服务器。',
      '构建产物是纯静态文件，CDN 全球分发，国内访问也稳定。环境变量、自定义域名都在 Vercel 后台点几下就配好，不用写一行 nginx。',
    ],
  },
  {
    num: '05',
    title: '购买域名并绑定',
    para: [
      '在域名服务商那里挑一个短、好记、和「陵/山/行」沾边的名字，买下来之后把 DNS 的 A 记录指到 Vercel。',
      'Vercel 会自动签好 HTTPS 证书，绑定完打开就是 https。以后每走一座新陵、每写一篇新手记，push 一次代码，线上就多一块新内容——网站是活的，跟着脚步一起长。',
    ],
  },
]

export default function IntroPage() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/massively/assets/css/main.css'
    link.id = 'massively-css'
    document.head.appendChild(link)
    document.body.style.background = '#1e252d'
    document.body.classList.add('is-preload')
    return () => {
      link.remove()
      document.body.style.background = ''
      document.body.classList.remove('is-preload')
    }
  }, [])

  const nav = [
    { label: '首页', href: '/#top' },
    { label: '唐十八陵', href: '/tang18' },
    { label: '长乐公主墓', href: '/changle' },
    { label: '走陵足迹', href: '/#mausoleums' },
    { label: '影像志', href: '/#gallery' },
  ]

  return (
    <div id="wrapper" className="fade-in">
      <style>{`
        body { background: #1e252d !important; }
        #wrapper { overflow-x: hidden; }
        #intro { padding: 5rem 2rem 2.5rem; text-align: center; }
        #intro h1 { font-size: clamp(2.4rem, 6vw, 4.2rem); letter-spacing: .1em; }
        #intro p { max-width: 620px; margin: 1.4rem auto 0; line-height: 2; color: #c0c8cf; }
        #header { border-top: 0; }
        #main { padding: 2rem 0 1rem; }
        .post.featured {
          border-bottom: 1px solid rgba(255,255,255,.12);
          padding: 2.5rem 2rem 3rem;
          margin: 0 auto 1rem;
          max-width: 880px;
        }
        .post.featured header.major { text-align: left; margin: 0 0 1.8rem; }
        .post.featured h2 { font-size: clamp(1.7rem, 3vw, 2.4rem); line-height: 1.4; }
        .post.featured p { font-size: 1rem; line-height: 2.1; color: #c0c8cf; margin-top: 1.2rem; }
        .post.featured .actions { margin-top: 1.8rem; }
        section.posts { display: block !important; max-width: 880px; margin: 0 auto; padding: 0 2rem; }
        section.posts article {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 1.8rem;
          border-bottom: 1px solid rgba(255,255,255,.08);
          padding: 2.2rem 0;
        }
        section.posts article .num {
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1;
          color: #d9ea42;
          opacity: .85;
          font-family: 'Source Sans Pro', sans-serif;
        }
        section.posts article .body header { margin-bottom: .8rem; }
        section.posts article .date { letter-spacing: .25em; font-size: .72rem; color: #8a949c; }
        section.posts article h3 { font-size: 1.4rem; margin: .4rem 0 0; }
        section.posts article p { font-size: .98rem; line-height: 2.05; color: #b8c0c8; margin: .6rem 0 0; }
        .intro-quote {
          max-width: 880px;
          margin: 2.5rem auto;
          padding: 2.2rem 2rem;
          border-left: 3px solid #d9ea42;
          background: rgba(217,234,66,.05);
        }
        .intro-quote p { font-size: 1.05rem; line-height: 2.1; color: #e0e6ea; margin: 0; font-style: italic; }
        #footer { padding: 2.5rem 2rem; max-width: 880px; margin: 0 auto; }
        #footer h3 { color: #8a949c; font-size: .8rem; letter-spacing: .2em; }
        #footer p { font-size: .95rem; line-height: 1.9; }
        @media (max-width: 720px) {
          section.posts article { grid-template-columns: 1fr; gap: .6rem; }
          section.posts article .num { font-size: 2.2rem; }
        }
      `}</style>

      <div id="intro">
        <h1>走陵<br />简介</h1>
        <p>从一座山到另一座山，把行走、石刻、考古与文字，整理成一份可以继续走下去的档案。</p>
      </div>

      <header id="header">
        <a href="/" className="logo">走陵 · 山陵行记</a>
      </header>

      <nav id="nav">
        <ul className="links">
          {nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
          <li className="active"><a href="/intro">简介</a></li>
        </ul>
      </nav>

      <div id="main">
        <article className="post featured">
          <header className="major">
            <span className="date">ABOUT / 关于本站</span>
            <h2>为什么要走陵？</h2>
            <p>帝陵不是孤立的墓葬。山脉走向、河流、城郭与道路，共同决定了它在大地上的位置。这个站，就是把一次次实地踏查的所见、所读、所疑，整理成可以回看、可以续走的记录。它不是攻略，也不是论文，只是一个普通人在石头和山风之间写下的笔记。</p>
          </header>
          <ul className="actions special">
            <li><a href="/" className="button large">返回首页开始行走</a></li>
          </ul>
        </article>

        <section className="posts">
          {BUILD_STEPS.map((s) => (
            <article key={s.title}>
              <div className="num">{s.num}</div>
              <div className="body">
                <header>
                  <span className="date">STEP {s.num}</span>
                  <h3>{s.title}</h3>
                </header>
                {s.para.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </article>
          ))}
        </section>

        <div className="intro-quote">
          <p>「陵墓不是历史的终点，而是文明留下的问题。」——山风掠过石像生，远处村庄的炊烟照常升起。过去从未真正离开，它只是成为了今天风景的一部分。</p>
        </div>
      </div>

      <footer id="footer">
        <section className="split contact">
          <section className="alt">
            <h3>关于</h3>
            <p>走陵 · 我的山陵行记<br />在大地上，读历史。</p>
          </section>
          <section>
            <h3>下一步</h3>
            <p><a href="/#mausoleums">进入陵墓档案 →</a></p>
          </section>
        </section>
      </footer>

      <div id="copyright">
        <ul><li>&copy; 2026 走陵</li><li>版式：<a href="https://html5up.net/massively">HTML5 UP Massively</a></li></ul>
      </div>
    </div>
  )
}
