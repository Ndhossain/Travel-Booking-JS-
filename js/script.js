// database start

const carObject = {
    vehicle: "Car",
    imageUrl: 
    "https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 5,
    capacity: 4,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};

const toyotaObject = {
    vehicle: "Big car",
    imageUrl: 
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 15,
    capacity: 12,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};

const bikeObject = {
    vehicle: "Bike",
    imageUrl: 
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 3,
    capacity: 2,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};

const busObject = {
    vehicle: "Bus",
    imageUrl: 
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    farePerKilo: 40,
    capacity: 30,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};
const vehicles = [ carObject, toyotaObject, bikeObject, busObject ];

// database end

// dynamic items

function vehicleCard(datas) {
    const obj = JSON.stringify(datas)
    const div = document.createElement("div")
    const card = `
        <div class="card mb-3 mx-auto" style="max-width: 940px">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${datas.imageUrl} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Transport: ${datas.vehicle}</h5>
                        <p class="card-text">${datas.description}</p>
                        <p class="card-text">
                            <small class="text-muted me-3">Fare per kilo : $ ${datas.farePerKilo}</small>
                            <small class="text-muted">Capacity : $ ${datas.capacity}</small>
                        </p>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onclick='setBookingData(${obj})'
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    div.innerHTML = card
    document.getElementById('booking').appendChild(div)
};

// dynamic items adding

vehicles.forEach(element => vehicleCard(element));

// dynamic booking page

function setBookingData(data) {
    document.getElementById('modal-body').innerHTML = `
        <div class="card">
            <img src=${data.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    <small class="text-muted me-3">Fare per kilo : $ ${data.farePerKilo}</small>
                    <small class="text-muted">Capacity : $ ${data.capacity}</small>
                </p>
                <p><strong>Fare :</strong> $<span id="vehicle-fare">0</span></P>
                <p><strong>Tax :</strong> $<span id="tax">0</span></P>
                <p><strong>Total-cost :</strong> $<span id="total-cost">0</span></P>
                <div class="d-flex" style="gap: 10px;">
                    <input class="rounded p-2" style="width: 35%;" id="distance-input" type="number" min="0" placeholder="Distance">
                    <input class="rounded p-2" style="width: 35%;" id="quantity-input" type="number" min="0" placeholder="Vehicle Quantity">
                    <button type="button" class="btn btn-outline-primary" onclick='setFare(${JSON.stringify({farePerKilo: data.farePerKilo})})'>Submit</button>
                </div>
            </div>
        </div>
    `
}

// booking fare math

function setFare(fare){
    if (document.getElementById('distance-input').value < 0 ||document.getElementById('quantity-input').value < 0) {
        alert('Please Enter Valid Input');
        return ;
    };
    const vehicleCost = document.getElementById('distance-input').value * document.getElementById('quantity-input').value * fare.farePerKilo;
    const tax = (vehicleCost / 100) * 10;
    document.getElementById('vehicle-fare').innerText = vehicleCost;
    document.getElementById('tax').innerText = tax;
    document.getElementById('total-cost').innerText = vehicleCost + tax;
}

// search bar

function searchItems() {
    const searchValue = document.getElementById('searchbar-input');
    if (searchValue.value === '') {
        return ;
    }
    document.getElementById('booking').innerHTML = ''
    vehicles.forEach(item => {
        if (item.vehicle.toLocaleLowerCase() === searchValue.value.toLocaleLowerCase()) {
            vehicleCard(item)
        } else {
            document.getElementById('booking').innerHTML = '<span class="mx-auto">No Data Found.</span>'
        }
    });
    searchValue.value = ''
}


