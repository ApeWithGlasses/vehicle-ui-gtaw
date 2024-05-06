import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState(0);
  const [displayVehicles, setDisplayVehicles] = useState([]);
  const [totalFilteredVehicles, setTotalFilteredVehicles] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const maxData = 10;

  function nextPage() {
    setPage(prevPage => prevPage + 1);
  }

  function prevPage() {
    setPage(prevPage => Math.max(prevPage -1, 0));
  }

  /**
   * Handles the search event.
   * @param {object} event - The event object.
   */
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  /**
   * Checks if the element with class 'vehicle-list' has a scrollbar and adds/removes the 'has-scrollbar' class to the vehicle spawn buttons accordingly.
   */
  function checkScrollbar() {
    const element = document.querySelector('.vehicle-list');
    let buttons = document.querySelectorAll('.vehicle--spawn-btn');
    if (element.scrollHeight > element.clientHeight) {
      buttons.forEach(button => button.classList.add('has-scrollbar'));
    } else {
      buttons.forEach(button => button.classList.remove('has-scrollbar'));
    }
  }
  
  window.onload = function() {
    checkScrollbar();
    const observer = new MutationObserver(checkScrollbar);
    const config = { childList: true, subtree: true };
    observer.observe(document.querySelector('.vehicle-list'), config);
  }
  
  /**
   * Returns the color based on the given value and thresholds.
   * @param {number} value - The value to compare against the thresholds.
   * @param {Array<{ value: number, color: string }>} thresholds - An array of threshold objects containing a value and a color.
   * @returns {string} The color based on the value and thresholds.
   */
  function getColor(value, thresholds) {
    let color = '#15BF40';
    thresholds.forEach(threshold => {
      if (value <= threshold.value) color = threshold.color;
    });
    return color;
  }

  /**
   * Calculates the engine damage based on the engine health value.
   * @param {number} engineHealth - The health value of the engine.
   * @returns {string} - The engine damage level.
   */
  function getEngineDamage(engineHealth) {
    let engineDamage = "Good";
    if (engineHealth < 875 && engineHealth > 775) engineDamage = "Slight Damage";
    if (engineHealth <= 775 && engineHealth > 600) engineDamage = "Damaged";
    if (engineHealth <= 600 && engineHealth > 400) engineDamage = "Heavy Damage";
    if (engineHealth <= 400) engineDamage = "Severe Damage";
    return engineDamage;
  }

  /**
   * Returns the color based on the engine health value.
   *
   * @param {number} engineHealth - The engine health value.
   * @returns {string} The color corresponding to the engine health value.
   */
  function getEngineDamageColor(engineHealth) {
    return getColor(engineHealth, [
      {value: 875, color: '#F29F05'},
      {value: 775, color: '#F29F05'},
      {value: 600, color: '#C91D1D'},
      {value: 400, color: '#C91D1D'}
    ]);
  }

  /**
   * Returns the state of the insurance based on the provided insurance value.
   * @param {number} insurance - The insurance value.
   * @returns {string} The state of the insurance ('Expired' or 'Insured').
   */
  function getInsuranceState(insurance) {
    return insurance <= 0 ? 'Expired' : 'Insured';
  }

  /**
   * Returns the color based on the insurance state.
   *
   * @param {number} insurance - The insurance state value.
   * @returns {string} The color corresponding to the insurance state.
   */
  function getInsuranceStateColor(insurance) {
    return getColor(insurance, [{value: 0, color: '#C91D1D'}]);
  }
  
  useEffect(() => {
    window.loadMoreVehicleData = (data) => {
      let currData = vehicles;
      currData = currData.concat(data);
      setVehicles(currData);
    }
  
    window.initializeVehicleData = (data) => {
      setVehicles(data);
    }
    const filteredVehicles = vehicles.filter(vehicle => vehicle.Vehicle.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setTotalFilteredVehicles(filteredVehicles.length);
    setDisplayVehicles(filteredVehicles.slice(page * maxData, (page + 1) * maxData));
  }, [vehicles, page, searchTerm]);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="vehicle-list-menu">
        <div className='vehicle-menu-bar'>
          <form>
            <input type='search' placeholder='Search by model' className="search-bar" onChange={handleSearch} value={searchTerm}/>
          </form>
          <h2>Your Vehicles</h2>
          <button type='button' id='closeButton'>X</button>
        </div>
        <table className="vehicle-list">
          <tbody>
            { displayVehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>
                    <img className='vehicle--image' src='https://res.cloudinary.com/dtux0itp7/image/upload/v1711045442/pic_oqgcd5.png' alt='Vehicle Image'></img>
                    <div>
                      <p className='vehicle--name'>{ vehicle.Vehicle }</p>
                      <p className='vehicle--plate'>{ vehicle.Plate !== null ? vehicle.Plate : 'NONE' }</p>
                    </div>
                  </td>
                  <td>
                    <div className='vehicle--engine-status'>
                      {/* <img src='https://res.cloudinary.com/dtux0itp7/image/upload/v1714488838/engine_cdse9u_vgm0aq.png' alt='Engine Status'></img> */}
                      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0V2.5H11.25V5H7.5L5 7.5V11.25H2.5V7.5H0V17.5H2.5V13.75H5V17.5H8.75L11.25 20H21.25V15H23.75V18.75H27.5V6.25H23.75V10H21.25V5H13.75V2.5H17.5V0H7.5Z" fill={getEngineDamageColor(vehicle.Health)}/>
                      </svg>

                      <p style={{ color: getEngineDamageColor(vehicle.Health) }}>{ getEngineDamage(vehicle.Health) }</p>
                    </div>
                  </td>
                  <td>
                    <div className='vehicle--insurance-status'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 10V4.5L19.5 10M5 3C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V9L15 3H5Z" fill={getInsuranceStateColor(vehicle.Insurance)}/>
                      </svg>
                      <p style={{ color: getInsuranceStateColor(vehicle.Insurance) }}>{ getInsuranceState(vehicle.Insurance) }</p>
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
              ))
            }
          </tbody>
        </table>
        <div className='btn--field'>
          <button className={`btn ${page === 0 || totalFilteredVehicles <= maxData ? 'disabled' : ''}`} onClick={prevPage} disabled={page === 0 || totalFilteredVehicles <= maxData}>Previous Page</button>
          <button className={`btn ${page >= Math.ceil(totalFilteredVehicles / maxData) - 1 || totalFilteredVehicles <= maxData ? 'disabled' : ''}`} onClick={nextPage} disabled={page >= Math.ceil(totalFilteredVehicles / maxData) - 1 || totalFilteredVehicles <= maxData}>Next Page</button>
        </div>
      </div>
    </div>
  );
}

export default App;
