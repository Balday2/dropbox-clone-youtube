"use client";
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import DropZoneComponent from 'react-dropzone'
import toast from 'react-hot-toast';
function DropZone() {

  const [loading, setLoading] = useState(false)
  const { isLoaded, user, isSignedIn } = useUser()

  // max file size 20MB 
  const maxSize = 20971520;
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was onborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        await  uploadPost(file)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const uploadPost = async (selectedFile: File) => {
    if(loading) return;
    if(!user) return;

    setLoading(true);
    const toastId = toast.loading('uploading...')
    
    const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef, selectedFile).then( async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadURL: downloadURL,
      })
    })
    setLoading(false);
    toast.success('uploaded succeffuly', { id: toastId })
  }
  return (
    <DropZoneComponent 
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}>
      {({ 
        getRootProps, 
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
      }) => {
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className='mt-4'>
            <div {...getRootProps()} className={cn(
              'w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
              isDragActive 
                ? 'bg-[#035FFE] text-white animate-pulse'
                : 'bg-gray-100/50 dark:bg-slate-800/80 text-slate-400'
            )}>
              <input {...getInputProps()} />
              {!isDragActive && "Click hre or drop a file to upload"}
              {isDragActive && !isDragReject && "Drop to upload this file"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        )
      }}
    </DropZoneComponent>
  );
}

export default DropZone;
