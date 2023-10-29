import React from 'react'
import '../styles/home-globals.css'
import '../styles/sgsdhStyle.css'
import {Providers} from "../redux/provider";

export const metadata = {
    title: 'Etecsa',
    description: 'Sistema de solicitud de dietas, hospedaje y otros gastos'
}

export default function RootLayout ({ children }) {
    return (
        <html lang='es'>
        <body>
        <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
