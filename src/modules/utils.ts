import { Ref } from '@vue/reactivity';

export type CommonReturnType = {
    error: string;
};

export type CommonUseType<T> = {
    data: T | null;
    error: string | null;
};

export function isCommonReturnType<T>(value: T | CommonReturnType): value is CommonReturnType {
    return (value as CommonReturnType).error !== undefined;
}

export const apiDateModelConfig = {
    type: 'string',
    mask: 'DD.MM.YYYY'
};

export function convertToApiDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

export function getDateMinusDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
}
