import styles from './Modal.module.scss'
import { ReactComponent as DeleteIcon } from '@assets/images/delete.svg'
import useClickOutside from '@hooks/useClickOutside'
import cn from 'classnames'

interface ModalProps {
  handleClose: () => void
  children: React.ReactNode
  type?: string
  handleDelete?: () => void
  modalPosition: {
    top: string
    left: string
  }
}

export default function Modal({
  handleClose,
  children,
  type,
  handleDelete,
  modalPosition,
}: ModalProps) {
  const isDelete = type === 'delete'
  const modalRef = useClickOutside(handleClose)

  return (
    <div ref={modalRef} className={styles.modalContainer} style={modalPosition}>
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
