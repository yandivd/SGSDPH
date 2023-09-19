import React from 'react'
export const metadata = {
    title: 'Etecsa',
    description: 'Sistema de solicitud de dietas, hospedaje y otros gastos'
}

export default function RootLayout ({ children }) {
    return (
        <html lang='es'>
            <body>
                {children}
            </body>
        </html>
    )
}
