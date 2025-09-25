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
            // console.log(data);
        });
    for (const animal of data) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <h2>${animal.name}</h2>
        <p>${animal.type}</p>


      `;

        cardContainer.appendChild(card);
    }
});






