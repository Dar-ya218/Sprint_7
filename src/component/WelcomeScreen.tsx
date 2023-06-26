import { Link } from 'react-router-dom';

 function WelcomeScreen() {
  return (
    <div>
      <h1>Bienvenido/a a la web</h1>
      <p>Es una aplicación para calcular el presupuesto de una página web</p>
      <Link to="/presupuesto">Ir a la pantalla principal</Link>
    </div>
  );
}
export default WelcomeScreen;