import { Markup } from "telegraf";

export function langButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Uzbek 🇺🇿', 'uz'),
        Markup.button.callback('Русский 🇷🇺', 'ru'),
        Markup.button.callback('Кирилча 🇺🇿🇷🇺', 'oz'),
        Markup.button.callback('English 🇺🇸', 'en'),
    ], {
        columns:2
    })
}

export function districtButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('dawd', 'dawd'),
        Markup.button.callback('dawd', 'dawd'),
        Markup.button.callback('dawd', 'dawd'),
        Markup.button.callback('dawd', 'dawd'),
        Markup.button.callback('dawd', 'dawd'),
    ], {
        columns:2
    })
}

export function sendPhone() {
    return Markup.keyboard([
        Markup.button.contactRequest('Raqam yuborish 📱')
    ]).oneTime().resize()
}

export function actionButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Xabar qoldirish ✉️', 'sendMessage'),
        Markup.button.callback(`Xududiy bo'linmalar 🏢`, 'districtDivisions'),
        Markup.button.callback('Online murojat ✅', 'onlineAppeal'),
        Markup.button.callback('Ijro hujjatlari 📄', 'executiveDocuments'),
        Markup.button.callback('Sozlamalar ⚙️', 'setting')
    ], {
        columns: 2
    })
}


export function districtSendButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Angren shahri', 'AngrenSend'),
        Markup.button.callback('Bekobod shahri', 'BekobodSend'),
        Markup.button.callback('Bekobod tumani', 'BekobodSendT'),
        Markup.button.callback("Bo'ka tumani", 'BokaSendT'),
        Markup.button.callback("Bo'stonlik tumani", 'BostonlikSendT'),
        Markup.button.callback('Zangiota tumani', 'ZangiotaSendT'),
        Markup.button.callback('Qibray tumani', 'QibraySendT'),
        Markup.button.callback('Chirchiq shahri', 'ChirchikSend'),
        Markup.button.callback('Quyichirchiq tumani', 'QuyichirchiqSendT'),
        Markup.button.callback("O'rtachirchiq tumani", 'OrtachirchiqSendT'),
        Markup.button.callback("Yuqorichirchiq tumani", 'YuqorichirchiqSendT'),
        Markup.button.callback('Nurafshon shahri', 'NurafshonSend'),
        Markup.button.callback("Oqqo'rg'on tumani", 'OqqorgonSendT'),
        Markup.button.callback('Olmaliq shahri', 'OlmaliqSend'),
        Markup.button.callback('Ohangaron shahri', 'OhangaronSend'),
        Markup.button.callback('Ohangaron tumani', 'OhangaronSendT'),
        Markup.button.callback('Parkent tumani', 'ParkentSendT'),
        Markup.button.callback('Pskent tumani', 'PskentSendT'),
        Markup.button.callback('Toshkent tumani', 'ToshkentSendT'),
        Markup.button.callback('Chinoz tumani', 'ChinozSendT'),
        Markup.button.callback("Yangiyo'l shahri", 'YangiyolSend'),
        Markup.button.callback("Yangiyo'l tumani", 'YangiyolSendT'),
        Markup.button.callback("Orqaga qaytish ◀️", 'BackToMain'),
    ], {
        columns:2
    })
}

export function setAppelOrReception() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Qabul', 'AppelSend'),
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
        Markup.button.callback('2022 Reception uchun', '2022SendReception'),
    ], {
        columns:2
    })
}
