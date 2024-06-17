const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');

//BOTSF

const flowInfo = addKeyword(['1', 'catalogo', 'informacion'])
    .addAnswer([
        'Somos una tienda virtual ubicada en Pérez Zeledón y hacemos envíos a TODO el país🇨🇷',
        '\nSi quieres ver el catálogo y/o comprar ingresa a nuestro sitio web www.sharefashioncr.com ✨',
        '\nSolo aceptamos compras a través de nuestra página web. Para apartados o dudas puntuales, contáctanos directamente.'
    ])
    .addAnswer([
        'Te adjuntamos un mini tutorial sobre cómo comprar en nuestra página web.'
    ], { media: 'https://res.cloudinary.com/dqziikbnw/video/upload/v1718605029/copy_63F581C9-BD4D-4CAA-ABD3-276686F27F13_-_Compressed_with_FlexClip_nhoyg7.mp4' })
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
        'BAJO PEDIDO 🩷 CADA 15 DIAS',
        '*PRÓXIMO: 23 DE JUNIO*',
        '\nAquí te explicamos cómo funciona nuestro servicio de manera sencilla:',
        '\n1. Costo por Peso: Cobramos ₡3.640 por cada libra de compra. Esto significa que puedes llenar hasta 1 libra con tus artículos favoritos de SHEIN por este precio. (Estos ₡3.640 incluyen los servicios de traerte tu pedido de China a Costa Rica)',
        '\n2. Dos Pagos: Primero pagas el pedido completo (los artículos). Cuando llegue a nuestro país (15-22 días), pagas el peso de tu compra más el envío a tu casa.',
    ])
    .addAnswer('Solamente nos envías los enlaces de cada artículo y nosotras te cotizamos ✨', { media: 'https://res.cloudinary.com/dqziikbnw/video/upload/v1715233519/TutorialShein_goqgyc.mp4' })
    .addAnswer('🚨*INFORMACIÓN IMPORTANTE*🚨', { media: 'https://res.cloudinary.com/dqziikbnw/image/upload/v1718603276/6408E736-777E-4469-9472-7A82C140A9F5_lipivi.png' })
    .addAnswer(['*¿NECESITAS REALIZAR OTRA CONSULTA?*',
        '\nEscribe solo la palabra *Menu* y después ingresa alguna de las opciones'])

const flowShipping = addKeyword(['3', 'envio', 'envío', 'tarifas'])
    .addAnswer('Adjuntamos nuestras tarifas de envío', { media: 'https://res.cloudinary.com/dqziikbnw/image/upload/v1715744969/tarifas_ujikk5.png' })
    .addAnswer(['*¿NECESITAS REALIZAR OTRA CONSULTA?*',
        '\nEscribe solo la palabra *Menu* y después ingresa alguna de las opciones'])

const flowAgent = addKeyword(['agente']).addAnswer('Puedes escribir tu consulta y un agente te dará respuesta en horario de 4pm a 6pm. Gracias por tu espera y estamos para servirle!🥰');



const flowMain = addKeyword(['Hola', 'info', 'informacion', 'buenas', 'catalogo', 'fotos', 'publicacion', 'menu', 'menú'])
    .addAnswer('Gracias por comunicarte con Share Fashion🩷')
    .addAnswer([
        'Por favor digita la opción del menú que deseas conocer:',
        '1. Información + Catálogo🩷',
        '2. ⁠Quiero cotizar una compra SHEIN🛒',
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
