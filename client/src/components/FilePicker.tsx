import { CustomButton } from '.'

interface Props {
  file: {
    name: string
    lastModified: Date
    lastModifiedDate: Date
    webkitRelativePath: string
    size: number
    type: string
  } | string
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  readFile: (type: string) => void
}

function FilePicker ({ file, setFile, readFile }: Props) {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/'
          onChange={(e) => {
            const selectedFile = e.target.files?.[0]
            if (selectedFile !== null) {
              setFile(selectedFile)
            }
          }}
        />
        <label
          htmlFor='file-upload'
          className='filepicker-label'
        >Upload File</label>
        <p className='mt-2 text-gray-500 text-sm truncate'>
          {file === '' ? 'No File Selected' : file?.name}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
          <CustomButton
            type='outline'
            title='Logo'
            handleClick={() => { readFile('logo') }}
            customStyle='text-xs'
          />
          <CustomButton
            type='filled'
            title='Full'
            handleClick={() => { readFile('full') }}
            customStyle='text-xs'
          />
      </div>
    </div>
  )
}

export default FilePicker
