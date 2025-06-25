// Import EmailJS library
const emailjs = require("emailjs-com")

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: "service_neuwe88",
  templateId: "template_xr9mozn",
  publicKey: "PkdJgcdPVxft1urrI",
}

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

// Global Variables
let currentStep = 1
let selectedPackage = null
let formData = {
  phone: "",
  playerId: "",
  bank: "",
  holderPhone: "",
  holderCedula: "",
  paymentDate: "",
  reference: "",
  acceptTerms: false,
}

// Package Data
const packages = [
  {
    id: "1",
    title: "100 Diamantes + 10 Bono",
    price: "Bs 108",
    discount: "5% OFF",
    type: "diamond",
  },
  {
    id: "2",
    title: "310 Diamantes + 31 Bono",
    price: "Bs 331",
    discount: "5% OFF",
    popular: true,
    type: "diamond",
  },
  {
    id: "3",
    title: "520 Diamantes + 52 Bono",
    price: "Bs 544",
    discount: "5% OFF",
    type: "diamond",
  },
  {
    id: "4",
    title: "1060 Diamantes + 106 Bono",
    price: "Bs 1076",
    discount: "5% OFF",
    type: "diamond",
  },
  {
    id: "5",
    title: "2.180 Diamantes + 216 Bono",
    price: "Bs 2078",
    discount: "5% OFF",
    type: "diamond",
  },
  {
    id: "6",
    title: "5.600 Diamantes + 560 Bono",
    price: "Bs 4920",
    popular: true,
    type: "diamond",
  },
  {
    id: "7",
    title: "Tarjeta Básica",
    price: "Bs 88",
    type: "card",
  },
  {
    id: "8",
    title: "Tarjeta Mensual",
    price: "Bs 1554",
    type: "card",
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  generatePackages()
  setupEventListeners()
  updateProgress()
})

// Generate Package Cards
function generatePackages() {
  const grid = document.getElementById("packagesGrid")
  grid.innerHTML = ""

  packages.forEach((pkg) => {
    const card = document.createElement("div")
    card.className = "package-card"
    card.onclick = () => selectPackage(pkg)

    const icon = pkg.type === "diamond" ? "fas fa-gem" : "fas fa-credit-card"

    card.innerHTML = `
            ${pkg.popular ? '<div class="package-popular">Popular</div>' : ""}
            <div class="package-icon">
                <i class="${icon}"></i>
            </div>
            <div class="package-title">${pkg.title}</div>
            <div class="package-price">${pkg.price}</div>
            ${pkg.discount ? `<div class="package-discount">💰 ${pkg.discount}</div>` : ""}
        `

    grid.appendChild(card)
  })
}

// Select Package
function selectPackage(pkg) {
  selectedPackage = pkg

  // Update visual selection
  document.querySelectorAll(".package-card").forEach((card) => {
    card.classList.remove("selected")
  })
  event.currentTarget.classList.add("selected")

  // Update amount in step 3
  document.getElementById("amountValue").textContent = pkg.price
  document.getElementById("selectedPackageTitle").textContent = pkg.title

  // Auto advance to next step
  setTimeout(() => {
    nextStep()
  }, 500)
}

// Setup Event Listeners
function setupEventListeners() {
  // User Data Form
  document.getElementById("userDataForm").addEventListener("submit", (e) => {
    e.preventDefault()

    formData.phone = document.getElementById("phone").value
    formData.playerId = document.getElementById("playerId").value

    if (formData.phone && formData.playerId) {
      nextStep()
    }
  })

  // Confirmation Form
  document.getElementById("confirmationForm").addEventListener("submit", (e) => {
    e.preventDefault()
    submitOrder()
  })

  // Set today's date as default
  document.getElementById("paymentDate").valueAsDate = new Date()
}

// Navigation Functions
function nextStep() {
  if (currentStep < 3) {
    currentStep++
    updateStepDisplay()
    updateProgress()
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--
    updateStepDisplay()
    updateProgress()
  }
}

function updateStepDisplay() {
  // Hide all step contents
  document.querySelectorAll(".step-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Show current step content
  document.getElementById(`content${currentStep}`).classList.add("active")
}

function updateProgress() {
  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const step = document.getElementById(`step${i}`)
    const line = document.getElementById(`line${i}`)

    if (i < currentStep) {
      step.classList.add("completed")
      step.classList.remove("active")
      if (line) line.classList.add("active")
    } else if (i === currentStep) {
      step.classList.add("active")
      step.classList.remove("completed")
    } else {
      step.classList.remove("active", "completed")
      if (line) line.classList.remove("active")
    }
  }
}

// Copy Functions
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Copiado al portapapeles")
    })
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    showToast("Copiado al portapapeles")
  }
}

function copyAllInfo() {
  const info = `RIF: J-502785477
Celular: 0412-6425335
Banco: 0102 BANCO DE VENEZUELA
Monto: ${selectedPackage?.price || "Bs 108"}`

  copyText(info)
}

// Toast Notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement("div")
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #059669;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `
  toast.textContent = message

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 3000)
}

// Modal Functions
function showTerms() {
  document.getElementById("termsModal").classList.add("show")
}

function closeTerms() {
  document.getElementById("termsModal").classList.remove("show")
}

function showSuccess() {
  document.getElementById("responsePhone").textContent = formData.phone
  document.getElementById("successModal").classList.add("show")
}

function closeSuccess() {
  document.getElementById("successModal").classList.remove("show")
  resetForm()
}

function showLoading() {
  document.getElementById("loadingOverlay").classList.add("show")
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.remove("show")
}

// Submit Order
async function submitOrder() {
  // Get form data
  formData.bank = document.getElementById("bank").value
  formData.holderCedula = document.getElementById("holderCedula").value
  formData.holderPhone = document.getElementById("holderPhone").value
  formData.paymentDate = document.getElementById("paymentDate").value
  formData.reference = document.getElementById("reference").value
  formData.acceptTerms = document.getElementById("acceptTerms").checked

  // Validate form
  if (!validateForm()) {
    return
  }

  showLoading()

  try {
    // Prepare email data
    const emailData = {
      package_title: selectedPackage.title,
      package_price: selectedPackage.price,
      user_phone: formData.phone,
      user_player_id: formData.playerId,
      payment_bank: formData.bank,
      holder_cedula: formData.holderCedula,
      holder_phone: formData.holderPhone,
      payment_date: formData.paymentDate,
      payment_reference: formData.reference,
      order_date: new Date().toLocaleString("es-VE"),
      to_email: "screcargas2024@gmail.com", // Cambiado a tu email
    }

    // Send email using EmailJS
    const response = await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, emailData)

    console.log("Email enviado exitosamente:", response)
    hideLoading()
    showSuccess()
  } catch (error) {
    console.error("Error al enviar email:", error)
    hideLoading()
    alert("Error al procesar el pedido. Por favor, inténtelo de nuevo.")
  }
}

// Validate Form
function validateForm() {
  const requiredFields = [
    { id: "bank", name: "Banco" },
    { id: "holderCedula", name: "Cédula" },
    { id: "holderPhone", name: "Teléfono" },
    { id: "paymentDate", name: "Fecha de Pago" },
    { id: "reference", name: "Referencia" },
  ]

  for (const field of requiredFields) {
    const element = document.getElementById(field.id)
    if (!element.value.trim()) {
      alert(`Por favor, complete el campo: ${field.name}`)
      element.focus()
      return false
    }
  }

  if (!document.getElementById("acceptTerms").checked) {
    alert("Debe aceptar los términos y condiciones")
    return false
  }

  return true
}

// Reset Form
function resetForm() {
  currentStep = 1
  selectedPackage = null
  formData = {
    phone: "",
    playerId: "",
    bank: "",
    holderPhone: "",
    holderCedula: "",
    paymentDate: "",
    reference: "",
    acceptTerms: false,
  }

  // Reset form fields
  document.querySelectorAll("input").forEach((input) => {
    if (input.type !== "date") {
      input.value = ""
    }
    if (input.type === "checkbox") {
      input.checked = false
    }
  })

  // Reset package selection
  document.querySelectorAll(".package-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Reset display
  updateStepDisplay()
  updateProgress()

  // Set today's date again
  document.getElementById("paymentDate").valueAsDate = new Date()
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show")
  }
})
