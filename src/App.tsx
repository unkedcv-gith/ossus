import { useState, useEffect } from 'react';
import { BookingCalendar } from './components/BookingCalendar';
import { MapPin, Phone, PartyPopper, Check, Gift, Music, Gamepad2, Pizza, Cake, Sparkles, Star, Circle, X } from 'lucide-react';
import { cn } from './lib/utils';

const heroImages = [
  "/galeria6.jpg",
  "/galeria2.jpg",
  "/galeria8.jpg",
  "/galeria3.jpg"
];

const galleryImages = [
  "/galeria1.jpg",
  "/galeria2.jpg",
  "/galeria3.jpg",
  "/galeria4.png",
  "/galeria6.jpg",
  "/galeria7.png",
  "/galeria8.jpg",
  "/galeria9.png",
  "/galeria10.png",
  "/galeria11.png"
];

// Ribbon component for the "stitched" banner look
const Ribbon = ({ children, colorClass, className }: { children: React.ReactNode, colorClass: string, className?: string }) => (
  <div className={cn("relative inline-block rounded-2xl shadow-xl transform", colorClass, className)}>
    <div className="absolute inset-1 border-2 border-dashed border-white/50 rounded-xl pointer-events-none"></div>
    <div className="relative z-10 px-6 py-3 font-black uppercase tracking-widest text-white drop-shadow-md">
      {children}
    </div>
  </div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#2A1654] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3B1F75] to-[#1E0F3D] flex flex-col font-sans text-white selection:bg-[#f84c9a]/50 overflow-x-hidden relative">
      
      {/* Floating Confetti & Stars (Background Decor) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Star className="absolute top-20 left-[10%] w-8 h-8 text-[#fddb20] opacity-60 animate-pulse fill-current" />
        <Circle className="absolute top-40 right-[15%] w-6 h-6 text-[#f84c9a] opacity-60 animate-bounce fill-current" />
        <Star className="absolute top-[40%] left-[5%] w-6 h-6 text-[#42baea] opacity-60 animate-pulse fill-current" />
        <Circle className="absolute top-[60%] right-[10%] w-4 h-4 text-[#91cf3b] opacity-60 animate-bounce fill-current" />
        <Star className="absolute bottom-[20%] left-[20%] w-10 h-10 text-[#fc890d] opacity-60 animate-pulse fill-current" />
      </div>

      {/* Header */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#2A1654]/80 backdrop-blur-md border-b-4 border-white/20 fixed top-0 left-0 right-0 w-full z-50 shadow-lg">
        <div className="flex items-center gap-2">
          {/* Logo with bright drop shadow for gel effect */}
          <img src="/logo.svg" alt="OSSUS Eventos" className="h-16 md:h-20 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:scale-110 hover:-rotate-3 transition-transform origin-left" />
        </div>
        <div className="hidden md:flex gap-8 font-black text-sm uppercase tracking-widest text-white drop-shadow-md">
          <a href="#promos" className="hover:text-[#fc890d] hover:-translate-y-1 transition-transform">Promos</a>
          <a href="#galeria" className="hover:text-[#fddb20] hover:-translate-y-1 transition-transform">El Espacio</a>
          <a href="#atracciones" className="hover:text-[#42baea] hover:-translate-y-1 transition-transform">Atracciones</a>
          <a href="#servicios" className="hover:text-[#91cf3b] hover:-translate-y-1 transition-transform">Servicios</a>
          <a href="#menu" className="hover:text-[#f84c9a] hover:-translate-y-1 transition-transform">Menú</a>
        </div>
        <a href="#reservas" className="bg-gradient-to-b from-[#fc890d] to-[#d67000] text-white px-8 py-3 rounded-full font-black shadow-[0_8px_16px_rgba(252,137,13,0.4)] hover:shadow-[0_12px_24px_rgba(252,137,13,0.6)] hover:-translate-y-1 border-4 border-white transition-all text-sm tracking-widest uppercase relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_forwards]"></div>
          MI RESERVA
        </a>
      </nav>

      {/* Hero */}
      <main className="flex-1 relative z-10 pt-24 md:pt-32">
        <section className="relative min-h-[calc(100vh-100px)] flex items-center overflow-hidden">
          {/* Background Image Slider */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((src, idx) => (
              <img 
                key={idx} 
                src={src} 
                alt={`Background Slide ${idx + 1}`}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                  currentSlide === idx ? "opacity-100" : "opacity-0"
                )} 
              />
            ))}
            <div className="absolute inset-0 bg-[#2A1654]/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A1654]/80 via-[#3B1F75]/40 to-[#1E0F3D]"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 p-6 md:p-10 max-w-7xl mx-auto items-center w-full">
            <div className="flex flex-col gap-6 items-center text-center max-w-4xl mx-auto mt-10">
              <Ribbon colorClass="bg-[#f84c9a] w-fit -rotate-2" className="mb-2 animate-bounce">
                <Sparkles className="w-5 h-5 inline-block mr-1 -mt-1 text-[#fddb20]" /> ¡El mejor salón de La Plata!
              </Ribbon>
              
              {/* Puffy-Gel Typography Effect using font-display (Fredoka) */}
              <h1 className="text-6xl md:text-[7rem] font-display font-black leading-[1.1] drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-300" style={{ filter: 'drop-shadow(0px 4px 0px #42baea)' }}>¡La fiesta</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fddb20] to-[#e5bc00] uppercase inline-block" style={{ filter: 'drop-shadow(0px 6px 0px #fc890d)' }}>está completa!</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white font-bold max-w-2xl bg-[#1E0F3D]/60 backdrop-blur-md p-6 rounded-[2rem] border-4 border-white/30 shadow-xl drop-shadow-md">
                3 horas de diversión ilimitada. Cama elástica, inflables, pelotero, pista de baile y todo lo que necesitás.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                <a href="#reservas" className="bg-gradient-to-b from-[#91cf3b] to-[#7ab52d] text-white px-10 py-5 rounded-[2rem] font-black shadow-[0_10px_20px_rgba(145,207,59,0.4)] hover:-translate-y-1 border-4 border-white transition-all text-xl w-full sm:w-auto text-center uppercase tracking-widest drop-shadow-lg transform hover:scale-105">
                  Reservar Fecha
                </a>
                <a href="#contacto" className="bg-gradient-to-b from-[#42baea] to-[#2b9bc9] text-white px-10 py-5 rounded-[2rem] font-black shadow-[0_10px_20px_rgba(66,186,234,0.4)] hover:-translate-y-1 border-4 border-white transition-all text-xl w-full sm:w-auto text-center uppercase tracking-widest drop-shadow-lg transform hover:scale-105">
                  Contactanos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Promos */}
        <section id="promos" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E0F3D] to-[#2A1654]"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-black mb-4 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f84c9a] to-[#d4377d]" style={{ filter: 'drop-shadow(0px 4px 0px #ffffff)' }}>Promos</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">Vigentes</span>
              </h2>
              <Ribbon colorClass="bg-[#fc890d] text-white">¡Aprovechá estos beneficios exclusivos!</Ribbon>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Promo 1 */}
              <div className="relative transform -rotate-2 group hover:rotate-0 transition-transform duration-500 flex flex-col">
                <div className="absolute -top-6 -left-6 bg-gradient-to-b from-[#fddb20] to-[#e5bc00] text-[#1E0F3D] w-32 h-32 rounded-full flex flex-col items-center justify-center font-black rotate-12 shadow-2xl border-4 border-white z-20 group-hover:scale-110 transition-transform">
                  <div className="absolute inset-2 border-2 border-dashed border-[#1E0F3D]/20 rounded-full pointer-events-none"></div>
                  <span className="text-xs tracking-widest uppercase mb-1 drop-shadow-md">PROMO</span>
                  <span className="text-3xl font-display leading-none drop-shadow-md">Agosto</span>
                </div>

                <div className="bg-gradient-to-b from-[#42baea] to-[#2b9bc9] p-10 rounded-[3rem] shadow-[0_20px_40px_rgba(66,186,234,0.3)] border-8 border-white relative overflow-hidden h-full flex flex-col">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="ml-24 mb-6 relative z-10">
                    <h3 className="text-5xl font-display font-black text-white uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">Cumple <br/><span className="text-[#fddb20]">Resuelto</span></h3>
                  </div>
                  
                  <p className="text-white mb-6 font-bold text-lg leading-relaxed relative z-10">
                    La mejor opción para olvidarte de todo.
                  </p>
                  
                  <ul className="space-y-3 mb-8 text-white font-black text-sm drop-shadow-sm relative z-10 bg-[#2b9bc9]/50 p-6 rounded-3xl border-2 border-white/30 shadow-inner">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fddb20] border-2 border-white shadow-md flex items-center justify-center text-[#2A1654]"><Check className="w-4 h-4" /></div> 
                      Salón completo exclusivo
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fddb20] border-2 border-white shadow-md flex items-center justify-center text-[#2A1654]"><Check className="w-4 h-4" /></div> 
                      Animación y piñata
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fddb20] border-2 border-white shadow-md flex items-center justify-center text-[#2A1654]"><Check className="w-4 h-4" /></div> 
                      Menú infantil y adultos
                    </li>
                  </ul>
                  
                  <div className="flex items-center justify-between mt-auto relative z-10">
                    <p className="text-5xl font-display font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">$400.000</p>
                    <a href="#reservas" className="bg-white text-[#42baea] px-6 py-3 rounded-full font-black shadow-lg hover:scale-105 transition-transform uppercase tracking-widest text-sm border-4 border-white">
                      Reservar
                    </a>
                  </div>
                </div>
              </div>

              {/* Promo 2 */}
              <div className="bg-gradient-to-b from-[#fc890d] to-[#d67000] p-10 rounded-[3rem] shadow-[0_20px_40px_rgba(252,137,13,0.3)] border-8 border-white transform rotate-2 relative overflow-hidden group hover:rotate-0 transition-transform duration-500">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
                
                <Ribbon colorClass="bg-[#f84c9a] -rotate-3 mb-6 relative z-20">Especial Fin de Año</Ribbon>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-[#f84c9a]">
                    <Cake className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-display font-black text-white uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">Fiestas de <br/><span className="text-[#fddb20]">Egresados</span></h3>
                </div>
                
                <p className="text-white mb-6 font-bold text-lg leading-relaxed bg-[#d67000]/50 p-6 rounded-3xl border-2 border-white/30 shadow-inner relative z-10">
                  Un cierre de etapa lleno de juegos y diversión. ¡Incluye show a elección y diplomas para todos!
                </p>
                
                <ul className="space-y-3 mb-8 text-white font-black text-sm drop-shadow-sm relative z-10">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fddb20] border-2 border-white shadow-md flex items-center justify-center text-[#2A1654]"><Star className="w-4 h-4 fill-current" /></div> 
                    Dino Rex o Minion.
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#42baea] border-2 border-white shadow-md flex items-center justify-center text-white"><Star className="w-4 h-4 fill-current" /></div> 
                    Diploma de egresado por niño.
                  </li>
                </ul>
                
                <a href="#reservas" className="block text-center px-6 py-4 bg-white text-[#fc890d] font-black rounded-full transition-transform hover:scale-105 w-full uppercase tracking-widest text-sm shadow-xl border-4 border-white relative z-10">
                  Consultar disponibilidad
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-black mb-4 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">Conocé</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#42baea] to-[#2b9bc9]" style={{ filter: 'drop-shadow(0px 4px 0px #1E0F3D)' }}>nuestro</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">espacio</span>
              </h2>
              <Ribbon colorClass="bg-[#fddb20] text-[#1E0F3D]">Un lugar increíble preparado para los mejores momentos.</Ribbon>
            </div>
            
            <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {galleryImages.map((src, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(src)}
                  className={cn("break-inside-avoid rounded-[2rem] overflow-hidden border-[6px] border-white relative group transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:z-10 cursor-pointer", i % 2 === 0 ? "shadow-[0_15px_30px_rgba(248,76,154,0.4)] rotate-2" : "shadow-[0_15px_30px_rgba(66,186,234,0.4)] -rotate-2")}
                >
                  <img src={src} className="w-full h-auto object-cover" alt={`Galería ${i + 1}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1654]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
                      <Star className="w-5 h-5 text-[#f84c9a] fill-current" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Atracciones */}
        <section id="atracciones" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#42baea]/10 backdrop-blur-sm border-y-4 border-white/20"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200 mb-6 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Todo lo que pueden disfrutar</h2>
              <Ribbon colorClass="bg-[#fc890d] text-white">3 horas de diversión ilimitada en todos los sectores</Ribbon>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: <Gamepad2 className="w-10 h-10"/>, name: "Cama Elástica", color: "from-[#fc890d] to-[#d67000]" },
                { icon: <PartyPopper className="w-10 h-10"/>, name: "Inflable", color: "from-[#f84c9a] to-[#d4377d]" },
                { icon: <Gift className="w-10 h-10"/>, name: "Pelotero", color: "from-[#fddb20] to-[#dcb700]" },
                { icon: <Gamepad2 className="w-10 h-10"/>, name: "Maquinitas Vintage", color: "from-[#91cf3b] to-[#7ab52d]" },
                { icon: <div className="w-10 h-10 rounded-full border-4 border-current grid place-items-center"><div className="w-4 h-4 bg-current rounded-full" /></div>, name: "Canchita Fútbol", color: "from-[#42baea] to-[#2b9bc9]" },
                { icon: <Music className="w-10 h-10"/>, name: "Pista y Karaoke", color: "from-[#91cf3b] to-[#7ab52d]" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-[2.5rem] bg-white border-[6px] border-white shadow-[0_15px_25px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all transform hover:rotate-3 group cursor-pointer relative overflow-hidden">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-b ${item.color} text-white shadow-inner border-4 border-white/50 relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md`}>
                    {item.icon}
                  </div>
                  <h3 className="font-black text-[#2A1654] text-sm uppercase tracking-wider leading-tight relative z-10">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center">
            <div className="text-center w-full max-w-3xl mb-12">
              <h2 className="text-5xl md:text-6xl font-display font-black mb-6 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">Nuestros</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fddb20] to-[#e5bc00]" style={{ filter: 'drop-shadow(0px 4px 0px #fc890d)' }}>Servicios</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">Incluyen</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                { title: "Animación con Profes", desc: "Profesionales cuidando y divirtiendo a los chicos.", color: "bg-[#f84c9a]" },
                { title: "Mozos + Encargado", desc: "Vos relajate, nosotros nos encargamos del servicio.", color: "bg-[#42baea]" },
                { title: "Stand Candy", desc: "Con 10 variedades de golosinas riquísimas.", color: "bg-[#fddb20]" },
                { title: "Copos de Azúcar", desc: "El clásico que nunca falla.", color: "bg-[#fc890d]" },
                { title: "Stand de Glitter", desc: "¡Completamente de regalo!", color: "bg-[#91cf3b]" },
                { title: "Vajilla Completa", desc: "Incluye todo lo necesario para el evento.", color: "bg-[#42baea]" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-center bg-white/10 backdrop-blur-md p-5 rounded-3xl border-4 border-white/20 shadow-lg transform hover:-translate-y-1 transition-transform">
                  <div className={cn("w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center shrink-0 text-white drop-shadow-md", item.color)}>
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-lg uppercase drop-shadow-sm leading-tight">{item.title}</h4>
                    <p className="text-sm text-white/90 mt-1 font-bold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f84c9a]/10 backdrop-blur-sm border-y-4 border-white/20"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200 mb-6 uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">¡Y también comemos rico!</h2>
              <Ribbon colorClass="bg-[#42baea] text-white">Opciones para grandes y chicos</Ribbon>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform -rotate-1 relative">
                <div className="absolute inset-2 border-2 border-dashed border-[#42baea]/30 rounded-[2.5rem] pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-b from-[#42baea] to-[#2b9bc9] border-4 border-white shadow-lg rounded-full flex items-center justify-center text-white">
                    <Pizza className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-black text-[#2A1654] uppercase">Menú <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#42baea] to-[#2b9bc9]">Adultos</span></h3>
                </div>
                <ul className="space-y-5 relative z-10">
                  <li className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#91cf3b] text-white flex items-center justify-center shrink-0 shadow-inner"><Check className="w-6 h-6"/></div>
                    <span className="font-black text-[#2A1654]">Snacks (papitas y chizitos)</span>
                  </li>
                  <li className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#91cf3b] text-white flex items-center justify-center shrink-0 shadow-inner"><Check className="w-6 h-6"/></div>
                    <span className="font-black text-[#2A1654]">Pizza libre</span>
                  </li>
                  <li className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#91cf3b] text-white flex items-center justify-center shrink-0 shadow-inner"><Check className="w-6 h-6"/></div>
                    <span className="font-black text-[#2A1654] leading-tight">2 empanadas por persona<br/><span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 block">Jamón y queso, carne o pollo</span></span>
                  </li>
                  <li className="flex items-center gap-4 bg-[#fddb20]/20 p-5 rounded-2xl border-2 border-[#fddb20]/50 shadow-sm mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#fc890d] text-white flex items-center justify-center shrink-0 shadow-inner"><Star className="w-5 h-5 fill-current"/></div>
                    <span className="font-black text-[#2A1654] leading-tight">Consultá por otras propuestas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[3rem] border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform rotate-1 relative">
                <div className="absolute inset-2 border-2 border-dashed border-[#f84c9a]/30 rounded-[2.5rem] pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-b from-[#f84c9a] to-[#d4377d] border-4 border-white shadow-lg rounded-full flex items-center justify-center text-white">
                    <Cake className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-black text-[#2A1654] uppercase">Menú <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f84c9a] to-[#d4377d]">Infantil</span></h3>
                </div>
                <div className="bg-gradient-to-b from-[#fddb20] to-[#e5bc00] p-6 rounded-[2rem] border-4 border-white shadow-lg relative z-10 mb-8 mt-4">
                  <Ribbon colorClass="bg-[#2A1654] text-white text-xs -mt-10 mb-4 transform -rotate-2">Elegí una opción</Ribbon>
                  <ul className="space-y-4 font-black text-[#2A1654] text-base drop-shadow-sm">
                    <li className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-[#f84c9a] border-2 border-white shadow-sm"></div> Patitas de pollo y caritas de papa</li>
                    <li className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-[#42baea] border-2 border-white shadow-sm"></div> Panchos</li>
                    <li className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-[#fc890d] border-2 border-white shadow-sm"></div> Pizzas</li>
                  </ul>
                </div>

                <ul className="space-y-5 relative z-10">
                  <li className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#91cf3b] text-white flex items-center justify-center shrink-0 shadow-inner"><Check className="w-6 h-6"/></div>
                    <span className="font-black text-[#2A1654]">Snacks (papitas y chizitos)</span>
                  </li>
                  <li className="flex items-center gap-4 bg-[#fddb20]/20 p-5 rounded-2xl border-2 border-[#fddb20]/50 shadow-sm mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#fc890d] text-white flex items-center justify-center shrink-0 shadow-inner"><Star className="w-5 h-5 fill-current"/></div>
                    <span className="font-black text-[#2A1654] leading-tight">Consultá por otras propuestas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Calendar */}
        <section className="py-24 relative">
          <BookingCalendar />
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contacto" className="px-6 md:px-10 py-12 bg-[#1E0F3D] border-t-8 border-[#fc890d] text-sm font-medium text-white relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 xl:gap-12">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2 bg-white rounded-[2rem] p-3 shadow-inner shrink-0">
              <img src="/logo.svg" alt="OSSUS Eventos" className="h-14 md:h-16 hover:scale-110 hover:-rotate-3 transition-transform origin-left drop-shadow-md" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 pl-6 pr-5 py-3 rounded-full border-2 border-white/20 backdrop-blur-md shadow-lg shrink-0">
                <div className="w-10 h-10 bg-gradient-to-b from-[#91cf3b] to-[#7ab52d] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-black text-base tracking-wide drop-shadow-md whitespace-nowrap">221-5777798</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 pl-6 pr-5 py-3 rounded-full border-2 border-white/20 backdrop-blur-md shadow-lg shrink-0">
                <div className="w-10 h-10 bg-gradient-to-b from-[#42baea] to-[#2b9bc9] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-black text-[13px] tracking-wide drop-shadow-md whitespace-nowrap">7 e/ 518 bis y 519, Ringuelet</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest font-black">
            <span className="cursor-pointer hover:text-[#fddb20] transition-colors drop-shadow-md">Políticas de Cancelación</span>
            <span className="cursor-pointer hover:text-[#fddb20] transition-colors drop-shadow-md">Términos</span>
            <Ribbon colorClass="bg-[#f84c9a] hover:scale-105 transition-transform cursor-pointer text-[10px] px-4 py-1">INSTAGRAM</Ribbon>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/20 text-center text-xs opacity-60 font-black tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} OSSUS EVENTOS. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button - Texturized Icon look */}
      <a href="https://wa.me/5492215777798?text=Hola!%20Me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20informaci%C3%B3n%20y%20saber%20si%20hay%20alguna%20promo%20vigente.%20Gracias!" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-gradient-to-b from-[#91cf3b] to-[#7ab52d] text-white p-4 rounded-full shadow-[0_10px_20px_rgba(145,207,59,0.5)] hover:scale-110 hover:-rotate-6 transition-all duration-300 flex items-center justify-center group border-4 border-white">
        <svg className="w-10 h-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      
      {/* Image Lightbox Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E0F3D]/90 backdrop-blur-md p-4 md:p-10 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute top-6 right-6 z-50">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2A1654] hover:bg-[#f84c9a] hover:text-white transition-colors border-4 border-white/20 shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <img 
            src={selectedImage} 
            alt="Vista ampliada" 
            className="max-w-full max-h-full rounded-[2rem] border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
