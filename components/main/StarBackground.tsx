"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {

    const ref: any = useRef();                                     // Referencia para el objeto 3D que contiene las estrellas. 
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000), { radius: 1.2 })   // Inicializamos un arreglo sphere con posiciones de estrellas aleatorias generadas por la función random.inSphere
    );

    useFrame((state, delta) => {                    // Se realiza una animación continua
        ref.current.rotation.x -= delta / 10;       // En cada fotograma, se actualiza la rotación del grupo de estrellas (ref.current) 
        ref.current.rotation.y -= delta / 15;       // en los ejes X e Y, lo que da la sensación de movimiento de las estrellas.
    })


    return (
        // Se retorna un grupo (<group>) de estrellas con una rotación inicial.
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* se utiliza <Points> para representar las estrellas.
             Se asigna la referencia ref al grupo de estrellas, y se le pasan las posiciones aleatorias de las estrellas desde sphere */}
            <Points 
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="$fff"
                    size={0.002}
                    sizeAttenuation={true}
                    dethWrite={false}
                />
            </Points>
        </group>
    )
};

// StarsCanvas representa el lienzo 3D completo. 
const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{ position: [0, 0, 1] }}>
            {/* se utiliza <Suspense> para cargar el componente StarBackground. */}
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
)

export default StarsCanvas;