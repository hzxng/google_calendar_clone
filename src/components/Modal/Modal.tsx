import styles from './Modal.module.scss'
import { ReactComponent as DeleteIcon } from '@assets/images/delete.svg'
import cn from 'classnames'

export default function Modal({
  handleClose,
  children,
  type,
  handleDelete,
  modalPosition,
}: {
  handleClose: () => void
  children: React.ReactNode
  type?: string
  handleDelete?: () => void
  modalPosition: {
    top: number
    left: number
  }
}) {
  const isDelete = type === 'delete'
  const maxLeftPosition = modalPosition.left - 470 < 82.1875
  const maxTopPosition = modalPosition.top - 100 > 388

  return (
    <div
      className={styles.modalContainer}
      style={{
        top: maxTopPosition ? '388px' : `${modalPosition.top - 100}px`,
        left: maxLeftPosition
          ? `${modalPosition.left + 130}px`
          : `${modalPosition.left - 470}px`,
      }}
    >
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
