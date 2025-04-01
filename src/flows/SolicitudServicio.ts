import { addKeyword } from "@builderbot/bot"
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { ServicioInternet } from "./SolicitudServicios/ServicioInternet"
import { ServicioTv } from "./SolicitudServicios/ServicioTv"
import { Inicio } from "./Inicio"

export const SolicitudServicio = addKeyword<Provider, Database>(['menu', 'Menu', 'menú', 'Menú'])
    .addAnswer(`🙌 Este es nuestro menú de opciones, Elige la opción que deseas digitando el número de la opción`)
    .addAnswer(
        [
            '1️⃣ *Servicio de Internet*',
            '2️⃣ *Servicio de TV*',
            '3️⃣ *Regresar al menú anterior*',

        ],
        { capture: true },
    )
    .addAnswer(`Gracias por tu respuesta`,async (ctx, {gotoFlow})=> {
        const userAnswer = ctx.body
        if(userAnswer === '1'){
            return gotoFlow(ServicioInternet)
        } 
        if(userAnswer === '2'){
            return gotoFlow(ServicioTv)
        } 
        if(userAnswer === '3'){
            return gotoFlow(Inicio)
        } 
        return gotoFlow(Inicio)

    })