import { Context as ContextTelegraf } from "telegraf";

export interface Context extends ContextTelegraf {
    session: {
        type?: 'SendMessage' | 'SendReception' | 'SendDistrict' | 'SendReceptionDistrict' | 'SendPassport' | 'SendReceptionPassport' | 'SendPhone' | 'SendPhoneReception' | 'SendDescription' | 'SendDescriptionReception' | 'Done'  | 'DoneReception' | 'sendHisobat' | 'sendReceptionOrAppelHisobat' | 'sendAppelOrReceptionHisobat' | 'sendYearAppel' | 'sendYearReception' | '',
        state?: 'Start' | 'SetLang' | 'Setting' | 'Appel' | 'Document' | 'Reception' | '' | '' | '' | '' | '',
        district?: '1'  | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '',
        whichAppelOrReception?: '1'  | '2' | '',
        month?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '0' | '',
        year?: '2022' | '',
    }
}