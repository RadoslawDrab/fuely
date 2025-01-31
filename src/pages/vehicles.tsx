import { Vehicle } from '@api/data/types/index.modal.ts'
import React, { useState } from 'react'

import { className, getRandomKey } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context.ts'
import useUserRedirect from '@/hooks/Other/use-user-redirect.ts'

import Button from '@comp/UI/Button.tsx'
import Input from '@comp/UI/Input.tsx'
import Icon from '@comp/UI/Icon.tsx'

import generalStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Vehicles/index.module.scss'
import inputStyles from '@styles/UI/Input.module.scss'

export default function Vehicles() {
    useUserRedirect()
    const vehicle = useAppContext().Vehicle
    const {getText} = useAppContext().Language
    const {addNotification} = useAppContext().Notification

    const [editedVehicleId, setEditedVehicleId] = useState<string | null>(null)
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
                    // if (vehicle.currentVehicle)
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
                const currentIds = vehicle.vehicles.filter((v) => v.name.match(/Vehicle-\d+/)).map((v) => v.name.split('-')[1])
                const id = getRandomKey(5, currentIds)
                const status = await vehicle.add({
                    name: `Vehicle-${id}`,
                })
                addNotification({type: 'success', content: status})
            } catch (error) {
                addNotification({type: 'error', content: error})
            }
        }, event)
    }
    function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        const {key, vehicleId} = event.target.dataset
        setValues((v) => ({...v, [key]: value, id: vehicleId}))
    }
    
    return (
        <ul className={styles.list}>
            {
                vehicle.vehicles.map((vehicle, i) => (
                    <li key={vehicle.id}>
                        <form className={className(generalStyles.form, styles.item, editedVehicleId === vehicle.id ? styles.selected : '')}>
                            {
                                i === 0 ?
                                <>
                                    <span className={styles.label}>{getText('Name')}</span>
                                    <span className={styles.label}>{getText('Brand')}</span>
                                    <span className={styles.label}>{getText('Model')}</span>
                                    <span></span>
                                    <span></span>
                                </> : <></>
                            }
                            {
                                editedVehicleId !== vehicle.id || editedVehicleId === null ?
                                <>
                                    <span className={className(styles.input, inputStyles.input)}>{vehicle.name}</span>
                                    <span className={className(styles.input, inputStyles.input)}>{vehicle.brand}</span>
                                    <span className={className(styles.input, inputStyles.input)}>{vehicle.model}</span>
                                </>
                                :
                                <>
                                    <Input type='text' data={{key: 'name', 'vehicle-id': vehicle.id}} onChange={onValueChange} defaultValue={vehicle.name} rightText='*' required={true} inputData={{pattern: '.+'}} />
                                    <Input type='text' data={{key: 'brand', 'vehicle-id': vehicle.id}} onChange={onValueChange} defaultValue={vehicle.brand} />
                                    <Input type='text' data={{key: 'model', 'vehicle-id': vehicle.id}} onChange={onValueChange} defaultValue={vehicle.model} />
                                </>
                            }
                            <Button onClick={onEdit} data={{id: vehicle.id}} variant={vehicle.id === editedVehicleId ? 'accent' : 'error'}>
                                <Icon alt='Edit icon' type='gear' />
                            </Button>
                            <Button onClick={onRemove} data={{id: vehicle.id}} variant='error'>
                                <Icon alt='Remove icon' type='x' />
                            </Button>
                        </form>
                    </li>
                ))
            }
            <li>
                <Button onClick={onAdd} variant='error' className={styles['add-item']}>
                    <Icon alt='Add icon' type='plus' />
                    <span>{getText('Add vehicle')}</span>
                </Button>
            </li>
        </ul>
    )
}