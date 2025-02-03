import React, { useEffect, useState } from 'react'

import { className } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context.ts'

import { Props } from '@comp/Layout/Dashboard/types/VehicleSelector.modal.ts'

import Select from '@comp/UI/Select.tsx'

import styles from '@styles/pages/Dashboard/index.module.scss'
import generalStyles from '@styles/styles.module.scss'

export default function VehicleSelector(props: Props) {
    const vehicle = useAppContext().Vehicle
    const { getText } = useAppContext().Language
    const [currentValue, setCurrentValue] = useState<string>(vehicle.currentVehicle?.id ?? 'null')

    useEffect(() => {
        if (vehicle.vehicles.length == 0 || props.chooseOnly) return
        vehicle.changeVehicle(vehicle.currentVehicle?.id ?? null)
    }, [vehicle.vehicles, vehicle.currentVehicle, vehicle, props.chooseOnly]);
    
    if (!vehicle.hasVehicles) return <span className={ className(styles.selector, 'text-center') }>{getText('Add vehicle first')}</span>

    function onInput(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value.match('null') ? null : event.target.value
        !props.chooseOnly && vehicle.changeVehicle(value)
        props.onInput && props.onInput(value)
        setCurrentValue(event.target.value)
    }

    return (<Select options={[
            props.allowNull ? {
                value: 'null',
                name: getText('Unassigned'),
                selected: currentValue === 'null'
            } : null,
            ...vehicle.vehicles
                  .filter((v) => props.showArchived ? v.archived : !v.archived)
                  .sort((a, b) => !b.archived && a.archived ? 1 : 0)
                  .map((vehicle) => {
                        return {
                            value: vehicle.id,
                            name: (vehicle.archived ? getText('Archived') + ' | ' : '') + ' ' + vehicle.name,
                            className: className(vehicle.archived ? generalStyles['select-special'] : ''),
                            selected: currentValue === vehicle.id
                        }
                    })
            ]}
                    onChange={onInput}
                    wrapperClassName={props.noMarginBottom ? '' : styles.gap}
    />)
}