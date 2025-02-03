import React, { useState } from 'react'

import { getRandomKey } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context.ts'
import useUserRedirect from '@/hooks/Other/use-user-redirect.ts'

import { Vehicle } from '@api/data/types/index.modal.ts'

import VehicleRemovalModal from '@comp/pages/Vehicles/VehicleRemovalModal.tsx'
import VehicleItem from '@comp/pages/Vehicles/VehicleItem.tsx'
import Button from '@comp/UI/Button.tsx'
import Icon from '@comp/UI/Icon.tsx'

import styles from '@styles/pages/Vehicles/index.module.scss'

export default function Vehicles() {
    useUserRedirect()
    const vehicle = useAppContext().Vehicle
    const {getText} = useAppContext().Language
    const {addNotification} = useAppContext().Notification

    const [editedVehicleId, setEditedVehicleId] = useState<string | null>(null)
    const [removeVehicleId, setRemoveVehicleId] = useState<string | null>(null)

    const [values, setValues] = useState<Partial<Vehicle>>({})

    function onButtonEvent(this: (btn: HTMLButtonElement | null, id: string | null) => void, event: React.MouseEvent<HTMLButtonElement>) {
        const btn = (event.target as HTMLElement).closest('button')
        const id = btn?.dataset.id ?? null
        this(btn, id)
    }
    function onEdit(event: React.MouseEvent<HTMLButtonElement>) {
        onButtonEvent.call((_, id) => {
            setEditedVehicleId((v) => {
                if(v === id && v !== null) {
                    if (Object.keys(values).length > 0) {
                        vehicle.update({ ...values }).then(() => setValues({}))
                    }
                    return null
                }
                return id
            })
        }, event)
    }
    function onRemove(event: React.MouseEvent<HTMLButtonElement>) {
        onButtonEvent.call(async (_, id) => {
            if (!id) return

            // Checks if `removeVehicleId` is set. If so it removes it. Otherwise, sets confirmation
            if (!removeVehicleId) {
                setRemoveVehicleId(id)
                return
            } else setRemoveVehicleId(null)
            try {
                const status = await vehicle.remove(id)
                addNotification({type: 'success', content: status})
            } catch (error) {
                addNotification({type: 'error', content: error})
            }
        }, event)
    }
    function onAdd(event: React.MouseEvent<HTMLButtonElement>) {
        onButtonEvent.call(async () => {
            try {
                // Gets ids of current vehicles which names weren't changed
                const currentIds = vehicle.vehicles.filter((v) => v.name.match(/V-\d+/)).map((v) => v.name.split('-')[1])
                // Gets random id excluding current ids
                const id = getRandomKey(5, currentIds)
                const status = await vehicle.add({
                    name: `V-${id}`,
                })
                addNotification({type: 'success', content: status})
            } catch (error) {
                addNotification({type: 'error', content: error})
            }
        }, event)
    }
    function onValueChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const value = event.target.value
        const isBoolean = value === 'true' || value === 'false'
        const {key, vehicleId} = event.target.dataset
        if (!key || !vehicleId) return
        setValues((v) => ({ ...v, [key]: isBoolean ? value === 'true' : value, id: vehicleId }))
    }
    
    return (
        <ul className={styles.list}>
            {
                vehicle.vehicles.map((vehicle, i) => (
                    <VehicleItem key={vehicle.id} vehicle={vehicle} index={i} editedVehicleId={editedVehicleId} onEdit={onEdit} onRemove={onRemove} onValueChange={onValueChange} />
                ))
            }
            <li>
                <Button onClick={onAdd} variant='success' className={styles['add-item']}>
                    <Icon alt='Add icon' type='plus' />
                    <span>{getText('Add vehicle')}</span>
                </Button>
            </li>
            <VehicleRemovalModal vehicleId={removeVehicleId} onRemove={onRemove} onCancel={() => setRemoveVehicleId(null)} />
        </ul>
    )
}