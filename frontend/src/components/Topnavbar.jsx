import Link from "next/link"
import React from "react"

export function Topnavbar () {
    return (
        <nav className="bg-[#fc456a]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="https://www.facebook.com" className="text-white hover:text-gray -300">
                        Facebook
                    </Link>
                    <Link href="https://www.instagram.com" className="text-white hover:text-gray-300">
                        Instagram
                    </Link>
                    <Link href="https://www.twitter.com" className="text-white hover:text-gray-300">
                        Twitter
                    </Link>
                    <Link href="https://www.youtube.com" className="text-white hover:text-gray-300">
                        YouTube
                    </Link>
                 </div>
                <div className="text-white">
                    <span>Phone: (123) 456-7890</span>
                </div>
            </div>
        </nav>
    )
}