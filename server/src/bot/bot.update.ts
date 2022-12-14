import { InjectBot, Start, Update, Action, On, Message, Ctx } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { actionButtons, BackToMain, districtSendButtons, langButtons, sendPhone, setAppelOrReception, setWhenTodayOrMonths, setWhenYear, setWhenYearReception } from './features/app.buttons';
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
            const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

            if (phoneCheck.phone == '' || phoneCheck.phone == null) {
                await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
                await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
                return
            }
    
            await ctx.replyWithHTML(ctx.i18n.t("helloagin"), actionButtons(ctx));    
        }
    }

    // Language

    @Action('uz')
    async setlangUz(ctx: Context) {
        ctx.i18n.locale('uz');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));
        await ctx.answerCbQuery('');

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'uz');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else if (!user.phone || user.phone == null || user.phone == undefined) {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('ru')
    async setlangRu(ctx: Context) {
        ctx.i18n.locale('ru');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));
        await ctx.answerCbQuery('');

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'ru');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else if (!user.phone || user.phone == null || user.phone == undefined) {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('oz')
    async setlangOz(ctx: Context) {
        ctx.i18n.locale('oz');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));
        await ctx.answerCbQuery('');

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'oz');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else if (!user.phone || user.phone == null || user.phone == undefined) {

            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('en')
    async setlangEnd(ctx: Context) {
        ctx.i18n.locale('en');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));
        await ctx.answerCbQuery('');

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'en');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else if (!user.phone || user.phone == null || user.phone == undefined) {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('setting')
    async daw(ctx: Context) {
        ctx.session.type = '';
        const chatId = ctx.update['callback_query'].message.chat.id;
        const condidate = await this.botService.createTelegramMember({chatId: chatId, name: '', phone: '', districtId: 0, lang: ''});
        await ctx.answerCbQuery('');

        if (!condidate || condidate == null || condidate == undefined) {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        } else {
            await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
        }
    
    }

    // Dusctrict Divicions send

    @Action('districtDivisions')
    async sendDistrictDivisions(ctx: Context) {
        ctx.session.type = '';
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);
        await ctx.answerCbQuery('');

        if (phoneCheck.phone == '' || phoneCheck.phone == null || phoneCheck.phone == undefined) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }
        await ctx.editMessageText(ctx.i18n.t('SetDistrict'), districtSendButtons(ctx));
    }

    // Disctrict

    @Action('AngrenSend')
    async sendDistrictDivisions1(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.0088541,70.0872224/@41.00847,70.0861686,497m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }

    @Action('BekobodSend')
    async sendDistrictDivisions2(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.2206741,69.2428551/@40.220538,69.2426778,112m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BekobodSendT')
    async sendDistrictDivisions3(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BokaSendT')
    async sendDistrictDivisions4(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.8131083,69.2010451/@40.8129822,69.200518,166m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BostonlikSendT')
    async sendDistrictDivisions5(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.5655674,69.7661692/@41.5606107,69.7639875,5452m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ZangiotaSendT')
    async sendDistrictDivisions6(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('QibraySendT')
    async sendDistrictDivisions7(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ChirchikSend')
    async sendDistrictDivisions8(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.4720279,69.5928962/@41.4717369,69.592484,247m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('QuyichirchiqSendT')
    async sendDistrictDivisions9(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.8587013,68.9432824/@40.8582171,68.9428474,205m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OrtachirchiqSendT')
    async sendDistrictDivisions10(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.0685847,69.2729809/@41.0688703,69.2707882,884m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YuqorichirchiqSendT')
    async sendDistrictDivisions11(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('NurafshonSend')
    async sendDistrictDivisions12(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OqqorgonSendT')
    async sendDistrictDivisions13(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OlmaliqSend')
    async sendDistrictDivisions14(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.8500771,69.59959/@40.8493033,69.5996596,307m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OhangaronSend')
    async sendDistrictDivisions15(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.9061299,69.6369443/@40.9063652,69.6358553,384m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OhangaronSendT')
    async sendDistrictDivisions16(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ParkentSendT')
    async sendDistrictDivisions17(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);


            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.303532,69.6366268/@41.3034376,69.636337,156m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('PskentSendT')
    async sendDistrictDivisions18(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.9035576,69.3475678/@40.9033521,69.3471125,166m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ToshkentSendT')
    async sendDistrictDivisions19(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.404793,69.2013245/@41.4043506,69.2012477,203m/data=!3m1!1e3!4m9!4m8!1m5!3m4!1m2!1d69.202016!2d41.4046684!3s0x38ae8df9af383881:0xf6d446c882fa91d6!1m0!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ChinozSendT')
    async sendDistrictDivisions20(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/40.9268845,68.7498011/@40.9269701,68.749362,271m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '20';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '20';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YangiyolSend')
    async sendDistrictDivisions21(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), 'https://www.google.com/'),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '21';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '21';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YangiyolSendT')
    async sendDistrictDivisions22(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.0733546,69.0247084/@41.0733638,69.0231761,511m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }
    
    @Action('sendIT')
    async sendDistrictDivisions23(ctx: Context) {
        await ctx.answerCbQuery('');
        if (ctx.session.type == '') {
            const getDistrict = await this.botService.getDisctrictByCommand(ctx.update['callback_query'].data);

            let LangName:string = getDistrict.nameUz;
            let LangDescription:string = getDistrict.descriptionUz;
            
            if (ctx.session['__language_code'] == 'uz'){
                LangName = getDistrict.nameUz;
                LangDescription = getDistrict.descriptionUz;
            } else if (ctx.session['__language_code'] == 'ru'){
                LangName = getDistrict.nameRu;
                LangDescription = getDistrict.descriptionRu;
            } else if (ctx.session['__language_code'] == 'oz'){
                LangName = getDistrict.nameOz;
                LangDescription = getDistrict.descriptionOz;
            } else if (ctx.session['__language_code'] == 'en'){
                LangName = getDistrict.nameEn;
                LangDescription = getDistrict.descriptionEn;
            }

            if (getDistrict) {
                await ctx.editMessageText(`${LangName}\n${LangDescription}`, Markup.inlineKeyboard([                    
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir/''/41.0253911,69.3347599/@41.0253911,69.33475991,511m/data=!3m1!1e3!4m2!4m1!3e0"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"), BackToMain(ctx));
            } else if (!update || update == null || update == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '23';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobot') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '23';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else if (!getDistrict || getDistrict == null || getDistrict == undefined) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('Back')
    async sendToBack(ctx: Context) {
        await ctx.answerCbQuery('');
        await ctx.editMessageText("Malu'mot olish uchun ro'yxatdan tuman yoki shaharni tanlang 👇🏻", districtSendButtons(ctx));
    }

    @Action('BackToMain')
    async sendToMain(ctx: Context) {
        await ctx.answerCbQuery('');
        await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
    }

    // Hisobot

    @Action('BugunSend')
    async sendMonthB(ctx: Context) {
        ctx.session.month = '0';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('YanvarSend')
    async sendMonthY(ctx: Context) {
        ctx.session.month = '01';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }

    }

    @Action('FevralSend')
    async sendMonthF(ctx: Context) {
        ctx.session.month = '02';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('MartSend')
    async sendMonthM(ctx: Context) {
        ctx.session.month = '03';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('AprelSend')
    async sendMonthA(ctx: Context) {
        ctx.session.month = '04';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('MaySend')
    async sendMonthMa(ctx: Context) {
        ctx.session.month = '05';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('IyunSend')
    async sendMonthI(ctx: Context) {
        ctx.session.month = '06';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('IyulSend')
    async sendMonthIy(ctx: Context) {
        ctx.session.month = '07';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('AvgustSend')
    async sendMonthAv(ctx: Context) {
        ctx.session.month = '08';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('SentyabrSend')
    async sendMonthS(ctx: Context) {
        ctx.session.month = '09';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }
    
    @Action('OktyabrSend')
    async sendMonthO(ctx: Context) {
        ctx.session.month = '10';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('NoyabrSend')
    async sendMonthN(ctx: Context) {
        ctx.session.month = '11';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    @Action('DekabrSend')
    async sendMonthD(ctx: Context) {
        ctx.session.month = '12';
        await ctx.answerCbQuery('');
        if(ctx.session.whichAppelOrReception == "1") {
            await ctx.editMessageText("Yilni tanlang", setWhenYear());
        } else if (ctx.session.whichAppelOrReception == '2') {
            await ctx.editMessageText("Yilni tanlang", setWhenYearReception());
        }
    }

    // Hisobot Year
    @Action('2022Send')
    async sendMonth2022(ctx: Context) {
        ctx.session.year = "2022";
        await ctx.answerCbQuery('');

        const getHisobot = await this.botService.getHisobot(Number(ctx.session.whichAppelOrReception), ctx.session.district, Number(ctx.session.month), Number(ctx.session.year));

        if (getHisobot['count']>0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithDocument({source: getHisobot['SendFilePath']}); 
            await ctx.replyWithHTML(`${getHisobot['count']}`, actionButtons(ctx));
        } else if (getHisobot['count']==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''

            await ctx.replyWithHTML("Hali Murojaat yoq 0️⃣", actionButtons(ctx));
        } else {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
        }
    }

    @Action('2022SendReception')
    async sendMonthReception2022(ctx: Context) {
        ctx.session.year = "2022";
        await ctx.answerCbQuery('');

        const getHisobot = await this.botService.getHisobot(Number(ctx.session.whichAppelOrReception), ctx.session.district, Number(ctx.session.month), Number(ctx.session.year));

        if (getHisobot['count']>0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithDocument({source: getHisobot['SendFilePath']}); 
            await ctx.replyWithHTML(`${getHisobot['count']}`, actionButtons(ctx));
        } else if (getHisobot['count']==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Hali Murojaat yoq 0️⃣", actionButtons(ctx));
        } else {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
        }
    }

    //

    @Action('AppelSend')
    async sendAppelOrReception1(ctx: Context) {
        ctx.session.type = 'sendAppelOrReceptionHisobot';
        ctx.session.whichAppelOrReception = '1';
        await ctx.answerCbQuery('');
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons(ctx));
    }

    @Action('ReceptionSend')
    async sendAppelOrReception2(ctx: Context) {
        ctx.session.type = 'sendReceptionOrAppelHisobot';
        ctx.session.whichAppelOrReception = '2';
        await ctx.answerCbQuery('');
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons(ctx));
    }

    // executive Documents

    @Action('executiveDocuments')
    async sendExecutiveDocuments(ctx: Context) {
        await ctx.answerCbQuery('');
        await ctx.editMessageText(ctx.i18n.t("soonText"), actionButtons(ctx));
    }

    // Appeal

    @Action('sendMessage')
    async sendAppel(ctx: Context) {
        await ctx.answerCbQuery('');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck == null || phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }
        
        const appel = await this.botService.createAppel(Number(chatId), '', '', '', 0,  0);
        if (appel) {
            ctx.session.type = 'SendMessage';
            await ctx.answerCbQuery('');
            await ctx.editMessageText(ctx.i18n.t("chooseCityOrDistrict"), districtSendButtons(ctx));
        } else if (!appel || appel == null || appel == undefined) {
            await ctx.answerCbQuery('');
            await ctx.replyWithHTML(ctx.i18n.t("AppelProgress"), Markup.removeKeyboard());
        }
    }

    @Action('onlineAppeal')
    async sendReception(ctx: Context) {
        await ctx.answerCbQuery('');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck == null || phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }

        const reception = await this.botService.createRepection(Number(chatId), '', '', '', 0,  0);
        if (reception) {
            ctx.session.type = 'SendReception';
            await ctx.answerCbQuery('');
            await ctx.editMessageText(ctx.i18n.t("chooseCityOrDistrict"), districtSendButtons(ctx));
        } else if (!reception || reception == null || reception == undefined) {
            await ctx.answerCbQuery('');
            await ctx.replyWithHTML(ctx.i18n.t("ReceptionProgress"), Markup.removeKeyboard());
        }
    }

    @On('contact')
    async getPhoneForCheck(ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].contact.phone_number;
        const specialChars = `/[+]+/;`

        const isSpecialCharsPresent = specialChars.split('').some(char => 
        text.includes(char))
        
        let plusnumber:string;
        if (isSpecialCharsPresent) {
            plusnumber = ctx.update['message'].contact.phone_number
        } else {
            plusnumber = '+' + ctx.update['message'].contact.phone_number
        }

        if (ctx.session.type == '') {
    
            const users = await this.botService.checkMibHumans(plusnumber, chatId);
    
            if (users) {
                await ctx.reply(ctx.i18n.t("registrationSuccessText"), actionButtons(ctx));
            } else {
                const condidate = await this.botService.updatePhone(chatId, plusnumber);

                if (condidate) {
                    let sendRegMsg = await ctx.reply(ctx.i18n.t("registrationSuccessText"), Markup.removeKeyboard());
                    if (sendRegMsg) {
                        await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
                    } else {
                        await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                    }
                } else {
                    await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                }
            }

        } else if (ctx.session.type == 'SendPhone') {

            const appel = await this.botService.setPhone(Number(chatId), plusnumber)

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"));
            } else if (!appel || appel == null || appel == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendPhoneReception') {

            const reception = await this.botService.setPhoneReception(Number(chatId), plusnumber)

            if (reception) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendTextReception"));
            } else if (!reception || reception == null || reception == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }
    
    @On('text')
    async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        let text = ctx.update['message'].text;

        if (text == 'Hisobot') {
            const check = await this.botService.checkMibHumanByChatId(chatId);
            if (check) {
                ctx.session.type = 'sendHisobot';
                await ctx.replyWithHTML("Tanlang", setAppelOrReception());
            }
        }

        const appel = text.split(' ')[0];
        const id = text.split(' ')[1];
        const state = text.split(' ')[2];

        if (appel != undefined && id != undefined && state != undefined) {
            const done = await this.botService.doneAppelOrReception(appel, Number(id), state);
            if (done) {
                await ctx.replyWithHTML("Yangilandi ✅");
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"));
            }
        }

        if (ctx.session.type == 'SendPassport' || ctx.session.type == 'SendReceptionPassport') {
            if(text.length == 9 || text.length == 9 ) {

                text = text.toUpperCase();

                const oneLetter   = text[0];
                const twoLetter   = text[1];
                const threeLetter = text[2];
                const fourLetter  = text[3];
                const fiveLetter  = text[4];
                const sixLetter   = text[5];
                const sevenLetter = text[6];
                const eightLetter = text[7];
                const nineLetter  = text[8];

                if ((oneLetter+twoLetter) == "AA" || (oneLetter+twoLetter) == "AB" || (oneLetter+twoLetter) == "AC" || (oneLetter+twoLetter) == "CK" || (oneLetter+twoLetter) == "CA" || (oneLetter+twoLetter) == "CB" || (oneLetter+twoLetter) == "CE" || (oneLetter+twoLetter) == "CC" || (oneLetter+twoLetter) == "BG" || (oneLetter+twoLetter) == "XS") {
                    if(threeLetter == '0' || threeLetter == '1' || threeLetter == '2' || threeLetter == '3' || threeLetter == '4' || threeLetter == '5' || threeLetter == '6' || threeLetter == '7' || threeLetter == '8' || threeLetter == '9') {
                        if(fourLetter == '0' || fourLetter == '1' || fourLetter == '2' || fourLetter == '3' || fourLetter == '4' || fourLetter == '5' || fourLetter == '6' || fourLetter == '7' || fourLetter == '8' || fourLetter == '9') {
                            if(fiveLetter == '0' || fiveLetter == '1' || fiveLetter == '2' || fiveLetter == '3' || fiveLetter == '4' || fiveLetter == '5' || fiveLetter == '6' || fiveLetter == '7' || fiveLetter == '8' || fiveLetter == '9') {
                                if(sixLetter == '0' || sixLetter == '1' || sixLetter == '2' || sixLetter == '3' || sixLetter == '4' || sixLetter == '5' || sixLetter == '6' || sixLetter == '7' || sixLetter == '8' || sixLetter == '9') {
                                    if(sevenLetter == '0' || sevenLetter == '1' || sevenLetter == '2' || sevenLetter == '3' || sevenLetter == '4' || sevenLetter == '5' || sevenLetter == '6' || sevenLetter == '7' || sevenLetter == '8' || sevenLetter == '9') {
                                        if(eightLetter == '0' || eightLetter == '1' || eightLetter == '2' || eightLetter == '3' || eightLetter == '4' || eightLetter == '5' || eightLetter == '6' || eightLetter == '7' || eightLetter == '8' || eightLetter == '9') {
                                            if(nineLetter == '0' || nineLetter == '1' || nineLetter == '2' || nineLetter == '3' || nineLetter == '4' || nineLetter == '5' || nineLetter == '6' || nineLetter == '7' || nineLetter == '8' || nineLetter == '9') {
                                                // console.log("ishlado")
                                            } else {
                                                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                return
                                            }
                                        } else {
                                            await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                            return
                                        }
                                    } else {
                                        await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                        return
                                    }
                                } else {
                                    await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                    return
                                }
                            } else {
                                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                return
                            }
                        } else {
                            await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                            return
                        }
                    } else {
                        await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                        return
                    }
                } else {
                    await ctx.replyWithHTML(ctx.i18n.t("errorAB"));
                    return
                }

            } else {
                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                return null;
            }
        }

        if (ctx.session.type == 'SendPhone' || ctx.session.type == 'SendPhoneReception') {
            if(text.length == 13 || text.length == 13 ) {

                const zeroLetter    = text[0];
                const oneLetter     = text[1];
                const twoLetter     = text[2];
                const threeLetter   = text[3];
                const fourLetter    = text[4];
                const fiveLetter    = text[5];
                const sixLetter     = text[6];
                const sevenLetter   = text[7];
                const eightLetter   = text[8];
                const nineLetter    = text[9];
                const tenLetter     = text[10];
                const elevenLetter  = text[11];
                const twelenLetter  = text[12];

                if (zeroLetter == "+") {
                    if(oneLetter == '0' || oneLetter == '1' || oneLetter == '2' || oneLetter == '3' || oneLetter == '4' || oneLetter == '5' || oneLetter == '6' || oneLetter == '7' || oneLetter == '8' || oneLetter == '9') {
                        if(twoLetter == '0' || twoLetter == '1' || twoLetter == '2' || twoLetter == '3' || twoLetter == '4' || twoLetter == '5' || twoLetter == '6' || twoLetter == '7' || twoLetter == '8' || twoLetter == '9') {
                            if(threeLetter == '0' || threeLetter == '1' || threeLetter == '2' || threeLetter == '3' || threeLetter == '4' || threeLetter == '5' || threeLetter == '6' || threeLetter == '7' || threeLetter == '8' || threeLetter == '9') {
                                if(fourLetter == '0' || fourLetter == '1' || fourLetter == '2' || fourLetter == '3' || fourLetter == '4' || fourLetter == '5' || fourLetter == '6' || fourLetter == '7' || fourLetter == '8' || fourLetter == '9') {
                                    if(fiveLetter == '0' || fiveLetter == '1' || fiveLetter == '2' || fiveLetter == '3' || fiveLetter == '4' || fiveLetter == '5' || fiveLetter == '6' || fiveLetter == '7' || fiveLetter == '8' || fiveLetter == '9') {
                                        if(sixLetter == '0' || sixLetter == '1' || sixLetter == '2' || sixLetter == '3' || sixLetter == '4' || sixLetter == '5' || sixLetter == '6' || sixLetter == '7' || sixLetter == '8' || sixLetter == '9') {
                                            if(sevenLetter == '0' || sevenLetter == '1' || sevenLetter == '2' || sevenLetter == '3' || sevenLetter == '4' || sevenLetter == '5' || sevenLetter == '6' || sevenLetter == '7' || sevenLetter == '8' || sevenLetter == '9') {
                                                if(eightLetter == '0' || eightLetter == '1' || eightLetter == '2' || eightLetter == '3' || eightLetter == '4' || eightLetter == '5' || eightLetter == '6' || eightLetter == '7' || eightLetter == '8' || eightLetter == '9') {
                                                    if(nineLetter == '0' || nineLetter == '1' || nineLetter == '2' || nineLetter == '3' || nineLetter == '4' || nineLetter == '5' || nineLetter == '6' || nineLetter == '7' || nineLetter == '8' || nineLetter == '9') {
                                                        if(tenLetter == '0' || tenLetter == '1' || tenLetter == '2' || tenLetter == '3' || tenLetter == '4' || tenLetter == '5' || tenLetter == '6' || tenLetter == '7' || tenLetter == '8' || tenLetter == '9') {
                                                            if(elevenLetter == '0' || elevenLetter == '1' || elevenLetter == '2' || elevenLetter == '3' || elevenLetter == '4' || elevenLetter == '5' || elevenLetter == '6' || elevenLetter == '7' || elevenLetter == '8' || elevenLetter == '9') {
                                                                if(twelenLetter == '0' || twelenLetter == '1' || twelenLetter == '2' || twelenLetter == '3' || twelenLetter == '4' || twelenLetter == '5' || twelenLetter == '6' || twelenLetter == '7' || twelenLetter == '8' || twelenLetter == '9') {
        
                                                                } else {
                                                                    await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                                    return
                                                                }
                                                            } else {
                                                                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                                return
                                                            }
                                                        } else {
                                                            await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                            return
                                                        }
                                                    } else {
                                                        await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                        return
                                                    }
                                                } else {
                                                    await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                    return
                                                }
                                            } else {
                                                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                                return
                                            }
                                        } else {
                                            await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                            return
                                        }
                                    } else {
                                        await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                        return
                                    }
                                } else {
                                    await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                    return
                                }
                            } else {
                                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                                return
                            }
                        } else {
                            await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                            return
                        }
                    } else {
                        await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                        return
                    }
                } else {
                    await ctx.replyWithHTML(ctx.i18n.t("errorPlus"));
                    return
                }
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("errorLength"));
                return null;
            }
        }

        if(text.length == 13) {

            if (ctx.session.type != 'SendPhone') {
                if (ctx.session.type != 'SendPhoneReception') {
                    let checkNumber = /^[\w\dА-я]+$/;

                    if (!checkNumber.test(text)) {
                        const specialChars = `/[+]+/;`

                        const isSpecialCharsPresent = specialChars.split('').some(char => 
                        text.includes(char))
                        
                        let plusnumber:string;
                        if (isSpecialCharsPresent) {
                            plusnumber = ctx.update['message'].contact.phone_number
                        } else {
                            plusnumber = '+' + ctx.update['message'].contact.phone_number
                        }

                        const users = await this.botService.checkMibHumans(plusnumber, chatId);
                
                        if (users) {
                            await ctx.reply("Registratsiyani yakunlash uchun iltimos pasdagi tugmani bosing 👇🏻", Markup.keyboard([
                                Markup.button.contactRequest('Telefon yuborish 📲')
                            ]).oneTime().resize());
                        } else {
                            const condidate = await this.botService.updatePhone(chatId, plusnumber);

                            if (condidate) {
                                let sendRegMsg = await ctx.reply(ctx.i18n.t("registrationSuccessText"), Markup.removeKeyboard());
                                if (sendRegMsg) {
                                    await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
                                } else if (!condidate || condidate == null || condidate == undefined) {
                                    await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                                }
                            } else {
                                await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                            }
                        }
                    } else {
                        await ctx.replyWithHTML(ctx.i18n.t("registrationErrorPhoneText"), sendPhone(ctx));
                    }
                }
            }
        }

        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck.phone == '' || phoneCheck.phone == null || phoneCheck.phone == undefined) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }

        if (!ctx.session.type) return

        if (ctx.session.type === 'SendDistrict') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPassport';
                await ctx.replyWithHTML(ctx.i18n.t("passsportSendText"));
            } else if (!appel || appel == null || appel == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPassport') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPhone';
                await ctx.replyWithHTML(ctx.i18n.t("phoneSendText"), sendPhone(ctx));
            } else if (!appel || appel == null || appel == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPhone') {

            const appel = await this.botService.setPhone(Number(chatId), text);

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"), Markup.removeKeyboard());
            } else if (!appel || appel == null || appel == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type === 'SendDescription') {

            const appel = await this.botService.setDescription(Number(chatId), text);
            if (appel) {

                const content = `Yangi Xabar keldi 👇🏻\n\nXabarni ID raqami: <b>${appel.id}</b>\nMurojaatchining Passport raqami: <b>${appel.passport}</b>\nMurojaatchining telefon raqami: <b>${appel.phone}</b>\nMurojaatchining xabari: <b>${appel.description}</b>\nMurojaat qilingan vaqti: <b>${appel.date}</b>\n\nXabar <b>${appel.districtName}</b> ga <b>${appel.userPhone}</b> raqamiga yuborildi`;

                if (appel.userChatId > 0) {
                    await ctx.telegram.sendMessage(appel.userChatId, content, {parse_mode: 'HTML'});
                }

                // if (appel.directorChatId > 0) {
                //     await ctx.telegram.sendMessage(appel.directorChatId, content, {parse_mode: 'HTML'});
                //     if (appel.userChatId < 0 || appel.userChatId ==0 || appel.userChatId == null || appel.userChatId == undefined){
                //         await ctx.telegram.sendMessage(appel.directorChatId, `<b>${appel.districtName}</b> <b>${appel.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                //         await ctx.telegram.sendMessage(appel.directorChatId, `<b>${appel.districtName}</b> <b>${appel.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                //     }
                // }

                if (appel.kansilyariyaChatId > 0) {
                    await ctx.telegram.sendMessage(appel.kansilyariyaChatId, content, {parse_mode: 'HTML'});
                    if (appel.userChatId < 0 || appel.userChatId ==0 || appel.userChatId == null || appel.userChatId == undefined){
                        await ctx.telegram.sendMessage(appel.kansilyariyaChatId, `<b>${appel.districtName}</b> <b>${appel.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                    }
                }
                
                if (appel.adminChatId > 0) {
                    await ctx.telegram.sendMessage(appel.adminChatId, content, {parse_mode: 'HTML'});
                    if (appel.userChatId < 0 || appel.userChatId ==0 || appel.userChatId == null || appel.userChatId == undefined){
                        await ctx.telegram.sendMessage(appel.adminChatId, `<b>${appel.districtName}</b> <b>${appel.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                    }
                }

                ctx.session.type = 'Done';
                await ctx.replyWithHTML(ctx.i18n.t("successAppelText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else if (!appel || appel == null || appel == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type === 'SendReceptionPassport') {
            const reception = await this.botService.setPassportReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendPhoneReception';
                await ctx.replyWithHTML(ctx.i18n.t("phoneSendText"), sendPhone(ctx));
            } else if (!reception || reception == null || reception == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPhoneReception') {

            const reception = await this.botService.setPhoneReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendTextReception"), Markup.removeKeyboard());
            } else if (!reception || reception == null || reception == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type === 'SendDescriptionReception') {

            const reception = await this.botService.setDescriptionReception(Number(chatId), text); 

            if (reception) {

                const content = `Yangi Online qabulga so'rov keldi 👇🏻\n\nOnline qabul ID raqami: <b>${reception.id}</b>\nMurojaatchining Passport raqami: <b>${reception.passport}</b>\nMurojaatchining telefon raqami: <b>${reception.phone}</b>\nMurojaatchining xabari: <b>${reception.description}</b>\nMurojaat qilingan vaqti: <b>${reception.date}</b>\n\nOnline qabul <b>${reception.districtName}</b> ga <b>${reception.userPhone}</b> raqamiga yuborildi`;

                if (reception.userChatId > 0) {
                    await ctx.telegram.sendMessage(reception.userChatId, content, {parse_mode: 'HTML'});
                }

                // if (reception.directorChatId > 0) {
                //     await ctx.telegram.sendMessage(reception.directorChatId, content, {parse_mode: 'HTML'});
                //     if (reception.userChatId < 0 || reception.userChatId ==0 || reception.userChatId == null || reception.userChatId == undefined){
                //         await ctx.telegram.sendMessage(reception.directorChatId, `<b>${reception.districtName}</b> <b>${reception.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                //     }
                // }

                if (reception.kansilyariyaChatId > 0) {
                    await ctx.telegram.sendMessage(reception.kansilyariyaChatId, content, {parse_mode: 'HTML'});
                    if (reception.userChatId < 0 || reception.userChatId ==0 || reception.userChatId == null || reception.userChatId == undefined){
                        await ctx.telegram.sendMessage(reception.kansilyariyaChatId, `<b>${reception.districtName}</b> <b>${reception.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                    }
                }
                
                if (reception.adminChatId > 0) {
                    await ctx.telegram.sendMessage(reception.adminChatId, content, {parse_mode: 'HTML'});
                    if (reception.userChatId < 0 || reception.userChatId ==0 || reception.userChatId == null || reception.userChatId == undefined){
                        await ctx.telegram.sendMessage(reception.adminChatId, `<b>${reception.districtName}</b> <b>${reception.userPhone} raqamli</b> Ijrochi hali tizimni ishga tushurmadi`, {parse_mode: 'HTML'});
                    }
                }
                ctx.session.type = 'DoneReception';
                await ctx.replyWithHTML(ctx.i18n.t("successReceptionText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else if (!reception || reception == null || reception == undefined) {
                await ctx.replyWithHTML(ctx.i18n.t("errorText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }

}