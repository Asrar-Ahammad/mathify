
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/shapes/2d");
    }, [router]);

    return null;
}
