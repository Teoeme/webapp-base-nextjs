'use client'

import useModal from '@/app/hooks/useModal';
import React, { ReactNode, useEffect, useRef } from 'react';
import './dialogmodal.css'
import { Button, Dialog, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

interface DialogModalProps {
  modalName: string;
  children: ReactNode;
  className?: string;
  cleanOnClose:boolean,
  maxWidth?:'sm' | 'xs' | 'md' | 'lg' | 'xl' | false,
  fullScreen?:boolean,
  fullWidth?:boolean,
}

const DialogModal: React.FC<DialogModalProps> = ({ modalName, children, className,cleanOnClose=false,maxWidth='xs',fullScreen=false,fullWidth=false }) => {
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
    <>
      {isOpen && (
        <div className="custom-backdrop" onClick={(e)=>{close(cleanOnClose); e.stopPropagation()}}></div>
      )}
    <Dialog
    maxWidth={maxWidth}
    fullWidth={fullWidth}
    fullScreen={fullScreen}
    open={isOpen}
    key={`${modalName}-modal`}
    className={`text-copy p-3 overflow-hidden rounded shadow  ${className}`}
    PaperProps={{className:' bg-foreground', style:{backgroundImage:'none'}}}
    onClose={(e)=>{close(cleanOnClose)}}
    >
        <div className=' w-full p-2 flex justify-between items-center text-xs uppercase text-copyLighter '>
            <p>{data?.Title}</p>
            <IconButton onClick={(e)=>{close(cleanOnClose); e.stopPropagation()}} size='small'><Close fontSize='small' /></IconButton>
        </div>
        <div className=' w-full p-2'>
      {children}
        </div>
    </Dialog>
    </>
  );
};

export default DialogModal;
