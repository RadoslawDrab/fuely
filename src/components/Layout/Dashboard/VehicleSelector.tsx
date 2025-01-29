import React, { useEffect } from 'react'

import { className } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context.ts'

import styles from '@styles/pages/Dashboard/index.module.scss'
import generalStyles from '@styles/styles.module.scss'

export default function VehicleSelector() {
    const vehicle = useAppContext().Vehicle
    const { getText } = useAppContext().Language

    useEffect(() => {
        if (vehicle.vehicles.length == 0) return
        vehicle.changeVehicle(vehicle.currentVehicle?.id ?? vehicle.vehicles[0].id)
    }, [vehicle.vehicles, vehicle.currentVehicle, vehicle]);
    
    if (!vehicle.hasVehicles) return <span className={ className(styles.selector, 'text-center') }>{getText('Add vehicle first')}</span>

    function onInput(event: React.ChangeEvent<HTMLSelectElement>) {
        vehicle.changeVehicle(event.target.value)
    }
    return <select className={ className(generalStyles.select, styles.selector, 'fs-600') } onInput={onInput} value={vehicle.currentVehicle?.id}>
        {
            vehicle.vehicles.map((vehicle) => {
                return <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                </option>
            })
        }
        </select>
}