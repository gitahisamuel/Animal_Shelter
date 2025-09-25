document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector("#card-container");
    const card = document.querySelector("#card");
    // const image = document.querySelector("#image");
    // const description= document.querySelector("#description");
    // const adoptBtn = document.querySelector("#btn-adopt");
    // const donateBtn = document.querySelector("#btn-donate");
    const api_url = "http://localhost:3000/animals";

    fetch(api_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

        },


    }).then(response => response.json())
        .then(data => {
                for (const animal of data) {
        const card = document.createElement("div");
        card.classList.add("card");
        // if(animal.status.lowerCase() === "aopted"){
        //     card.classList.add("adopted");
        // } else {
        //     card.classList.add("available")

        //     }

        card.innerHTML = `
        <img src=${animal.image} alt="kapuss" class="image">
        <p><strong>Name:</strong> ${animal.name}</p>
        <p><strong>Type:</strong> ${animal.type}</p>
        <p><strong>Breed:</strong> ${animal.breed}</p>
        <p><strong>Age:</strong> ${animal.age}</p>
        <p><strong>Status:</strong> ${animal.status}</p>
        <button class="btn-adopt">Adopt</button><br><br>
        <button class="btn-donate">Donate</button>
      `;

        cardContainer.appendChild(card);
    }
            
            // console.log(data);
        });

});






