"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === "/" ? "text-gray-900 border-b-2 border-red-500" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === "/blogs" || pathname?.startsWith("/blogs/")
                  ? "text-gray-900 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
