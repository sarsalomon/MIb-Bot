import { InjectBot, Start, Update, Action, On, Message, Ctx } from 'nestjs-telegraf';
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

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'uz');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('ru')
    async setlangRu(ctx: Context) {
        ctx.i18n.locale('ru');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'ru');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('oz')
    async setlangOz(ctx: Context) {
        ctx.i18n.locale('oz');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'oz');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
        }
    }

    @Action('en')
    async setlangEnd(ctx: Context) {
        ctx.i18n.locale('en');
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const user = await this.botService.getTelegramMemberByID(Number(chatId));

        if (user.phone) {
            const condidates = await this.botService.updateLang(Number(chatId), 'en');
            if (condidates) {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.editMessageText("Tilni tanlang \nВыборы язык \nтил танла \nChoose lang", langButtons());
            }
        } else {
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
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
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }
        await ctx.editMessageText(ctx.i18n.t('SetDistrict'), districtSendButtons(ctx));
    }

    @Action('AngrenSend')
    async sendDistrictDivisions1(ctx: Context) {
        
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
                    Markup.button.url(ctx.i18n.t("LocationSendText"), "https://www.google.com/maps/dir//''/@41.0083633,70.0814991,4645m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x38afe9a32fc0878b:0xc6b86b6db55e1d88!2m2!1d70.0871445!2d41.0079382"),
                    Markup.button.callback(ctx.i18n.t("BackText"), 'Back'),
                ], {
                    columns:2
                }));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '1';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }

    @Action('BekobodSend')
    async sendDistrictDivisions2(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '2';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BekobodSendT')
    async sendDistrictDivisions3(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '3';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BokaSendT')
    async sendDistrictDivisions4(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '4';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('BostonlikSendT')
    async sendDistrictDivisions5(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '5';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ZangiotaSendT')
    async sendDistrictDivisions6(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '6';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('QibraySendT')
    async sendDistrictDivisions7(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '7';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ChirchikSend')
    async sendDistrictDivisions8(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '8';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('QuyichirchiqSendT')
    async sendDistrictDivisions9(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OrtachirchiqSendT')
    async sendDistrictDivisions10(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '9';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YuqorichirchiqSendT')
    async sendDistrictDivisions11(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '10';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('NurafshonSend')
    async sendDistrictDivisions12(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '11';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OqqorgonSendT')
    async sendDistrictDivisions13(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '12';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OlmaliqSend')
    async sendDistrictDivisions14(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '13';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OhangaronSend')
    async sendDistrictDivisions15(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '14';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('OhangaronSendT')
    async sendDistrictDivisions16(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '15';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ParkentSendT')
    async sendDistrictDivisions17(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '16';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('PskentSendT')
    async sendDistrictDivisions18(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '17';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ToshkentSendT')
    async sendDistrictDivisions19(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '18';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('ChinozSendT')
    async sendDistrictDivisions20(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '19';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YangiyolSend')
    async sendDistrictDivisions21(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '20';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '21';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('YangiyolSendT')
    async sendDistrictDivisions22(ctx: Context) {
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
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
        } else if (ctx.session.type == 'SendMessage') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 0);

            if (update) {
                ctx.session.type = 'SendPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendReception') {
            const chatId = ctx.update['callback_query'].from.id;
            const command = ctx.update['callback_query'].data;

            const update = await this.botService.setDistrict(chatId, command, 1);

            if (update) {
                ctx.session.type = 'SendReceptionPassport';
                await ctx.editMessageText(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendReceptionOrAppelHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearAppel';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'sendAppelOrReceptionHisobat') {
            const command = ctx.update['callback_query'].data;

            const getDistrict = await this.botService.getDisctrictByCommand(command);

            if (getDistrict) {
                ctx.session.type = 'sendYearReception';
                ctx.session.district = '22';
                await ctx.editMessageText("Tanlang", setWhenTodayOrMonths());
            } else {
                await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }
    }

    @Action('Back')
    async sendDistrictDivisions23(ctx: Context) {
        await ctx.editMessageText("Malu'mot olish uchun ro'yxatdan tuman yoki shaharni tanlang 👇🏻", districtSendButtons(ctx));
    }

    @Action('BackToMain')
    async sendToMain(ctx: Context) {
        await ctx.editMessageText(ctx.i18n.t("serviceText"), actionButtons(ctx));
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
            await ctx.replyWithHTML(`${getHisobat}`, actionButtons(ctx));
        } else if (getHisobat==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Hali murojat yoq 0️⃣", actionButtons(ctx));
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

        const getHisobat = await this.botService.getHisobat(Number(ctx.session.whichAppelOrReception), ctx.session.district, Number(ctx.session.month), Number(ctx.session.year));

        if (getHisobat>0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML(`${getHisobat}`, actionButtons(ctx));
        } else if (getHisobat==0) {
            ctx.session.district = ''
            ctx.session.whichAppelOrReception = ''
            ctx.session.month = ''
            ctx.session.year = ''
            await ctx.replyWithHTML("Hali murojat yoq 0️⃣", actionButtons(ctx));
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
        ctx.session.type = 'sendAppelOrReceptionHisobat';
        ctx.session.whichAppelOrReception = '1';
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons(ctx));
    }

    @Action('ReceptionSend')
    async sendAppelOrReception2(ctx: Context) {
        ctx.session.type = 'sendReceptionOrAppelHisobat';
        ctx.session.whichAppelOrReception = '2';
        await ctx.editMessageText("Tuman yoki Shaharni tanlang", districtSendButtons(ctx));
    }

    // executive Documents

    @Action('executiveDocuments')
    async sendExecutiveDocuments(ctx: Context) {
        await ctx.editMessageText(ctx.i18n.t("soonText"), actionButtons(ctx));
    }

    // Appeal

    @Action('sendMessage')
    async sendAppel(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }
        
        const appel = await this.botService.createAppel(Number(chatId), '', '', '', 0,  0);
        if (appel) {
            ctx.session.type = 'SendMessage';
            await ctx.replyWithHTML(ctx.i18n.t("chooseCityOrDistrict"), districtSendButtons(ctx));
        } else {
            await ctx.editMessageText(ctx.i18n.t("AppelProgress"), actionButtons(ctx));
        }
    }

    @Action('onlineAppeal')
    async sendReception(ctx: Context) {
        const chatId: number = ctx.update['callback_query'].message.chat.id;
        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);
        console.log(phoneCheck)
        if (phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
        }

        const reception = await this.botService.createRepection(Number(chatId), '', '', '', 0,  0);
        if (reception) {
            ctx.session.type = 'SendReception';
            await ctx.replyWithHTML(ctx.i18n.t("chooseCityOrDistrict"), districtSendButtons(ctx));
        } else {
            await ctx.editMessageText(ctx.i18n.t("ReceptionProgress"), actionButtons(ctx))
        }
    }

    @On('contact')
    async getPhoneForCheck(ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].contact.phone_number;

        if (ctx.session.type == '') {
    
            const users = await this.botService.checkMibHumans(text, chatId);
    
            if (users) {
                await ctx.reply(ctx.i18n.t("registrationSuccessText"), actionButtons(ctx));
            } else {
                const condidate = await this.botService.updatePhone(chatId, text);

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

            const appel = await this.botService.setPhone(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type == 'SendPhoneReception') {

            const appel = await this.botService.setPhoneReception(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }
    
    @On('text')
    async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        const chatId = ctx.update['message'].chat.id;
        const text = ctx.update['message'].text;

        const phoneCheck = await this.botService.getTelegramMemberByID(chatId);

        if (phoneCheck.phone == '' || phoneCheck.phone == null) {
            await ctx.replyWithHTML(ctx.i18n.t("errphoneRegText"));
            await ctx.replyWithHTML(ctx.i18n.t("phoneRegText"), sendPhone(ctx));
            return
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

        if (text == 'Hisobat') {
            ctx.session.type = 'sendHisobat';
            await ctx.replyWithHTML("Tanlang", setAppelOrReception());
        }

        if(text.length == 13) {
            let checkNumber = /^[\w\dА-я]+$/;

            if (checkNumber) {
                const users = await this.botService.checkMibHumans(text, chatId);
        
                if (users) {
                    await ctx.reply("Registratsiyani yakunlash uchun iltimos pasdagi tugmani bosing", Markup.keyboard([
                        Markup.button.contactRequest('Telefon yuborish 📲')
                    ]).oneTime().resize());
                } else {
                    const condidate = await this.botService.updatePhone(chatId, text);

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
            }
        }

        if (!ctx.session.type) return

        if (ctx.session.type === 'SendDistrict') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPassport';
                await ctx.replyWithHTML(ctx.i18n.t("passsportSendText"));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPassport') {
            const appel = await this.botService.setPassport(Number(chatId), text)

            if (appel) {
                ctx.session.type = 'SendPhone';
                await ctx.replyWithHTML(ctx.i18n.t("phoneSendText"), sendPhone(ctx));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPhone') {

            const appel = await this.botService.setPhone(Number(chatId), text);

            if (appel) {
                ctx.session.type = 'SendDescription';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"), Markup.removeKeyboard());
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
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
                
                if (appel.adminChatId > 0) {
                    await ctx.telegram.sendMessage(appel.adminChatId, content);
                }
                ctx.session.type = 'Done';
                await ctx.replyWithHTML(ctx.i18n.t("successAppelOrReceptionText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type === 'SendReceptionPassport') {
            const reception = await this.botService.setPassportReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendPhoneReception';
                await ctx.replyWithHTML(ctx.i18n.t("phoneSendText"), sendPhone(ctx));
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }
           
        } else if (ctx.session.type === 'SendPhoneReception') {

            const reception = await this.botService.setPhoneReception(Number(chatId), text);

            if (reception) {
                ctx.session.type = 'SendDescriptionReception';
                await ctx.replyWithHTML(ctx.i18n.t("descriptionSendText"), Markup.removeKeyboard());
            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        } else if (ctx.session.type === 'SendDescriptionReception') {

            const reception = await this.botService.setDescriptionReception(Number(chatId), text); 

            if (reception) {
                ctx.session.type = 'DoneReception';
                await ctx.replyWithHTML(ctx.i18n.t("successAppelOrReceptionText"));
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
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
                
                if (reception.adminChatId > 0) {
                    await ctx.telegram.sendMessage(reception.adminChatId, content);
                }

            } else {
                await ctx.replyWithHTML(ctx.i18n.t("serviceText"), actionButtons(ctx));
            }

        }

    }



}