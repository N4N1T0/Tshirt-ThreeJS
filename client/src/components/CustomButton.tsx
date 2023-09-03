import { useSnapshot } from 'valtio'
import state from '../store'
import { getContrastingColor } from '../config/helpers'

interface Props {
  type: string
  title: string
  customStyle: string
  handleClick: () => void

}

function CustomButton ({
  type,
  title,
  customStyle,
  handleClick
}: Props) {
  const snap = useSnapshot(state)

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: getContrastingColor(snap.color)
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >

      {title}
    </button>
  )
}

export default CustomButton
