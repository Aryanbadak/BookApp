export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
                <div className="flex space-x-4 mt-3 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
            </div>
        </footer>
    );
}