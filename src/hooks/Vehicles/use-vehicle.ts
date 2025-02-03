import useLanguage from '@/hooks/Language/use-language.ts'
import { getMessage } from '@/utils/messages.ts'
import { useEffect, useState } from 'react'

import useAuth from '@/hooks/Auth/use-auth.ts'

import { Vehicle } from '@api/data/types/index.modal.ts'
import { VehicleData } from './types/Vehicle.modal.ts'

export default function useVehicle(): VehicleData {
    const { user } = useAuth()
    const { getText } = useLanguage()
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [hasVehicles, setHasVehicles] = useState<boolean>(false)
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)

    function add(vehicle: Omit<Vehicle, 'id'>): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/user/vehicle', {
                    method: 'POST',
                    body: JSON.stringify({ vehicle })
                })
                const body = await response.json()
                if (!response.ok) {
                    throw body
                }
                const {vehicleId, code} = body

                setVehicles((v) => [...v, {...vehicle, id: vehicleId}])
                resolve(getText('Added'))
            } catch(error: any) {
                reject(getMessage(error.code).text)
            }
        })
    }
    function update(vehicle: Partial<Vehicle>): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/user/vehicle', {
                    method: 'PATCH',
                    body: JSON.stringify({ vehicle })
                })
                const body = await response.json()
                if (!response.ok) {
                    throw body
                }
                const newVehicle = body.data
                setVehicles((vehicles) => {
                    return vehicles.map((v) => v.id === newVehicle.id ? newVehicle : v)
                })
                resolve(getText('Updated'))
            } catch(error: any) {
                reject(getMessage(error.code).text)
            }
        })
    }

    async function remove(vehicleId: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`/api/user/vehicle?vehicleId=${vehicleId}`, {
                    method: 'DELETE',
                })
                const body = await response.json()
                if (!response.ok) {
                    throw body
                }

                setVehicles((vehicles) => vehicles.filter((v) => v.id !== vehicleId))
                resolve(getText('Removed'))
            } catch(error: any) {
                reject(getMessage(error.code).text)
            }
        })
    }

    function changeVehicle(id: string | null) {
        setCurrentVehicle(id !== null ? vehicles.find((v) => v.id === id) ?? null : null)
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

    add: async () => '',
    update: async () => '',
    remove: async () => '',
    changeVehicle: () => {}
}