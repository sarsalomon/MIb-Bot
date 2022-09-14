import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTelegramMember } from './dto/telegram.dto';
import { TelegramMembers } from './bot.model';
import { Appel } from 'src/appel/appel.model';
import { Reception } from 'src/reception/reception.model';
import { District } from 'src/district/district.model';
import { User } from 'src/users/users.model';

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

    async checkMibHumans(text: string, chatId: number) {

        const user = await this.userRepository.findOne({where: {phone: text}, include: {all: true}});
        
        if (user) {
            if (user.chatId>0) {
                if (user.phone == text && user.chatId == chatId) {
                    const updateStatus = await this.userRepository.update({status: 1}, {where: {phone: text}});
                    return updateStatus;
                } else {
                    return null;
                }
            } else {
                const updateChatId = await this.userRepository.update({chatId: chatId}, {where: {phone: text}});
                return updateChatId;
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

    async createAppel(chatId: number, passport: string, phone: string, description: string, districtId: number, status: number) {

        const condidate = await this.appelRepository.findOne({where: {chatId, status: 0}, include: {all: true}})
        if (condidate) {
            return null;
            // throw new HttpException('Xatolik', HttpStatus.BAD_REQUEST);
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
            console.log(setdescription)
            if (setdescription) {
                const findeAppel = await this.appelRepository.findOne({where: {chatId}, order:[['id', 'DESC']], include: {all: true}});
                const Passport    = findeAppel.passport || 0;
                const Phone       = findeAppel.phone || 0;
                const Description = findeAppel.description || 0;
                const Date        = findeAppel.createdAt || 0;
                if (findeAppel) {
                    const findUser = await this.userRepository.findOne({where: {districtId: findeAppel.districtId}, order:[['id', 'DESC']], include: {all: true}});
                    const findDirector = await this.userRepository.findOne({where: {role: "Director"}, order:[['id', 'DESC']], include: {all: true}});
                    const findKansilyariya = await this.userRepository.findOne({where: {role: "Kansilyariya"}, order:[['id', 'DESC']], include: {all: true}});
                    if (findUser) {
                        const UserChatId = findUser.chatId;
                        const DirectorChatId = findDirector.chatId || 0;
                        const KansilyariyaChatId = findKansilyariya.chatId || 0;
                        const obj = {
                            passport: Passport,
                            phone: Phone,
                            description: Description,
                            userChatId: UserChatId,
                            directorChatId: DirectorChatId,
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
            // return setdescription;
        } else {
            return null;
        }

    }

    async createRepection(chatId: number, passport: string, phone: string, description: string, districtId: number, status: number){

        const condidate = await this.receptionRepository.findOne({where: {chatId, status: 0}, include: {all: true}});

        if (condidate) {
            return null;
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
            console.log(setdescription)
            if (setdescription) {
                const findeReception = await this.receptionRepository.findOne({where: {chatId}, order:[['id', 'DESC']], include: {all: true}});
                const Passport    = findeReception.passport || 0;
                const Phone       = findeReception.phone || 0;
                const Description = findeReception.description || 0;
                const Date        = findeReception.createdAt || 0;
                if (findeReception) {
                    const findUser = await this.userRepository.findOne({where: {districtId: findeReception.districtId}, order:[['id', 'DESC']], include: {all: true}});
                    const findDirector = await this.userRepository.findOne({where: {role: "Director"}, order:[['id', 'DESC']], include: {all: true}});
                    const findKansilyariya = await this.userRepository.findOne({where: {role: "Kansilyariya"}, order:[['id', 'DESC']], include: {all: true}});
                    if (findUser) {
                        const UserChatId = findUser.chatId;
                        const DirectorChatId = findDirector.chatId || 0;
                        const KansilyariyaChatId = findKansilyariya.chatId || 0;
                        const obj = {
                            passport: Passport,
                            phone: Phone,
                            description: Description,
                            userChatId: UserChatId,
                            directorChatId: DirectorChatId,
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

    async getHisobat(which: number, district:string, month: number, year: number) {

        if (which == 1) {

            const CountAppel = await this.appelRepository.count({where: {districtId: district}, include: {all: true}});
            return CountAppel;

        } else if (which == 2) {

            const CountReception = await this.receptionRepository.count({where: {districtId: district}, include: {all: true}});
            return CountReception;

        }

    }


}
