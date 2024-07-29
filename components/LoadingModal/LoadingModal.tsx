'use client';
import Modal from 'react-modal';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Puff } from 'react-loading-icons'
import { X } from "lucide-react"

interface LoadingModalProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

Modal.setAppElement('#loading');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const LoadingModal = ({loading, setLoading }: LoadingModalProps) => {
    if (!loading) {
        return null;
    }

    return (
      <Modal
        isOpen={loading}
        onRequestClose={() => setLoading(false)}
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 ${loading ? `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]` : `animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]`} sm:rounded-lg`}
        contentLabel="Example Modal"
      >
        <Dialog>
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>Processing Resume</DialogTitle>
            <Puff stroke="#000" />
            <DialogDescription className="text-md">
              We are processing your resume. Please be patient.
            </DialogDescription>
          </DialogHeader>
          <button
              className={`fixed right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ${loading ? 'text-black bg-accent' : ''}`} aria-label="close-modal"
              onClick={() => setLoading(false)}    
          >
            <X className="h-4 w-4" />
          </button>
        </Dialog>
      </Modal>
    )
  }