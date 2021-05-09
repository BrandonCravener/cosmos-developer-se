import { useEffect, useRef, useState } from 'react'
import styles from './layout.module.css'
import * as THREE from 'three'
import NET from "vanta/dist/vanta.net.min";

export default function Layout({ children }) {
    const [vantaEffect, setVantaEffect] = useState(0)
    const bgRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: bgRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: true,
                minHeight: 200.00,
                minWidth: 200.00,
                maxDistance: 10,
                backgroundAlpha: 0,
                color: 0xFF6F00,
                scale: 1.00,
                scaleMobile: 1.00,
                spacing: 20,
                points: 20,
            }))
        }
    }, [vantaEffect])
    return (
        <div className={styles.container}>
            {children}
            <div className={styles.background} ref={bgRef}></div>
        </div>
    )
}