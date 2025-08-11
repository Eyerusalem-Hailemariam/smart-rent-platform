import Image from "next/image";

export function HeroSection() {
    return (
        <div className="relative h-[400px] flex items-center justify-center">
            <Image
                src="/image.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl font-bold">Welcome to Smart Rent</h1>
                <p className="mt-2">Find your perfect rental property today.</p>
            </div>
        </div>
    );
}
