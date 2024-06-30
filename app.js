const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');

//BOTSF

const flowInfo = addKeyword(['1', 'catalogo', 'informacion'])
    .addAnswer([
        'Somos una tienda virtual ubicada en Pérez Zeledón y hacemos envíos a TODO el país🇨🇷',
        '\nSi quieres ver el catálogo y/o comprar ingresa a nuestro sitio web www.sharefashioncr.com el cual estamos constantemente actualizando con nuevos ingresos✨',
        '\nPara apartados o dudas puntuales, contáctanos directamente.'
    ])
    .addAnswer([
        'Contamos con SISTEMA DE APARTADO de 1 mes con un monto mínimo de ₡2.000🛍️',
        '\nSíguenos en nuestro Instagram @sharefashionn'
    ])
    .addAnswer([
        'Puedes unirte a nuestro grupo en WhatsApp y ser la primera en darte cuenta de las nuevas colecciones; ofertas y más🛍️',
        'Ingresa aquí➡️ https://chat.whatsapp.com/GpgVBZkgKkDC1uDGc39E6L'
    ])
    .addAnswer([
        '*¿NECESITAS REALIZAR OTRA CONSULTA?*',
        '\nEscribe solo la palabra *Menu* y después ingresa alguna de las opciones'
    ]);


    const flowShein = addKeyword(['2', 'cotizar'])
    .addAnswer([
        'BAJO PEDIDO 🩷 CADA 15 DÍAS',
        '*PRÓXIMO: 07 DE JULIO*',
        '\n*¿Cómo trabajamos?*',
        'Te damos el precio final de cada artículo puesto en Costa Rica. Este precio incluye todos los impuestos para traer tu pedido de SHEIN desde China hasta Costa Rica.',
        '\n*¿Cómo son los pagos?*',
        'Solamente pagas el monto que te indicamos por tus artículos. Cuando llegue tu pedido al país (en 15-22 días), no tendrás que preocuparte por pagar nada más, solo el envío a tu casa.',
    ])
    .addAnswer('Envíanos los enlaces de cada artículo y nosotras te cotizamos ✨', { media: 'https://res.cloudinary.com/dqziikbnw/video/upload/v1715233519/TutorialShein_goqgyc.mp4' })
    .addAnswer('🚨*INFORMACIÓN IMPORTANTE*🚨', { media: 'https://res.cloudinary.com/dqziikbnw/image/upload/v1718603276/6408E736-777E-4469-9472-7A82C140A9F5_lipivi.png' })
    .addAnswer(['*¿NECESITAS REALIZAR OTRA CONSULTA?*',
        '\nEscribe solo la palabra *Menu* y después ingresa alguna de las opciones'])

const flowShipping = addKeyword(['3', 'envio', 'envío', 'tarifas'])
    .addAnswer('Adjuntamos nuestras tarifas de envío', { media: 'https://res.cloudinary.com/dqziikbnw/image/upload/v1715744969/tarifas_ujikk5.png' })
    .addAnswer(['*¿NECESITAS REALIZAR OTRA CONSULTA?*',
        '\nEscribe solo la palabra *Menu* y después ingresa alguna de las opciones'])

const flowAgent = addKeyword(['agente']).addAnswer('Puedes escribir tu consulta y un agente te dará una respuesta en las siguientes 24h en horario laboral. Gracias por tu espera y estamos para servirle!🥰');



const flowMain = addKeyword(['Hola', 'info', 'informacion', 'buenas', 'catalogo', 'fotos', 'publicacion', 'menu', 'menú', 'buenos'])
    .addAnswer('Gracias por comunicarte con Share Fashion🩷')
    .addAnswer([
        'Por favor digita la opción del menú que deseas conocer:',
        '1. Información de la tienda + Catálogo🩷',
        '2. ⁠Quiero informacion y/o cotizar una compra de SHEIN🛒',
        '3. Tarifas de envío 🚚',
        '\nO bien, si tu consulta es diferente al menú, escribe la palabra *Agente* para hablar con un agente de servicio'
    ], null, null, [flowInfo, flowShein, flowShipping, flowAgent]);

    const flowAudio = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('No recibimos audios ni llamadas, solamente mensajes de texto. Escribe *Menu* para realizar tu consulta')

const main = async () => {
    const adapterDB = new JsonFileAdapter();
    const adapterFlow = createFlow([flowMain, flowAudio]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
