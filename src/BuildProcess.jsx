import React from 'react'
import { ArrowDown } from 'lucide-react'
import './BuildProcess.css'

/**
 * 走陵 · 建站流程
 * 对照用户提供的五步流程图，以真实 HTML 文字排版实现，便于检索、阅读及后续编辑。
 * 独立组件：复制本文件及同名 CSS 即可移植到另一套 React 网站。
 */
const BUILD_STEPS = [
  { title: '第一步：网站构思', description: '确定主题、网站名称、栏目及功能' },
  { title: '第二步：内容创作', description: '撰写文章、整理图片、建立资料目录' },
  { title: '第三步：网站开发', description: '设计页面、编写代码、本地测试' },
  { title: '第四步： GitHub 上传与部署', description: '代码上传 GitHub，再通过 Vercel 发布' },
  { title: '第五步：购买域名并绑定', description: '配置域名解析、启用安全访问、正式上线' },
]

export default function BuildProcess() {
  return (
    <section id="build-process" className="zl-build-process" aria-labelledby="zl-build-process-title">
      <h2 id="zl-build-process-title" className="zl-build-sr-only">走陵网站建设流程</h2>
      <ol className="zl-build-list">
        {BUILD_STEPS.map(({ title, description }, index) => (
          <li className="zl-build-item" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            {index < BUILD_STEPS.length - 1 && (
              <ArrowDown className="zl-build-arrow" aria-hidden="true" size={20} strokeWidth={2} />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
