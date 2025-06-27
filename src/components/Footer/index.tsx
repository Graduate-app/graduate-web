const Footer = () => {
  return (
    <footer className="bg-gray-50 py-4">
      <div className="container mx-auto px-6 text-center lg:px-16">
        <p className="text-sm text-gray-500">
          Карпатський національний університет імені Василя Стефаника - {new Date().getFullYear()} р.
        </p>
      </div>
    </footer>
  );
};

export default Footer;