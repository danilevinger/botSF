const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');



const flowInfo = addKeyword(['1', 'catalogo', 'informacion', 'info'])
.addAnswer([
    'Somos una tienda virtual ubicada en Pérez Zeledón y hacemos envíos a todo el país🇨🇷',
    '\nTodo está para entrega inmediata ✨',
    '\nCATÁLOGO ➡️ bit.ly/sharefashion',
    
])
    .addAnswer([
    'Contamos con SISTEMA DE APARTADO de 1 mes con un monto mínimo de ₡2.000🛍️',
    '\nNos puedes consultar sin ningún compromiso por este medio o nuestro Instagram @sharefashionn',


    ])
    .addAnswer([
        'Puedes unirte a nuestro grupo en WhatsApp y ser la primera en darte cuenta de las nuevas colecciones; ofertas y más🛍️',
        'Ingresa aquí➡️ https://chat.whatsapp.com/GpgVBZkgKkDC1uDGc39E6L',
        '\nEscribe *Menu* para regresar al menu inicial'
        ]);



const flowShein = addKeyword(['2', 'cotizar'])
    .addAnswer([
        'BAJO PEDIDO🩷 ',
        '\nAquí te explicamos cómo funciona nuestro servicio de manera sencilla:',
        '\n1. Costo por Peso: Cobramos ₡3.640 por cada libra de compra. Esto significa que puedes llenar hasta 1 libra con tus artículos favoritos de SHEIN por este precio. (Estos ₡3.640 incluyen los servicios de traerte tu pedido de China a Costa Rica)',
        '\n2. Dos Pagos: Primero pagas el pedido completo (los artículos). Cuando llegue a nuestro país (15-22 días), pagas el peso de tu compra más el envío a tu casa.',
    ])
    .addAnswer('Solamente nos envías los enlaces de cada artículo y nosotras te cotizamos ✨', {media: 'https://res.cloudinary.com/dqziikbnw/video/upload/v1715233519/TutorialShein_goqgyc.mp4'})
    .addAnswer('Escribe *Menu* para regresar al menu inicial')

const flowShipping = addKeyword(['3', 'envio', 'tarifas']).addAnswer([
    'TARIFAS DE ENVIO📦✨',
    '\n📍Pérez Zeledón: ₡300',
    '\n💌Correos de Costa Rica',
    'GAM: ₡2.700',
    'Resto del país: ₡3.400',
    '\n✨Musoc SJ: ₡1.800',
    '✨Gafeso Buenos Aires: ₡1.400'
])    
.addAnswer('Escribe *Menu* para regresar al menu inicial')

const flowAgent = addKeyword(['agente']).addAnswer('Puedes escribir tu consulta y un agente te dará respuesta en horario de 4pm a 6pm. Gracias por tu espera y estamos para servirle!🥰');



const flowMain = addKeyword(['Hola', 'info', 'informacion', 'buenas', 'catalogo', 'holi', 'precios', 'como','foto','prenda', 'ropa', 'interesa', 'fotos', 'publicacion', 'menu'])
    .addAnswer('Gracias por comunicarte con Share Fashion🩷')
    .addAnswer([
        'Por favor digita la opción del menú que deseas conocer:',
        '1. Información + Catálogo🩷',
        '2. ⁠Quiero cotizar una compra SHEIN🛒',
        '3. Tarifas de envío 🚚',
        '\nO bien, si tu consulta es diferente al menú, escribe la palabra *Agente* para hablar con un agente de servicio'
    ], null, null, [flowInfo, flowShein, flowShipping, flowAgent]);

const main = async () => {
    const adapterDB = new JsonFileAdapter();
    const adapterFlow = createFlow([flowMain]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
