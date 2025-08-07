import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { FaPlay } from "react-icons/fa"

import { useSelector } from "react-redux"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ?? editData ?? ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
        setSelectedFile(file)
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true,
    noKeyboard: true,
  })

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  return (
    <div
      {...getRootProps()}
      className={`${previewSource ? "bg-richblack-700" : "bg-richblack-600"} flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dotted border-richblack-500 p-6`}
    >
      <input
        {...getInputProps()}
        ref={inputRef}
        style={{ display: "none" }}
      />

      <label className="mb-2 text-sm text-richblack-5">
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {previewSource ? (
        <>
          {!video ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-40 w-full rounded-md object-cover"
            />
          ) : (
            <div className="relative h-40 w-full overflow-hidden rounded-md bg-black">
              <video
                ref={inputRef}
                src={previewSource}
                muted
                loop
                playsInline
                autoPlay
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <FaPlay className="text-white text-3xl" />
              </div>
            </div>
          )}
          {!viewData && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPreviewSource("")
                setSelectedFile(null)
                setValue(name, null)
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Remove
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={openFileDialog}
          >
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{' '}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>
            <ul className="mt-3 flex list-disc space-x-4 text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024×576</li>
            </ul>
          </div>
        </div>
      )}

      {errors[name] && (
        <span className="mt-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
