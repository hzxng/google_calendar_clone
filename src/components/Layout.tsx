import React from 'react'
import Header from './Header'
import AsideLeft from './AsideLeft'
import AsideRight from './AsideRight'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.createBtn}>
        <button>
          <i className="material-symbols-outlined">add</i>
          <span>만들기</span>
          <i className="material-symbols-outlined">arrow_drop_down</i>
        </button>
      </div>
      <div className={styles.layoutBody}>
        <aside>
          <AsideLeft />
        </aside>
        <main className={styles.main}>{children}</main>
        <aside>
          <AsideRight />
        </aside>
      </div>
    </div>
  )
}

export default Layout
