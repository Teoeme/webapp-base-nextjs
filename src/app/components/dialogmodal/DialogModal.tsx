'use client'

import useModal from '@/app/hooks/useModal';
import React, { ReactNode, useEffect, useRef } from 'react';
import './dialogmodal.css'
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface DialogModalProps {
  modalName: string;
  children: ReactNode;
  className?: string;  // Para permitir personalización de estilos
  cleanOnClose:boolean
}

const DialogModal: React.FC<DialogModalProps> = ({ modalName, children, className,cleanOnClose=false }) => {
  const { isOpen, close,data } = useModal(modalName);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      key={`${modalName}-modal`}
      className={`text-copy px-2 overflow-hidden rounded shadow ${className}`}
      onClose={(e)=>{close(cleanOnClose); e.stopPropagation()}}
      onCancel={(e)=>{close(cleanOnClose); e.stopPropagation()}} 
    >
        <div className=' w-full py-2 flex justify-between items-center text-xs uppercase text-copyLighter '>
            <p>{data?.Title}</p>
            <IconButton onClick={(e)=>{close(cleanOnClose); e.stopPropagation()}} size='small'><Close fontSize='small' /></IconButton>
        </div>
        <div className=' w-max p-2'>
      {children}
        </div>
    </dialog>
  );
};

export default DialogModal;
