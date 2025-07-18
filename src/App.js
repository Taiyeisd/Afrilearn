import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    // signInWithCustomToken, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut as firebaseSignOut 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    // addDoc, 
    // getDocs, 
    query, 
    // where, 
    onSnapshot,
    Timestamp,
    setLogLevel // Added for debugging
} from 'firebase/firestore';
import { BookOpen, User, LogOut, Menu, X, Search, Filter, Briefcase, Users, Info, DollarSign, BarChart2, Settings, PlayCircle, Award, MessageSquare, CheckCircle, ShoppingCart } from 'lucide-react';

// --- Firebase Configuration ---
// NOTE: __firebase_config will be injected by the environment.
// __app_id will also be injected.
const firebaseConfig = {
     apiKey: "AIzaSyAm5Piicz8ySqtyLgHf9uP3Gkujnw6tDJs",
  authDomain: "afrilearn-c0952.firebaseapp.com",
  projectId: "afrilearn-c0952",
  storageBucket: "afrilearn-c0952.firebasestorage.app",
  messagingSenderId: "158059318417",
  appId: "1:158059318417:web:60c37e5e2118914e128330",
  measurementId: "G-N8MDV46CS8"
};

// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-lms-app';
const appId = 'default-lms-app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setLogLevel('debug'); // Enabled for Firestore debugging

// --- Mock Data (will be replaced by Firestore data) ---
const MOCK_COURSES = [
    { id: '1', title: 'Introduction to Nigerian History', university: 'University of Lagos', category: 'Humanities', price: 5000, currency: 'NGN', description: 'A comprehensive overview of Nigerian history from pre-colonial times to the present day. Taught by renowned historians.', instructor: 'Prof. Adebayo Williams', duration: '8 weeks', level: 'Beginner', modules: [{title: 'Module 1: Pre-Colonial Era', videos: ['video1_url'], quizzes: [{title: 'Quiz 1'}]}], rating: 4.5, enrolledStudents: 1200, language: 'English', certificate: true, prerequisites: ['None'] },
    { id: '2', title: 'Digital Marketing for SMEs in Africa', university: 'Pan-Atlantic University', category: 'Business', price: 7500, currency: 'NGN', description: 'Learn practical digital marketing strategies tailored for small and medium enterprises operating in the African market.', instructor: 'Dr. Funke Adeosun', duration: '6 weeks', level: 'Intermediate', modules: [{title: 'Module 1: SEO Basics'}], rating: 4.8, enrolledStudents: 850, language: 'English', certificate: true, prerequisites: ['Basic computer literacy'] },
    { id: '3', title: 'Sustainable Agriculture in West Africa', university: 'Obafemi Awolowo University', category: 'Agriculture', price: 6000, currency: 'NGN', description: 'Explore sustainable farming practices relevant to the West African climate and soil conditions.', instructor: 'Dr. Chinedu Okoro', duration: '10 weeks', level: 'Beginner', modules: [{title: 'Module 1: Soil Management'}], rating: 4.6, enrolledStudents: 950, language: 'English', certificate: true, prerequisites: ['None'] },
    { id: '4', title: 'Introduction to Python Programming', university: 'Covenant University', category: 'Technology', price: 10000, currency: 'NGN', description: 'A beginner-friendly course to learn the fundamentals of Python programming, a versatile language for web development, data science, and more.', instructor: 'Engr. Tolu Adeyemi', duration: '12 weeks', level: 'Beginner', modules: [{title: 'Module 1: Python Basics'}], rating: 4.9, enrolledStudents: 2500, language: 'English', certificate: true, prerequisites: ['None'] },
    { id: '5', title: 'African Art & Culture', university: 'Ahmadu Bello University', category: 'Arts', price: 4500, currency: 'NGN', description: 'Discover the rich diversity of African art forms, their cultural significance, and historical context.', instructor: 'Prof. Amina Bello', duration: '6 weeks', level: 'All Levels', modules: [{title: 'Module 1: Traditional Sculptures'}], rating: 4.7, enrolledStudents: 700, language: 'English', certificate: true, prerequisites: ['None'] },
];

// --- Helper Functions ---
const formatCurrency = (amount, currency = 'NGN') => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
};

// --- Custom Modal for Alerts/Confirmations ---
const CustomModal = ({ isOpen, title, message, onClose, onConfirm, showConfirmButton = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className={`flex ${showConfirmButton ? 'justify-between' : 'justify-end'}`}>
                    {showConfirmButton && (
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                        >
                            Confirm
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 rounded-md ${showConfirmButton ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                        {showConfirmButton ? 'Cancel' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Components ---

const Navbar = ({ setCurrentPage, user, handleSignOut }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', page: 'home' },
        { name: 'Courses', page: 'courses' },
        { name: 'For Universities', page: 'universities' },
        { name: 'About Us', page: 'about' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => setCurrentPage('home')} className="flex-shrink-0 text-2xl font-bold text-green-600">
                            AfriLearn
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <button
                                    key={link.name}
                                    onClick={() => setCurrentPage(link.page)}
                                    className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        {user ? (
                            <div className="ml-4 flex items-center md:ml-6">
                                <button onClick={() => setCurrentPage('dashboard')} className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                                    <User size={18} className="mr-1" /> Dashboard
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="ml-2 bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                                >
                                    <LogOut size={18} className="mr-1" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setCurrentPage('auth')}
                                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                            >
                                <User size={18} className="mr-1" /> Login / Sign Up
                            </button>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => { setCurrentPage(link.page); setIsMobileMenuOpen(false); }}
                                className="text-gray-700 hover:bg-green-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="px-2 space-y-1">
                                <button onClick={() => {setCurrentPage('dashboard'); setIsMobileMenuOpen(false);}} className="text-gray-700 hover:bg-green-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors flex items-center">
                                    <User size={18} className="mr-2" /> Dashboard
                                </button>
                                <button
                                    onClick={() => {handleSignOut(); setIsMobileMenuOpen(false);}}
                                    className="bg-red-500 text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors flex items-center"
                                >
                                     <LogOut size={18} className="mr-2" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="px-2">
                                <button
                                    onClick={() => {setCurrentPage('auth'); setIsMobileMenuOpen(false);}}
                                    className="bg-green-600 text-white hover:bg-green-700 block w-full px-3 py-2 rounded-md text-base font-medium text-left transition-colors flex items-center"
                                >
                                    <User size={18} className="mr-2" /> Login / Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = ({ userId }) => { // Added userId prop
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-green-400">AfriLearn</h3>
                        <p className="text-gray-400">Empowering Africa through accessible, quality education. Courses taught by indigenous faculty, in local currencies.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-green-400">Home</a></li>
                            <li><a href="/courses" className="text-gray-400 hover:text-green-400">Courses</a></li>
                            <li><a href="/uni" className="text-gray-400 hover:text-green-400">For Universities</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-green-400">About Us</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-green-400">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <p className="text-gray-400 mb-2">123 Learning Drive, Lagos, Nigeria</p>
                        <p className="text-gray-400 mb-2">info@afrilearn.africa</p>
                        <div className="flex space-x-4 mt-2">
                            {/* Placeholder for social media icons */}
                            <a href="/facebook" className="text-gray-400 hover:text-green-400">FB</a>
                            <a href="/twitter" className="text-gray-400 hover:text-green-400">TW</a>
                            <a href="/linkedin" className="text-gray-400 hover:text-green-400">LN</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AfriLearn. All rights reserved. User ID (for support): {userId || 'Not logged in'}</p>
                </div>
            </div>
        </footer>
    );
};

const CourseCard = ({ course, setCurrentPage, setSelectedCourseId }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <img 
                src={`https://placehold.co/600x400/22c55e/FFFFFF?text=${encodeURIComponent(course.title.substring(0,20))}`} 
                alt={course.title} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-1">By: {course.instructor || course.university}</p>
                <p className="text-sm text-gray-500 mb-3">{course.category}</p>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">{formatCurrency(course.price, course.currency)}</span>
                    <span className="text-sm text-yellow-500 flex items-center">
                        {course.rating || 'N/A'} &#9733; 
                        <span className="text-gray-500 ml-1">({course.enrolledStudents || 0})</span>
                    </span>
                </div>
                <p className="text-gray-700 text-sm mb-4 flex-grow">{course.description.substring(0, 100)}...</p>
                <button
                    onClick={() => { setSelectedCourseId(course.id); setCurrentPage('courseDetail'); }}
                    className="mt-auto w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
                >
                    <BookOpen size={18} className="mr-2" /> View Course
                </button>
            </div>
        </div>
    );
};

const HomePage = ({ setCurrentPage, setSelectedCourseId, courses }) => {
    const featuredCourses = courses.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Unlock Your Potential with AfriLearn</h1>
                    <p className="text-lg sm:text-xl mb-8">High-quality, locally relevant online courses from Africa's top universities. Learn at your own pace, in your local currency.</p>
                    <button
                        onClick={() => setCurrentPage('courses')}
                        className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg"
                    >
                        Explore Courses
                    </button>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why AfriLearn?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-lg shadow">
                            <BookOpen size={48} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Indigenous Faculty</h3>
                            <p className="text-gray-600">Courses taught by experts from African universities, ensuring cultural and contextual relevance.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-lg shadow">
                            <DollarSign size={48} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Affordable & Local Currency</h3>
                            <p className="text-gray-600">Fair pricing with options to pay in your local currency, making education accessible.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-lg shadow">
                            <Users size={48} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Focused</h3>
                            <p className="text-gray-600">Connect with fellow learners and instructors, building a supportive learning network.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Featured Courses Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Courses</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map(course => (
                            <CourseCard key={course.id} course={course} setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} />
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <button
                            onClick={() => setCurrentPage('courses')}
                            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-md"
                        >
                            View All Courses
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                                <Search size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Discover Courses</h3>
                            <p className="text-gray-600">Browse our diverse catalog of courses from leading African institutions.</p>
                        </div>
                        <div className="p-6">
                           <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                                <PlayCircle size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Learn Online</h3>
                            <p className="text-gray-600">Engage with high-quality video lectures, readings, and assignments at your own pace.</p>
                        </div>
                         <div className="p-6">
                            <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                                <Award size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Earn Certificates</h3>
                            <p className="text-gray-600">Receive recognized certificates upon course completion to boost your career.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action for Universities */}
            <section className="py-16 bg-green-50">
                 <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Partner with AfriLearn</h2>
                    <p className="text-lg text-gray-700 mb-8">Join us in revolutionizing education in Africa. Offer your courses to a wider audience and empower learners across the continent.</p>
                    <button
                        onClick={() => setCurrentPage('universities')}
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-lg"
                    >
                        Become a Partner
                    </button>
                </div>
            </section>
        </div>
    );
};

const CoursesPage = ({ setCurrentPage, setSelectedCourseId, courses }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(''); // e.g., "0-5000", "5001-10000", "10001+"
    // Add more filters like university, level, etc.

    const categories = [...new Set(courses.map(course => course.category))];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
        const matchesPrice = priceFilter ? 
            (priceFilter === "0-5000" && course.price <= 5000) ||
            (priceFilter === "5001-10000" && course.price > 5000 && course.price <= 10000) ||
            (priceFilter === "10001+" && course.price > 10000)
            : true;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Explore Our Courses</h1>
                <p className="text-lg text-center text-gray-600 mb-12">Find the perfect course to advance your skills and knowledge.</p>

                {/* Filters and Search */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Courses</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by title or keyword..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                            <select
                                id="category"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Filter by Price (NGN)</label>
                            <select
                                id="price"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            >
                                <option value="">All Prices</option>
                                <option value="0-5000">₦0 - ₦5,000</option>
                                <option value="5001-10000">₦5,001 - ₦10,000</option>
                                <option value="10001+">₦10,001+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-xl text-gray-600">No courses match your current filters.</p>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CourseDetailPage = ({ courseId, setCurrentPage, courses, user, handleEnrollCourse, showModal }) => {
    const course = courses.find(c => c.id === courseId);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    if (!course) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <BookOpen size={64} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Course Not Found</h2>
            <p className="text-gray-500 mb-6">The course you are looking for does not exist or may have been removed.</p>
            <button
                onClick={() => setCurrentPage('courses')}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
            >
                Back to Courses
            </button>
          </div>
        );
    }
    
    const isEnrolled = user?.enrolledCourses?.includes(courseId); 

    const initiateEnrollment = () => {
        if (!user) {
            showModal("Login Required", "Please log in or sign up to enroll in courses.", () => setCurrentPage('auth'));
            return;
        }
        if (course.price > 0) {
            setShowPaymentModal(true);
        } else {
            handleEnrollCourse(course.id); 
        }
    };

    const handlePaymentSuccess = () => {
        console.log("Simulating successful payment for course:", course.title);
        handleEnrollCourse(course.id);
        setShowPaymentModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img 
                            className="h-64 w-full object-cover md:w-64" 
                            src={`https://placehold.co/600x400/16a34a/FFFFFF?text=${encodeURIComponent(course.title.substring(0,15))}`} 
                            alt={course.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; }}
                        />
                    </div>
                    <div className="p-8 flex-grow">
                        <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">{course.category}</div>
                        <h1 className="block mt-1 text-3xl leading-tight font-bold text-gray-900">{course.title}</h1>
                        <p className="mt-2 text-gray-600">Taught by: <span className="font-medium">{course.instructor}</span> at <span className="font-medium">{course.university}</span></p>
                        <div className="mt-4 flex items-center">
                            <span className="text-yellow-500 flex items-center mr-4">
                                {course.rating || 'N/A'} &#9733; 
                                <span className="text-gray-500 ml-1">({course.enrolledStudents || 0} students)</span>
                            </span>
                            <span className="text-gray-600">{course.duration}</span>
                        </div>
                         <p className="mt-4 text-2xl font-bold text-green-700">{formatCurrency(course.price, course.currency)}</p>
                    </div>
                </div>

                <div className="px-8 py-6 border-t border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">About this course</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"><BookOpen size={20} className="mr-2 text-green-600"/>What you'll learn</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Key concepts of {course.category.toLowerCase()}</li>
                                <li>Practical skills applicable in real-world scenarios</li>
                                <li>In-depth understanding of {course.title.toLowerCase()}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"><CheckCircle size={20} className="mr-2 text-green-600"/>Requirements</h3>
                             <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {course.prerequisites && course.prerequisites.length > 0 && course.prerequisites[0] !== 'None' ? 
                                    course.prerequisites.map((prereq, index) => <li key={index}>{prereq}</li>) :
                                    <li>No prior experience required.</li>
                                }
                            </ul>
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center"><PlayCircle size={20} className="mr-2 text-green-600"/>Course Content</h3>
                    <div className="space-y-2 mb-6">
                        {course.modules && course.modules.map((module, index) => (
                            <div key={index} className="p-3 bg-gray-100 rounded-md">
                                <p className="font-medium text-gray-700">{module.title}</p>
                            </div>
                        ))}
                        {!course.modules && <p className="text-gray-500">Course content details coming soon.</p>}
                    </div>

                    {isEnrolled ? (
                         <button 
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
                            disabled 
                         >
                            <PlayCircle size={22} className="mr-2" /> Go to Course Content (Enrolled)
                        </button>
                    ) : (
                        <button
                            onClick={initiateEnrollment}
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center"
                        >
                           <ShoppingCart size={22} className="mr-2" /> Enroll Now for {formatCurrency(course.price, course.currency)}
                        </button>
                    )}
                     <button
                        onClick={() => setCurrentPage('courses')}
                        className="mt-4 w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]"> {/* Ensure payment modal is above navbar if needed, but below custom modal */}
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Enrollment</h2>
                        <p className="text-gray-600 mb-2">You are about to enroll in: <strong>{course.title}</strong></p>
                        <p className="text-xl font-semibold text-green-600 mb-6">Total: {formatCurrency(course.price, course.currency)}</p>
                        
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2">Select Payment Method (Placeholder):</p>
                            <div className="space-y-2">
                                <button className="w-full p-3 border rounded-md hover:bg-gray-50 text-left">Pay with Paystack (Not Implemented)</button>
                                <button className="w-full p-3 border rounded-md hover:bg-gray-50 text-left">Pay with Flutterwave (Not Implemented)</button>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mb-4">Note: This is a simulation. Clicking "Confirm Payment" will simulate a successful payment and enroll you in the course.</p>
                        
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={() => setShowPaymentModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handlePaymentSuccess}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Confirm Payment (Simulated)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AuthPage = ({ setCurrentPage, handleAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log(`Attempting ${isLogin ? 'login' : 'signup'} for ${email}`);

        // Client-side password length check
        if (password.length < 6) {
            setError("Password should be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Login successful for:", email);
                handleAuthSuccess(); 
            } else { // Signup
                if (!name.trim()) {
                    setError("Name is required for sign up.");
                    setLoading(false);
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("Signup successful for:", email, "User UID:", user.uid);
                
                const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, 'data');
                console.log("Attempting to set user profile at:", userDocRef.path);
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: name,
                    email: user.email,
                    joinedAt: Timestamp.now(),
                    enrolledCourses: [] 
                });
                console.log("User profile created in Firestore for:", user.uid);
                handleAuthSuccess(); 
            }
        } catch (err) {
            console.error("Auth error:", err.code, err.message);
            if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else if (err.code === 'auth/operation-not-allowed') {
                setError("Email/Password sign-in is not enabled for this project. Please contact support or check Firebase console settings.");
                console.error("IMPORTANT: Email/Password sign-in method might be disabled in your Firebase project's Authentication settings.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("This email address is already in use. Try logging in or use a different email.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Your Full Name"
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="•••••••• (min. 6 characters)"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center py-2 bg-red-50 rounded-md">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
                 <div className="text-sm text-center mt-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="font-medium text-gray-600 hover:text-gray-500"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = ({ user, setCurrentPage, enrolledCoursesData, courses }) => {
    if (!user) {
        setCurrentPage('auth');
        return <div className="min-h-screen flex items-center justify-center"><p>Loading user data or redirecting...</p></div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name || user.email}!</h1>
                    <p className="text-gray-600">This is your learning dashboard. Manage your courses and track your progress.</p>
                    <p className="text-xs text-gray-500 mt-1">User ID: {user.uid}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <BookOpen size={24} className="text-blue-500 mr-3"/>
                            <div>
                                <p className="text-3xl font-semibold text-gray-800">{enrolledCoursesData.length}</p>
                                <p className="text-gray-500">Courses Enrolled</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <CheckCircle size={24} className="text-green-500 mr-3"/>
                            <div>
                                <p className="text-3xl font-semibold text-gray-800">0</p> 
                                <p className="text-gray-500">Courses Completed</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <Award size={24} className="text-yellow-500 mr-3"/>
                            <div>
                                <p className="text-3xl font-semibold text-gray-800">0</p> 
                                <p className="text-gray-500">Certificates Earned</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Enrolled Courses</h2>
                    {enrolledCoursesData.length > 0 ? (
                        <div className="space-y-6">
                            {enrolledCoursesData.map(course => (
                                <div key={course.id} className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <img 
                                        src={`https://placehold.co/150x100/34d399/FFFFFF?text=${encodeURIComponent(course.title.substring(0,10))}`} 
                                        alt={course.title} 
                                        className="w-full md:w-32 h-auto md:h-20 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x100/cccccc/000000?text=Img+Error'; }}
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                        <p className="text-sm text-gray-600">By {course.instructor || course.university}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div> 
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">25% Complete (Placeholder)</p>
                                    </div>
                                    <button 
                                        className="mt-4 md:mt-0 md:ml-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
                                        disabled 
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-xl text-gray-600">You haven't enrolled in any courses yet.</p>
                            <button
                                onClick={() => setCurrentPage('courses')}
                                className="mt-6 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors font-semibold"
                            >
                                Explore Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const UniversitiesPage = ({ setCurrentPage }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <section className="text-center mb-16">
                    <Briefcase size={64} className="mx-auto text-green-600 mb-6" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">Partner with AfriLearn</h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Join us in transforming education across Africa. Share your expertise, reach a wider audience, and empower learners with locally relevant content.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Partner With Us?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <Users size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expand Your Reach</h3>
                            <p className="text-gray-600">Connect with students across Nigeria and eventually, all of Africa. Showcase your institution's academic excellence on a continental stage.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <BarChart2 size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Future-Proof Education</h3>
                            <p className="text-gray-600">Embrace digital learning solutions. We provide the platform and support for you to offer scalable online courses.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <DollarSign size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">New Revenue Streams</h3>
                            <p className="text-gray-600">Benefit from revenue sharing models for course enrollments and explore options for white-label solutions.</p>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <BookOpen size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Locally Relevant Content</h3>
                            <p className="text-gray-600">Champion courses taught by indigenous faculty, tailored to African contexts and needs.</p>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <Settings size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Support</h3>
                            <p className="text-gray-600">We offer onboarding, instructional design support, and a robust platform, so you can focus on quality content.</p>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <MessageSquare size={40} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Growth</h3>
                            <p className="text-gray-600">Work with us to co-create micro-credentials and professional short courses demanded by the African job market.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-16 bg-green-600 text-white p-10 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Partnership Model</h2>
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="mb-4">We believe in mutually beneficial partnerships. Our model includes:</p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-left inline-block">
                            <li>Flexible revenue sharing (e.g., 50/50 or 60/40).</li>
                            <li>Options for white-labeled portals with your university's branding.</li>
                            <li>Faculty training on online pedagogy and course creation.</li>
                            <li>Support for developing in-demand micro-credentials.</li>
                        </ul>
                        <p>We are committed to upholding academic quality and ensuring your accredited content is delivered effectively.</p>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Join the Future of African Education?</h2>
                    <p className="text-gray-600 mb-8">Let's discuss how AfriLearn can help your institution thrive in the digital age. Contact our partnerships team today.</p>
                    <button
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-lg"
                    >
                        Contact Partnerships
                    </button>
                </section>
            </div>
        </div>
    );
};

const AboutUsPage = ({ setCurrentPage }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <section className="text-center mb-16">
                    <Info size={64} className="mx-auto text-green-600 mb-6" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">About AfriLearn</h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        We are an Africa-first e-learning platform dedicated to making quality education accessible, affordable, and locally relevant. Our mission is to empower individuals and institutions across the continent through transformative learning experiences.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To bridge the educational gap in Africa by partnering with local universities and experts to deliver high-quality online courses that are culturally attuned, financially accessible, and directly address the skills needs of the continent.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To be the leading e-learning ecosystem in Africa, fostering a generation of skilled professionals, innovators, and leaders who will drive sustainable development and prosperity across the continent.
                        </p>
                    </div>
                </section>

                 <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Sets Us Apart</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-green-50 rounded-lg shadow">
                            <BookOpen size={36} className="mx-auto text-green-600 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Local Relevance</h3>
                            <p className="text-sm text-gray-600">Content by African educators for African learners.</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg shadow">
                            <DollarSign size={36} className="mx-auto text-green-600 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Affordability</h3>
                            <p className="text-sm text-gray-600">Priced for accessibility, payable in local currencies.</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg shadow">
                            <Users size={36} className="mx-auto text-green-600 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">University Partnerships</h3>
                            <p className="text-sm text-gray-600">Collaborating with esteemed African institutions.</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg shadow">
                            <CheckCircle size={36} className="mx-auto text-green-600 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Quality Focused</h3>
                            <p className="text-sm text-gray-600">Ensuring high standards in course design and delivery.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet Our Team (Coming Soon)</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        We are a passionate team of educators, technologists, and entrepreneurs committed to realizing AfriLearn's vision. More details about our team will be shared here soon.
                    </p>
                </section>

                <section className="text-center bg-green-100 p-10 rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Journey</h2>
                    <p className="text-gray-700 mb-8">
                        Whether you're a student eager to learn, an educator with knowledge to share, or an institution looking to expand your digital footprint, AfriLearn is your partner in growth.
                    </p>
                    <div className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => setCurrentPage('courses')}
                            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Explore Courses
                        </button>
                        <button
                            onClick={() => setCurrentPage('universities')}
                            className="bg-transparent border-2 border-green-600 text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                        >
                            Partner With Us
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};


// --- Main App Component ---
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [user, setUser] = useState(null); 
    const [userData, setUserData] = useState(null); 
    const [courses, setCourses] = useState(MOCK_COURSES); 
    const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
    const [appLoading, setAppLoading] = useState(true); 
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '', onConfirm: null, showConfirmButton: false });


    const showModal = (title, message, onConfirmCallback = null, showConfirm = false) => {
        setModalInfo({
            isOpen: true,
            title,
            message,
            onConfirm: onConfirmCallback,
            showConfirmButton: showConfirm,
        });
    };

    const closeModal = () => {
        setModalInfo({ isOpen: false, title: '', message: '', onConfirm: null, showConfirmButton: false });
    };

    const handleModalConfirm = () => {
        if (modalInfo.onConfirm) {
            modalInfo.onConfirm();
        }
        closeModal();
    };


    // Firebase Authentication Listener
    useEffect(() => {
        console.log("Setting up onAuthStateChanged listener.");
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("onAuthStateChanged triggered. Firebase user:", firebaseUser ? firebaseUser.uid : 'null');
            if (firebaseUser) {
                setUser(firebaseUser);
                const userProfileRef = doc(db, `artifacts/${appId}/users/${firebaseUser.uid}/profile`, 'data');
                const userProfileSnap = await getDoc(userProfileRef).catch(() => null);
                if (userProfileSnap?.exists()) {
                    setUserData(userProfileSnap.data());
                } else {
                    setUserData({ 
                        uid: firebaseUser.uid, 
                        email: firebaseUser.email, 
                        name: firebaseUser.displayName || 'User', 
                        enrolledCourses: [] 
                    });
                }
            } else {
                setUser(null);
                setUserData(null);
                setEnrolledCoursesData([]);
                signInAnonymously(auth).catch(error => 
                    console.error("Anonymous sign-in failed:", error)
                );
            }
            setIsAuthReady(true);
            setAppLoading(false); 
            console.log("Auth state ready. isAuthReady:", true, "appLoading:", false);
        });

        // Initial sign-in logic
        if (!auth.currentUser) {
            console.log("No initial token and no current user on mount, attempting initial anonymous sign-in.");
            signInAnonymously(auth)
                .then(() => console.log("Initial anonymous sign-in successful on mount."))
                .catch(error => {
                    console.error("Initial anonymous sign-in failed on mount:", error);
                });
        } else {
            console.log("User already authenticated on mount (session persisted). UID:", auth.currentUser.uid);
            setIsAuthReady(true); 
            setAppLoading(false);
        }
        return () => {
            console.log("Cleaning up onAuthStateChanged listener.");
            unsubscribe();
        };
    }, []); 

    // Fetch courses from Firestore - dependent on isAuthReady
    useEffect(() => {
        if (!isAuthReady) {
            console.log("Course fetching deferred: Auth not ready yet.");
            return; 
        }
        if (!auth.currentUser) {
            console.log("Course fetching deferred: No current user (even anonymous). This shouldn't happen if anonymous sign-in works.");
            setCourses(MOCK_COURSES); 
            return;
        }

        console.log("Auth is ready and user exists (UID:", auth.currentUser.uid,"), attempting to fetch courses.");
        const coursesCollectionPath = `artifacts/${appId}/public/data/courses`;
        const coursesCol = collection(db, coursesCollectionPath);
        const q = query(coursesCol); 

        const unsubscribeCourses = onSnapshot(q, (querySnapshot) => {
            const coursesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(coursesList.length > 0 ? coursesList : MOCK_COURSES);
        }, () => {
            setCourses(MOCK_COURSES);
            showModal("Error Loading Courses", "Could not load course data. Displaying sample courses.");
        });

        return () => {
            console.log("Cleaning up courses listener.");
            unsubscribeCourses();
        };
    }, [isAuthReady]); 
    
    // Fetch enrolled courses details when userData or all courses change
    useEffect(() => {
        if (isAuthReady && userData && userData.enrolledCourses && courses.length > 0) {
            const enrolledDetails = userData.enrolledCourses
                .map(courseId => courses.find(c => c.id === courseId))
                .filter(course => course !== undefined); 
            setEnrolledCoursesData(enrolledDetails);
            console.log("Updated enrolled courses details:", enrolledDetails.length, "items.");
        } else if (isAuthReady && userData && (!userData.enrolledCourses || userData.enrolledCourses.length === 0)) {
             setEnrolledCoursesData([]);
             console.log("User has no enrolled courses or enrolledCourses field is missing/empty.");
        }
    }, [isAuthReady, userData, courses]);


    const handleSignOut = async () => {
        console.log("Attempting sign out for user:", user ? user.uid : 'N/A');
        try {
            await firebaseSignOut(auth);
            console.log("Firebase sign out successful.");
            setCurrentPage('home'); 
        } catch (error) {
            console.error("Sign out error:", error);
            showModal("Sign Out Error", `Failed to sign out: ${error.message}`);
        }
    };
    
    const handleAuthSuccess = () => {
        console.log("Auth process (login/signup) successful. Navigating to dashboard.");
        setCurrentPage('dashboard');
    };

    const handleEnrollCourse = async (courseIdToEnroll) => {
        if (!user || !userData) {
            showModal("Login Required", "Please log in or sign up to enroll.", () => setCurrentPage('auth'));
            return;
        }
    
        if (userData.enrolledCourses?.includes(courseIdToEnroll)) {
            showModal("Already Enrolled", "You are already enrolled in this course!");
            return;
        }
    
        const updatedEnrolledCourses = [...(userData.enrolledCourses || []), courseIdToEnroll];
        const userProfileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, 'data');
        
        try {
            await setDoc(userProfileRef, { enrolledCourses: updatedEnrolledCourses }, { merge: true });
            setUserData(prevData => ({ ...prevData, enrolledCourses: updatedEnrolledCourses }));
            showModal("Enrollment Successful", "You have successfully enrolled in the course!", () => setCurrentPage('dashboard'));
        } catch {
            showModal("Enrollment Failed", "Failed to enroll in the course. Please try again.");
        }
    };


    if (appLoading) { 
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
                <p className="text-xl text-gray-700">Loading AfriLearn...</p>
            </div>
        );
    }


    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} courses={courses} />;
            case 'courses':
                return <CoursesPage setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} courses={courses} />;
            case 'courseDetail':
                return <CourseDetailPage courseId={selectedCourseId} setCurrentPage={setCurrentPage} courses={courses} user={userData} handleEnrollCourse={handleEnrollCourse} showModal={showModal} />;
            case 'auth':
                return <AuthPage setCurrentPage={setCurrentPage} handleAuthSuccess={handleAuthSuccess} />;
            case 'dashboard':
                if (!user || !userData) { 
                    console.log("Dashboard access denied: User or userData not available. Redirecting to auth.");
                    setCurrentPage('auth'); 
                    return null; 
                }
                return <DashboardPage user={userData} setCurrentPage={setCurrentPage} enrolledCoursesData={enrolledCoursesData} courses={courses} />;
            case 'universities':
                return <UniversitiesPage setCurrentPage={setCurrentPage} />;
            case 'about':
                return <AboutUsPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} setSelectedCourseId={setSelectedCourseId} courses={courses} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar setCurrentPage={setCurrentPage} user={user} handleSignOut={handleSignOut} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer userId={user?.uid} />
            <CustomModal 
                isOpen={modalInfo.isOpen}
                title={modalInfo.title}
                message={modalInfo.message}
                onClose={closeModal}
                onConfirm={modalInfo.onConfirm ? handleModalConfirm : null} 
                showConfirmButton={modalInfo.showConfirmButton}
            />
        </div>
    );
};

export default App;

