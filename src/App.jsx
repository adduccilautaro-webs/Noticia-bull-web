import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import './App.css';

function App() {
  const [estado, setEstado] = useState('cargando');
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initParse = () => {
      // Verificar que Parse está disponible
      if (typeof Parse !== 'object') {
        throw new Error('Parse no está importado correctamente');
      }
      // Asegurar que las claves están configuradas (deberían estar en main.jsx)
    };

    const cargarNoticias = async () => {
      try {
        initParse();
        const Noticia = Parse.Object.extend('Noticia');
        const query = new Parse.Query(Noticia);
        const results = await query.find();
        
        const noticiasData = results.map(obj => ({
          id: obj.id,
          titulo: obj.get('titulo'),
          resumen: obj.get('resumen'),
          activos: obj.get('activos') || []
        }));
        
        setNoticias(noticiasData);
        setEstado('ok');
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error desconocido');
        setEstado('error');
      }
    };

    cargarNoticias();
  }, []);

  if (estado === 'cargando') return <div className="cargando">Cargando...</div>;
  
  if (estado === 'error') {
    return (
      <div style={{ padding: 20, color: 'red', background: '#ffeeee' }}>
        <h2>Error en la aplicación:</h2>
        <pre>{error}</pre>
        <p>Revisa la consola del navegador (Eruda) para más detalles.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>📈 Market Mover News</h1>
        <p>Impacto bursátil de las últimas noticias</p>
      </header>
      <main>
        {noticias.length === 0 && <p>No hay noticias. Crea una en Back4app.</p>}
        {noticias.map(noticia => (
          <article key={noticia.id} className="noticia">
            <h2>{noticia.titulo}</h2>
            <p className="resumen">{noticia.resumen}</p>
            <div className="activos">
              <h3>Activos afectados:</h3>
              <div className="lista-activos">
                {noticia.activos.map((activo, idx) => (
                  <div key={idx} className={`activo ${activo.direccion}`}>
                    <span className="ticker">{activo.ticker}</span>
                    <span className="nombre">{activo.nombre}</span>
                    <span className="direccion">
                      {activo.direccion === 'alta' ? '🔼' : activo.direccion === 'baja' ? '🔽' : '⚪'}
                    </span>
                    <span className="justificacion">{activo.justificacion}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </main>
      <footer>
        <p>Información con fines educativos. No es asesoramiento financiero.</p>
      </footer>
    </div>
  );
}

export default App;
