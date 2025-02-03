import useAppContext from '@/hooks/Other/use-app-context.ts'
import React from 'react'

import { Props } from "./types/Toggle.modal";

import Select from '@comp/UI/Select.tsx'

export default function Toggle(props: Props) {
    const { getText } = useAppContext().Language
    function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        props.onInput && props.onInput(event.target.value === 'true')
        props.onChange && props.onChange(event)
    }
    return (
        <Select
            {...props}
            useDefaultValue
            options={[
            {
                value: 'true',
                name: props.yesName ?? getText('Yes'),
                selected: props.defaultValue},
            {
                value: 'false',
                name: props.noName ?? getText('No'),
                selected: !props.defaultValue}
            ]}
                data={props.data}
                onChange={onChange}
        />
    )
}