function Footer() {
  return (
    <footer className="relative bg-black text-white rounded-lg shadow m-4 border border-white">
 
      <div className="relative z-10 w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img src={"/logo.ico"} className="h-8" alt="Flowbite Logo" />
            <span className="text-2xl font-semibold">File Convertor</span>
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Licensing</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700" />
        <span className="block text-sm text-center">© 2024 <a href="https://github.com/yashGoyal40" className="hover:underline">FileConvertor</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
