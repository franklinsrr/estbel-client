const Navbar = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 bg-black flex items-center justify-center relative"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              >
                <div className="w-4 h-4 bg-white rounded-full absolute top-6"></div>
              </div>
              <span className="text-lg font-semibold text-foreground">
                Estbel
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
