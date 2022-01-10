import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    let input = document.getElementById("zip").value;

    if (input.length === 5) {
      await axios
        .get('http://ctp-zip-api.herokuapp.com/zip/' + input)
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.log(error.response.data.error);
        })
    }
    else
      setPosts(["No results"]);
  }

  return (
    <div className="App text-center">
      <h1 className='p-3 bg-dark text-light'>Zip Code Search</h1>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <label htmlFor="zip" className="form-label px-3"><b>Zip Code:</b></label>
        <div className='row d-flex justify-content-center'>
          <div>
            <input type="text" id="zip" className="form-control text-center my-2" onChange={fetchPost}/>
          </div>
        </div>
      </div>

      {
        posts.map(e => {
          return e === "No results" ? <p key={e}>{e}</p> : 
          (
            <div key={e.RecordNumber}>            
              <div className='card col-md-6 col-lg-3 mx-auto mt-1 mb-3'>
                <div className='card-header'>{e.LocationText}</div>
                <div className='card-body'>
                  <div className='card-text text-start'>
                    <ul>
                      <li>State: {e.State ? e.State : "N/A"}</li>
                      <li>Location: ({e.Lat ? e.Lat : "N/A"}, {e.Long ? e.Long : "N/A"})</li>
                      <li>Population (estimated): {e.EstimatedPopulation ? e.EstimatedPopulation : "N/A"}</li>
                      <li>Total Wages: {e.TotalWages ? e.TotalWages : "N/A"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
