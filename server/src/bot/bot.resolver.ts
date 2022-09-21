import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { BotService } from "./bot.service";
import { createTelegramMember } from './dto/telegram.dto';


@Resolver(() => createTelegramMember)
export class BotResolver {

    constructor(private botService: BotService ) {}

    @Mutation(returns => createTelegramMember)
    findAll(which: number, district:string, month: number, year: number) {
        return this.botService.getHisobat(which, district, month, year)
    }


}