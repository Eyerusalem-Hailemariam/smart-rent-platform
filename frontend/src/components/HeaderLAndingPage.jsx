import {Button} from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export function HeaderLandingPage() {
    return(
     <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Smart Rent
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/about" className="text-gray-600 hover:text-gray-900">
                        About   
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                        Contact
                    </Link>
                    <Link href="/login" className="text-gray-600 hover:text-gray-900">
                        Login
                    </Link>
                    <Link href="/register" className="text-gray-600 hover:text-gray-900">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    </header>
    );
}