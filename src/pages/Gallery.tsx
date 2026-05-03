import { motion } from "motion/react";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Spoken English Mastery",
    slug: "spoken-english",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Campus to Corporate",
    slug: "campus-to-corporate",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Digital Marketing",
    slug: "digital-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "HR Management",
    slug: "hr-management",
    image: "https://images.unsplash.com/photo-1521791136064-7986c29596ad?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Banking & Finance",
    slug: "banking-finance",
    image: "https://images.unsplash.com/photo-1550565118-3d1428df4a7f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Full Stack Development",
    slug: "full-stack",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    title: "Data Science & AI",
    slug: "data-science",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    title: "AutoCAD Design",
    slug: "autocad",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9,
    title: "Foundation 60",
    slug: "foundation",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10,
    title: "Placement Support",
    slug: "placement",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    title: "Soft Skills Training",
    slug: "soft-skills",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 12,
    title: "Corporate Certifications",
    slug: "certifications",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like effect */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600')",
            filter: "brightness(0.5)"
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-0" />

        <div className="relative z-10 max-w-5xl w-full px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-accent-gold font-bold tracking-[0.4em] uppercase text-sm mb-6 block">Arambha Skill Solutions Gallery</span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-white text-6xl md:text-8xl font-serif font-bold tracking-tight mb-6 leading-tight"
            >
              EMPOWERING <span className="text-accent-gold italic">FUTURE</span> <br /> PROFESSIONALS.
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl md:text-2xl font-sans mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            A visual journey through our training programs, campus activities, and student success stories.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-2xl mx-auto flex shadow-2xl"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search programs, events, or students..."
                className="w-full bg-white border-none py-5 px-8 rounded-l-2xl text-primary focus:ring-2 focus:ring-accent-gold outline-none transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-accent-gold hover:bg-accent-gold/90 text-white px-10 rounded-r-2xl transition-colors flex items-center justify-center group">
              <Search className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 border-b border-slate-100 pb-10 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary italic font-bold mb-2">
              Our Portfolios
            </h2>
            <p className="text-on-surface-variant text-lg">Explore our diverse range of skill development categories</p>
          </div>
          <div className="flex items-center gap-3 text-accent-gold font-bold text-sm uppercase tracking-widest cursor-pointer hover:gap-5 transition-all bg-accent-gold/5 px-6 py-3 rounded-full border border-accent-gold/20">
            Explore All Categories <ChevronRight size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/gallery/${category.slug}`)}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-xl border border-slate-100"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-accent-gold font-bold text-xs uppercase tracking-[0.2em] mb-3 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">Training Program</span>
                <h3 className="text-white text-2xl font-serif font-bold leading-tight italic">
                  {category.title}
                </h3>
                <div className="w-12 h-[3px] bg-accent-gold mt-4 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-gold/20 backdrop-blur-sm -translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-bl-3xl flex items-center justify-center">
                <ChevronRight className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="bg-primary py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent-gold font-sans font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Join Our Community
          </motion.span>
          <h2 className="text-white text-4xl md:text-5xl font-serif mb-8 leading-tight">
            Stay inspired with monthly <br /> curated collections.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow bg-white/10 border border-white/20 px-6 py-4 rounded-lg text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
            />
            <button className="bg-accent-gold text-primary font-bold px-8 py-4 rounded-lg hover:brightness-110 active:scale-95 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
