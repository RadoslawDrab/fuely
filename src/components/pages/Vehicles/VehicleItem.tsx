import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context.ts'
import { className } from '@/utils'

import { Props } from '@comp/pages/Vehicles/types/VehicleItem.modal.ts'

import Button from '@comp/UI/Button.tsx'
import Icon from '@comp/UI/Icon.tsx'
import Input from '@comp/UI/Input.tsx'
import Toggle from '@comp/UI/Toggle.tsx'

import styles from '@styles/pages/Vehicles/index.module.scss'
import generalStyles from '@styles/styles.module.scss'
import inputStyles from '@styles/UI/Input.module.scss'

export default function VehicleItem(props: Props) {
    const { getText } = useAppContext().Language

    return (
        <li>
            <form className={className(generalStyles.form, styles.item, props.editedVehicleId === props.vehicle.id ? styles.selected : '')}>
                {
                    props.index === 0 ?
                        <>
                            <span className={styles.label}>{getText('Name')}</span>
                            <span className={styles.label}>{getText('Archived')}</span>
                            <div></div>
                            <div></div>
                        </> : <></>
                }
                {
                    props.editedVehicleId !== props.vehicle.id || props.editedVehicleId === null ?
                        <>
                            <span className={className(styles.input, inputStyles.input)}>{props.vehicle.name}</span>
                            <span className={className(styles.input, inputStyles.input)}>{getText(props.vehicle.archived ? 'Yes' : 'No')}</span>
                        </>
                        :
                        <>
                            <Input type='text' data={{key: 'name', 'vehicle-id': props.vehicle.id}} onChange={props.onValueChange} defaultValue={props.vehicle.name} rightText='*' required={true} inputData={{pattern: '.+'}} />
                            <Toggle data={{key: 'archived', 'vehicle-id': props.vehicle.id}} onChange={props.onValueChange} defaultValue={props.vehicle.archived} />
                        </>
                }
                <Button onClick={props.onEdit} data={{id: props.vehicle.id}} variant={props.vehicle.id === props.editedVehicleId ? 'accent' : 'error'}>
                    <Icon alt='Edit icon' type='gear' />
                </Button>
                <Button onClick={props.onRemove} data={{id: props.vehicle.id}} variant='error'>
                    <Icon alt='Remove icon' type='x' />
                </Button>
            </form>
        </li>
    )
}