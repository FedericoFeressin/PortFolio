
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '7HJ3hjO_BwPmf6aU0',      // ✅ Tu PUBLIC_KEY
    SERVICE_ID: 'service_c2slqns',        // ✅ Tu SERVICE_ID
    TEMPLATE_ID: 'template_3qrac1s',      // ✅ Tu TEMPLATE_ID
    RECEIVER_EMAIL: 'fedeferessin2001@gmail.com'
};

// Log para verificar que config.js está cargado
console.log('✅ config.js cargado correctamente');
console.log('📋 EMAILJS_CONFIG:', {
    PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10) + '...',
    SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
    TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
    RECEIVER_EMAIL: EMAILJS_CONFIG.RECEIVER_EMAIL
});

// Exportar para uso en main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
