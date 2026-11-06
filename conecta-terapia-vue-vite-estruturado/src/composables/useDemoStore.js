
import { ref, reactive, computed, watch, nextTick } from 'vue'
const defaults = { name: 'Ana Martins', role: 'Psicanalista • Atendimento individual', bio: 'Acredito na potência da escuta e no respeito ao tempo de cada pessoa. Ofereço um espaço acolhedor e comprometido com a singularidade de cada trajetória.' }
const storageKey = 'conectaterapia_demo_v1'
let stored = {}
try { stored = JSON.parse(localStorage.getItem(storageKey) || '{}') || {} } catch { /* dados antigos inválidos */ }
const profile = reactive({ ...defaults, ...(stored.profile || {}) })
const appointments = ref(Array.isArray(stored.appointments) ? stored.appointments : [])
const payments = ref(Array.isArray(stored.payments) ? stored.payments : [])
const booking = reactive({ name: '', contact: '', date: '', hour: '09:00' })
const payment = reactive({ description: '', value: '' })
const bookingMessage = ref('')
const saveMessage = ref('')
const page = ref(location.hash === '#dashboard' ? 'dashboard' : location.hash === '#profile' ? 'profile' : 'home')
const tab = ref('overview')
const initials = computed(() => profile.name.trim().split(/\s+/).slice(0,2).map(x => x[0] || '').join('').toUpperCase())
const firstName = computed(() => profile.name.trim().split(/\s+/)[0] || 'Profissional')
const reversedAppointments = computed(() => [...appointments.value].reverse())
const reversedPayments = computed(() => [...payments.value].reverse())
const uniqueClients = computed(() => [...new Map(appointments.value.map(a => [a.contact.toLowerCase(), a])).values()])
const revenue = computed(() => payments.value.reduce((sum,p) => sum + Number(p.value), 0))
const money = value => Number(value).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})
const today = new Date().toLocaleDateString('en-CA')
function persist() { localStorage.setItem(storageKey, JSON.stringify({profile,appointments:appointments.value,payments:payments.value})) }
watch([profile,appointments,payments], persist, {deep:true})
function route(target) { page.value = target; location.hash = target === 'home' ? 'inicio' : target; window.scrollTo(0,0) }
window.addEventListener('hashchange', () => { page.value = location.hash === '#dashboard' ? 'dashboard' : location.hash === '#profile' ? 'profile' : 'home' })
async function scrollBooking() { await nextTick(); document.getElementById('booking')?.scrollIntoView({behavior:'smooth'}) }
function book() {
 if (!booking.name.trim() || !booking.contact.trim() || !booking.date) return
 if (booking.date < today) { bookingMessage.value = 'Escolha uma data futura.'; return }
 appointments.value.push({name:booking.name.trim(),contact:booking.contact.trim(),date:booking.date,hour:booking.hour})
 Object.assign(booking,{name:'',contact:'',date:'',hour:'09:00'})
 bookingMessage.value = 'Solicitação registrada nesta demonstração! O horário ainda não está confirmado.'
}
function addPayment() {
 const value = Number(payment.value)
 if (!payment.description.trim() || !Number.isFinite(value) || value <= 0) return
 payments.value.push({description:payment.description.trim(),value})
 Object.assign(payment,{description:'',value:''})
}
function saveProfile() {
 if (!profile.name.trim() || !profile.role.trim() || !profile.bio.trim()) return
 persist(); saveMessage.value = 'Perfil atualizado! Abra a página pública para conferir.'
}

export function useDemoStore() { return {profile,appointments,payments,booking,payment,bookingMessage,saveMessage,page,tab,initials,firstName,reversedAppointments,reversedPayments,uniqueClients,revenue,money,today,route,scrollBooking,book,addPayment,saveProfile} }
