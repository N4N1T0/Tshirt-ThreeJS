import { useSnapshot } from 'valtio'
import state from '../store'

interface Props {
  tab: {
    name: string
    icon: string
  }
  isFilterTab?: boolean
  isActiveTab?: boolean
  handleClick?: () => void
}

function Tab ({ tab, isActiveTab, isFilterTab, handleClick }: Props) {
  const snap = useSnapshot(state)

  const activeStyles = isFilterTab === true && isActiveTab === true
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn hover:scale-75 transition-all ease-in duration-150 ${isFilterTab === true ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab === true ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  )
}

export default Tab
