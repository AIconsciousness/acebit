import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { 
  Quote, 
  Star, 
  Award, 
  Users, 
  Heart,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building,
  Target,
  Zap
} from "lucide-react";

// Import real faculty photos
import nishikant from "../../assets/images/faculty/nishikant.webp";
import pksharma from "../../assets/images/faculty/pksharma.webp";
import prashantmalvia from "../../assets/images/faculty/prashantmalvia.webp";
import pankajrai from "../../assets/images/faculty/pankajrai.webp";

const PatronageSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('right');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0); // 0..100 autoplay progress

  const patrons = [
    {
      id: 1,
      name: "Prof. Pankaj Rai",
      position: "Director",
      institution: "BIT Sindri",
      location: "Dhanbad, Jharkhand",
      image: pankajrai,
      quote: "I wish to express my appreciation and thanks to the professors and students whose many long hours of efforts in organizing activities made this association get significance and its true worth.",
      rating: 5,
      color: "from-indigo-600 via-purple-600 to-blue-600"
    },
    {
      id: 2,
      name: "Prof. Nishikant Kisku",
      position: "Professor",
      institution: "Civil Engineering, BIT Sindri",
      location: "Dhanbad, Jharkhand",
      image: nishikant,
      quote: "I extend heartfelt gratitude to the professors and students whose dedicated efforts and countless hours organizing activities have bestowed significance upon this association.",
      rating: 5,
      color: "from-emerald-600 via-teal-600 to-cyan-600"
    },
    {
      id: 3,
      name: "Prof. P.K Sharma",
      position: "Head of department",
      institution: "ACE BIT Sindri",
      location: "Dhanbad, Jharkhand",
      image: pksharma,
      quote: "I deeply appreciate the unwavering commitment of professors and students who dedicated countless hours to organizing activities.",
      rating: 5,
      color: "from-orange-600 via-amber-600 to-yellow-600"
    },
    {
      id: 4,
      name: "Prashant Ranjan Malviya",
      position: "Assistant Professor Incharge",
      institution: "ACE BIT Sindri",
      location: "Dhanbad, Jharkhand",
      image: prashantmalvia,
      quote: "I want to express my deepest gratitude to both students and faculty for their invaluable contributions to our academic community. Thank you for your tireless efforts and involvement in our activities and events.",
      rating: 5,
      color: "from-rose-600 via-pink-600 to-fuchsia-600"
    }
  ];

  // Drive autoplay via animated progress so we can show a progress bar (slower animation)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const durationMs = 6000; // Increased from 4000ms to 6000ms for slower animation
    const tickMs = 50;
    const step = (100 * tickMs) / durationMs; // 0.83 per tick (slower)
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 100) {
          setDirection('right');
          setCurrentIndex((prev) => (prev + 1) % patrons.length);
          return 0;
        }
        return next;
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [isAutoPlaying, patrons.length]);

  // Reset progress whenever currentIndex changes manually
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const nextPatron = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % patrons.length);
    setIsAutoPlaying(false);
  };

  const prevPatron = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + patrons.length) % patrons.length);
    setIsAutoPlaying(false);
  };

  const goToPatron = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e) => {
    // Reduce tilt on touch devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const maxDeg = 6;
    const tiltY = (px - 0.5) * 2 * maxDeg; // left-right
    const tiltX = (0.5 - py) * 2 * maxDeg; // up-down
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentPatron = patrons[currentIndex];

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Floating Elements */}
      <div className="hidden md:block absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="hidden md:block absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm sm:text-lg font-bold mb-4 sm:mb-6 md:mb-8 text-white animate-slide-up shadow-lg">
            <Award className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-pulse" />
            Our Esteemed Patrons
            <Award className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 animate-pulse" />
      </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-white mb-4 sm:mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            LEADERSHIP
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              & GUIDANCE
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-up px-4" style={{animationDelay: '0.4s'}}>
            Meet the distinguished leaders who guide and inspire our academic excellence and innovation
          </p>
              </div>

                {/* Main Patronage Display */}
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 relative overflow-hidden animate-slide-up will-change-transform"
            style={{ animationDelay: '0.6s', transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseOut={() => setIsAutoPlaying(true)}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentPatron.color} opacity-10 transition-all duration-1000`}></div>
            {/* Radial glow + subtle noise */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 items-center">
                
                {/* Left Side Patron List */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="space-y-3">
                    {patrons.map((patron, index) => (
                      <button
                        key={patron.id}
                        onClick={() => goToPatron(index)}
                        className={`w-full text-left p-3 rounded-2xl transition-all duration-500 transform hover:scale-105 group border ${
                          currentIndex === index
                            ? `bg-gradient-to-r ${patron.color} text-white shadow-lg scale-105 border-white/30`
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
                            currentIndex === index ? 'ring-white/50' : 'ring-white/20'
                          }`}>
                            <img 
                              src={patron.image} 
                              alt={patron.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${
                              currentIndex === index ? 'text-white' : 'text-gray-200'
                            }`}>
                              {patron.name}
                            </p>
                            <p className={`text-xs truncate opacity-80 ${
                              currentIndex === index ? 'text-white/90' : 'text-gray-400'
                            }`}>
                              {patron.position}
                            </p>
                          </div>
                        </div>
                        {/* Active indicator */}
                        {currentIndex === index && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                                {/* Center - Patron Image */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <div className={`w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden ring-4 sm:ring-6 md:ring-8 ring-white/20 shadow-2xl transition-all duration-1000 hover:scale-105 transform-gpu ${
                      direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                    }`}>
                      <img
                        src={currentPatron.image}
                        alt={currentPatron.name}
                        className="w-full h-full object-cover will-change-transform"
                        style={{ transform: `translate3d(${tilt.y * 1.2}px, ${-tilt.x * 1.2}px, 0) scale(1.02)` }}
                      />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Star className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    
                    {/* Auto-play Indicator */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center - Patron Content */}
                <div className="lg:col-span-2">
                  <div className="text-center lg:text-left">
                    {/* Quote Icon */}
                    <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r ${currentPatron.color} rounded-full flex items-center justify-center shadow-lg animate-pulse transform ${
                        direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                      }`}>
                        <Quote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    {/* Quote Text */}
                    <blockquote className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-relaxed italic transform transition-all duration-1000 px-2 sm:px-0 ${
                      direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                    }`}>
                      "{currentPatron.quote}"
                    </blockquote>

                    {/* Patron Info */}
                    <div className={`space-y-3 sm:space-y-4 transform transition-all duration-1000 ${
                      direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                    }`}>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white">
                        {currentPatron.name}
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-gray-300 text-sm sm:text-base">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                          <span className="font-semibold">{currentPatron.position}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                          <span>{currentPatron.institution}</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                          <span>{currentPatron.location}</span>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex justify-center lg:justify-start mt-4 sm:mt-6">
                        {[...Array(currentPatron.rating)].map((_, index) => (
                          <Star key={index} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${index * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Autoplay progress bar */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-[width] duration-50"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

                    {/* Mobile Patron List (horizontal scrolling) */}
          <div className="lg:hidden mt-8 sm:mt-12">
            <div className="flex space-x-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
              {patrons.map((patron, index) => (
                <button
                  key={`mobile-${patron.id}`}
                  onClick={() => goToPatron(index)}
                  className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-500 transform hover:scale-105 border ${
                    currentIndex === index
                      ? `bg-gradient-to-r ${patron.color} text-white shadow-lg scale-105 border-white/30`
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2 min-w-[80px]">
                    <div className={`w-12 h-12 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
                      currentIndex === index ? 'ring-white/50' : 'ring-white/20'
                    }`}>
                      <img 
                        src={patron.image} 
                        alt={patron.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-bold leading-tight ${
                        currentIndex === index ? 'text-white' : 'text-gray-200'
                      }`}>
                        {patron.name.split(' ').slice(0, 2).join(' ')}
                      </p>
                      <p className={`text-xs opacity-80 leading-tight ${
                        currentIndex === index ? 'text-white/90' : 'text-gray-400'
                      }`}>
                        {patron.position.split(' ').slice(0, 2).join(' ')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
              </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 space-x-4 sm:space-x-8">
            {/* Previous Button */}
            <button
              onClick={prevPatron}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg group"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:animate-pulse" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 sm:space-x-3">
              {patrons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPatron(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-yellow-500 scale-125 shadow-lg" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextPatron}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg group"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:animate-pulse" />
            </button>
          </div>

          {/* Patron Counter */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-300 text-sm sm:text-lg">
              {currentIndex + 1} of {patrons.length} Patrons
            </p>
            <div className="mt-2">
              <div className="w-24 sm:w-32 h-1 bg-white/20 rounded-full mx-auto">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentIndex + 1) / patrons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        
      </Container>
    </section>
  );
};

export default PatronageSection;
