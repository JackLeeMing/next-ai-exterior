'use client'
import { useEffect, useRef } from 'react'

declare global {
    interface Window { juxtapose: any }
}

export function Juxtapose({ before, after }: { before: string, after: string }) {
    const sliderRef = useRef(null)
    useEffect(() => {
        if (!sliderRef.current) {
            console.log('--- run ----')
            sliderRef.current = new (window as Window).juxtapose.JXSlider(
                "#juxtapose",
                [
                    {
                        src: before,
                        label: "Before",
                        credit: "raw image"
                    },
                    {
                        src: after,
                        label: "After",
                        credit: "after ai redesign"
                    }
                ],
                {
                    animate: true,
                    showLabels: true,
                    showCredits: true,
                    startingPosition: "50%",
                    makeResponsive: true
                }
            );
        }
        // return () => {
        //     sliderRef.current = null
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <></>
}