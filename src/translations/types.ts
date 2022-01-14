export type LocaleMessages = { [key: string]: LocaleMessageObject }
export type LocaleMessageObject = { [key: string]: LocaleMessage }
export type LocaleMessageArray = LocaleMessage[]
export type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray
