import React, { useMemo } from 'react'

import useAppContext from '@/hooks/Other/use-app-context.ts'
import { className } from '@/utils'

import { Props } from '@comp/pages/Vehicles/types/VehicleRemovalModal.modal.ts'

import Button from '@comp/UI/Button.tsx'
import Modal from '@comp/UI/Modal.tsx'

import generalStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Vehicles/index.module.scss'

export default function VehicleRemovalModal(props: Props) {
    const vehicle = useAppContext().Vehicle
    const { getText } = useAppContext().Language
    const removeVehicle = useMemo(() => vehicle.vehicles.find((v) => v.id === props.vehicleId) ?? null, [props.vehicleId, vehicle.vehicles])

    return (
        <Modal className={styles.modal} show={props.vehicleId !== null} title={getText('Removal Confirmation')} allowClosing getState={(isOpen) => !isOpen && props.onCancel()}>
            <p>
                {getText('Are you sure you want to remove')}<span className={className(generalStyles.badge, generalStyles['badge-border'])}>{removeVehicle?.name ?? ''}</span>?
            </p>
            <div className={styles.actions}>
                <Button onClick={props.onRemove} data={{id: props.vehicleId ?? ''}} variant='error'>{getText('Yes')}</Button>
                <Button onClick={props.onCancel} variant='success'>{getText('No')}</Button>
            </div>
        </Modal>
    )
}