import { CustomButton } from './'

interface CustomButtonProps {
  prompt: string
  setPrompt: (e: string) => void
  generatingImg: boolean
  handleSubmit: (e: string) => void
}

function AiPicker ({ prompt, setPrompt, generatingImg, handleSubmit }: CustomButtonProps) {
  return (
    <div className='aipicker-container'>
      <textarea
         value={prompt}
        placeholder='Ask Ai for Ideas'
        rows={5}
        className='aipicker-textarea'
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
