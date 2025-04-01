import { addKeyword } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { Menu } from './Menu'


export const Inicio = addKeyword<Provider, Database>(['hi', 'hello', 'hola'])
    .addAnswer(`🙌 Hola, bienvenido a  *Redtelco*`)
    .addAnswer(
        [
            'Para iniciar, escriba la palabra *menu* para ver el menu de opciones',
        ].join('\n'),
        { delay: 800, capture: true },
        async (ctx, { fallBack }) => {
            if (!ctx.body.toLocaleLowerCase().includes('menu')) {
                return fallBack('debes escribir  *menu*')
            }
            return
        },
        [Menu]
    )