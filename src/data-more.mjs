// Apps, galería de trabajo, industrias, descargas, FAQ y textos de portada. [inglés, español]

export const apps = [
  {
    slug: 'derate', name: 'DERATE', icon: 'derate-icon.webp', thumb: 'derate-thumb.webp',
    site: 'https://www.derate.app', appstore: 'https://apps.apple.com/app/id6804848638',
    status: 'appstore',
    desc: ['Photograph a truck dashboard or scanner and get the fault code cause, urgency and estimated cost.', 'Toma foto al tablero o al escáner del camión y recibe la causa del código de falla, la urgencia y el costo estimado.'],
    who: ['Truck drivers, owner-operators and diesel shops', 'Choferes, owner-operators y talleres diésel'],
  },
  {
    slug: 'paternoster', name: 'Paternoster', icon: 'paternoster-icon.webp', thumb: 'paternoster-thumb.webp',
    site: 'https://praypaternoster.com', appstore: 'https://apps.apple.com/app/id6824030168',
    status: 'appstore',
    desc: ['Pray and listen to the Our Father in five languages, with words that light up as they are spoken.', 'Reza y escucha el Padre Nuestro en cinco idiomas, con palabras que se iluminan al pronunciarse.'],
    who: ['Anyone who wants a daily prayer practice', 'Quien quiere una práctica diaria de oración'],
  },
  {
    slug: 'fresh-or-toss', name: 'Fresh or Toss', icon: 'freshortoss-icon.webp', thumb: 'freshortoss-thumb.webp',
    site: 'https://freshortoss.app', appstore: 'https://apps.apple.com/app/id6822062765',
    status: 'appstore',
    desc: ['Search any of 695 foods and see how long it lasts in the fridge, freezer or pantry, with a reminder before it runs out.', 'Busca entre 695 alimentos y ve cuánto duran en el refrigerador, congelador o alacena, con recordatorio antes de que se echen a perder.'],
    who: ['Every kitchen that hates wasting food', 'Toda cocina que odia tirar comida'],
  },
  {
    slug: 'casealerta', name: 'CaseAlerta', icon: 'casealerta-icon.webp', thumb: 'casealerta-thumb.webp',
    site: 'https://casealerta.com', status: 'web',
    desc: ['Plain-Spanish explanations of your USCIS case status, with alerts when it changes.', 'Explica en español claro el estatus de tu caso de USCIS y te avisa cuando cambia.'],
    who: ['People with a USCIS case, and employers who track petitions', 'Personas con un caso de USCIS y empleadores que siguen peticiones'],
  },
  {
    slug: 'recalert', name: 'Recalert', icon: 'recalert-icon.webp', thumb: 'recalert-thumb.webp',
    site: 'https://recalert.us', status: 'web',
    desc: ['Product recall lookup and nightly inventory checks for U.S. businesses, across CPSC, FSIS, NHTSA and FDA.', 'Búsqueda de retiros de producto y revisión nocturna de inventario para negocios en EE.UU., en CPSC, FSIS, NHTSA y FDA.'],
    who: ['Retailers, distributors and anyone who sells physical products', 'Tiendas, distribuidores y quien vende productos físicos'],
  },
  {
    slug: 'signatureforever', name: 'SignatureForever', icon: 'signatureforever-icon.svg', thumb: 'signatureforever-thumb.webp',
    site: 'https://signatureforever.com', status: 'web',
    desc: ['A polished email signature in about two minutes that looks the same in Gmail, Outlook and Apple Mail.', 'Una firma de correo profesional en unos dos minutos, que se ve igual en Gmail, Outlook y Apple Mail.'],
    who: ['Professionals and companies that manage team signatures', 'Profesionales y empresas que administran firmas de equipo'],
  },
  {
    slug: 'scorlee', name: 'Scorlee', icon: 'scorlee-icon.webp', thumb: 'scorlee-thumb.webp',
    site: 'https://scorlee.com', status: 'early',
    desc: ['Shows renters how many months of rent could count toward their credit. No SSN or bank needed to start.', 'Muestra a quien renta cuántos meses de renta podrían contar para su crédito. Sin SSN ni banco para empezar.'],
    who: ['Renters building their credit', 'Personas que rentan y construyen su crédito'],
  },
  {
    slug: 'bajabill', name: 'BajaBill', icon: 'bajabill-icon.webp', thumb: 'bajabill-thumb.webp',
    site: 'https://bajabill.com', status: 'waitlist',
    desc: ['AI review of hospital bills for overcharges, in Spanish and English, for Latino families in the U.S.', 'Revisión con IA de facturas de hospital para encontrar cobros de más, en español e inglés, para familias latinas en EE.UU.'],
    who: ['Families facing a hospital bill', 'Familias con una factura de hospital'],
  },
];

export const statusLabel = {
  appstore: ['Live on the App Store', 'En el App Store'],
  web: ['Live web app', 'App web en vivo'],
  early: ['Early access', 'Acceso temprano'],
  waitlist: ['Waitlist open', 'Lista de espera'],
};

// Galería de trabajo: arte real de las apps.
export const work = [
  {
    key: 'characters',
    title: ['Characters and mascots', 'Personajes y mascotas'],
    text: ['A product people remember has a face. We design the character, its moods and how it reacts inside the app.', 'Un producto que la gente recuerda tiene cara. Diseñamos el personaje, sus estados de ánimo y cómo reacciona dentro de la app.'],
    kind: 'square',
    items: [
      { img: 'scorlee-feliz', app: 'Scorlee', alt: ['Scorlee mascot holding a rising arrow', 'Mascota de Scorlee con una flecha que sube'] },
      { img: 'scorlee-celebrando', app: 'Scorlee', alt: ['Scorlee mascot celebrating with confetti', 'Mascota de Scorlee celebrando con confeti'] },
      { img: 'scorlee-pensando', app: 'Scorlee', alt: ['Scorlee mascot thinking', 'Mascota de Scorlee pensando'] },
      { img: 'freshie-fresh', app: 'Fresh or Toss', alt: ['Freshie the fridge, happy: food is fresh', 'Freshie el refri, feliz: la comida está fresca'] },
      { img: 'freshie-eat-soon', app: 'Fresh or Toss', alt: ['Freshie the fridge, nervous: eat it soon', 'Freshie el refri, nervioso: cómelo pronto'] },
      { img: 'freshie-frozen', app: 'Fresh or Toss', alt: ['Freshie the fridge, frozen', 'Freshie el refri, congelado'] },
    ],
  },
  {
    key: 'screens',
    title: ['App screens and store pages', 'Pantallas de app y páginas de tienda'],
    text: ['Every screen is designed to be understood in one look, in English and in Spanish. These are real screens from apps in production.', 'Cada pantalla se diseña para entenderse de un vistazo, en inglés y en español. Estas son pantallas reales de apps en producción.'],
    kind: 'phone',
    items: [
      { img: 'casealerta-screen-1', app: 'CaseAlerta', alt: ['CaseAlerta store screen: your immigration case, watched every day', 'Pantalla de tienda de CaseAlerta: tu caso migratorio, vigilado todos los días'] },
      { img: 'casealerta-screen-3', app: 'CaseAlerta', alt: ['CaseAlerta screen celebrating an approved case', 'Pantalla de CaseAlerta celebrando un caso aprobado'] },
      { img: 'freshortoss-home', app: 'Fresh or Toss', alt: ['Fresh or Toss home screen: what is in your hands?', 'Pantalla de inicio de Fresh or Toss: ¿qué tienes en las manos?'] },
      { img: 'freshortoss-result', app: 'Fresh or Toss', alt: ['Fresh or Toss result: 2 days left', 'Resultado de Fresh or Toss: quedan 2 días'] },
      { img: 'casealerta-screen-5', app: 'CaseAlerta', alt: ['CaseAlerta family dashboard', 'Tablero familiar de CaseAlerta'] },
      { img: 'freshortoss-search', app: 'Fresh or Toss', alt: ['Fresh or Toss food search', 'Búsqueda de alimentos en Fresh or Toss'] },
    ],
  },
  {
    key: 'paywalls',
    title: ['Paywalls and onboarding', 'Paywalls y bienvenida'],
    text: ['The screen where a visitor decides to pay. We write it plainly: what you get, what it costs, how to leave. No tricks.', 'La pantalla donde un visitante decide pagar. La escribimos claro: qué recibes, cuánto cuesta, cómo salir. Sin trucos.'],
    kind: 'phone',
    items: [
      { img: 'casealerta-paywall', app: 'CaseAlerta', alt: ['CaseAlerta paywall: your case watched every day, with plan button', 'Paywall de CaseAlerta: tu caso vigilado todos los días, con botón de planes'] },
      { img: 'casealerta-screen-2', app: 'CaseAlerta', alt: ['CaseAlerta onboarding: your case changed, you know first', 'Bienvenida de CaseAlerta: tu caso cambió, tú lo sabes primero'] },
      { img: 'freshortoss-setup', app: 'Fresh or Toss', alt: ['Fresh or Toss three-tap setup', 'Configuración en tres toques de Fresh or Toss'] },
      { img: 'casealerta-screen-4', app: 'CaseAlerta', alt: ['CaseAlerta: we tell you what it means', 'CaseAlerta: te decimos qué significa'] },
    ],
  },
  {
    key: 'scenes',
    title: ['Scenes and illustration', 'Escenas e ilustración'],
    text: ['Full-screen art made for the product, not pulled from a stock library.', 'Arte a pantalla completa hecho para el producto, no sacado de un banco de imágenes.'],
    kind: 'phone',
    items: [
      { img: 'paternoster-amanecer', app: 'Paternoster', alt: ['Paternoster scene: cross of light at dawn above the clouds', 'Escena de Paternoster: cruz de luz al amanecer sobre las nubes'] },
      { img: 'paternoster-vitral', app: 'Paternoster', alt: ['Paternoster scene: stained glass with a cross of light', 'Escena de Paternoster: vitral con cruz de luz'] },
      { img: 'paternoster-oro', app: 'Paternoster', alt: ['Paternoster scene: engraved golden cross', 'Escena de Paternoster: cruz dorada grabada'] },
      { img: 'paternoster-noche', app: 'Paternoster', alt: ['Paternoster scene: cross of light under the night sky', 'Escena de Paternoster: cruz de luz bajo el cielo nocturno'] },
      { img: 'paternoster-vela', app: 'Paternoster', alt: ['Paternoster scene: candle before a cross', 'Escena de Paternoster: vela frente a una cruz'] },
    ],
  },
];

export const industries = [
  {
    slug: 'auto-diesel-repair', icon: 'wrench',
    name: ['Auto and diesel repair shops', 'Talleres mecánicos y diésel'],
    desc: ['AI agents for repair shops: answer calls while you are under the hood, book jobs, send quotes and remind customers to pay.', 'Agentes de IA para talleres: contestan mientras estás bajo el cofre, agendan trabajos, mandan cotizaciones y recuerdan pagos.'],
    pain: ['The phone rings while everyone has their hands in an engine. The caller wants a price and a time, and calls the next shop if nobody answers.', 'El teléfono suena mientras todos tienen las manos en un motor. El cliente quiere precio y fecha, y le marca al siguiente taller si nadie contesta.'],
    fits: ['ai-receptionist', 'quote-follow-up-agent', 'appointment-agent', 'collections-agent'],
  },
  {
    slug: 'dental-medical-clinics', icon: 'cross',
    name: ['Dental and medical clinics', 'Clínicas dentales y médicas'],
    desc: ['AI agents for clinics: book and confirm appointments by phone and text, reduce no-shows and answer in English and Spanish.', 'Agentes de IA para clínicas: agendan y confirman citas por teléfono y mensaje, reducen ausencias y contestan en inglés y español.'],
    pain: ['The front desk spends the day booking, confirming and rescheduling. Every missed appointment is an empty chair.', 'La recepción pasa el día agendando, confirmando y reagendando. Cada cita perdida es un sillón vacío.'],
    fits: ['appointment-agent', 'ai-receptionist', 'website-assistant'],
    note: ['The agents handle scheduling and general questions. They do not give medical advice, and we scope what patient information they touch before setup.', 'Los agentes manejan citas y preguntas generales. No dan consejo médico, y antes de instalar definimos qué información de pacientes tocan.'],
  },
  {
    slug: 'contractors', icon: 'hardhat',
    name: ['Contractors: HVAC, plumbing, electrical', 'Contratistas: A/C, plomería, electricidad'],
    desc: ['AI agents for contractors: answer emergency calls at any hour, book visits, send quotes and follow up on every estimate.', 'Agentes de IA para contratistas: contestan urgencias a cualquier hora, agendan visitas, mandan cotizaciones y dan seguimiento.'],
    pain: ['The best jobs call when you are on a roof or under a sink. An estimate that nobody follows up on is work you already did for free.', 'Los mejores trabajos llaman cuando estás en un techo o bajo un fregadero. Un presupuesto sin seguimiento es trabajo que ya hiciste gratis.'],
    fits: ['ai-receptionist', 'quote-follow-up-agent', 'appointment-agent'],
  },
  {
    slug: 'law-firms', icon: 'scale',
    name: ['Law firms', 'Despachos de abogados'],
    desc: ['AI agents for law firms: bilingual intake by phone and web, appointment booking and a site AI assistants can read and cite.', 'Agentes de IA para despachos: recepción bilingüe por teléfono y web, citas y un sitio que los asistentes de IA pueden leer y citar.'],
    pain: ['A person looking for a lawyer calls several firms in a row. The first one that answers, in their language, usually gets the consultation.', 'Quien busca abogado llama a varios despachos seguidos. El primero que contesta, en su idioma, casi siempre se queda la consulta.'],
    fits: ['ai-receptionist', 'website-assistant', 'ai-visibility'],
    note: ['The agents collect contact details and book consultations. They do not give legal advice.', 'Los agentes toman datos de contacto y agendan consultas. No dan asesoría legal.'],
  },
  {
    slug: 'retail-hardware', icon: 'store',
    name: ['Retail and hardware stores', 'Tiendas y ferreterías'],
    desc: ['AI agents and software for retail: answer stock and price questions, quote by message and keep inventory under control.', 'Agentes de IA y software para tiendas: responden existencias y precios, cotizan por mensaje y mantienen el inventario bajo control.'],
    pain: ['Half the calls ask the same two things: do you have it, and how much. Staff leave the counter to answer them.', 'La mitad de las llamadas preguntan lo mismo: ¿lo tienes? y ¿cuánto cuesta? El personal deja el mostrador para contestarlas.'],
    fits: ['website-assistant', 'ai-receptionist', 'quote-follow-up-agent', 'ai-ready-websites'],
  },
  {
    slug: 'distribution-wholesale', icon: 'boxes',
    name: ['Distribution and wholesale', 'Distribución y mayoreo'],
    desc: ['AI agents and software for distributors: quote faster, follow up on every order and remind customers about open invoices.', 'Agentes de IA y software para distribuidores: cotizan más rápido, dan seguimiento a cada pedido y recuerdan facturas abiertas.'],
    pain: ['Quotes wait in an inbox, and open invoices wait for someone to make an uncomfortable call.', 'Las cotizaciones esperan en una bandeja, y las facturas abiertas esperan a que alguien haga una llamada incómoda.'],
    fits: ['quote-follow-up-agent', 'collections-agent', 'agent-ready-websites'],
  },
];

export const templates = [
  { icon: 'boxes', name: ['Inventory Control Dashboard', 'Tablero de Control de Inventario'], desc: ['Stock levels, reorder points and movement history in one screen.', 'Existencias, puntos de reorden e historial de movimientos en una pantalla.'], fmt: 'Excel · Google Sheets' },
  { icon: 'check', name: ['Quality Control Workbook', 'Libro de Control de Calidad'], desc: ['Inspection sheets, FMEA and corrective-action tracking built to audit standards.', 'Hojas de inspección, AMEF y seguimiento de acciones correctivas con estándar de auditoría.'], fmt: 'Excel' },
  { icon: 'board', name: ['Operations Workspace', 'Espacio de Operaciones'], desc: ['A Notion workspace for procedures, shift handoffs and daily task boards.', 'Espacio en Notion para procedimientos, entregas de turno y tableros diarios.'], fmt: 'Notion' },
  { icon: 'chart', name: ['Cash Flow Planner', 'Planeador de Flujo de Efectivo'], desc: ['A rolling 13-week cash forecast with receivables and payables built in.', 'Pronóstico de efectivo a 13 semanas con cuentas por cobrar y por pagar.'], fmt: 'Excel · Google Sheets' },
  { icon: 'store', name: ['Counter Sales POS', 'Punto de Venta de Mostrador'], desc: ['A web point of sale for hardware and parts counters with quick quoting.', 'Punto de venta web para mostradores de ferretería y refacciones con cotización rápida.'], fmt: 'Web' },
  { icon: 'truck', name: ['Fleet Maintenance Tracker', 'Control de Mantenimiento de Flota'], desc: ['Maintenance schedules, work orders and downtime cost per unit.', 'Programas de mantenimiento, órdenes de trabajo y costo de paro por unidad.'], fmt: 'Excel · Google Sheets' },
];

export const kits = [
  { slug: 'ai-playbook', icon: 'book', price: 37, name: ['AI for Small Business Playbook', 'Playbook de IA para Negocios'], desc: ['A bilingual guide: what to automate first, what to leave alone and how to measure it.', 'Guía bilingüe: qué automatizar primero, qué dejar en paz y cómo medirlo.'] },
  { slug: 'operations-prompts', icon: 'terminal', price: 47, name: ['150 Operations Prompts Library', 'Biblioteca de 150 Prompts de Operación'], desc: ['Ready-to-use prompts in English and Spanish for quoting, collecting, hiring, inventory and writing.', 'Prompts listos en inglés y español para cotizar, cobrar, reclutar, inventariar y redactar.'] },
  { slug: 'receptionist-diy-kit', icon: 'phone', price: 297, name: ['AI Receptionist DIY Kit', 'Kit Recepcionista IA: Hazlo Tú Mismo'], desc: ['A preconfigured voice agent, a bilingual script and step-by-step instructions to connect it to your number.', 'Agente de voz preconfigurado, guion bilingüe e instrucciones paso a paso para conectarlo a tu número.'] },
];

export const faq = [
  [['What does VARGERSOFT do?', '¿Qué hace VARGERSOFT?'], ['VARGERSOFT builds AI agents, apps and websites for small and mid-size businesses. The agents answer calls and messages, book appointments, send quotes and remind customers to pay, in English and Spanish. VARGERSOFT is the software division of VARGER Group LLC, in Conroe, Texas.', 'VARGERSOFT crea agentes de IA, apps y sitios web para pequeñas y medianas empresas. Los agentes contestan llamadas y mensajes, agendan citas, envían cotizaciones y recuerdan pagos, en inglés y español. VARGERSOFT es la división de software de VARGER Group LLC, en Conroe, Texas.']],
  [['How much does an AI agent cost?', '¿Cuánto cuesta un agente de IA?'], ['Each agent has a one-time setup fee and a monthly fee. The Website AI Assistant is $850 setup plus $179 a month. The AI Voice Receptionist is $1,950 setup plus $349 a month with 500 minutes included. Every price is on the AI Agents page.', 'Cada agente tiene un pago único de instalación y una mensualidad. El Asistente IA para tu Sitio cuesta $850 de instalación más $179 al mes. La Recepcionista de IA con Voz cuesta $1,950 de instalación más $349 al mes con 500 minutos incluidos. Todos los precios están en la página de Agentes IA.']],
  [['How long does setup take?', '¿Cuánto tarda la instalación?'], ['Seven business days for an AI agent, counted from the day we receive your business information and access to your calendar or phone line. Websites and custom software are quoted with their own timeline.', 'Siete días hábiles para un agente de IA, contados desde que recibimos la información de tu negocio y el acceso a tu calendario o línea. Los sitios web y el software a la medida se cotizan con su propio plazo.']],
  [['Do the agents really work in Spanish?', '¿Los agentes de verdad funcionan en español?'], ['Yes. Every agent works in English and Spanish. The phone receptionist detects the language the caller speaks and answers in it, and the chat assistant switches when the visitor does.', 'Sí. Todos los agentes funcionan en inglés y español. La recepcionista telefónica detecta el idioma de quien llama y contesta en ese idioma, y el asistente de chat cambia cuando el visitante cambia.']],
  [['Is there a long-term contract?', '¿Hay contrato a largo plazo?'], ['No. Service is month to month and you can cancel at any time. The setup fee is paid once.', 'No. El servicio es mes a mes y puedes cancelar cuando quieras. La instalación se paga una sola vez.']],
  [['Who owns my data?', '¿De quién son mis datos?'], ['You do. Call summaries, conversations, leads and content belong to your business, and you can export them when you ask. We do not sell customer data.', 'Tuyos. Los resúmenes de llamadas, conversaciones, prospectos y contenido son de tu negocio, y puedes exportarlos cuando lo pidas. No vendemos datos de clientes.']],
  [['Will my customers know they are talking to an AI?', '¿Mis clientes sabrán que hablan con una IA?'], ['Yes. The agents introduce themselves as virtual assistants. They sound natural, but we do not present them as people, and they transfer to a person when the customer asks.', 'Sí. Los agentes se presentan como asistentes virtuales. Suenan naturales, pero no los presentamos como personas, y transfieren a una persona cuando el cliente lo pide.']],
  [['What happens when the agent does not know an answer?', '¿Qué pasa cuando el agente no sabe una respuesta?'], ['It says so, takes the customer\'s details and sends them to you. The agents answer from information you approve and do not invent prices or policies.', 'Lo dice, toma los datos del cliente y te los envía. Los agentes responden con información que tú apruebas y no inventan precios ni políticas.']],
  [['Can you work with the phone number and website I already have?', '¿Trabajan con el número y el sitio que ya tengo?'], ['Yes. You keep your number and forward calls to the agent. The chat assistant installs on WordPress, Wix, Shopify, Hostinger and custom sites.', 'Sí. Conservas tu número y desvías las llamadas al agente. El asistente de chat se instala en WordPress, Wix, Shopify, Hostinger y sitios a la medida.']],
  [['What is GEO, and is it different from SEO?', '¿Qué es GEO y en qué se diferencia del SEO?'], ['SEO helps your pages rank in search results. GEO, generative engine optimization, helps AI assistants such as ChatGPT, Claude and Perplexity read and cite your business in their answers. GEO builds on good SEO and adds answer-first writing and structured data.', 'El SEO ayuda a que tus páginas aparezcan en los resultados de búsqueda. GEO, optimización para motores generativos, ayuda a que asistentes de IA como ChatGPT, Claude y Perplexity lean y citen tu negocio en sus respuestas. GEO se construye sobre un buen SEO y agrega redacción de respuesta directa y datos estructurados.']],
  [['Do you build custom software and apps too?', '¿También hacen software y apps a la medida?'], ['Yes. We build custom business apps, dashboards and mobile apps at a fixed price agreed before work starts. The Apps page shows products we built and run ourselves.', 'Sí. Hacemos apps de negocio, tableros y apps móviles a precio fijo acordado antes de empezar. La página de Apps muestra productos que construimos y operamos nosotros.']],
  [['Where are you located, and who do you serve?', '¿Dónde están y a quién atienden?'], ['We are based in Texas and work remotely with businesses in all 50 states, in English and Spanish. Setup, support and monthly reviews happen online, so your location does not matter.', 'Estamos en Texas y trabajamos a distancia con negocios de los 50 estados, en inglés y español. La instalación, el soporte y las revisiones mensuales son en línea, así que tu ubicación no importa.']],
  [['How do I get started?', '¿Cómo empiezo?'], ['Send a message from the Contact page or write to sales@vargersoft.com. We reply within one business day and start with a free 20-minute call about your operation.', 'Envía un mensaje desde la página de Contacto o escribe a sales@vargersoft.com. Respondemos en un día hábil y empezamos con una llamada gratis de 20 minutos sobre tu operación.']],
];

export const home = {
  title: ['AI Voice Receptionist and AI Agents for Business | VARGERSOFT', 'Recepcionista de IA con Voz y Agentes de IA | VARGERSOFT'],
  desc: ['AI voice receptionist that answers your calls 24/7 in English and Spanish, plus AI agents and AI-ready websites. VARGERSOFT builds bilingual AI agents, apps and AI-ready websites for small and mid-size businesses across the United States. Fixed prices, setup in 7 business days.', 'Recepcionista de IA con voz que contesta tus llamadas 24/7 en inglés y español, más agentes de IA y sitios listos para IA. VARGERSOFT crea agentes de IA bilingües, apps y sitios web listos para IA para pequeñas y medianas empresas en todo Estados Unidos. Precios fijos, instalación en 7 días hábiles.'],
  h1a: ['Smart software.', 'Software inteligente.'],
  h1b: ['Real business.', 'Negocio real.'],
  sub: ['AI agents, apps and websites built by engineers who have actually run operations.', 'Agentes de IA, apps y sitios web hechos por ingenieros que sí han operado negocios.'],
  strap: ['English / Spanish. US company. Fixed-price projects.', 'Inglés / Español. Empresa de EE.UU. Proyectos a precio fijo.'],
  dock: ['Apps we built. Tap an icon to open it.', 'Apps que construimos. Toca un ícono para abrirla.'],
  agentsEyebrow: ['AI agents', 'Agentes IA'],
  agentsTitle: ['AI agents that answer your customers', 'Agentes de IA que atienden a tus clientes'],
  agentsText: ['Eight services that answer calls and chats, book, quote, follow up and make your business readable to AI. In English and Spanish, set up in 7 business days.', 'Ocho servicios que contestan llamadas y chats, agendan, cotizan, dan seguimiento y hacen tu negocio legible para la IA. En inglés y español, instalados en 7 días hábiles.'],
  workEyebrow: ['Our work', 'Nuestro trabajo'],
  workTitle: ['Built in the VARGER factory', 'Hecho en la fábrica VARGER'],
  workText: ['We do not show mockups. This is art and product from apps we designed, built and run ourselves.', 'No mostramos maquetas. Esto es arte y producto de apps que diseñamos, construimos y operamos nosotros.'],
  workCta: ['See the full gallery', 'Ver la galería completa'],
  appsEyebrow: ['Apps', 'Apps'],
  appsTitle: ['Apps we built', 'Apps que construimos'],
  appsText: ['Each app has its own website. Open it to learn more and download.', 'Cada app tiene su propio sitio. Ábrelo para conocerla y descargarla.'],
  whatEyebrow: ['What we do', 'Qué hacemos'],
  whatTitle: ['Software that pays for itself', 'Software que se paga solo'],
  what: [
    { icon: 'bot', href: '/ai/', title: ['AI agents', 'Agentes de IA'], text: ['Answer calls and messages, book, quote and follow up, in English and Spanish.', 'Contestan llamadas y mensajes, agendan, cotizan y dan seguimiento, en inglés y español.'] },
    { icon: 'app', href: '/work/', title: ['Apps and custom software', 'Apps y software a la medida'], text: ['Mobile apps, dashboards, POS and inventory built around how your company already works.', 'Apps móviles, tableros, punto de venta e inventario hechos a la medida de cómo ya trabaja tu empresa.'] },
    { icon: 'browser', href: '/ai/ai-ready-websites/', title: ['AI-ready websites', 'Sitios web listos para IA'], text: ['Websites Google and AI assistants can read, page by page, in two languages.', 'Sitios que Google y los asistentes de IA pueden leer, página por página, en dos idiomas.'] },
    { icon: 'sheet', href: '/downloads/', title: ['Templates and kits', 'Plantillas y kits'], text: ['Excel, Google Sheets and Notion tools you can use the same day.', 'Herramientas en Excel, Google Sheets y Notion que puedes usar el mismo día.'] },
  ],
  whyEyebrow: ['Why VARGERSOFT', 'Por qué VARGERSOFT'],
  whyTitle: ['Engineers who have run the floor', 'Ingenieros que han operado el piso'],
  why: [
    { icon: 'gear', title: ['24 years in operations', '24 años en operación'], text: ['Engineering and multi-location operations experience behind every build.', 'Experiencia de ingeniería y operación multi-sucursal detrás de cada proyecto.'] },
    { icon: 'check', title: ['Automotive quality discipline', 'Disciplina de calidad automotriz'], text: ['APQP, FMEA and ISO/TS methods applied to software specs, testing and documentation.', 'Métodos APQP, AMEF e ISO/TS aplicados a especificaciones, pruebas y documentación de software.'] },
    { icon: 'globe', title: ['US company, bilingual team', 'Empresa de EE.UU., equipo bilingüe'], text: ['A Texas company that supports your team in English and Spanish, in your time zone.', 'Una empresa de Texas que atiende a tu equipo en inglés y español, en tu horario.'] },
    { icon: 'tag', title: ['Fixed price, weeks not months', 'Precio fijo, semanas y no meses'], text: ['You approve a scope and a number up front. No open-ended hourly bills.', 'Apruebas un alcance y un número desde el inicio. Sin cuentas abiertas por hora.'] },
  ],
  processEyebrow: ['Process', 'Proceso'],
  processTitle: ['Four steps, no mystery', 'Cuatro pasos, sin misterio'],
  process: [
    { title: ['Discovery call', 'Llamada de diagnóstico'], text: ['Twenty minutes about your operation, the bottleneck and the goal.', 'Veinte minutos sobre tu operación, el cuello de botella y la meta.'] },
    { title: ['Blueprint and fixed quote', 'Plano y cotización fija'], text: ['A written scope, timeline and one fixed price.', 'Alcance por escrito, plazo y un solo precio fijo.'] },
    { title: ['Build and test', 'Construcción y prueba'], text: ['You see it working before it goes live, and adjust.', 'Lo ves funcionando antes de salir en vivo, y ajustas.'] },
    { title: ['Launch and support', 'Lanzamiento y soporte'], text: ['We train your team, go live and stay available for changes.', 'Capacitamos a tu equipo, salimos en vivo y seguimos disponibles para cambios.'] },
  ],
  trackEyebrow: ['Track record', 'Trayectoria'],
  trackTitle: ['The company is new. The work is not.', 'La empresa es nueva. El oficio no.'],
  trackText: ['VARGER Group LLC was formed in Texas in 2026. The team behind it has engineered processes and run operating businesses since 2002: eight years in automotive quality engineering on OEM programs for GM, Ford, Volvo, Nissan and Stellantis, and more than fifteen years building and running retail, manufacturing and service companies.', 'VARGER Group LLC se constituyó en Texas en 2026. El equipo detrás lleva desde 2002 haciendo ingeniería de procesos y operando negocios: ocho años en ingeniería de calidad automotriz en programas OEM para GM, Ford, Volvo, Nissan y Stellantis, y más de quince años construyendo y operando empresas de retail, manufactura y servicio.'],
  numbers: [
    { n: 24, label: ['years of experience', 'años de experiencia'] },
    { n: 7, label: ['locations built and run', 'sucursales construidas y operadas'] },
    { n: 70, suffix: '+', label: ['people managed', 'personas gestionadas'] },
    { n: 2, label: ['languages in every product', 'idiomas en cada producto'] },
  ],
  indEyebrow: ['Industries', 'Industrias'],
  indTitle: ['Where we work', 'Dónde trabajamos'],
  tplEyebrow: ['Templates', 'Plantillas'],
  tplTitle: ['Tools you can use the same day', 'Herramientas que usas el mismo día'],
  guidesEyebrow: ['Resources', 'Recursos'],
  guidesTitle: ['Plain answers about AI for business', 'Respuestas claras sobre IA para negocios'],
  faqTitle: ['Straight answers', 'Respuestas directas'],
  contactEyebrow: ['Contact', 'Contacto'],
  contactTitle: ['Tell us what is slowing you down', 'Cuéntanos qué te está frenando'],
  contactText: ['We reply within one business day, in English or Spanish.', 'Respondemos en un día hábil, en inglés o español.'],
};
