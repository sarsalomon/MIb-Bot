import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTelegramMember } from './dto/telegram.dto';
import { TelegramMembers } from './bot.model';
import { Appel } from 'src/appel/appel.model';
import { Reception } from 'src/reception/reception.model';
import { District } from 'src/district/district.model';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';
import * as excelJS from "exceljs";
import * as path from "path"
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class BotService {

    constructor(@InjectModel(TelegramMembers) 
        private telegramMemberRepository: typeof TelegramMembers,
        @InjectModel(Appel) 
        private appelRepository: typeof Appel,
        @InjectModel(Reception) 
        private receptionRepository: typeof Reception,
        @InjectModel(District) 
        private districtRepository: typeof District,
        @InjectModel(User) 
        private userRepository: typeof User
    ) {}

    async doneAppelOrReception(text:string, id: number, status: string) {
        if (text == "Xabar") {
            const appel = await this.appelRepository.update({status: 1}, {where: {id: id}});
            if (appel) {
                return appel;
            } else {
                return null;
            }
        } else if (text == "Murojat") {
            const reception = await this.receptionRepository.update({status: 1}, {where: {id: id}});
            if (reception) {
                return reception;
            } else {
                return null;
            }
        }
    }

    async checkMibHumans(text: string, chatId: number) {

        const user = await this.userRepository.findOne({where: {phone: text}, include: {all: true}});
        
        if (user) {
            if (user.chatId>0) {
                if (user.phone == text && user.chatId == chatId) {
                    const updateStatus = await this.userRepository.update({status: 1}, {where: {phone: text}});
                    const updatePhone = await this.telegramMemberRepository.update({phone: text}, {where: {chatId: chatId}});
                    return updateStatus;
                } else {
                    return null;
                }
            } else {
                const updateChatId = await this.userRepository.update({chatId: chatId, status: 1}, {where: {phone: text}});
                const updatePhone = await this.telegramMemberRepository.update({phone: text}, {where: {chatId: chatId}});
                return updateChatId;
            }
        } else {
            return null;
        }
    }

    async checkMibHumanByChatId(chatId: number) {
        
        const user = await this.userRepository.findOne({where: {chatId: chatId}, include: {all: true}});

        if (user) {
            if(user.role == 'Admin' || user.role == 'Director') {
                return user;
            }
        } else {
            return null;
        }

    }


    async createTelegramMember(dto: createTelegramMember) {
        const chatId = dto.chatId;
        const condidate = await this.telegramMemberRepository.findOne({where: {chatId}, include: {all: true}});

        if (condidate) {
            return condidate;
        } else {
            const telegramMember = await this.telegramMemberRepository.create(dto);
            return telegramMember;
        }

    }

    async getTelegramMemberByID(chatId: number) {
        const telegramMember = await this.telegramMemberRepository.findOne({where: {chatId}, include: {all: true}});
        return telegramMember;
    }

    async getDisctrictByCommand(command: string) {

        const district = await this.districtRepository.findOne({where: {command}, include: {all: true}});

        if (district) {
            return district;
        } else {
            return null;
        }

    }

    async updateLang(chatId: number, lang: string) {
        const condidate = await this.telegramMemberRepository.findOne({where: {chatId}, include: {all: true}});

        if (condidate) {
            const setLang = await this.telegramMemberRepository.update({lang: lang}, {where: {chatId}});
            return setLang;
        } else {
            return null;
        }
    }

    
    async updatePhone(chatId: number, phone: string) {

        const condidate = await this.telegramMemberRepository.findOne({where: {chatId}, include: {all: true}});

        if (condidate) {
            const setLang = await this.telegramMemberRepository.update({phone: phone}, {where: {chatId}});
            return setLang;
        } else {
            return null;
        }
    }

    async createAppel(chatId: number, passport: string, phone: string, description: string, districtId: number, status: number) {

        const condidate = await this.appelRepository.findOne({where: {chatId, status: 0}, order:[['id', 'DESC']], include: {all: true}});

        if (condidate) {
            if (condidate.passport == '' || condidate.passport == null
            || condidate.phone == '' || condidate.phone == null
            || condidate.description == '' || condidate.description == null ) {
                const condidateDelete = await this.appelRepository.destroy({where: {id: condidate.id}});

                if (condidateDelete){
                    return condidateDelete;
                } else {
                    return null;                
                }
            } else {
                return null;        
            }

        } else {
            const appel = await this.appelRepository.create({chatId: chatId, passport: '', phone: '', description: '', districtId: 0, status: 0});
            return appel;
        }

    }

    async setDistrict(chatId: number, text: string, which: number) {

        if (which == 0) {
            const condidate = await this.districtRepository.findOne({where: {command: text}, include: {all: true}});

            if (condidate) {
                const updateDistrict = await this.appelRepository.update({districtId: condidate.id}, {where: {chatId,  status: 0}});
                return updateDistrict;
            } else {
                return null;
            }
        } else if (which == 1) {
            const condidate = await this.districtRepository.findOne({where: {command: text}, include: {all: true}});

            if (condidate) {
                const updateDistrict = await this.receptionRepository.update({districtId: condidate.id}, {where: {chatId,  status: 0}});
                return updateDistrict;
            } else {
                return null;
            }
        } else {
            return null;
        }

    }

    async setPassport(chatId: number, passport: string) {

        const condidate = await this.appelRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setpassport = await this.appelRepository.update({passport: passport}, {where: {chatId,  status: 0}});
            return setpassport;
        } else {
            return null;
        }

    }

    async setPhone(chatId: number, phone: string) {

        const condidate = await this.appelRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setphone = await this.appelRepository.update({phone: phone}, {where: {chatId,  status: 0}});
            return setphone;
        } else {
            return null;
        }

    }

    async setDescription(chatId: number, description: string) {

        const condidate = await this.appelRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setdescription = await this.appelRepository.update({description: description}, {where: {chatId,  status: 0}});
            if (setdescription) {
                const findeAppel = await this.appelRepository.findOne({where: {chatId}, order:[['id', 'DESC']], include: {all: true}});
                const districtId  = findeAppel.districtId || 1;
                const findeDistrict = await this.districtRepository.findOne({where: {id: districtId}});
                const DistrictName  = findeDistrict.nameUz || "Tizimda xatolik qidirilivotgan Tuman yoki Shahar topilmadi";
                const Id          = findeAppel.id || 0;
                const Passport    = findeAppel.passport || 0;
                const Phone       = findeAppel.phone || 0;
                const Description = findeAppel.description || 0;
                const Date        = findeAppel.createdAt || 0;
                if (findeAppel) {
                    const findUser = await this.userRepository.findOne({where: {districtId: findeAppel.districtId}, order:[['id', 'DESC']], include: {all: true}});
                    const findAdmin = await this.userRepository.findOne({where: {role: "Admin"}, order:[['id', 'DESC']], include: {all: true}});
                    // const findDirector = await this.userRepository.findOne({where: {role: "Director"}, order:[['id', 'DESC']], include: {all: true}});
                    const findKansilyariya = await this.userRepository.findOne({where: {role: "Kansilyariya"}, order:[['id', 'DESC']], include: {all: true}});
                    if (findUser) {
                        const UserChatId         = findUser.chatId;
                        const UserPhone          = findUser.phone || "Tizimda telefon raqami mavjud emas ekan";
                        const AdminChatId        = findAdmin.chatId || 0;
                        // const DirectorChatId     = findDirector.chatId || 0;
                        const KansilyariyaChatId = findKansilyariya.chatId || 0;
                        const obj = {
                            id: Id,
                            districtName: DistrictName,
                            userPhone: UserPhone,
                            passport: Passport,
                            phone: Phone,
                            description: Description,
                            adminChatId: AdminChatId,
                            userChatId: UserChatId,
                            // directorChatId: DirectorChatId,
                            kansilyariyaChatId: KansilyariyaChatId,
                            date: Date
                        }
                        return obj;
                    } else {
                        return null;
                    }
                } else {

                }
            } else {
                return null;
            }

        } else {
            return null;
        }

    }

    async createRepection(chatId: number, passport: string, phone: string, description: string, districtId: number, status: number){

        const condidate = await this.receptionRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            if (condidate.passport == '' || condidate.passport == null 
            || condidate.phone == '' || condidate.phone == null 
            || condidate.description == '' || condidate.description == null ) {
                const condidateDelete = await this.receptionRepository.destroy({where: {id: condidate.id}});
                if (condidateDelete){
                    return condidateDelete;
                } else {
                    return null;                
                }
            } else {
                return null;                
            }
            // throw new HttpException('Xatolik', HttpStatus.BAD_REQUEST);
        } else {
            const reception = await this.receptionRepository.create({chatId: chatId, passport: '', phone: '', description: '', districtId: 0, status: 0});
            return reception;
        }

    }


    async setPassportReception(chatId: number, passport: string) {

        const condidate = await this.receptionRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setpassport = await this.receptionRepository.update({passport: passport}, {where: {chatId,  status: 0}});
            return setpassport;
        } else {
            return null;
        }

    }

    async setPhoneReception(chatId: number, phone: string) {

        const condidate = await this.receptionRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setphone = await this.receptionRepository.update({phone: phone}, {where: {chatId,  status: 0}});
            return setphone;
        } else {
            return null;
        }

    }

    async setDescriptionReception(chatId: number, description: string) {

        const condidate = await this.receptionRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            const setdescription = await this.receptionRepository.update({description: description}, {where: {chatId,  status: 0}});
            if (setdescription) {
                const findeReception = await this.receptionRepository.findOne({where: {chatId}, order:[['id', 'DESC']], include: {all: true}});
                const districtId  = findeReception.districtId || 1;
                const findeDistrict = await this.districtRepository.findOne({where: {id: districtId}});
                const DistrictName  = findeDistrict.nameUz || "Tizimda xatolik qidirilivotgan Tuman yoki Shahar topilmadi";
                const Id          = findeReception.id || 0;
                const Passport    = findeReception.passport || 0;
                const Phone       = findeReception.phone || 0;
                const Description = findeReception.description || 0;
                const Date        = findeReception.createdAt || 0;
                if (findeReception) {
                    const findUser = await this.userRepository.findOne({where: {districtId: findeReception.districtId}, order:[['id', 'DESC']], include: {all: true}});
                    const findAdmin = await this.userRepository.findOne({where: {role: "Admin"}, order:[['id', 'DESC']], include: {all: true}});
                    // const findDirector = await this.userRepository.findOne({where: {role: "Director"}, order:[['id', 'DESC']], include: {all: true}});
                    const findKansilyariya = await this.userRepository.findOne({where: {role: "Kansilyariya"}, order:[['id', 'DESC']], include: {all: true}});
                    if (findUser) {
                        const UserChatId         = findUser.chatId;
                        const UserPhone          = findUser.phone || "Tizimda telefon raqami mavjud emas ekan";
                        const AdminChatId        = findAdmin.chatId || 0;
                        // const DirectorChatId     = findDirector.chatId || 0;
                        const KansilyariyaChatId = findKansilyariya.chatId || 0;
                        const obj = {
                            id: Id,
                            districtName: DistrictName,
                            userPhone: UserPhone,
                            passport: Passport,
                            phone: Phone,
                            description: Description,
                            adminChatId: AdminChatId,
                            userChatId: UserChatId,
                            // directorChatId: DirectorChatId,
                            kansilyariyaChatId: KansilyariyaChatId,
                            date: Date
                        }
                        return obj;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }

    }

    async getHisobot(which: number, district:string, month: number, year: number) {
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Countries List');
 
        let today = new Date();
        let newmonth = today.getMonth()+1;
        let day = today.getDate();
        let startedDate;
        let endDate;

        if (month == 0) {
            startedDate = new Date(`${year}-${newmonth}-${day} 00:00:00`);
            endDate = new Date(`${year}-${newmonth}-31 00:00:00`);
        } else {
            startedDate = new Date(`${year}-${month}-01 00:00:00`);
            endDate = new Date(`${year}-${month}-31 00:00:00`);
        }


        if (which == 1) {
            const getDBC = await this.districtRepository.findOne({where: {id:district}});

            const CountAppel = await this.appelRepository.findAll({where: {districtId: district, createdAt: {[Op.between] : [startedDate, endDate]}} , include: {all: true}, });
            let monthforxl:string = 'Xatolik';

            if(month == 0){
                monthforxl = "Bugun";
            } else if(month == 1){
                monthforxl = "Yanvar";
            } else if(month == 2){
                monthforxl = "Fevral";
            } else if(month == 3){
                monthforxl = "Mart";
            } else if(month == 4){
                monthforxl = "Aprel";
            } else if(month == 5){
                monthforxl = "Mau";
            } else if(month == 6){
                monthforxl = "Iyun";
            } else if(month == 7){
                monthforxl = "Iyul";
            } else if(month == 8){
                monthforxl = "Avgust";
            } else if(month == 9){
                monthforxl = "Sentyabr";
            } else if(month == 10){
                monthforxl = "Oktyabr";
            } else if(month == 11){
                monthforxl = "Noyabr";
            } else if(month == 12){
                monthforxl = "Dekabr";
            }

            worksheet.columns = [
                { key: 'id', header: 'ID' },
                { key: 'passport', header: 'Passport' },
                { key: 'phone', header: 'Telefon Raqam' },
                { key: 'description', header: 'Murojat mazmuni' },
                { key: 'districtId', header: 'Tuman yoki Shahar' },
                { key: 'status', header: 'Holati' },
                { key: 'createdAt', header: 'Yaratilgan sana' },
            ];
    
        
            CountAppel.forEach((item) => {
                worksheet.addRow(item);
            });


            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
    
            const exportPath = path.resolve(filePath, `Xabar ${day}-${newmonth}-${year}-${getDBC.nameUz}-${monthforxl}.xlsx`);
                
            await workbook.xlsx.writeFile(exportPath);

            const obj = {
                count: CountAppel.length,
                SendFilePath: exportPath,
            }

            return obj;

        } else if (which == 2) {
            const getDBC = await this.districtRepository.findOne({where: {id:district}});
            
            const CountReception = await this.receptionRepository.findAll({where: {districtId: district, createdAt: {[Op.between] : [startedDate, endDate]}}, include: {all: true}});

            let monthforxl:string = 'Xatolik';

            if(month == 0){
                monthforxl = "Bugun";
            } else if(month == 1){
                monthforxl = "Yanvar";
            } else if(month == 2){
                monthforxl = "Fevral";
            } else if(month == 3){
                monthforxl = "Mart";
            } else if(month == 4){
                monthforxl = "Aprel";
            } else if(month == 5){
                monthforxl = "Mau";
            } else if(month == 6){
                monthforxl = "Iyun";
            } else if(month == 7){
                monthforxl = "Iyul";
            } else if(month == 8){
                monthforxl = "Avgust";
            } else if(month == 9){
                monthforxl = "Sentyabr";
            } else if(month == 10){
                monthforxl = "Oktyabr";
            } else if(month == 11){
                monthforxl = "Noyabr";
            } else if(month == 12){
                monthforxl = "Dekabr";
            }

            worksheet.columns = [
                { key: 'id', header: 'ID' },
                { key: 'passport', header: 'Passport' },
                { key: 'phone', header: 'Telefon Raqam' },
                { key: 'description', header: 'Murojat mazmuni' },
                { key: 'districtId', header: 'Tuman yoki Shahar' },
                { key: 'status', header: 'Holati' },
                { key: 'createdAt', header: 'Yaratilgan sana' },
            ];
    
            CountReception.forEach((item) => {
                worksheet.addRow(item);
            });
    
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
    
            const exportPath = path.resolve(filePath, `Online murojat ${day}-${newmonth}-${year}-${getDBC.nameUz}-${monthforxl}.xlsx`);
            await workbook.xlsx.writeFile(exportPath);

            const obj = {
                count: CountReception.length,
                SendFilePath: exportPath,
            }

            return obj;

        } else if (which == 3) {
            
        }

    }


}
