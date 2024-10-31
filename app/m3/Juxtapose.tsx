'use client'
import { useEffect, useRef } from 'react'

declare global {
    interface Window { juxtapose: any }
}

export function Juxtapose() {
    const sliderRef = useRef(null)
    useEffect(() => {
        if (!sliderRef.current) {
            sliderRef.current = new (window as Window).juxtapose.JXSlider(
                "#juxtapose",
                [
                    {
                        src:
                            "https://juxtapose.knightlab.com/static/img/Sochi_11April2005.jpg",
                        label: "Apr. 2005",
                        credit: "Google Earth"
                    },
                    {
                        src: "https://juxtapose.knightlab.com/static/img/Sochi_22Nov2013.jpg",
                        label: "Nov. 2013",
                        credit: "Google Earth"
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
        return () => {
            sliderRef.current = null
        }
    }, [])
    return <></>
}