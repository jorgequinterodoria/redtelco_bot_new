import { addKeyword } from "@builderbot/bot"
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { SolicitudServicio } from "./SolicitudServicio"
import { SoporteTecnico } from "./SoporteTecnico"
import { SaldosYPagos } from "./Saldos_y_pagos"
import { Traslados } from "./traslados"
import { Referidos } from "./Referidos"
import {Inicio} from "./Inicio"

export const Menu = addKeyword<Provider, Database>(['menu', 'Menu', 'menú', 'Menú'])
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
        if(userAnswer === '1'){
            return gotoFlow(SolicitudServicio)
        } 
        if(userAnswer === '2'){
            return gotoFlow(SoporteTecnico)
        } 
        if(userAnswer === '3'){
            return gotoFlow(SaldosYPagos)
        } 
        if(userAnswer === '4'){
            return gotoFlow(Traslados)
        } 
        if(userAnswer === '5'){
            return gotoFlow(Referidos)
        } 
        if(userAnswer === '6'){
            return gotoFlow(SaldosYPagos)
        } 
        return gotoFlow(Inicio)

    })