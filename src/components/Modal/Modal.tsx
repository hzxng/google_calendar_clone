import styles from './Modal.module.scss'
import { ReactComponent as DeleteIcon } from '@assets/images/delete.svg'
import cn from 'classnames'
import { useEffect, useRef } from 'react'

export default function Modal({
  isOpen,
  handleClose,
  children,
  type,
  handleDelete,
  modalPosition,
}: {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
  type?: string
  handleDelete?: () => void
  modalPosition: {
    top: string
    left: string
  }
}) {
  const isDelete = type === 'delete'
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  return (
    <div
      ref={modalRef}
      className={styles.modalContainer}
      style={{
        top: modalPosition.top,
        left: modalPosition.left,
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
