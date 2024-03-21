import './App.css';

function App() {
  return (
    <div className="App">
      <div className="vehicle-list-menu">
        <h2>Your Vehicles</h2>
        <form>
          <input type='search' placeholder='Search by model' className="search-bar"/>
        </form>
        <table className="vehicle-list">
          <tr>
            <td>
              <img className='vehicle--image' src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045442/pic_oqgcd5.png' alt='Vehicle Image'></img>
              <div>
                <p className='vehicle--name'>Declasse Asea</p>
                <p className='vehicle--plate'>RIK6787A</p>
              </div>
            </td>
            <td>
              <div className='vehicle--engine-status'>
                <img src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045441/engine_cdse9u.png' alt='Engine Status'></img>
                <p>Good</p>
              </div>
            </td>
            <td>
              <div className='vehicle--insurance-status'>
                <img src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045441/note_wox5ai.png' alt='Insurance Status'></img>
                <p>Insured</p>
              </div>
            </td>
            <td>
              <div className='vehicle--location'>
                <img src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045442/map-marker_u0dp8s.png' alt='Location'></img>
                <p>Vespucci</p>
              </div>
            </td>
            <td>
              <div className='vehicle--spawn-btn'>
                <button><img src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045344/car-select_nob4qz.png' alt='Spawn Vehicle'></img></button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
