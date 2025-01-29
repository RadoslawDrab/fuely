import useNotification from '@/hooks/Other/use-notification.ts'
import { useEffect, useState } from 'react'

import useAuth from '@/hooks/Auth/use-auth.ts'

import { Vehicle } from '@api/data/types/index.modal.ts'
import { VehicleData } from './types/Vehicle.modal.ts'

export default function useVehicle(): VehicleData {
    const { user } = useAuth()
    const { addNotification } = useNotification()
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [hasVehicles, setHasVehicles] = useState<boolean>(false)
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)

    async function add(vehicle: Vehicle) {
        try {
            setVehicles([...vehicles, vehicle])
            const response = await fetch('/api/user/update', {
                method: 'POST',
                body: JSON.stringify({ vehicle })
            })
            await response.json()
        } catch(error: any) {
            addNotification({type: 'error', content: error.message})
        }
    }
    async function update(vehicle: Vehicle) {
        try {
            setVehicles((vehicles) => {
                return vehicles.map((v) => v.id === vehicle.id ? vehicle : v)
            })
            const response = await fetch('/api/user/update', {
                method: 'POST',
                body: JSON.stringify({ vehicle })
            })
            await response.json()
        } catch(error: any) {
            addNotification({type: 'error', content: error.message})
        }
    }

    async function remove(vehicleId: string) {
        try {
            setVehicles((vehicles) => vehicles.filter((v) => v.id !== vehicleId))
            const response = await fetch('/api/user/update', {
                method: 'DELETE',
                body: JSON.stringify({ vehicleId })
            })
            await response.json()
        } catch(error: any) {
            addNotification({type: 'error', content: error.message})
        }
    }

    function changeVehicle(id: string) {
        setCurrentVehicle(vehicles.find((v) => v.id === id) ?? null)
    }

    useEffect(() => {
        setHasVehicles(vehicles.length > 0)
    }, [setHasVehicles, vehicles, currentVehicle])

    useEffect(() => {
        const vehicles = user?.settings?.vehicles
        if (vehicles && vehicles.length > 0)
            setVehicles(vehicles)
    }, [user.settings, user.settings?.vehicles]);

    return {
        currentVehicle,
        vehicles,
        hasVehicles,
        add,
        update,
        remove,
        changeVehicle
    }
}

export const exampleVehiclesObject: VehicleData = {
    currentVehicle: null,
    vehicles: [],
    hasVehicles: false,

    add: () => {},
    update: () => {},
    remove: () => {},
    changeVehicle: () => {}
}