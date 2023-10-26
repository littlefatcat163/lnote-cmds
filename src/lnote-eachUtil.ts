import { validateLicenses } from 'create-lnote/src/generate'

export function checkAuthCode(licenses: string[]) {
    return validateLicenses(licenses)
}