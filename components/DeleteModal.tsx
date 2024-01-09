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
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import toast from "react-hot-toast"

export function DeleteModal() {
  const { user } = useUser()
  const [setIsDeleteModalOpen, isDeleteModalOpen, fileId] = 
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.isDeleteModalOpen,
      state.fileId
  ])

  async function deleteFile(){
    if(!user || !fileId) return;
    const toastId = toast.loading('Renaming...')


    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, 'users', user.id, 'files', fileId))
        .then(() => {
          toast.success('file deleted successfully', { id: toastId })
        })
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
      })
    } catch (error) {
      toast.success('Error deleting document', { id: toastId })
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={((isOpen) => {
        setIsDeleteModalOpen(isOpen);
      })}
    >
     
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size='sm'
            className="px-3 flex-1"
            variant={'ghost'}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size='sm'
            variant={'destructive'}
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
