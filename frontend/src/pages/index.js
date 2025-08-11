import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HeaderLandingPage } from "@/components/HeaderLAndingPage"
import { HeroSection } from "@/components/HeroSection"

export default function TabsDemo() {
  return (
    <div className="flex w-full flex-col">
      <HeaderLandingPage/>
      <HeroSection/>
    </div>
  )
}
