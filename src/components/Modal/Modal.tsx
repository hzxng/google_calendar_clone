import styles from './Modal.module.scss'
import { ReactComponent as DeleteIcon } from '@assets/images/delete.svg'
import cn from 'classnames'

export default function Modal({
  handleClose,
  children,
  type,
  handleDelete,
}: {
  handleClose: () => void
  children: React.ReactNode
  type?: string
  handleDelete?: () => void
}) {
  const isDelete = type === 'delete'

  return (
    <div className={styles.modalContainer}>
      <div
        className={cn(styles.modalHeader, {
          [styles.deleteModalHeader]: isDelete,
          [styles.createModalHeader]: !isDelete,
        })}
      >
        {isDelete ? (
          <DeleteIcon width={20} height={20} onClick={handleDelete} />
        ) : (
          <i className="material-symbols-outlined">drag_handle</i>
        )}
        <i className="material-symbols-outlined" onClick={handleClose}>
          close
        </i>
      </div>
      <div className={styles.modalBody}>{children}</div>
    </div>
  )
}
