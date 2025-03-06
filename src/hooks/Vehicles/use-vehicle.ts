import { useCallback, useEffect, useState } from 'react'
import useLanguage from '@/hooks/Language/use-language.ts'
import { getMessage } from '@/utils/messages.ts'

import { Vehicle } from '@api/data/types/index.modal.ts'
import { VehicleData } from './types/Vehicle.modal.ts'
import type { Auth } from '@/hooks/Auth/types/Auth.modal.ts'

export default function useVehicle({ user, state }: Auth): VehicleData {
    const { getText } = useLanguage()
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
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

    const changeVehicle = useCallback((id: string | null) => {
        setCurrentVehicle(id !== null ? vehicles.find((v) => v.id === id) ?? null : null)
    }, [vehicles])

    useEffect(() => {
        const vehicles = user?.settings?.vehicles

        if (vehicles && vehicles.length > 0) {
            setVehicles(vehicles)
            changeVehicle(vehicles[0].id)
        }
    }, [changeVehicle, user, user?.settings, user?.settings?.vehicles]);

    return {
        currentVehicle,
        vehicles,
        hasVehicles: state.hasVehicles,
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
    changeVehicle: () => {},
}