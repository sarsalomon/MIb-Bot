import { InjectBot, Start, Update, Action, On, Message, Ctx, Hears } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { actionButtons, districtSendButtons, districtSendButtonsAppel, langButtons, sendPhone } from './features/app.buttons';
import { Context } from './features/context.interface';

@Update()
export class BotUpdate {
    static SendMessageToMibHumas() {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly botService: BotService
    ) {}
    
    @Start()
    async startCommend(ctx: Context) {
        ctx.session.type = '';
        const chatId = ctx.update['message'].chat.id;
        const condidate = await this.botService.createTelegramMember({chatId: chatId, name: '', phone: '', districtId: 0, lang: ''});
    
        if (!condidate.lang) {
            await ctx.replyWithHTML("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        } else {
            await ctx.replyWithHTML("Sizni yana ko'rganimdan xursandaman \nMIB xizmatlarini tanlang", actionButtons());    
        }
    }

    // Language

    @Action('uz')
    async setlangUz(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const condidates = await this.botService.updateLang(Number(chatId), 'uz');
        if (condidates) {
            await ctx.editMessageText("MIB xizmatlarini tanlang", actionButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    }

    @Action('ru')
    async setlangRu(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const condidates = await this.botService.updateLang(Number(chatId), 'ru');
        if (condidates) {
            await ctx.editMessageText("MIB xizmatlarini tanlang", actionButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    }

    @Action('oz')
    async setlangOz(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const condidates = await this.botService.updateLang(Number(chatId), 'oz');
        if (condidates) {
            await ctx.editMessageText("MIB xizmatlarini tanlang", actionButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    }

    @Action('en')
    async setlangEnd(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const condidates = await this.botService.updateLang(Number(chatId), 'en');
        if (condidates) {
            await ctx.editMessageText("MIB xizmatlarini tanlang", actionButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    }

    @Action('setting')
    async daw(ctx: Context) {
        ctx.session.type = '';
        const chatId = ctx.update['callback_query'].message.chat.id;
        const condidate = await this.botService.createTelegramMember({chatId: chatId, name: '', phone: '', districtId: 0, lang: ''});

        if (!condidate) {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    
    }

    // Dusctrict Divicions send

    @Action('districtDivisions')
    async sendDistrictDivisions(ctx: Context) {
        ctx.session.type = '';
        await ctx.editMessageText("Malu'mot olish uchun ro'yxatdan tuman yoki shaharni tanlang 👇🏻", districtSendButtons());
    }

    @Action('AngrenSend')
    async sendDistrictDivisions1(ctx: Context) {
        
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }

    }

    @Action('BekobodSend')
    async sendDistrictDivisions2(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('BekobodSendT')
    async sendDistrictDivisions3(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('BokaSendT')
    async sendDistrictDivisions4(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('BostonlikSendT')
    async sendDistrictDivisions5(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('ZangiotaSendT')
    async sendDistrictDivisions6(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('QibraySendT')
    async sendDistrictDivisions7(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('ChirchikSend')
    async sendDistrictDivisions8(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('QuyichirchiqSendT')
    async sendDistrictDivisions9(ctx: Context) {
        await ctx.editMessageText("Malu'mot olish uchun ro'yxatdan tuman yoki shaharni tanlang 👇🏻", districtSendButtons());
    }

    @Action('OrtachirchiqSendT')
    async sendDistrictDivisions10(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('YuqorichirchiqSendT')
    async sendDistrictDivisions11(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('NurafshonSend')
    async sendDistrictDivisions12(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('OqqorgonSendT')
    async sendDistrictDivisions13(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('OlmaliqSend')
    async sendDistrictDivisions14(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('OhangaronSend')
    async sendDistrictDivisions15(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('OhangaronSendT')
    async sendDistrictDivisions16(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('ParkentSendT')
    async sendDistrictDivisions17(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('PskentSendT')
    async sendDistrictDivisions18(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('ToshkentSendT')
    async sendDistrictDivisions19(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('ChinozSendT')
    async sendDistrictDivisions20(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('YangiyolSend')
    async sendDistrictDivisions21(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('YangiyolSendT')
    async sendDistrictDivisions22(ctx: Context) {
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            if (getDistrict) {
                await ctx.editMessageText(`${getDistrict.nameUz}\n${getDistrict.descriptionUz}\n+998${getDistrict.phone}`, Markup.inlineKeyboard([
                    Markup.button.callback("Lokatsiya 📍", 'Location'),
                    Markup.button.callback("Orqaga qaytish ◀️", 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        }
    }

    @Action('Back')
    async sendDistrictDivisions23(ctx: Context) {
        await ctx.editMessageText("Malu'mot olish uchun ro'yxatdan tuman yoki shaharni tanlang 👇🏻", districtSendButtons());
    }

    @Action('BackToMain')
    async sendToMain(ctx: Context) {
        await ctx.editMessageText("MIB xizmatlarini tanlang", actionButtons());
    }

    // executive Documents

    @Action('executiveDocuments')
    async sendExecutiveDocuments(ctx: Context) {
        await ctx.editMessageText("Yez orada yakunlanadi", actionButtons());
    }
    // Appeal

    @Action('sendMessage')
    async sendAppel(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const appel = await this.botService.createAppel(Number(chatId), '', '', '', 0,  0);
        if (appel) {
            ctx.session.type = 'SendMessage';
            await ctx.replyWithHTML("Murojat uchun tuman yoki shaharni tanlang", districtSendButtonsAppel());
        } else {
            await ctx.replyWithHTML("Sizni xabar jarayonda");
        }
    }

    @Action('onlineAppeal')
    async sendReception(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const reception = await this.botService.createRepection(Number(chatId), '', '', '', 0,  0);
        if (reception) {
            ctx.session.type = 'SendReception';
            await ctx.replyWithHTML("Murojat uchun tuman yoki shaharni tanlang", districtSendButtonsAppel());
        } else {
            await ctx.replyWithHTML("Sizni xabar jarayonda")
        }
    }

    @On('contact')
    async getPhoneForCheck(ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].contact.phone_number;
        console.log(ctx.session.type)
        if (ctx.session.type == '') {
    
            const users = await this.botService.checkMibHumans(text, chatId);
    
            if (users) {
                await ctx.reply("Registratsiya yakunlandi ✅");
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }
        } else if (ctx.session.type == 'SendPhone') {

            const appel = await this.botService.setPhone(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML("Xabar mazmuni yozing");
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'SendPhoneReception') {

            const appel = await this.botService.setPhoneReception(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML("Xabar mazmuni yozing");
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        }

    }
    
    @On('text')
    async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].text;
        
        const users = await this.botService.checkMibHumans(text, chatId);
        
        if (users) {
            await ctx.reply("Registratsiyani yakunlash uchun iltimos pasdagi tugmani bosing", Markup.keyboard([
                Markup.button.contactRequest('Telefon yuborish 📲')
            ]).oneTime().resize());
        }

        if (!ctx.session.type) return

        if (ctx.session.type === 'SendDistrict') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPassport';
                await ctx.replyWithHTML("Passport Malumotlarini kiriting \nPassport Seriya (Lotin harflarda) va raqamni kiritin: \n(Namuna: AA000000)");
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }
           
        } else if (ctx.session.type === 'SendPassport') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPhone';
                await ctx.replyWithHTML("Boglanish uchun telefon raqam kiriting raqamni kiritin: \n(Namuna: +998901234567)", sendPhone());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }
           
        } else if (ctx.session.type === 'SendPhone') {

            const appel = await this.botService.setPhone(Number(chatId), text);

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML("Xabar mazmuni yozing", Markup.removeKeyboard());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type === 'SendDescription') {

            const appel = await this.botService.setDescription(Number(chatId), text);
            console.log(appel)
            if (appel) {
                ctx.session.type = 'Done';

                await ctx.replyWithHTML("Rahmat siz bilan tez orada mas'ul xodim bog'lanadi");
                await ctx.replyWithHTML("MIB xizmatlarini tanlang", actionButtons());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type === 'SendReceptionPassport') {
            const reception = await this.botService.setPassportReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendPhoneReception';
                await ctx.replyWithHTML("Boglanish uchun telefon raqam kiriting raqamni kiritin: \n(Namuna: +998901234567)", sendPhone());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }
           
        } else if (ctx.session.type === 'SendPhoneReception') {

            const reception = await this.botService.setPhoneReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML("Xabar mazmuni yozing", Markup.removeKeyboard());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type === 'SendDescriptionReception') {

            const reception = await this.botService.setDescriptionReception(Number(chatId), text); 

            if (reception) {
                ctx.session.type = 'DoneReception';
                await ctx.replyWithHTML("Rahmat siz bilan tez orada mas'ul xodim bog'lanadi");
                await ctx.replyWithHTML("MIB xizmatlarini tanlang", actionButtons());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        } 

    }


    async SendMessageToMibHumas (chatId: number, text: string) {
        console.log('dakwjdkawjdk')

    }

}