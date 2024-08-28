import { generateVideoThumbnail } from '@/app/hooks/utils'
import { IImage, IProductImage } from '@/app/models/marca'
import { AddCircleOutline, CheckCircleOutline, Close, RadioButtonUnchecked } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Reorder } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'

interface ImagesUploaderProps {
    value: IProductImage[] | any,
    onChange: (newImages) => void,
    name: string,
    label: string,
    className?: string,
    imgClassName?: string
}



const ImagesUploader = ({ value, onChange, name, label, className, imgClassName }: ImagesUploaderProps) => {

    const inputRef = useRef(null)

    const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);

        const thumbnailsPromises = files.map(async (file) => {
            let url;

            if (file.type.startsWith('video/')) {
                url = await generateVideoThumbnail(file);
            } else {
                url = URL.createObjectURL(file)
            }

            return { url, isNew: true, cover: false, file, position: { x: 0, y: 0, scale: 1 } }
        });

        const newImages = await Promise.all(thumbnailsPromises);
        console.log(newImages, 'IMAGENES')
        onChange({ target: { name, value: [...(value || []), ...newImages] } })
    }
    return (
        <div className={`w-full  flex border-zinc-500/50 border p-2 rounded relative overflow-visible ${className}`}>
            <p className=' bg-foreground absolute -top-2 text-xs px-2 left-2 text-copyLight'>{label}</p>

            <div className={`grid place-content-center bg-background/30 mr-2 rounded min-h-32 min-w-20 ${imgClassName}`}>
                <input type='file' multiple className=' hidden' onChange={handleChangeImages} ref={inputRef} />
                <IconButton onClick={() => inputRef.current.click()}><AddCircleOutline fontSize='large' /></IconButton>
            </div>

            <Reorder.Group values={value || []} onReorder={(nv) => { onChange({ target: { name, value: nv } }) }} className='flex gap-2 max-w-full items-center ' axis='x'>
                {value?.map((img, idx) => {
                    const isCover = img?.cover

                    const handleChangeCover = () => {
                        let newImagenes = [...(value || [])]?.map((el, i) => {
                            if (i === idx) {
                                return ({ ...el, cover: true })
                            } else {
                                return ({ ...el, cover: false })
                            }
                        })
                        onChange({ target: { name, value: newImagenes } })
                    }

                    const handleRemove = () => {
                        let newImagenes = [...(value || [])]?.map((el, i) => {
                            if (i === idx) {
                                return ({ ...el, delete: true })
                            } else {
                                return el
                            }
                        })
                        onChange({ target: { name, value: newImagenes } })

                    }
                    if (img?.delete) return


                    return (<Reorder.Item value={img} key={`${img?.file?.name || img?.asset_id}`} className={` relative ${imgClassName}`}>
                        <IconButton draggable={false} className='!absolute right-2 top-1 !z-50 bg-background/60' size='small' onClick={handleRemove}><Close fontSize='small' /></IconButton>
                        <IconButton draggable={false} className='!absolute right-12 top-1 !z-50 text-xs flex gap-1 hover:bg-background/80 bg-background/60 rounded-md' size='small' onClick={handleChangeCover}>{!img?.cover ? <RadioButtonUnchecked fontSize='small' /> : <CheckCircleOutline fontSize='small' />}
                            Portada
                        </IconButton>
                        <Image width={200} height={200} src={img?.isNew ? img.url : `/uploads/${img?.url}`} alt='Uploaded image' draggable={false} className=' size-full object-cover' />
                    </Reorder.Item>)
                })}
            </Reorder.Group>

        </div>
    )
}

export default ImagesUploader