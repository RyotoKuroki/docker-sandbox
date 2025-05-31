

export const enum uiItemNames {
    name = "name",
    email = "email",

    emailList = "subs",
    priority = "priority",
    subEmail = "subEmail",

    error = "error",
}


export const createKeyAsError = (
    name: string
): string => {
    return `${name}-error`;
}
export const createCollectionAriaKeyAsError = (
    index: number,
    collectionName: string,
    name: string
): string => {
    //return `${name}-error`;
    return `${collectionName}-${index}-${name}-error`
}
export const createCollectionId = (
    index: number,
    collectionName: string,
    name: string
): string => {
    return `${collectionName}.${index}.${name}`
}















