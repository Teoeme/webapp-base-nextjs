'use client'
import React, { useRef } from 'react'
import { generateVideoThumbnail } from '../../hooks/utils'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { AutorenewOutlined, ChangeCircle, ChangeCircleOutlined, Close } from '@mui/icons-material'

const ImageConfiguration = ({ value, label, multiple = false, imageName, onChange,name,imageClassName ,imagesContainer}) => {
  const inputRef = useRef(null)

  const handleChangeImages = async (e) => {
    const files = Array.from(e.target.files);

    const thumbnailsPromises = files.map(async (file) => {
      let url;
      const extension = file.type.split('/')?.[1]
      if (file.type.startsWith('video')) {
        url = await generateVideoThumbnail(file);
      } else {
        url = URL.createObjectURL(file)
      }
      return { url, isNew: true, cover: false, file, name: imageName }
    });

    const newImages = await Promise.all(thumbnailsPromises);

    if (!multiple) {
      const prevImages = value?.map(el => ({ ...el, delete: true }))
      onChange({ target: { value: [...(prevImages || []), ...newImages],name } })
    } else {
      onChange({ target: { value: [...(value || []), ...newImages],name } })
    }
  }

  return (
    <div className='w-max'>
      <div className={`bg-zinc-900/20 w-max rounded ${imagesContainer}`}>
        {value?.map((el, idx) => {
          const url = el?.isNew ? el.url : `/uploads/${el.url}`
          return (
            !el.delete && <div key={`imagen-${el?.size}`} className='relative w-max  '>
              {multiple && <IconButton draggable={false} className='!absolute right-2 top-1 !z-50 bg-white/60' size='small' onClick={() => {
                let Images = [...value]
                Images[idx]['delete'] = true
                onChange({ target: { value: Images } })
              }}><Close fontSize='small' /></IconButton>}
              {!multiple && <IconButton draggable={false} className='!absolute right-1/2 translate-x-1/2 -translate-y-1/2 top-1/2 !z-50 ' size='small' onClick={() => {
                inputRef.current.click()
              }}><AutorenewOutlined fontSize='large' /></IconButton>}
              <Image className={`size-24 object-contain rounded ${imageClassName}`} alt={`config-image-${el?.size}`} src={url} width={200} height={200} key={`imagen-${el?.size}`} />
            </div>
          )
        }

        )}
      </div>
      <input ref={inputRef} type='file' onChange={handleChangeImages} multiple={multiple} hidden />
      <p className='w-full text-center text-sm'>{label}</p>

    </div>
  )
}

export default ImageConfiguration