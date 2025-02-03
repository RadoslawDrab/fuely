import { Vehicle } from '@api/data/types/index.modal.ts'
import React from 'react'

export interface Props {
    vehicle: Vehicle
    index: number
    editedVehicleId: string | null
    onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
    onValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}