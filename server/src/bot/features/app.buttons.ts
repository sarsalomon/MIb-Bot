import { Markup } from "telegraf";

export function langButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback(`O'zbek Lotin 🇺🇿`, 'uz'),
        Markup.button.callback('Русский 🇷🇺', 'ru'),
        Markup.button.callback('Ўзбек Кириллица 🇺🇿🇷🇺', 'oz'),
        Markup.button.callback('English 🇺🇸', 'en'),
    ], {
        columns:2
    })
}

export function sendPhone(ctx) {
    return Markup.keyboard([
        Markup.button.contactRequest(`${ctx.i18n.t("ContactSendText")}`)
    ]).oneTime().resize()
}

export function actionButtons(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback(`${ctx.i18n.t("AppelText")}`, 'sendMessage'),
        Markup.button.callback(`${ctx.i18n.t("ReceptionText")}`, 'onlineAppeal'),
        Markup.button.callback(`${ctx.i18n.t("DisctrictText")}`, 'districtDivisions'),
        // Markup.button.callback(`${ctx.i18n.t("ExecutiveDocumentsText")}`, 'executiveDocuments'),
        Markup.button.callback(`${ctx.i18n.t("SettingText")}`, 'setting')
    ], {
        columns: 2
    })
}


export function districtSendButtons(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback(`${ctx.i18n.t("AngrenCity")}`, 'AngrenSend'),
        Markup.button.callback(`${ctx.i18n.t("BekobodCity")}`, 'BekobodSend'),
        Markup.button.callback(`${ctx.i18n.t("Bekobod")}`, 'BekobodSendT'),
        Markup.button.callback(`${ctx.i18n.t("Buka")}`, 'BokaSendT'),
        Markup.button.callback(`${ctx.i18n.t("Bustonlik")}`, 'BostonlikSendT'),
        Markup.button.callback(`${ctx.i18n.t("Zangiota")}`, 'ZangiotaSendT'),
        Markup.button.callback(`${ctx.i18n.t("Qibray")}`, 'QibraySendT'),
        Markup.button.callback(`${ctx.i18n.t("Chirchiq")}`, 'ChirchikSend'),
        Markup.button.callback(`${ctx.i18n.t("Quyinchirchiq")}`, 'QuyichirchiqSendT'),
        Markup.button.callback(`${ctx.i18n.t("Urtachirchiq")}`, 'OrtachirchiqSendT'),
        Markup.button.callback(`${ctx.i18n.t("Yuqorichirchiq")}`, 'YuqorichirchiqSendT'),
        Markup.button.callback(`${ctx.i18n.t("NurafshonCity")}`, 'NurafshonSend'),
        Markup.button.callback(`${ctx.i18n.t("Oqqorgon")}`, 'OqqorgonSendT'),
        Markup.button.callback(`${ctx.i18n.t("OlmaliqCity")}`, 'OlmaliqSend'),
        Markup.button.callback(`${ctx.i18n.t("OhangaronCity")}`, 'OhangaronSend'),
        Markup.button.callback(`${ctx.i18n.t("Ohangaron")}`, 'OhangaronSendT'),
        Markup.button.callback(`${ctx.i18n.t("Parkent")}`, 'ParkentSendT'),
        Markup.button.callback(`${ctx.i18n.t("Pskent")}`, 'PskentSendT'),
        Markup.button.callback(`${ctx.i18n.t("Toshkent")}`, 'ToshkentSendT'),
        Markup.button.callback(`${ctx.i18n.t("Chinoz")}`, 'ChinozSendT'),
        Markup.button.callback(`${ctx.i18n.t("YangiyulCity")}`, 'YangiyolSend'),
        Markup.button.callback(`${ctx.i18n.t("Yangiyul")}`, 'YangiyolSendT'),
        Markup.button.callback(`${ctx.i18n.t("BackText")}`, 'BackToMain'),
    ], {
        columns:2
    })
}

export function setAppelOrReception() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Xabar', 'AppelSend'),
        Markup.button.callback('Murojat', 'ReceptionSend'),
    ], {
        columns:2
    })
}

export function setWhenTodayOrMonths() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Yanvar', 'YanvarSend'),
        Markup.button.callback('Fevral', 'FevralSend'),
        Markup.button.callback('Mart', 'MartSend'),
        Markup.button.callback('Aprel', 'AprelSend'),
        Markup.button.callback('May', 'MaySend'),
        Markup.button.callback('Iyun', 'IyunSend'),
        Markup.button.callback('Iyul', 'IyulSend'),
        Markup.button.callback('Avgust', 'AvgustSend'),
        Markup.button.callback('Sentyabr', 'SentyabrSend'),
        Markup.button.callback('Oktyabr', 'OktyabrSend'),
        Markup.button.callback('Noyabr', 'NoyabrSend'),
        Markup.button.callback('Dekabr', 'DekabrSend'),
        Markup.button.callback('Bugun', 'BugunSend'),
    ], {
        columns:2
    })
}

export function setWhenYear() {
    return Markup.inlineKeyboard([
        Markup.button.callback('2022', '2022Send'),
    ], {
        columns:2
    })
}

export function setWhenYearReception() {
    return Markup.inlineKeyboard([
        Markup.button.callback('2022', '2022SendReception'),
    ], {
        columns:2
    })
}
