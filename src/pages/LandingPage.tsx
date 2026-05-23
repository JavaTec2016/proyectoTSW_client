import { Navigation } from '../components/Navigation'
import { Nav, Navbar } from 'react-bootstrap'
import { EventoCard } from '../components/landing/TipoEventoCard'

function LandingPage() {
  return (
    <div className='app-shell'>
      <Navigation brandContent={
        <Navbar.Brand className="navbar-text" href="#top">
          Universidad Beta
        </Navbar.Brand>
      }>
        <Nav>
          <Nav.Link href="#top">Inicio</Nav.Link>
          <Nav.Link href="/colectas/categorias">Categorias</Nav.Link>
          <Nav.Link href="/colectas/corporaciones">Corporaciones</Nav.Link>
          <Nav.Link href="/colectas/eventos">Eventos</Nav.Link>
        </Nav>
        <Nav>
          <a href="/login" className='btn btn-outline-primary m-2'>Acceder</a>
          <a href="/registrar" className='btn btn-outline-success m-2'>Registro</a>
        </Nav>
      </Navigation>
      <main>
        {/**Banner */}
        <div className='container-fluid banner'>
          <img src="../assets/img/c carros 8k.png" alt="banner" className='overlay-banner' style={{ width: '100%' }} />
          {/**Overlay del banner */}
          <div className='overlay'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-6 offset-md-6 text-center text-end mt-4'>
                  <h2>Universidad Beta - Eventos de recaudación</h2>
                  <br />
                  <p className='d-none d-lg-block'>
                    Eventos sociales como fonotones, festivales u reuniones organizados para la recaudación de fondos.
                    Tu colaboración ayuda a garantizar educación de la más alta calidad
                  </p>
                  <a href="#eventosCarousel" className='btn btn-outline-light mt-2' role='button' aria-label='Detalles de eventos'>Detalles de eventos</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id='eventosCarousel' className='justify-content-center'>
          <div className='container'>
            <div className="row">
              <div className="col text-center text-uppercase pt-4">
                <h3 className='pt-4'>Eventos:</h3>
              </div>
            </div>
            <div className="row pb-4 pt-3 justify-content-center">
              <div className='col-md-4'>
                <EventoCard imgSource="../assets/img/c carros 8k.png" alt='Fonotones' title='Fonotones' body='Lorem Ipsum Fonotonium'
                  badges={['Evento de recaudacion']} style={{ width: '100%', margin: '2rem 0rem' }}></EventoCard>
              </div>
              <div className='col-md-4'>
                <EventoCard imgSource="../assets/img/c carros 8k.png" alt='Festivales' title='Festivales' body='Lorem Ipsum Festivaldo'
                  badges={['Evento de recaudacion']} style={{ width: '100%', margin: '2rem 0rem' }}></EventoCard>
              </div>
              <div className='col-md-4'>
                <EventoCard imgSource="../assets/img/c carros 8k.png" alt='Reuniones' title='Reuniones' body='Lorem Ipsum Reunionam'
                  badges={['Evento de recaudacion']} style={{ width: '100%', margin: '2rem 0rem' }}></EventoCard>
              </div>
            </div>
          </div>

        </section>
      </main>

      <footer className='pt-4 pb-4 bg-dark'>
        <div className='container'>
          <div className="row text-center">
            <div className="col-12 col-md"><a href="#acrobatec">Prensa</a></div>
            <div className="col-12 col-md"><a href="#acrobatec">Preguntas frecuentes</a></div>
            <div className="col-12 col-md"><a href="#acrobatec">Contacto</a></div>
            <div className="col-12 col-md"><a href="#acrobatec">¿Quiénes somos?</a></div>
            <div className="col-12 col-md"><a href="#acrobatec">Mapa del sitio</a></div>
          </div>
          <div className="row text-center">
            <div className="col pt-4 pb-4">
              <a href="#" data-bs-toggle="tooltip" title="Facebook" data-bs-placement="left"><i
                className="fa-brands fa-square-facebook fa-3x ps-3 pe-3"></i></a>
              <a href="#" data-bs-toggle="tooltip" title="Instagram" data-bs-placement="bottom"><i
                className="fa-brands fa-square-instagram fa-3x ps-3 pe-3"></i></a>
              <a href="#" data-bs-toggle="tooltip" title="Tik Tok" data-bs-placement="bottom"><i
                className="fa-brands fa-tiktok fa-3x ps-3 pe-3"></i></a>
              <a href="#" data-bs-toggle="tooltip" title="X/Twitter" data-bs-placement="bottom"><i
                className="fa-brands fa-square-x-twitter fa-3x ps-3 pe-3"></i></a>
              <a href="#" data-bs-toggle="tooltip" title="YouTube" data-bs-placement="right"><i
                className="fa-brands fa-square-youtube fa-3x ps-3 pe-3"></i></a>
            </div>
          </div>
          <div className="row text-center">
            <div className="col pb-1 pt-4">
              <img src="../assets/img/logo.png" alt="logo" width="75px" height="75px" />
            </div>
          </div>
          <div className="row text-center">
            <div className="col pb-2 pt-4">
              <p>&copy;2026 - Universidad Beta</p>
              <p>Reservados todos los derechos</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage