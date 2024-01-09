'use client'

import { SignInButton, SignedOut } from "@clerk/clerk-react"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggler } from "./ThemeToggler"

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href='/' className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src='https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png'
            alt="logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
      </Link>

      <div className="flex items-center px-5 space-x-2">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode="modal" />
        </SignedOut>
      </div>
    </header>
  )
}

export default Header