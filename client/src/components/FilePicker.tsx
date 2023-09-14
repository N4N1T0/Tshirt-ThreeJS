import { CustomButton } from '.'
import state from '../store'
import { useSnapshot } from 'valtio'

interface FilePickerProps {
  file: TFile | undefined
  setFile: React.Dispatch<React.SetStateAction<TFile | undefined>>
  readFile: (type: string) => void
}
export type TFile = {
  name: string
  lastModified: number
  webkitRelativePath: string
  size: number
  type: string
} | string

function FilePicker ({ file, setFile, readFile }: FilePickerProps) {
  const snap = useSnapshot(state)

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          className='border-[3px]'
          id='file-upload'
          type='file'
          accept='image/'
          onChange={(e) => {
            const selectedFile = e.target.files?.[0]
            if (selectedFile !== undefined) {
              setFile(selectedFile)
            }
          }}
        />
        <label
          style={{
            color: snap.color,
            borderColor: snap.color
          }}
          htmlFor='file-upload'
          className='filepicker-label'
        >Upload File</label>
        <p className='mt-2 text-gray-900 text-sm truncate'>
          {typeof file === 'string'
            ? 'No File Selected'
            : file?.name
          }
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
          <CustomButton
            type='outline'
            title='Logo'
            handleClick={() => {
              readFile('logo')
            }}
            customStyle='text-xs'
          />
          <CustomButton
            type='filled'
            title='Full'
            handleClick={() => {
              readFile('full')
            }}
            customStyle='text-xs'
          />
      </div>
    </div>
  )
}

export default FilePicker
