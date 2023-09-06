import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { ColorPicker, AiPicker, FilePicker, Tab, CustomButton } from '../components'

function Customizer () {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneraatingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case 'aipicker':
        return <AiPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null
    }
  }

  const handleSubmit = async (type: string) => {
    if (prompt === '') alert('Please enter a prompt')

    try {
      setGeneraatingImg(true)

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()

      handleDecal(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneraatingImg(false)
      setActiveEditorTab('')
    }
  }

  const handleDecal = (type: string, result: any) => {
    const decalType = DecalTypes[type as keyof typeof DecalTypes]

    state[decalType.stateProperty as keyof typeof state] = result

    if (activeFilterTab[decalType.filterTab as keyof typeof activeFilterTab]) {
      handleActiveFilter(decalType.filterTab)
    }
  }

  const handleActiveFilter = (tabName: string) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName as keyof typeof prevState]
      }
    })
  }

  const readFile = (type: string) => {
    reader(file)
      .then((result) => {
        handleDecal(type, result)
        setActiveEditorTab('')
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      if (activeEditorTab === tab.name) {
                        setActiveEditorTab('')
                      } else {
                        setActiveEditorTab(tab.name)
                      }
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='absolute <-10 top-5 right-5'
            {...fadeAnimation}
            >
              <CustomButton
                type='filled'
                title='Go Back'
                handleClick={() => { state.intro = true }}
                customStyle='w-fit px-4 py-2.5 font-bold text-sm'
              />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as keyof typeof activeFilterTab]}
                handleClick={() => { handleActiveFilter(tab.name) }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
