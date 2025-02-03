import { SelectProps } from '@comp/UI/types/Select.modal.ts'

export interface Props extends Omit<SelectProps, 'options' | 'useDefaultValue' | 'getValue'> {
    defaultValue?: boolean
    yesName?: string
    noName?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    onInput?: (value: boolean) => void
    data?: { [key: string]: number | string | boolean | object }
}