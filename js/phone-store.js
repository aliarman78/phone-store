//Error Messages
const errorShow = document.getElementById('error-show')

//Field function
const emptyValue = () => {
    const searchResult = document.getElementById('search-result')
    searchResult.innerHTML = '';
    const phoneInfo = document.getElementById('phone-info')
    phoneInfo.innerHTML = '';
}

//Mobile Data
const phone = () => {

//Search Value
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
document.getElementById('search-field').value = '';

//Error Handle
  if (searchText === typeof 'numbers' || searchText == '') {
    errorShow.innerText = "Phone Search"
    emptyValue()
  }
  else if (searchText < 0) {
    errorShow.innerText = "Negative Not Allow"
    emptyValue()
  }
  else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.data.length === 0) {
          emptyValue()
          errorShow.innerText = "Not Found Result"
        }
        else {
          displaySearchResult(data.data.slice(0, 20))
          errorShow.innerText = " "
        }
      })
  }
}

// Search Result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result')
  searchResult.innerHTML = '';
  const phoneInfo = document.getElementById('phone-info')
  phoneInfo.innerHTML = '';

  phones.forEach(phone => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = ` 
    <div class="card p-3 text-center">
    <img  src="${phone.image}" class="card-img-top  w-50 mx-auto" alt="...">
    <div class="card-body border-0  ">
      <h5 class="card-title">Brand: ${phone.brand}</h5>
      <p class="card-text"> Model: ${phone.phone_name}</p>
      <button onClick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-primary">More Info</button>
    </div>
  </div>
     `
    searchResult.appendChild(div)
  })

}


//Api Link
const loadPhoneDetail = (phoneId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => moreInfo(data.data))
}

// Phone Info
const moreInfo = (info) => {
  const phoneInfo = document.getElementById('phone-info')
  phoneInfo.innerHTML = '';
  const div = document.createElement('div')
  div.classList.add('col')
  div.innerHTML = ` 
  <div class="card p-3">
  <img src="${info.image}" class="card-img-top img-fluid w-50 mx-auto" alt="...">
  <div class="card-body">
    <p class="card-title"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Brand</span> : ${info.brand}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Name</span> : ${info.name}</p>
    <p id="date" class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Relese Date</span>  : ${info.releaseDate ? info.releaseDate : 'Not Found'}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Memory</span>  : ${info.mainFeatures.memory}</p>
    <p class="card-text"><span class="fw-bold bg-primary text-white px-1 py-1 rounded"> ChipSet</span> : ${info.mainFeatures.chipSet}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded"> Display Size</span> : ${info.mainFeatures.displaySize}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Sensor</span>  : ${info.mainFeatures.sensors}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">NFC</span>  : ${info?.others?.NFC? info.others.NFC: "Not Found" }</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Bluetooth</span>  : ${info?.others?.Bluetooth? info.others.Bluetooth:"Not Found"}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Radio</span>  : ${info?.others?.Radio? info.others.Radio:"Not Found"}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">Usb</span>  : ${info?.others?.USB ? info.others.USB :"Not Found"}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">GPS</span>  : ${info?.others?.GPS? info.others.GPS :"Not Found"}</p>
    <p class="card-text"> <span class="fw-bold bg-primary text-white px-1 py-1 rounded">WALN</span>  : ${info?.others?.WLAN? info.others.WLAN :"Not Found"}</p>
  </div>
</div>
  `
  phoneInfo.appendChild(div)

}
