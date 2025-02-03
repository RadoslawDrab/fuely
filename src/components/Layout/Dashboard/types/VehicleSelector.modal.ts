export interface Props {
    allowNull?: boolean;
    chooseOnly?: boolean;
    onInput?: (value: string | null) => void;
    showArchived?: boolean;
    noMarginBottom?: boolean
}