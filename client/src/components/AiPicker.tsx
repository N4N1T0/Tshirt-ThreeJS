import { useSnapshot } from 'valtio'
import { CustomButton } from './'
import state from '../store'

interface CustomButtonProps {
  prompt: string
  setPrompt: (e: string) => void
  generatingImg: boolean
  handleSubmit: (e: string) => void
}

function AiPicker ({ prompt, setPrompt, generatingImg, handleSubmit }: CustomButtonProps) {
  const snap = useSnapshot(state)
  return (
    <div className='aipicker-container'>
      <textarea
        style={{
          borderColor: snap.color
        }}
        value={prompt}
        placeholder='Ask Ai for Ideas'
        rows={5}
        className='aipicker-textarea text-gray-900 placeholder-gray-900'
        onChange={(e) => { setPrompt(e.target.value) }}
      />

        <div className='flex flex-wrap gap-2'>
          {generatingImg
            ? (
            <CustomButton
              type='outline'
              title='Asking Ai...'
              customStyle='text-xs'
              handleClick={() => {}}
            />
              )
            : (
            <>
              <CustomButton
                type='outline'
                title='Ai Logo'
                handleClick={() => { handleSubmit('logo') }}
                customStyle='text-xs'
                />

              <CustomButton
                type='filled'
                title='Ai Full'
                handleClick={() => { handleSubmit('full') }}
                customStyle='text-xs'
                />
              </>
              )}
        </div>
    </div>
  )
}

export default AiPicker
