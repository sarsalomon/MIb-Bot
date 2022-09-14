import { isNumber } from 'class-validator';
import { InjectBot, Start, Update, Action, On, Message, Ctx, Hears } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { actionButtons, districtSendButtons, langButtons, sendPhone, setAppelOrReception, setWhenTodayOrMonths, setWhenYear, setWhenYearReception } from './features/app.buttons';
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '20';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '21';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText("Tizimda xatolik ❌", actionButtons());
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlng", setWhenTodayOrMonths());
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

    // Hisobat

    @Action('BugunSend')
    async sendMonthB(ctx: Context) {
        ctx.session.month = '0';

        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('YanvarSend')
    async sendMonthY(ctx: Context) {
        ctx.session.month = '01';

        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }

    }

    @Action('FevralSend')
    async sendMonthF(ctx: Context) {
        ctx.session.month = '02';

        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('MartSend')
    async sendMonthM(ctx: Context) {
        ctx.session.month = '03';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('AprelSend')
    async sendMonthA(ctx: Context) {
        ctx.session.month = '04';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('MaySend')
    async sendMonthMa(ctx: Context) {
        ctx.session.month = '05';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('IyunSend')
    async sendMonthI(ctx: Context) {
        ctx.session.month = '06';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('IyulSend')
    async sendMonthIy(ctx: Context) {
        ctx.session.month = '07';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('AvgustSend')
    async sendMonthAv(ctx: Context) {
        ctx.session.month = '08';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('SentyabrSend')
    async sendMonthS(ctx: Context) {
        ctx.session.month = '09';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('OktyabrSend')
    async sendMonthO(ctx: Context) {
        ctx.session.month = '10';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('NoyabrSend')
    async sendMonthN(ctx: Context) {
        ctx.session.month = '11';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('DekabrSend')
    async sendMonthD(ctx: Context) {
        ctx.session.month = '12';
        
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());

        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    // Hisobat Year
    @Action('2022Send')
    async sendMonth2022(ctx: Context) {
        ctx.session.year = "2022";

        const getHisobat = await this.botService.getHisobat(Number(ctx.session.whichAppelOrReception), ctx.session.district, Number(ctx.session.month), Number(ctx.session.year));

        if (getHisobat>0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML(`${getHisobat}`, actionButtons());
        } else if (getHisobat==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Hali murojat yoq 0️⃣", actionButtons());
        } else {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
        }
    }

    @Action('2022SendReception')
    async sendMonthReception2022(ctx: Context) {
        ctx.session.year = "2022";

        const getHisobat = await this.botService.getHisobat(Number(ctx.session.whichAppelOrReception), ctx.session.district, Number(ctx.session.month), Number(ctx.session.year));

        if (getHisobat>0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML(`${getHisobat}`, actionButtons());
        } else if (getHisobat==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Hali murojat yoq 0️⃣", actionButtons());
        } else {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
        }
    }
    //

    @Action('AppelSend')
    async sendAppelOrReception1(ctx: Context) {
        ctx.session.type = 'sendAppelOrReceptionHisobat';
        ctx.session.whichAppelOrReception = '1';
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons());
    }

    @Action('ReceptionSend')
    async sendAppelOrReception2(ctx: Context) {
        ctx.session.type = 'sendReceptionOrAppelHisobat';
        ctx.session.whichAppelOrReception = '2';
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons());
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
            await ctx.replyWithHTML("Murojat uchun tuman yoki shaharni tanlang", districtSendButtons());
        } else {
            await ctx.replyWithHTML("Sizni xabar jarayonda ⌛️");
        }
    }

    @Action('onlineAppeal')
    async sendReception(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const reception = await this.botService.createRepection(Number(chatId), '', '', '', 0,  0);
        if (reception) {
            ctx.session.type = 'SendReception';
            await ctx.replyWithHTML("Murojat uchun tuman yoki shaharni tanlang", districtSendButtons());
        } else {
            await ctx.replyWithHTML("Sizni xabar jarayonda ⌛️")
        }
    }

    @On('contact')
    async getPhoneForCheck(ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].contact.phone_number;

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

        const appel = text.split(' ')[0];
        const id = text.split(' ')[1];
        const state = text.split(' ')[2];

        if (appel != undefined && id != undefined && state != undefined) {
            const done = await this.botService.doneAppelOrReception(appel, Number(id), state);
            if (done) {
                await ctx.replyWithHTML("Yangilandi ✅");
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌");
            }
        }

        if (text == 'Hisobat') {
            ctx.session.type = 'sendHisobat';
            await ctx.replyWithHTML("Tanlang", setAppelOrReception());
        }

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
            if (appel) {

                const content = `${appel.id}\n${appel.passport}\n${appel.phone}\n${appel.description}\n${appel.date}`;

                if (appel.userChatId > 0) {
                    await ctx.telegram.sendMessage(appel.userChatId, content);
                }

                if (appel.directorChatId > 0) {
                    await ctx.telegram.sendMessage(appel.directorChatId, content);
                }

                if (appel.kansilyariyaChatId > 0) {
                    await ctx.telegram.sendMessage(appel.kansilyariyaChatId, content);
                }

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
                const content = `${reception.id}\n${reception.passport}\n${reception.phone}\n${reception.description}\n${reception.date}`;

                if (reception.userChatId > 0) {
                    await ctx.telegram.sendMessage(reception.userChatId, content);
                }

                if (reception.directorChatId > 0) {
                    await ctx.telegram.sendMessage(reception.directorChatId, content);
                }

                if (reception.kansilyariyaChatId > 0) {
                    await ctx.telegram.sendMessage(reception.kansilyariyaChatId, content);
                }
                ctx.session.type = 'DoneReception';
                await ctx.replyWithHTML("Rahmat siz bilan tez orada mas'ul xodim bog'lanadi");
                await ctx.replyWithHTML("MIB xizmatlarini tanlang", actionButtons());
            } else {
                await ctx.replyWithHTML("Tizimda xatolik ❌", actionButtons());
            }

        }

    }



}