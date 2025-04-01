const Header = () => {
  return (
    <header className="bg-white py-4 px-6 shadow-sm lg:px-16">
      <div className="container mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="h-12 w-12" />
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              Кафедра комп'ютерної інженерії та електроніки
            </h2>
            <p className="text-sm text-gray-600">
              Прикарпатський національний університет імені Василя Стефаника
            </p>
          </div>
        </div>
        <a
          href="https://kkite.pnu.edu.ua/"
          className="mt-2 inline-block rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white md:mt-0"
          target="_blank"
          rel="noreferrer"
        >
          Повний сайт кафедри
        </a>
      </div>
    </header>
  );
};

export default Header;
