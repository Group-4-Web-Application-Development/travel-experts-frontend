document.addEventListener("DOMContentLoaded", function () {
  getAgencyContact();
});

async function getAgencyContact() {
  try {
    const res = await fetch("http://localhost:3000/contacts");
    const data = await res.json();

    const cityCardsContainer = document.getElementById("cityCards");
    cityCardsContainer.innerHTML = ""; // reset after fetch

    data.forEach((contact) => {
      const cardHTML = `
            <div class="col">
                <div class="card">
                    <div class="card-body border">
                    <h5 class="card-title">${contact.AgncyCity}</h5>
                    <div class="d-flex gap-2">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                        >
                        <path
                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                        />
                        </svg>
                        <p class="card-text">${contact.AgncyAddress}</p>
                    </div>
                    <div class="d-flex gap-2">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                        >
                        <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                        />
                        </svg>
                        <p class="card-text">${contact.AgncyPhone}</p>
                    </div>
                    </div>
                </div>
            </div>`;
      cityCardsContainer.innerHTML += cardHTML;
    });
  } catch (error) {
    console.error("Can't not fetch the agency contacts: ", error);
  }
}
