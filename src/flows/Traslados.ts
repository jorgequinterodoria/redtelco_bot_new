import { addKeyword } from "@builderbot/bot"
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

export const Traslados = addKeyword<Provider, Database>(['menu', 'Menu', 'menú', 'Menú'])
    .addAnswer(`🙌 Este es nuestro menú de opciones, Elige la opción que deseas digitando el número de la opción`)
    .addAnswer(
        [
            '1️⃣ *Solicitud de servicio*',
            '2️⃣ *Soporte técnico*',
            '3️⃣ *Saldos y pagos*',
            '4️⃣ *Traslados*',
            '5️⃣ *Referidos*',
            '6️⃣ *Salir*',
        ],
        { capture: true },
    )
    .addAnswer(`Gracias por tu respuesta`,async (ctx, {gotoFlow})=> {
        const userAnswer = ctx.body
        if(userAnswer === 'A'){
            return gotoFlow(flowToA)
        } 
        if(userAnswer === 'B'){
            return gotoFlow(flowToB)
        } 
        if(userAnswer === 'C'){
            return gotoFlow(flowToC)
        } 
        return gotoFlow(flowDefault)

    })