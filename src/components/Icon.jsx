export function Icon({ src, onClick = () => {}, onMouseEnter = () => {}, onMouseLeave = () => {}, rotate = false }) {
  return (
    <div
      style={{ height: '20px', width: '20px', userSelect: 'none'}}
      className={rotate ? 'icon-container rotate-180' : 'icon-container'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <img height="20px" width="20px" src={src} />
    </div>
  )
}
