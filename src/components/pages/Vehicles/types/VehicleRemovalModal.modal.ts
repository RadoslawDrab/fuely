import React from 'react'

export interface Props {
    vehicleId: string | null
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
    onCancel: () => void
}