"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {

    children: ReactNode;

    className?: string;

    delay?: number;

    direction?: "up" | "left" | "right" | "scale";

};

export default function Reveal({

    children,

    className = "",

    delay = 0,

    direction = "up",

}: RevealProps) {

    const ref = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const element = ref.current;

        if (!element) {

            return;

        }

        const observer = new IntersectionObserver(

            ([entry]) => {

                if (entry.isIntersecting) {

                    setVisible(true);

                    observer.unobserve(element);

                }

            },

            {

                threshold: 0,

                rootMargin: "0px 0px -50px 0px",

            }

        );

        observer.observe(element);

        return () => observer.disconnect();

    }, []);

    const hiddenTransform = {

        up: "translateY(28px) rotate(0.8deg)",

        left: "translateX(-28px) rotate(-0.8deg)",

        right: "translateX(28px) rotate(0.8deg)",

        scale: "scale(0.96) rotate(-0.6deg)",

    }[direction];
    return (

        <div

            ref={ref}
            className={className}

            style={{ opacity: visible ? 1 : 0, transform: visible ? "translate3d(0, 0, 0) rotate(0deg) scale(1)" : hiddenTransform, transition: `opacity 560ms ease-out ${delay}ms, transform 760ms cubic-bezier(.16, 1, .3, 1) ${delay}ms`, }}

        >

            {children}

        </div>

    );

}