import { Context as ContextTelegraf } from "telegraf";

export interface Context extends ContextTelegraf {
    session: {
        type?: 'SendMessage' | 'SendReception' | 'SendDistrict' | 'SendReceptionDistrict' | 'SendPassport' | 'SendReceptionPassport' | 'SendPhone' | 'SendPhoneReception' | 'SendDescription' | 'SendDescriptionReception' | 'Done'  | 'DoneReception' | '',
        state?: 'Start' | 'SetLang' | 'Setting' | 'Appel' | 'Document' | 'Reception' | '' | '' | '' | '' | ''
    }
}