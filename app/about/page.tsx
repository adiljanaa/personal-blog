import { Mail, Github, Twitter, Linkedin, MapPin, Briefcase, GraduationCap } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const skills = [
    { name: 'Next.js', level: 90 },
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Docker', level: 70 },
    { name: 'Git', level: 90 },
  ]

  const experiences = [
    {
      role: '前端开发工程师',
      company: '科技公司',
      period: '2022 - 至今',
      description: '负责公司核心产品的用户界面开发和优化'
    },
    {
      role: '全栈开发工程师',
      company: '创业公司',
      period: '2020 - 2022',
      description: '参与产品从0到1的开发，负责前后端架构设计'
    },
    {
      role: 'Web开发实习生',
      company: '互联网公司',
      period: '2019 - 2020',
      description: '学习并参与公司网站和内部系统的开发维护'
    }
  ]

  const education = [
    {
      degree: '计算机科学与技术',
      school: '某大学',
      period: '2016 - 2020',
      description: '主修计算机科学，辅修人机交互设计'
    },
    {
      degree: '前端开发培训',
      school: '在线课程平台',
      period: '2020',
      description: '系统学习现代前端开发技术和最佳实践'
    }
  ]

  return (
    <div className="space-y-12">
      {/* 个人简介 */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-blue-400 rounded-full blur-lg opacity-50"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-primary-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800">
            <span className="text-4xl">👨‍💻</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          关于我
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          一名热爱技术的开发者，喜欢分享知识和经验，致力于创造有价值的内容
        </p>
      </div>

      {/* 基本信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
              <Briefcase size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">职业</h3>
              <p className="text-gray-600 dark:text-gray-300">前端开发工程师</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
              <MapPin size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">地点</h3>
              <p className="text-gray-600 dark:text-gray-300">中国 · 北京</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
              <GraduationCap size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">教育</h3>
              <p className="text-gray-600 dark:text-gray-300">计算机科学学士</p>
            </div>
          </div>
        </div>
      </div>

      {/* 个人介绍 */}
      <section className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          我的故事
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            从大学时代开始接触编程，就被代码创造世界的可能性所吸引。毕业后一直从事前端开发工作，见证了Web技术的飞速发展。
          </p>
          <p>
            除了日常开发工作，我热衷于学习新技术、阅读优秀代码、参与开源项目。我相信持续学习和技术分享是成长的重要途径。
          </p>
          <p>
            创建这个博客的初衷是为了记录自己的学习历程，分享开发经验，同时也能帮助到其他开发者。希望这里的内容能对您有所启发和帮助。
          </p>
        </div>
      </section>

      {/* 技能 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          技能专长
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                <span className="text-gray-600 dark:text-gray-300">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 工作经历 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          工作经历
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute left-0 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
              <div className="absolute left-[7px] top-4 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {exp.period}
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-2">
                  {exp.company}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 教育背景 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          教育背景
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {edu.degree}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 mb-1">
                {edu.school}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                {edu.period}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 联系我 */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          联系我
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <Mail size={18} className="mr-2" />
            发送邮件
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <Github size={18} className="mr-2" />
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <Twitter size={18} className="mr-2" />
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <Linkedin size={18} className="mr-2" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}