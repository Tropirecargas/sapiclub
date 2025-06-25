# Sapi Club - Sistema de Recargas

Sistema web para recargas de juegos con integración de EmailJS.

## 🚀 Características

- ✅ Diseño responsive (móvil y desktop)
- ✅ 3 pasos de proceso de compra
- ✅ Integración con EmailJS
- ✅ Términos y condiciones
- ✅ Notificaciones de éxito
- ✅ Copiar información de pago
- ✅ Validación de formularios

## 📧 Configuración de EmailJS

1. **Crea una cuenta en [EmailJS](https://www.emailjs.com/)**

2. **Configura tu servicio de email:**
   - Service ID: `service_neuwe88`
   - Template ID: `template_xr9mozn`
   - Public Key: `PkdJgcdPVxft1urrI`

3. **Crea un template en EmailJS con estas variables:**
   \`\`\`
   {{package_title}}
   {{package_price}}
   {{user_phone}}
   {{user_player_id}}
   {{payment_bank}}
   {{holder_cedula}}
   {{holder_phone}}
   {{payment_date}}
   {{payment_reference}}
   {{order_date}}
   \`\`\`

4. **Cambia el email de destino en `script.js`:**
   \`\`\`javascript
   to_email: 'tu-email@gmail.com' // Línea 280
   \`\`\`

## 🛠️ Instalación

1. **Descarga todos los archivos**
2. **Sube a tu servidor web o GitHub Pages**
3. **Abre `index.html` en tu navegador**

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Android (Chrome, Samsung Internet)
- ✅ iOS (Safari, Chrome)
- ✅ Responsive design

## 🔧 Personalización

### Cambiar paquetes:
Edita el array `packages` en `script.js` (línea 20)

### Cambiar información de pago:
Edita los valores en el HTML (líneas 200-220)

### Cambiar colores:
Modifica las variables CSS en `styles.css`

## 📞 Soporte

Para soporte técnico, contacta a través de los canales oficiales de Sapi Club.

---

**Última actualización:** Enero 2024
