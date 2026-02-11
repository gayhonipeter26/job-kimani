<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const voterCarousel = ref(null);
const donationModalOpen = ref(false);
const volunteerModalOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeModals = () => {
    donationModalOpen.value = false;
    volunteerModalOpen.value = false;
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

let scrollInterval = null;

const startCarousel = () => {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
        if (voterCarousel.value) {
            const carousel = voterCarousel.value;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 5) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: 400, behavior: 'smooth' });
            }
        }
    }, 4000);
};

const stopCarousel = () => {
    if (scrollInterval) clearInterval(scrollInterval);
};

const scrollCarousel = (distance) => {
    if (voterCarousel.value) {
        voterCarousel.value.scrollBy({ left: distance, behavior: 'smooth' });
    }
};

const pillars = [
    {
        id: '01',
        title: 'Health & Sanitation',
        description: 'Upgrading local health dispensaries to ensure every family has access to quality, affordable healthcare.',
        detail: 'Our vision for health includes a 24-hour maternity wing in every major ward dispensary, regular community medical camps, and a subsidized health insurance scheme for the most vulnerable. We will also implement a modern waste collection system to prevent disease outbreaks.',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
        color: 'brand-green'
    },
    {
        id: '02',
        title: 'Security & Welfare',
        description: 'Enhancing safety through stronger collaboration with security agencies and street lighting.',
        detail: 'We will install solar-powered street lights in all major trading centers and residential alleys. Our welfare program will establish a "Community Care Bureau" to manage monthly stipends for the elderly and provide assistive devices for PWDs.',
        image: 'https://images.unsplash.com/photo-1473111583946-89fe2dd9d9c2?auto=format&fit=crop&w=800&q=80',
        color: 'brand-red'
    },
    {
        id: '03',
        title: 'Economic Growth',
        description: 'Revitalizing local markets and supporting small businesses (SMEs) with access to credit.',
        detail: 'The Viwandani SME Fund will provide interest-free starter loans for women and youth-led businesses. We will also upgrade our open-air markets with modern sheds, clean water, and secure storage facilities to boost 24-hour trade.',
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
        color: 'brand-green'
    },
    {
        id: '04',
        title: 'Sports & Talent',
        description: 'Investing in modern sports facilities and sponsoring local tournaments.',
        detail: 'We will construct high-standard football pitches and basketball courts. The Nakuru Viwandani Talent Academy will provide scholarships for gifted athletes and artists, connecting them to professional scouts and international opportunities.',
        image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
        color: 'brand-red'
    },
    {
        id: '05',
        title: 'Youth Empowerment',
        description: 'Establishing innovation hubs and vocational training centers.',
        detail: 'Our Innovation Hubs will provide free high-speed internet and tech training. We will partner with local industries to create a "Direct-to-Employment" apprenticeship program for graduates of our vocational training centers.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        color: 'brand-green'
    },
    {
        id: '06',
        title: 'Education',
        description: 'Modernizing classrooms and increasing bursary allocations.',
        detail: 'We will double the current bursary allocation to ensure 100% transition to secondary and tertiary institutions. Every public primary school will be equipped with a modern computer lab and refurbished sanitary facilities.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        color: 'brand-red'
    },
    {
        id: '07',
        title: 'Infrastructure',
        description: 'Aggressive upgrading of road networks and drainage systems.',
        detail: 'Prioritizing the paving of all major feeder roads with high-quality cabro and asphalt. We will also implement a comprehensive drainage master plan to end the perennial flooding during rainy seasons.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        color: 'brand-green'
    },
    {
        id: '08',
        title: 'Environment',
        description: 'Promoting sustainable waste management and green spaces.',
        detail: 'Our "Green Viwandani" project will plant 100,000 trees across the ward. We will establish a community-led recycling plant that turns organic waste into fertilizer, providing jobs while keeping our environment pristine.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
        color: 'brand-red'
    }
];

const pillarsCarousel = ref(null);
const selectedPillar = ref(null);

const scrollPillars = (distance) => {
    if (pillarsCarousel.value) {
        pillarsCarousel.value.scrollBy({ left: distance, behavior: 'smooth' });
    }
};

const openPillarDetail = (pillar) => {
    selectedPillar.value = pillar;
};

const closePillarDetail = () => {
    selectedPillar.value = null;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    startCarousel();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    stopCarousel();
});
</script>

<template>
    <div
        class="font-sans bg-brand-light text-slate-800 antialiased selection:bg-brand-red selection:text-white overflow-x-hidden">
        <!-- Navigation -->
        <nav :class="[
            'fixed top-0 left-0 w-full z-50 transition-all duration-500',
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        ]">
            <div class="max-w-7xl mx-auto px-2 md:px-6 py-1 md:py-4">
                <div class="flex justify-between items-center">
                    <!-- Logo / Branding -->
                    <div class="flex items-center gap-1.5 md:gap-4">
                        <a href="#" class="flex items-center gap-1.5 md:gap-3 group">
                            <!-- DCP Logo Box -->
                            <div
                                class="w-7 h-7 md:w-12 md:h-12 bg-brand-green flex items-center justify-center text-white font-black text-[0.6rem] md:text-base tracking-tighter shadow-md transition-all duration-300 group-hover:bg-brand-red">
                                DCP
                            </div>
                            <!-- Info Stack -->
                            <div class="flex flex-col ml-1 md:ml-4">
                                <span
                                    class="text-xs md:text-xl font-bold tracking-tight text-brand-dark leading-none">Job
                                    Kimani <span class="text-brand-red">2027</span></span>
                                <div class="flex items-center gap-2">
                                    <span
                                        class="px-1.5 py-0.5 bg-brand-red/10 text-brand-red text-[0.4rem] md:text-[0.6rem] font-black rounded-sm uppercase tracking-tighter">MCA</span>
                                    <span
                                        class="text-[0.4rem] md:text-[0.65rem] font-black tracking-widest text-brand-green uppercase leading-tight">Naivasha
                                        Viwandani</span>
                                </div>
                                <span
                                    class="hidden sm:block text-[0.45rem] md:text-[0.5rem] font-bold tracking-widest text-brand-red uppercase">Integrity
                                    •
                                    Service •
                                    Progress</span>
                            </div>
                        </a>
                    </div>

                    <!-- Desktop Links -->
                    <div class="hidden md:flex items-center gap-8 font-medium text-sm">
                        <a href="#vision" class="hover:text-brand-red transition-colors">Vision</a>
                        <a href="#agenda" class="hover:text-brand-red transition-colors">Agenda</a>
                        <a href="#impact" class="hover:text-brand-red transition-colors">Impact</a>
                        <a href="#join"
                            class="bg-brand-red text-white px-6 py-2.5 rounded-none hover:bg-brand-dark transition-colors shadow-lg hover:shadow-xl">Get
                            Involved</a>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="md:hidden text-brand-dark hover:text-brand-red transition-colors p-1">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <div v-if="isMobileMenuOpen"
                    class="absolute top-full left-0 w-full bg-brand-light border-b border-brand-green/20 shadow-xl md:hidden">
                    <div class="flex flex-col p-8 gap-6">
                        <a href="#vision" @click="isMobileMenuOpen = false"
                            class="text-xl font-bold text-brand-dark hover:text-brand-red transition-colors">Vision</a>
                        <a href="#agenda" @click="isMobileMenuOpen = false"
                            class="text-xl font-bold text-brand-dark hover:text-brand-red transition-colors">Agenda</a>
                        <a href="#impact" @click="isMobileMenuOpen = false"
                            class="text-xl font-bold text-brand-dark hover:text-brand-red transition-colors">Impact</a>
                        <a href="#join" @click="isMobileMenuOpen = false" class="text-xl font-black text-brand-red">Get
                            Involved</a>
                    </div>
                </div>
            </transition>
        </nav>

        <!-- Hero Section -->
        <header
            class="relative min-h-[40vh] md:min-h-[65vh] flex flex-col items-center justify-center bg-hero-pattern bg-cover bg-center bg-no-repeat bg-fixed text-white pt-10 md:pt-20 pb-4 md:pb-0 perspective-1">
            <div class="absolute inset-0 bg-black/65"></div>

            <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
                <!-- Massive Hero Slogan -->
                <div class="mb-6 md:mb-10 animate-fade-in-down w-full">
                    <h1
                        class="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-1 md:gap-y-0 text-[1.8rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] md:leading-none">
                        <span class="text-stone-100 opacity-95 drop-shadow-2xl">Integrity</span>
                        <span class="text-brand-red drop-shadow-2xl">Service</span>
                        <span class="text-brand-green drop-shadow-2xl">Progress</span>
                    </h1>
                </div>
            </div>
        </header>

        <!-- Vision / About Section (Blended Overlap) -->
        <section id="vision" class="relative z-20 -mt-20 md:-mt-32 pb-6 md:pb-24 scroll-mt-24">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Glass Card -->
                <div
                    class="bg-white/70 backdrop-blur-xl shadow-2xl rounded-none border-t-8 border-brand-green overflow-hidden ring-1 ring-white/20">
                    <div class="grid md:grid-cols-2 gap-0">

                        <!-- Image Side -->
                        <div class="relative min-h-[350px] md:min-h-[650px] overflow-hidden group">
                            <img src="/images/Gemini_Generated_Image_j00gmgj00gmgj00g.png" alt="Job Kimani Kang'u"
                                class="absolute inset-0 w-full h-full object-cover object-top transition duration-700 group-hover:scale-110">
                            <!-- Premium Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent">
                            </div>
                            <div class="absolute bottom-0 left-0 p-8 md:p-12 text-white z-20">
                                <div class="w-16 md:w-20 h-2 bg-brand-red mb-4 md:mb-6"></div>
                                <p
                                    class="text-2xl md:text-3xl font-serif italic text-white drop-shadow-md leading-relaxed">
                                    "Service
                                    is not a
                                    position, it is an action. We rise by lifting others."</p>
                            </div>
                        </div>

                        <!-- Content Side -->
                        <div class="p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-white/60 md:bg-white/40">
                            <span
                                class="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-brand-red text-white rounded-none text-xs md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-8 self-start shadow-md">Job
                                Kimani Kang'u</span>

                            <h3
                                class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark mb-4 md:mb-8 leading-[1.1] drop-shadow-sm">
                                A Proven Leader <br> <span class="text-brand-green">Rooted in Community</span>
                            </h3>

                            <p class="text-sm md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed font-medium">
                                John Kimani Kang'u isn't just a politician; he's a neighbor, a father, and a lifelong
                                advocate for Nakuru
                                Viwandani.
                                With a decade of grassroots experience, he bridges the gap between policy and people. He
                                understands that
                                <span class="font-black text-brand-dark">true leadership</span> is about listening,
                                understanding, and
                                acting.
                            </p>

                            <div class="grid grid-cols-2 gap-6 md:gap-10 border-t-2 border-brand-dark/10 pt-8 md:pt-10">
                                <div>
                                    <div
                                        class="text-4xl md:text-5xl font-black text-brand-red mb-1 md:mb-2 drop-shadow-sm">
                                        15+</div>
                                    <div
                                        class="text-[0.65rem] md:text-sm text-brand-dark font-bold uppercase tracking-widest">
                                        Years
                                        Experience</div>
                                </div>
                                <div>
                                    <div
                                        class="text-4xl md:text-5xl font-black text-brand-green mb-1 md:mb-2 drop-shadow-sm">
                                        12</div>
                                    <div
                                        class="text-[0.65rem] md:text-sm text-brand-dark font-bold uppercase tracking-widest">
                                        Wards
                                        Represented</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- Manifesto / Agenda Section -->
        <section id="agenda"
            class="py-24 bg-gradient-to-br from-brand-green/10 via-white to-brand-red/10 border-y border-brand-green/10 scroll-mt-24">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto mb-20">
                    <span
                        class="inline-block px-3 py-1 bg-brand-red text-white rounded-none text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">Our
                        Manifesto</span>
                    <h3 class="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4 md:mb-6">8 Pillars of
                        Development</h3>
                    <p class="text-gray-600 text-base md:text-lg">A strategic roadmap to transform Nakuru Viwandani.
                        Real solutions
                        for real
                        progress.</p>
                </div>

                <!-- Carousel Container -->
                <div class="relative group/carousel -mx-4 md:mx-0">
                    <!-- Navigation Controls - Left -->
                    <div
                        class="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-40 md:-translate-x-8 opacity-80 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all duration-500">
                        <button @click="scrollPillars(-pillarsCarousel.clientWidth)"
                            class="w-10 h-10 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm text-brand-dark shadow-xl flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300 ring-2 md:ring-4 ring-black/5">
                            <svg class="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Horizontal Scroll Row -->
                    <div ref="pillarsCarousel"
                        class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 pb-8 md:pb-12 scroll-smooth px-4 md:px-0">
                        <div v-for="pillar in pillars" :key="pillar.id" @click="openPillarDetail(pillar)"
                            class="flex-none w-[85vw] md:w-[600px] lg:w-[900px] snap-center group relative overflow-hidden bg-brand-dark aspect-[10/14] md:aspect-[16/9] shadow-2xl transition-all duration-500 hover:-translate-y-2 ring-1 ring-white/10 cursor-pointer">

                            <!-- Background Image -->
                            <img :src="pillar.image" :alt="pillar.title"
                                class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:opacity-75 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110">

                            <!-- Premium Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-80">
                            </div>

                            <!-- Content Overlay -->
                            <div class="absolute inset-0 p-6 md:p-16 flex flex-col justify-end z-20">
                                <!-- Number Indicator -->
                                <span
                                    class="text-6xl md:text-[14rem] font-black text-white/5 md:text-white/10 absolute top-2 md:top-4 right-2 md:right-4 transition-all duration-500 group-hover:text-white/20 group-hover:scale-110 pointer-events-none leading-none">
                                    {{ pillar.id }}
                                </span>

                                <!-- Accent Bar -->
                                <div :class="[
                                    'w-16 md:w-24 h-2 md:h-3 mb-4 md:mb-8 transition-all duration-700 group-hover:w-full',
                                    pillar.color === 'brand-red' ? 'bg-brand-red' : 'bg-brand-green'
                                ]"></div>

                                <h4
                                    class="text-3xl md:text-8xl font-black text-white mb-3 md:mb-6 uppercase italic leading-[1] md:leading-[0.85] tracking-tighter shadow-sm">
                                    {{ pillar.title }}
                                </h4>

                                <div class="overflow-hidden">
                                    <p
                                        class="text-gray-300 text-sm md:text-3xl leading-relaxed opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-12 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 max-w-3xl">
                                        {{ pillar.description }}
                                    </p>
                                </div>
                            </div>

                            <!-- Hover Border Effect -->
                            <div :class="[
                                'absolute inset-0 border-0 transition-all duration-500 md:group-hover:border-[8px] z-30 pointer-events-none border-brand-red/10',
                                pillar.color === 'brand-red' ? 'md:border-brand-red/30' : 'md:border-brand-green/30'
                            ]"></div>
                        </div>
                    </div>

                    <!-- Navigation Controls - Right -->
                    <div
                        class="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-40 md:translate-x-8 opacity-80 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all duration-500">
                        <button @click="scrollPillars(pillarsCarousel.clientWidth)"
                            class="w-10 h-10 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm text-brand-dark shadow-xl flex items-center justify-center hover:bg-brand-green hover:text-white transition-all duration-300 ring-2 md:ring-4 ring-black/5">
                            <svg class="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-300 ease-in"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="selectedPillar"
                        class="fixed inset-0 z-[70] flex items-center justify-center bg-brand-dark/40 backdrop-blur-xl p-4 md:p-8">
                        <div
                            class="relative w-full max-w-3xl md:max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
                            <!-- Close Button -->
                            <button @click="closePillarDetail"
                                class="absolute top-4 right-4 z-50 w-10 h-10 bg-brand-dark text-white flex items-center justify-center hover:bg-brand-red transition-colors shadow-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <!-- Visual Side -->
                            <div class="w-full md:w-5/12 relative min-h-[180px] md:min-h-full shrink-0">
                                <img :src="selectedPillar.image" :alt="selectedPillar.title"
                                    class="absolute inset-0 w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent"></div>
                                <div class="absolute bottom-6 md:bottom-12 left-6 md:left-12">
                                    <span class="text-[6rem] md:text-[12rem] font-black text-white/20 leading-none">
                                        {{ selectedPillar.id }}
                                    </span>
                                </div>
                            </div>

                            <!-- Content Side -->
                            <div class="w-full md:w-7/12 p-6 md:p-10 lg:p-12 bg-white flex flex-col justify-center">
                                <div
                                    :class="['w-12 md:w-16 h-1 mb-4 md:mb-6', selectedPillar.color === 'brand-red' ? 'bg-brand-red' : 'bg-brand-green']">
                                </div>
                                <h3
                                    class="text-2xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase italic leading-tight mb-4 md:mb-6">
                                    {{ selectedPillar.title }}</h3>
                                <p
                                    class="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed font-medium mb-6 md:mb-8">
                                    {{ selectedPillar.detail }}
                                </p>
                                <div class="space-y-4 md:space-y-6">
                                    <div class="flex items-center gap-3 text-brand-dark/40">
                                        <div class="w-6 md:w-8 h-[1px] md:h-[2px] bg-current"></div>
                                        <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest">Job
                                            Kimani 2027
                                            Manifesto</span>
                                    </div>
                                    <button @click="volunteerModalOpen = true"
                                        class="w-full md:w-auto bg-brand-dark text-white px-6 md:px-10 py-3.5 md:py-4 text-xs md:text-sm font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl">
                                        Support This Pillar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>

        <!-- Impact Section -->
        <section id="impact" class="py-12 md:py-24 bg-white scroll-mt-24">
            <div class="max-w-7xl mx-auto px-4 md:px-6">
                <div class="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase italic mb-3 md:mb-4 tracking-tight text-brand-dark">
                        <span class="text-brand-red">Proven</span> Impact
                    </h2>
                    <p class="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">Beyond promises, we deliver. Here is
                        how we have transformed Nakuru
                        Viwandani
                        through dedicated service.</p>
                </div>

                <!-- Stats Grid -->
                <div
                    class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y-2 border-brand-dark/10 py-8 md:py-12">
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-brand-green mb-2">15k+</div>
                        <div class="text-xs md:text-sm text-brand-dark/60 font-bold uppercase tracking-widest">Active
                            Supporters</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-brand-red mb-2">30+</div>
                        <div class="text-xs md:text-sm text-brand-dark/60 font-bold uppercase tracking-widest">Projects
                            Done</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-brand-green mb-2">80M</div>
                        <div class="text-xs md:text-sm text-brand-dark/60 font-bold uppercase tracking-widest">Funds
                            Mobilized</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-brand-red mb-2">100%</div>
                        <div class="text-xs md:text-sm text-brand-dark/60 font-bold uppercase tracking-widest">
                            Transparency</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Action Center -->
        <section id="join" class="py-12 md:py-24 pb-32 md:pb-48 bg-brand-light scroll-mt-24">
            <div class="max-w-7xl mx-auto px-4 md:px-6">
                <div class="text-center mb-10 md:mb-16">
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase italic mb-3 md:mb-4 tracking-tight text-brand-dark">
                        <span class="text-brand-red">Get</span> Involved
                    </h2>
                    <p class="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">
                        Securing our future starts with securing your vote. Follow these four simple steps to ensure you
                        are ready for 2027.
                    </p>
                </div>

                <!-- Voter Registration Carousel -->
                <div class="relative group max-w-7xl mx-auto mb-8 md:mb-12">
                    <div ref="voterCarousel"
                        class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-6 gap-4 md:gap-6"
                        @mouseenter="stopCarousel" @mouseleave="startCarousel">

                        <!-- Step 1 -->
                        <div class="flex-none w-full snap-center">
                            <div class="relative h-[350px] md:h-[450px] overflow-hidden shadow-2xl bg-brand-dark">
                                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                                    class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Verify Status">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent">
                                </div>
                                <div class="absolute bottom-12 md:bottom-16 left-0 p-6 md:p-12 text-left z-10">
                                    <span
                                        class="text-brand-green font-black text-5xl md:text-6xl opacity-20 block mb-2">01</span>
                                    <h3
                                        class="text-2xl md:text-3xl font-black text-white uppercase italic mb-3 md:mb-4">
                                        Verify Your Status</h3>
                                    <p class="text-gray-300 text-sm md:text-lg max-w-md">Start by checking your current
                                        registration
                                        status on the
                                        official IEBC voter portal to confirm your details.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="flex-none w-full snap-center">
                            <div class="relative h-[350px] md:h-[450px] overflow-hidden shadow-2xl bg-brand-dark">
                                <img src="https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&w=800&q=80"
                                    class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Locate Center">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent">
                                </div>
                                <div class="absolute bottom-12 md:bottom-16 left-0 p-6 md:p-12 text-left z-10">
                                    <span
                                        class="text-brand-green font-black text-5xl md:text-6xl opacity-20 block mb-2">02</span>
                                    <h3
                                        class="text-2xl md:text-3xl font-black text-white uppercase italic mb-3 md:mb-4">
                                        Locate Your Center</h3>
                                    <p class="text-gray-300 text-sm md:text-lg max-w-md">Identify the nearest IEBC
                                        registration center
                                        in Naivasha
                                        Viwandani for a physical visit.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="flex-none w-full snap-center">
                            <div class="relative h-[350px] md:h-[450px] overflow-hidden shadow-2xl bg-brand-dark">
                                <img src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80"
                                    class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Documentation">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent">
                                </div>
                                <div class="absolute bottom-12 md:bottom-16 left-0 p-6 md:p-12 text-left z-10">
                                    <span
                                        class="text-brand-green font-black text-5xl md:text-6xl opacity-20 block mb-2">03</span>
                                    <h3
                                        class="text-2xl md:text-3xl font-black text-white uppercase italic mb-3 md:mb-4">
                                        Bring Your ID</h3>
                                    <p class="text-gray-300 text-sm md:text-lg max-w-md">Ensure you have your original
                                        National ID card
                                        or a valid
                                        Kenyan Passport for the biometric capture process.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 4 -->
                        <div class="flex-none w-full snap-center">
                            <div class="relative h-[350px] md:h-[450px] overflow-hidden shadow-2xl bg-brand-dark">
                                <img src="https://images.unsplash.com/photo-1526666361175-e3595627c376?auto=format&fit=crop&w=800&q=80"
                                    class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Success">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent">
                                </div>
                                <div class="absolute bottom-12 md:bottom-16 left-0 p-6 md:p-12 text-left z-10">
                                    <span
                                        class="text-brand-green font-black text-5xl md:text-6xl opacity-20 block mb-2">04</span>
                                    <h3
                                        class="text-2xl md:text-3xl font-black text-white uppercase italic mb-3 md:mb-4">
                                        Confirm Registration
                                    </h3>
                                    <p class="text-gray-300 text-sm md:text-lg max-w-md">Complete the process, collect
                                        your
                                        acknowledgment slip, and
                                        you're officially part of the 2027 decision-makers!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Carousel Navigation -->
                    <div class="absolute top-1/2 -translate-y-1/2 left-2 md:-left-8 z-20">
                        <button @click="scrollCarousel(-400)"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white text-brand-dark shadow-xl flex items-center justify-center hover:bg-brand-green hover:text-white transition-all">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M15 19l-7-7 7-7">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div class="absolute top-1/2 -translate-y-1/2 right-2 md:-right-8 z-20">
                        <button @click="scrollCarousel(400)"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white text-brand-dark shadow-xl flex items-center justify-center hover:bg-brand-green hover:text-white transition-all">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <!-- Action Cards (Overlaying Carousel) -->
                    <div
                        class="relative md:absolute bottom-0 left-0 right-0 z-30 px-4 md:px-12 mt-8 md:mt-0 md:translate-y-1/2">
                        <div class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                            <!-- Volunteer Card -->
                            <div
                                class="bg-white p-8 md:p-10 lg:p-12 shadow-2xl border-t-8 border-brand-red hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group/card flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                                <div class="text-left">
                                    <h4
                                        class="text-xl md:text-2xl lg:text-3xl font-black text-brand-dark uppercase italic leading-tight mb-1 md:mb-2">
                                        Ready to Serve?
                                    </h4>
                                    <p class="text-sm md:text-base lg:text-lg text-gray-600">Join our dedicated ground
                                        mobilization team today.</p>
                                </div>
                                <button @click="volunteerModalOpen = true"
                                    class="bg-brand-green text-white px-8 md:px-12 lg:px-14 py-3 md:py-4 lg:py-6 font-black uppercase tracking-widest text-xs md:text-sm hover:bg-brand-dark transition-all shadow-xl whitespace-nowrap">
                                    Volunteer Now
                                </button>
                            </div>

                            <!-- Donate Card -->
                            <div
                                class="bg-brand-red p-8 md:p-10 lg:p-12 shadow-2xl border-t-8 border-white hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group/card flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                                <div class="text-left">
                                    <h4
                                        class="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase italic leading-tight mb-1 md:mb-2">
                                        Fuel the Mission
                                    </h4>
                                    <p class="text-sm md:text-base lg:text-lg text-white/80">Support the campaign with a
                                        financial contribution.</p>
                                </div>
                                <button @click="donationModalOpen = true"
                                    class="bg-white text-brand-red px-8 md:px-12 lg:px-14 py-3 md:py-4 lg:py-6 font-black uppercase tracking-widest text-xs md:text-sm hover:bg-stone-100 transition-all shadow-xl whitespace-nowrap">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Donation Modal -->
        <div v-if="donationModalOpen"
            class="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/80 backdrop-blur-md p-4">
            <div
                class="bg-white rounded-none max-w-md w-full p-6 md:p-8 shadow-2xl animate-fade-in-up border-t-8 border-brand-red">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Donate via M-Pesa</h3>
                    <button @click="donationModalOpen = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>

                <form class="space-y-4"
                    @submit.prevent="window.alert('M-Pesa prompt sent!'); donationModalOpen = false;">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" placeholder="0712 345 678"
                            class="w-full px-4 py-3 rounded-none border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-gray-50">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div class="grid grid-cols-3 gap-3 mb-3">
                            <button type="button"
                                class="py-2 border border-gray-300 rounded-none hover:border-brand-red hover:text-brand-red transition">500</button>
                            <button type="button"
                                class="py-2 border border-gray-300 rounded-none hover:border-brand-red hover:text-brand-red transition">1000</button>
                            <button type="button"
                                class="py-2 border border-brand-red bg-red-50 text-brand-red rounded-none font-bold">5000</button>
                        </div>
                        <input type="number" placeholder="Enter custom amount"
                            class="w-full px-4 py-3 rounded-none border border-gray-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red bg-gray-50">
                    </div>
                    <button type="submit"
                        class="w-full bg-brand-red text-white font-bold py-4 rounded-none hover:bg-red-800 transition shadow-lg">
                        Send Request
                    </button>
                </form>
                <p class="text-center text-xs text-gray-400 mt-4">Transactions are secure and transparent.</p>
            </div>
        </div>

        <!-- Volunteer Modal -->
        <div v-if="volunteerModalOpen"
            class="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/80 backdrop-blur-md p-4">
            <div
                class="bg-white rounded-none max-w-md w-full p-6 md:p-8 shadow-2xl animate-fade-in-up border-t-8 border-brand-green">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Join the Team</h3>
                    <button @click="volunteerModalOpen = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>

                <form class="space-y-4"
                    @submit.prevent="window.alert('We will contact you shortly!'); volunteerModalOpen = false;">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" placeholder="John Doe"
                            class="w-full px-4 py-3 rounded-none border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green bg-gray-50">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" placeholder="0712 345 678"
                            class="w-full px-4 py-3 rounded-none border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green bg-gray-50">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">How can you help?</label>
                        <select
                            class="w-full px-4 py-3 rounded-none border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green bg-gray-50">
                            <option>Mobilization & Ground Team</option>
                            <option>Event Organizing</option>
                            <option>Social Media</option>
                            <option>Professional Skills (Legal, Media, etc.)</option>
                        </select>
                    </div>
                    <button type="submit"
                        class="w-full bg-brand-green text-white font-bold py-4 rounded-none hover:bg-green-800 transition shadow-lg">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>

        <!-- Footer -->
        <footer
            class="bg-gradient-to-r from-brand-dark via-slate-900 to-brand-dark text-gray-400 py-16 border-t border-white/5">
            <div class="max-w-7xl mx-auto px-6">
                <div
                    class="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 border-b border-white/5 pb-12">
                    <!-- Left: Brand -->
                    <div class="relative text-center md:text-left group md:pl-20 w-full md:w-auto">
                        <div
                            class="absolute left-1/2 -translate-x-1/2 md:-left-40 top-1/2 -translate-y-1/2 md:translate-x-0 w-40 h-40 md:w-80 md:h-80 opacity-20 md:opacity-25 pointer-events-none mix-blend-screen transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                            <img src="/images/Gemini_Generated_Image_tpx8m9tpx8m9tpx8.png"
                                class="w-full h-full object-contain filter invert grayscale contrast-200"
                                style="mix-blend-mode: screen;" alt="DCP Symbol">
                        </div>

                        <div class="relative z-10">
                            <span
                                class="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none block mb-2">
                                <span class="inline-block -ml-1 md:-ml-2">DCP</span> | <span
                                    class="text-brand-green text-2xl md:text-3xl uppercase">Job Kimani Kang'u</span>
                                <span class="text-brand-red text-2xl md:text-3xl">2027</span>
                            </span>
                            <p
                                class="text-[0.6rem] md:text-sm font-bold text-gray-500 uppercase tracking-[0.2em] md:tracking-widest leading-relaxed">
                                Democratic for the Citizens Party</p>
                        </div>
                    </div>

                    <!-- Middle: Navigation Context -->
                    <div class="flex flex-col items-center gap-8 w-full md:w-auto">
                        <div
                            class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs md:text-sm font-bold uppercase tracking-widest">
                            <a href="#vision" class="hover:text-white transition-colors">Vision</a>
                            <a href="#agenda" class="hover:text-white transition-colors">Agenda</a>
                            <a href="#impact" class="hover:text-white transition-colors">Impact</a>
                            <a href="#join" class="hover:text-brand-red transition-colors font-black">Join</a>
                        </div>
                        <div
                            class="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[0.65rem] md:text-base uppercase tracking-widest font-bold text-gray-400">
                            <a href="#" class="hover:text-white transition-colors">Facebook</a>
                            <a href="#" class="hover:text-white transition-colors">Twitter</a>
                            <a href="#" class="hover:text-white transition-colors">Instagram</a>
                        </div>
                    </div>

                    <!-- Right: Compact Action Badge -->
                    <div
                        class="shrink-0 bg-white/5 p-2 rounded-none border border-white/10 hover:bg-white/10 transition-all group overflow-hidden md:ml-auto">
                        <img src="/images/638912909345130000.png" alt="Vote - Be a Chooser"
                            class="w-28 md:w-44 h-auto brightness-110 contrast-125 transition-transform group-hover:scale-105 object-contain">
                    </div>
                </div>

                <div
                    class="pt-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 text-center md:text-left">
                    <div class="max-w-[280px] md:max-w-none">
                        &copy; 2026 DCP - Democratic for the Citizens Party. All rights reserved.
                        <span
                            class="opacity-[0.05] select-none pointer-events-none ml-1 uppercase font-normal tracking-normal text-[0.4rem]">Crafted
                            by W.A.M</span>
                    </div>

                    <div class="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
                        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="https://nderu.ke" target="_blank"
                            class="hover:text-brand-red transition-colors whitespace-nowrap">
                            CONTRIBUTORS: NDERU.KE & TERESIAH
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
