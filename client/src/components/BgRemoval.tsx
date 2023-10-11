import { useSnapshot } from 'valtio'
import { type TFile } from './FilePicker'
import state from '../store'
import { CustomButton } from '.'

interface BgRemovalProps {
  file: TFile
}

function BgRemoval ({ file }: BgRemovalProps) {
  const snap = useSnapshot(state)

  console.log(snap.logoDecal)

  const handleBgRemoval = async () => {
    const url = 'https://background-removal.p.rapidapi.com/remove'
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6bda8eb255msh8ffa7a61f94d446p1c7e9ejsn0942eaccdae9',
        'X-RapidAPI-Host': 'background-removal.p.rapidapi.com'
      },
      body: new URLSearchParams({
        image_base64: snap.logoDecal
      })
    }

    try {
      const response = await fetch(url, options)
      const result = await response.text()
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='bgremoval-container'>
      <div
        style={{
          borderColor: snap.color
        }}
        className='flex justify-center items-center border basis-3/4 text-center text-gray-900 px-3'>
        {typeof file === 'string'
          ? 'Upload a file first, use the File Picker'
          : (
            <img src={snap.logoDecal} alt='Upload Image' />
            )
        }
      </div>
      <div>
        <CustomButton
          type='filled'
          title='Remove Background'
          handleClick={handleBgRemoval}
          customStyle='text-sm px-3'
        />
      </div>
    </div>
  )
}

export default BgRemoval
