const Header = () => {
  return (
    <div className="flex px-[80px] py-[16px] bg-[#0a0e72] justify-between items-center">
      <div className="flex flex-row gap-[16px] items-center">
        <img src="/logo.png" alt="logo" width="60px" />
        <div className="flex gap-[4px] flex-col">
          <h2 className="text-white font-medium text-[18px]">Кафедра комп'ютерної інженерії та електроніки</h2>
          <p className="text-slate-300 text-[15px]">Прикарпатський національний університет імені Василя Стефаника</p>
        </div>
      </div>
      <a
        href="https://kkite.pnu.edu.ua/"
        className="text-white text-[16px] text-center"
        target="_blank"
        rel="noreferrer"
      >
        Повний сайт <br/> кафедри
      </a>
    </div>
  )  
}

export default Header;