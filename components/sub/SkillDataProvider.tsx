"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image';

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}

const SkillDataProvider = ({ src, width, height, index }: Props) => {

    const { ref, inView } = useInView({ // Se usa para detectar cuándo el componente está en la vista del usuario.
        triggerOnce: true               // Esto se configura para disparar la animación una sola vez 
    })

    const imageVariants = {             // Se definen dos estados, hidden & visible, determinados por la opacidad. 
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const animationDelay = 0.3

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            variants={imageVariants}
            animate={inView ? "visible" : "hidden"} // Cuando el div esta en la vista del usuario, este se hace visible
            custom={index}
            transition={{ delay: index * animationDelay }} // Se establece una aparición de la imagen en función de un índice
        >
            <Image
                src={src}
                width={width}
                height={height}
                alt='skill image'
            />
        </motion.div>
    )
}

export default SkillDataProvider