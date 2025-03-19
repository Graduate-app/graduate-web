import { useEffect, useState } from 'react';
import GraduateFormDialog from '../../dialog/GraduateFormDialog';
import { readData } from '../../../db';
import { Graduand } from '../../../types';
import Dashboard from '../../../components/Dashboard';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const MainPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState<Graduand | null>(null);

  const fetchData = async () => {
    const res = await readData();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="px-[80px] py-[16px] h-[81.3vh]">
        {data && <Dashboard data={data} />}

        {!data && (
          <button onClick={() => setOpenForm(true)}>Заповнити форму</button>
        )}
        <GraduateFormDialog
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            fetchData();
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
