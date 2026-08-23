import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"calendar" | "form" | "success">("calendar");

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    package: 'cumple_resuelto',
    guests: '30',
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Fetch booked dates for the current month
  useEffect(() => {
    async function fetchBookings() {
      const q = query(
        collection(db, "reservations"),
        where("date", ">=", startOfDay(monthStart)),
        where("date", "<=", startOfDay(monthEnd))
      );
      const snapshot = await getDocs(q);
      const dates = snapshot.docs.map(doc => doc.data().date.toDate());
      setBookedDates(dates);
    }
    fetchBookings();
  }, [currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => {
    if (!isBefore(subMonths(currentDate, 1), startOfMonth(new Date()))) {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const isBooked = (day: Date) => bookedDates.some(booked => isSameDay(booked, day));
  const isPast = (day: Date) => isBefore(startOfDay(day), startOfDay(new Date()));

  const handleDateSelect = (day: Date) => {
    if (isBooked(day) || isPast(day)) return;
    setSelectedDate(day);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        ...formData,
        date: Timestamp.fromDate(startOfDay(selectedDate)),
        status: 'pending_payment',
        createdAt: Timestamp.now()
      });
      setStep("success");
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Hubo un error al procesar la reserva. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="reservas" className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[8px] border-white relative max-w-4xl mx-auto z-10 text-[#2A1654]">
      {/* Inner decorative border for collage effect */}
      <div className="absolute inset-3 border-4 border-dashed border-gray-200 rounded-[2.5rem] pointer-events-none z-0"></div>
      
      <div className="relative z-10 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-b from-[#42baea] to-[#2b9bc9] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white shrink-0">
              <Calendar className="w-8 h-8 drop-shadow-md" />
            </div>
            <div>
              <h2 className="text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#2A1654] to-[#1E0F3D]">Reservá tu Fecha</h2>
              <p className="text-gray-500 text-sm mt-1 font-bold tracking-wide">Seleccioná un día disponible en el calendario</p>
            </div>
          </div>
          {step === "calendar" && (
            <div className="text-left sm:text-right">
              <span className="text-xs font-black text-white block uppercase tracking-widest bg-gradient-to-r from-[#f84c9a] to-[#d4377d] px-4 py-2 rounded-full shadow-md w-fit sm:ml-auto drop-shadow-sm border-2 border-white">
                {format(currentDate, 'MMMM yyyy', { locale: es })}
              </span>
              <div className="flex gap-2 mt-3 sm:justify-end">
                <button
                  onClick={prevMonth}
                  disabled={isBefore(subMonths(currentDate, 1), startOfMonth(new Date()))}
                  className="p-2 border-4 border-white rounded-full bg-gray-100 hover:bg-gray-200 text-[#2A1654] transition-all disabled:opacity-50 shadow-md hover:scale-105"
                >
                  <ChevronLeft className="w-6 h-6 font-bold drop-shadow-sm" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 border-4 border-white rounded-full bg-gray-100 hover:bg-gray-200 text-[#2A1654] transition-all shadow-md hover:scale-105"
                >
                  <ChevronRight className="w-6 h-6 font-bold drop-shadow-sm" />
                </button>
              </div>
            </div>
          )}
        </div>

        {step === "calendar" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase py-2 tracking-widest">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-3">
              {/* Empty cells */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 sm:h-12 md:h-14" />
              ))}
              
              {daysInMonth.map((day) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const booked = isBooked(day);
                const past = isPast(day);
                const disabled = booked || past;

                return (
                  <button
                    key={day.toString()}
                    onClick={() => handleDateSelect(day)}
                    disabled={disabled}
                    className={cn(
                      "h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-2xl text-sm md:text-lg font-black transition-all duration-300 border-4",
                      isSelected 
                        ? "bg-gradient-to-b from-[#fc890d] to-[#d67000] text-white border-white shadow-[0_8px_16px_rgba(252,137,13,0.4)] z-10 scale-110 -rotate-2" 
                        : "text-gray-700 bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1",
                      booked && "bg-gray-50 border-gray-100 text-[#f84c9a] cursor-not-allowed opacity-80 decoration-2 hover:translate-y-0 hover:shadow-none hover:border-gray-100 relative overflow-hidden",
                      past && !booked && "text-gray-300 border-transparent bg-transparent cursor-not-allowed hover:translate-y-0 hover:shadow-none"
                    )}
                  >
                    {booked && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-1 bg-[#f84c9a]/50 rotate-45 transform origin-center rounded-full"></div></div>}
                    <span className="relative z-10 drop-shadow-sm">{format(day, 'd')}</span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div className="w-5 h-5 bg-gradient-to-b from-[#fc890d] to-[#d67000] border-2 border-white shadow-sm rounded-full"></div> SELECCIONADO
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div className="w-5 h-5 bg-gray-100 border-2 border-gray-200 rounded-full relative overflow-hidden flex items-center justify-center">
                  <div className="w-full h-[2px] bg-[#f84c9a]/50 rotate-45"></div>
                </div> RESERVADO
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div className="w-5 h-5 bg-white border-2 border-gray-200 rounded-full shadow-inner"></div> DISPONIBLE
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-6 rounded-[2rem] border-4 border-white shadow-inner">
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest drop-shadow-sm">Fecha Seleccionada</p>
                <p className="font-black text-2xl text-[#2A1654] drop-shadow-sm">
                  {selectedDate ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es }) : "Ninguna"}
                </p>
              </div>
              {selectedDate && (
                <div className="text-center md:text-right bg-white px-6 py-3 rounded-[1.5rem] border-4 border-white shadow-md">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Seña Requerida</p>
                  <p className="font-black text-3xl text-[#f84c9a] drop-shadow-sm">$45.000</p>
                </div>
              )}
              <button
                onClick={() => setStep("form")}
                disabled={!selectedDate}
                className="w-full md:w-auto bg-gradient-to-b from-[#42baea] to-[#2b9bc9] text-white px-10 py-5 rounded-full font-black hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 transition-all uppercase tracking-widest text-sm ml-0 md:ml-4 border-4 border-white shadow-[0_8px_16px_rgba(66,186,234,0.4)] drop-shadow-md"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#fddb20] to-[#e5bc00] p-6 rounded-[2rem] border-4 border-white shadow-[0_10px_20px_rgba(253,219,32,0.3)] mb-8 transform -rotate-1 relative overflow-hidden">
              <div className="absolute inset-2 border-2 border-dashed border-[#2A1654]/20 rounded-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase text-[#2A1654]/70 tracking-widest drop-shadow-sm">Fecha elegida</p>
                <p className="font-black text-[#2A1654] capitalize text-xl drop-shadow-sm">
                  {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("calendar")}
                className="relative z-10 text-[10px] font-black text-white bg-[#2A1654] px-5 py-3 rounded-full hover:bg-[#1E0F3D] transition-colors uppercase tracking-widest shadow-md border-2 border-white"
              >
                Cambiar
              </button>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Nombre Completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-4 border-transparent focus:border-white focus:bg-white outline-none transition-all font-black text-[#2A1654] shadow-inner focus:shadow-[0_0_0_4px_#fc890d,inset_0_2px_4px_rgba(0,0,0,0.05)]"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Teléfono / WhatsApp</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-4 border-transparent focus:border-white focus:bg-white outline-none transition-all font-black text-[#2A1654] shadow-inner focus:shadow-[0_0_0_4px_#42baea,inset_0_2px_4px_rgba(0,0,0,0.05)]"
                placeholder="Ej: 221 555-5555"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Paquete</label>
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-4 border-transparent focus:border-white focus:bg-white outline-none transition-all font-black text-[#2A1654] shadow-inner focus:shadow-[0_0_0_4px_#91cf3b,inset_0_2px_4px_rgba(0,0,0,0.05)] appearance-none"
                >
                  <option value="cumple_resuelto">Cumple Resuelto</option>
                  <option value="egresados">Fiesta de Egresados</option>
                  <option value="personalizado">Evento Personalizado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Invitados</label>
                <input
                  required
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-4 border-transparent focus:border-white focus:bg-white outline-none transition-all font-black text-[#2A1654] shadow-inner focus:shadow-[0_0_0_4px_#f84c9a,inset_0_2px_4px_rgba(0,0,0,0.05)]"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setStep("calendar")}
                className="px-6 py-4 bg-white border-4 border-gray-100 hover:border-gray-200 text-gray-500 font-black rounded-full transition-colors w-1/3 uppercase tracking-widest text-xs shadow-sm hover:shadow-md"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-4 bg-gradient-to-b from-[#fc890d] to-[#d67000] border-4 border-white text-white font-black rounded-full shadow-[0_8px_16px_rgba(252,137,13,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(252,137,13,0.5)] transition-all w-2/3 flex items-center justify-center gap-2 disabled:opacity-70 uppercase tracking-widest text-sm drop-shadow-md"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirmar Reserva"}
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="animate-in zoom-in-95 duration-500 text-center py-8 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-b from-[#91cf3b] to-[#7ab52d] rounded-full flex items-center justify-center mx-auto mb-8 transform rotate-6 border-4 border-white shadow-[0_10px_20px_rgba(145,207,59,0.4)]">
              <CheckCircle2 className="w-12 h-12 text-white stroke-[3px] drop-shadow-md" />
            </div>
            <h3 className="text-4xl font-black text-[#2A1654] mb-4 uppercase leading-tight drop-shadow-sm">¡Reserva<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#91cf3b] to-[#7ab52d]">Iniciada!</span></h3>
            <p className="text-gray-600 mb-8 font-bold leading-relaxed bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 shadow-inner">
              Guardamos el <strong className="text-[#2A1654]">{selectedDate && format(selectedDate, "d 'de' MMMM", { locale: es })}</strong>. 
              Te contactaremos al <strong className="text-[#2A1654]">{formData.phone}</strong> para finalizar.
            </p>
            
            <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-[2rem] text-left border-4 border-white mb-8 relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.1)] transform -rotate-1">
              <div className="absolute inset-2 border-2 border-dashed border-gray-200 rounded-[1.5rem] pointer-events-none"></div>
              <p className="relative z-10 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 text-center bg-white border-2 border-gray-100 rounded-full py-2 px-4 w-fit mx-auto shadow-sm">Datos para la seña</p>
              <div className="relative z-10 space-y-4 font-black text-[#2A1654]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm gap-1">
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest">Alias</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f84c9a] to-[#d4377d] text-xl drop-shadow-sm">OSSUS.EVENTOS</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm gap-1">
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest">CBU</span>
                  <span className="text-base text-gray-700 font-mono tracking-widest">0000003100000000000000</span>
                </div>
              </div>
              <p className="relative z-10 mt-6 text-[10px] uppercase font-black text-gray-500 tracking-widest text-center flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#91cf3b] animate-ping"></span>
                Enviá el comprobante
              </p>
            </div>
            
            <button
              onClick={() => {
                setStep("calendar");
                setSelectedDate(null);
              }}
              className="w-full px-8 py-5 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-4 border-white text-gray-600 font-black rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all uppercase tracking-widest text-sm"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
