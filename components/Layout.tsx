import * as THREE from "three";

import React, { useEffect, useRef, useState } from "react";

import NET from "vanta/dist/vanta.net.min";
import styles from "../styles/layout.module.css";
import { LayoutProps } from "../lib/types";

function Layout({ children }: LayoutProps) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const bgRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: bgRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          maxDistance: 10,
          backgroundAlpha: 0,
          color: 0xffc107,
          scale: 1.0,
          scaleMobile: 1.0,
          spacing: 20,
          points: 20,
        })
      );
    }
  }, [vantaEffect]);
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.background} ref={bgRef} />
    </div>
  );
}

export default Layout;
