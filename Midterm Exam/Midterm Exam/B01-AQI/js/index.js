const apiEndPoint = "https://gist.githubusercontent.com/abdalabaaji/7088a1a2cf70747aec4b29212dbe075f/raw/5dbb5522240dd0816170b6f8098b1a698febe750/aqi";

const cards =document.querySelector(".aqi-cards");
const cityinput =document.querySelector("#city-input");
const searchbox= document.querySelector(".search-box");


let countrydat=localStorage.countrydat ? JSON.parse(localStorage.countrydat) : [];

if (countrydat.length === 0) getdata();
else {
    console.log('cards are already in the local storage');
    renderdata();
}

searchbox.addEventListener("text",handetype)

async function getdata() {
    const response= await fetch(apiEndPoint);
    countrydat= await response.json();
    localStorage.countrydat= JSON.stringify(countrydat);
    renderdata();
}

function renderdata(){
    const cityitems= countrydat.map((data,index) =>
    `<div class="container">
                <div class="aqi-card">
                    <div class="card-header">
                        <h2 class="city">${data.capital_city}</h2>
                        <span class="aqi-value">AQI: ${data.aqi}</span>
                        <button class="delete-btn" onClick="deleteAQI(${index})">×</button>
                    </div>
                    <div class="card-body">
                        <div class="details">
                            <p><strong>Country:</strong> ${data.country}</p>
                            <p><strong>Measurement Time:</strong> ${data.measurement_time}</p>
                            <p><strong>Data Source:</strong> ${data.data_source}</p>
                            <p><strong>Recommendation:</strong> ${data.recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>`).join(' ')
            cards.innerHTML=cityitems;

}

function deleteAQI(index){
countrydat.splice(index,1)
localStorage.countrydat= JSON.stringify(countrydat);
renderdata()
}

function handetype(){
  
   
    const results= countrydat.filter((element) => element.capital_city.toLowerCase().includes(cityinput.value.toLowerCase())  )
    
    const cityitems= results.map((data,index) =>
        `<div class="container">
                    <div class="aqi-card">
                        <div class="card-header">
                            <h2 class="city">${data.capital_city}</h2>
                            <span class="aqi-value">AQI: ${data.aqi}</span>
                            <button class="delete-btn" onClick="deleteAQI(${index})">×</button>
                        </div>
                        <div class="card-body">
                            <div class="details">
                                <p><strong>Country:</strong> ${data.country}</p>
                                <p><strong>Measurement Time:</strong> ${data.measurement_time}</p>
                                <p><strong>Data Source:</strong> ${data.data_source}</p>
                                <p><strong>Recommendation:</strong> ${data.recommendation}</p>
                            </div>
                        </div>
                    </div>
                </div>`).join(' ')
                cards.innerHTML=cityitems;
}
