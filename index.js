document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector("#card-container");
    const api_url = "http://localhost:3000/animals";

    

    fetch(api_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        for (const animal of data) {
            const card = document.createElement("div");
            card.classList.add("card");
            
            // 1. Determine if the animal is initially adopted
            const isAdopted = animal.status.toLowerCase() === 'adopted';

            // Add initial class for styling (if you have CSS for these classes)
            if (isAdopted) {
                card.classList.add("adopted");
            } else {
                card.classList.add("available");
            }

            // 2. Generate the correct button HTML for the initial load
            const adoptButtonHTML = isAdopted
                ? `<button class="btn-adopted" disabled>Adopted!</button><br><br>`
                : `<button class="btn-adopt"> Adopt</button><br><br>`;


            card.innerHTML = `
                <img src=${animal.image} alt="kapuss" class="image">
                <p><strong>Name:</strong> ${animal.name}</p>
                <p><strong>Type:</strong> ${animal.type}</p>
                <p><strong>Breed:</strong> ${animal.breed}</p>
                <p><strong>Age:</strong> ${animal.age}</p>
                <p class="status-display"><strong>Status:</strong> ${animal.status}</p>
                ${adoptButtonHTML}
                <button class="btn-donate"> Donate</button>
            `;

            cardContainer.appendChild(card);

            // 3. Select the button that MIGHT be present for attaching the listener
            //    Only select it if the animal is NOT already adopted.
            const adoptBtn = card.querySelector(".btn-adopt"); 
            const donateBtn = card.querySelector(".btn-donate");
            const statusDisplay = card.querySelector(".status-display");

            // --- ADOPT LOGIC (Modified to only attach listener if button exists) ---
            if (adoptBtn) {
                adoptBtn.addEventListener("click", () => {
                    
                    // 1. Send PATCH request to API to update status
                    fetch(`${api_url}/${animal.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: "Adopted" })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Server returned an error.');
                        }
                        return response.json();
                    })
                    .then(updatedAnimal => {
                        // 2. Update the local animal object and UI
                        animal.status = updatedAnimal.status; 

                        // Change status text in the card
                        if (statusDisplay) {
                            statusDisplay.innerHTML = `<strong>Status:</strong> ${animal.status}`;
                        }
                        
                        // Update card class for styling
                        card.classList.remove('available');
                        card.classList.add('adopted');

                        // Disable and change the Adopt button text
                        adoptBtn.innerText = 'Adopted!';
                        adoptBtn.disabled = true;
                        adoptBtn.classList.remove('btn-adopt');
                        adoptBtn.classList.add('btn-adopted');

                        // Show success alert
                        alert(`Congratulations! You've taken the first step to adopt ${animal.name}! We'll be in touch soon.`);
                    });
                });
            }

            // --- DONATE LOGIC (Unchanged) ---
            if (donateBtn) {
                donateBtn.addEventListener("click", () => {
                    const donationString = prompt(`Enter amount in KSh you wish to donate for ${animal.name}:`);

                    if (donationString === null || donationString.trim() === "") {
                        alert(`Thanks for considering a donation`);
                        return; 
                    }
                    
                    const donationAmount = parseFloat(donationString);

                    if (isNaN(donationAmount) || donationAmount <= 0) {
                        alert(`That is not a valid amount. Enter a valid amount.`);
                        return; 
                    }
                    
                    alert(`Thank you for your donation of KSh ${donationAmount.toFixed(2)} Your donation will greatly help ${animal.name}.`);
                });
            }
        } 
    });
});