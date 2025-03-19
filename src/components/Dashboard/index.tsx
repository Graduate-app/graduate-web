import { Graduand } from "../../types";

interface IDashboardProps {
  data: Graduand
}

const Dashboard = ({ data }: IDashboardProps) => {
  return (
    <div>
      <img
        alt="Profile icon"
        src={`${process.env.REACT_APP_SERVER_BASEPATH}${data.profilePicture?.src}`}
        width="200px"
      />
      <p>
        <strong>Ім'я:</strong> {data.firstName}
      </p>
      <p>
        <strong>Прізвище:</strong> {data.lastName}
      </p>
      <p>
        <strong>По батькові:</strong> {data.patronymic}
      </p>
      <p>
        <strong>Електронна пошта:</strong> {data.email}
      </p>
      <p>
        <strong>Номер телефону:</strong> {data.phoneNumber}
      </p>
      <p>
        <strong>Поточна робота:</strong> {data.job}
      </p>
      <p>
        <strong>Чим можу допомогти кафедрі:</strong> {data.departamentHelping}
      </p>

      <div>
        <strong>Ступені:</strong>
        {data.degree.map((deg, index) => (
          <div key={index}>
            <p>
              <strong>Ступінь:</strong> {deg.degree}
            </p>
            <p>
              <strong>Спеціальність:</strong> {deg.major}
            </p>
            <p>
              <strong>Рік вступу:</strong> {deg.enrollmentYear}
            </p>
            <p>
              <strong>Рік закінчення:</strong> {deg.graduationYear}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
