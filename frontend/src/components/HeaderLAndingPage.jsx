import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HeaderLandingPage() {
    return(
        <header className="sticky top-0 z-50 bg-white shadow-md h-[200px] flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between p-4">

       {/* logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="font-bold text-lg">SmartRentPlatform</span>
          </div>
          {/* searchbar */}
          <div className="hidden md:flex items-center gap-2 border rounded-full px-3 py-1 shadow-sm">
            <Input placeholder="Search Destinations" className="border-none focus-visible:ring-0 w-56" />
            <Button className="rounded-full bg-red-500 hover:bg-red-600">Search</Button>
          </div>

          {/* Profile/Menu */}
          <div className="flex items-center gap-4">
          <span className="hidden md:inline font-medium cursor-pointer">
            Become a host
          </span>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          </div>
          </div>
        </header>
    );
}