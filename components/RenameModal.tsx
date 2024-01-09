'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { ref } from "firebase/storage"
import { Input } from "./ui/input"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import toast from "react-hot-toast"


function RenameModal() {
  const { user } = useUser()
  const [input, setInput] = useState('')
  const [setIsRenameModalOpen, isRenameModalOpen, fileId, filename] = 
    useAppStore((state) => [
      state.setIsRenameModalOpen,
      state.isRenameModalOpen,
      state.fileId,
      state.filename
  ])

  async function renameFile(){
    if(!user || !fileId) return;
    const toastId = toast.loading('Renaming...')
    updateDoc(doc(db, 'users', user.id, 'files', fileId), {
      filename: input
    })
    toast.success('Renamed successfully', { id: toastId })
    setInput('')
    setIsRenameModalOpen(false)
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={((isOpen) => {
        setIsRenameModalOpen(isOpen);
      })}
    >
     
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>

          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if(e.key === 'Enter') {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size='sm'
            className="px-3 flex-1"
            variant={'ghost'}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size='sm'
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal