export const getCustomModalPosition = (
  modalPosition: {
    top: number
    left: number
  },
  limitValue: number
) => {
  const maxLeftPosition = modalPosition.left - 470 < 82.1875
  const maxTopPosition = modalPosition.top - 100 > limitValue

  return {
    top: maxTopPosition ? `${limitValue}px` : `${modalPosition.top - 100}px`,
    left: maxLeftPosition
      ? `${modalPosition.left + 100}px`
      : `${modalPosition.left - 470}px`,
  }
}
