import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import Draggable from 'react-draggable';
import DialogActionButton from './DialogActionButton';

export default function Dialog({
  title,
  open,
  setOpen,
  actionButton,
  defaultPosition,
  children,
  canBeClosed,
}) {
  const nodeRef = React.useRef(null);
  const closeDialog = () => {
    if (canBeClosed) {
      setOpen(false);
    }
  };

  if(open) {
    return (
      <Draggable
        nodeRef={nodeRef}
        cancel=".dialog-action-button"
        bounds="#root"
        handle="#drag-handle"
        defaultPosition={defaultPosition ? defaultPosition : { x: 0, y: 0 }}
      >
        <div ref={nodeRef} className="overflow-visible touch-pan-auto top-0 absolute z-[1200] inline-block align-bottom bg-white rounded-lg text-left shadow-xl sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div id="drag-handle" className="absolute top-0 left-0 h-20 w-full" />
          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="dialog-action-button bg-white rounded-md text-gray-600 hover:text-gray-400 focus:outline-none disabled:opacity-25"
              onClick={closeDialog}
              disabled={!canBeClosed}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-9 w-9" aria-hidden="true" />
            </button>
          </div>
          <div className="py-3 text-center sm:mt-0 sm:m-4 sm:text-left">
            <div id="dialog-title" className="mb-4">
              {title}
            </div>
            <div className="w-full">
              {children}
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse flex">
            {actionButton}
            <DialogActionButton
              disabled={!canBeClosed}
              color={'white'}
              triggerAction={closeDialog}
              text={'Close'}
            />
          </div>
        </div>
      </Draggable>
    );
  }

  return <></>;
}
