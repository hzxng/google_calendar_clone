import styles from './AsideRight.module.scss'
import cn from 'classnames'
import { ReactComponent as ChevronRight } from '@assets/images/chevro-right.svg'

export default function AsideRight() {
  const ICON_LIST = [
    {
      src: 'https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png',
      alt: 'keep',
    },
    {
      src: 'https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png',
      alt: 'tasks',
    },
    {
      src: 'https://www.gstatic.com/companion/icon_assets/contacts_2022_2x.png',
      alt: '주소록',
    },
    {
      src: 'https://www.gstatic.com/companion/icon_assets/maps_v7_2x_web_24dp.png',
      alt: '지도',
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconContainer}>
          <div className={styles.iconList}>
            {ICON_LIST.map((icon) => (
              <div className={styles.iconWrapper} key={icon.alt}>
                <div
                  className={cn(styles.img, {
                    [styles.keep]: icon.alt === 'keep',
                  })}
                >
                  <img src={icon.src} width={20} height={20} alt={icon.alt} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.divider} />
          <div className={styles.iconWrapper}>
            <div className={cn(styles.img, styles.plus)}>
              <img
                src="https://fonts.gstatic.com/s/i/googlematerialicons/add/v21/black-24dp/1x/gm_add_black_24dp.png"
                width={20}
                height={20}
                alt="부가기능 설치하기"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hiddenBtn}>
        <div className={styles.iconWrapper}>
          <div className={cn(styles.img, styles.plus)}>
            <ChevronRight width={20} height={20} fill="rgb(95, 99, 104)" />
          </div>
        </div>
      </div>
    </div>
  )
}
