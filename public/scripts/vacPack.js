const locPhoto = [
  "https://static.pexels.com/photos/3438/beach-holiday-vacation-caribbean.jpg",
  "https://p0.pikist.com/photos/917/817/bora-bora-island-caribbean-tahiti-polynesia-paradise-travel-sea-nature.jpg",
  " https://live.staticflickr.com/1646/25705180204_f9716a5168_b.jpg",
  "https://th.bing.com/th/id/R.6779426716aa3a40c433336574c7bc11?rik=ZDi8F%2f9EWE54RQ&riu=http%3a%2f%2fwww.all-free-photos.com%2fimages%2flisbonne%2fPI19079-hr.jpg&ehk=9v9iasWJw6b%2bNhIlHl5tEFNr7gQoJR2XSUMO0YRSGqU%3d&risl=&pid=ImgRaw&r=0",
];

document.addEventListener("DOMContentLoaded", function () {
  getVacPackage();
});

async function getVacPackage() {
  const vacationPackages = document.getElementById("vacation-packages");
  try {
    const res = await fetch("http://localhost:3000/packages");
    const data = await res.json();

    vacationPackages.innerHTML = ""; // reset after fetch

    data.forEach((packages, idx) => {
      let startDate = new Date(packages.PkgStartDate);
      let endDate = new Date(packages.PkgEndDate);

      const pack = `
        <div class="package">
          <img class="pkgImg" src="${locPhoto[idx]}" />
          <br>
          <b>${packages.PkgName}</b>
          <p class="vacayText">
            ${packages.PkgDesc}
          </p>
          <p class="vacayText"><span id="startDate-${idx}">${startDate.toLocaleDateString()}</span> - ${endDate.toLocaleDateString()}</p>
          <p class="vacayText">$${parseInt(packages.PkgBasePrice).toFixed(
            2
          )}</p>
          <a href="/registration"><button type="button" class="btn btn-primary">Order</button></a>
        </div>
        `;
      vacationPackages.innerHTML += pack;
      let curDate = new Date();
      if (startDate < curDate) {
        const targetDate = document.getElementById(`startDate-${idx}`);
        targetDate.style.color = "red";
        targetDate.style.fontWeight = "bold";
      }
    });
  } catch (error) {
    console.error("Can't fetch the vacation Packages: ", error);
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
}
