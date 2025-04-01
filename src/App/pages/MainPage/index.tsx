import React, { useEffect, useState } from 'react';
import GraduateFormDialog from '../../dialog/GraduateFormDialog';
import { readData } from '../../../db';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const MainPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await readData();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-6 py-16 lg:px-16">
          <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left">
              <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Ваш університет — завжди поруч
              </h1>
              
              <p className="mb-8 text-gray-600">
                Університет цінує своїх випускників. Ми прагнемо підтримувати зв’язок з тими, хто був частиною нашої спільноти. 
                Заповніть коротку форму — це дозволить нам оновити інформацію про вас, запросити на зустрічі випускників 
                та тримати в курсі важливих подій і новин університету.
              </p>

              {data ? (
                <div className="rounded-lg bg-green-50 p-6 text-center lg:text-left">
                  <p className="text-lg font-medium text-green-800">Ви вже заповнили форму!</p>
                </div>
              ) : (
                <button
                  onClick={() => setOpenForm(true)}
                  className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Заповнити форму
                </button>
              )}
            </div>

            <div className="w-full max-w-sm">
              <img 
                src="/graduate.png" 
                alt="Випускниця з дипломом" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <GraduateFormDialog 
        open={openForm} 
        onClose={() => {
          setOpenForm(false);
          fetchData();
        }}
      />
    </div>
  );
};

export default MainPage;
