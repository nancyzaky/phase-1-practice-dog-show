document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((data) => {
      let dogTable = document.getElementById("table-body");
      data.forEach((item) => {
        let dogRow = document.createElement("tr");
        let dogName = document.createElement("td");
        let dogBreed = document.createElement("td");
        let dogSex = document.createElement("td");
        let editButtonPlace = document.createElement("td");
        dogName.innerText = item.name;
        dogBreed.innerText = item.breed;
        dogSex.innerText = item.sex;
        editButtonPlace.innerHTML = "<button id='btn'>Edit Dog</button>";

        dogRow.appendChild(dogName);
        dogRow.appendChild(dogBreed);
        dogRow.appendChild(dogSex);
        dogRow.appendChild(editButtonPlace);
        dogTable.appendChild(dogRow);
        // let editBtn = document.getElementById("btn");
        //console.log(editBtn);
        editButtonPlace.addEventListener("click", () => {
          let nameInputForm = document.getElementById("dog-form");
          nameInputForm.name.value = item.name;
          nameInputForm.breed.value = item.breed;
          nameInputForm.sex.value = item.sex;
          nameInputForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let newObj = {
              name: e.target.name.value,
              breed: e.target.breed.value,
              sex: e.target.sex.value,
            };
            console.log(item.id);
            fetch(`http://localhost:3000/dogs/${item.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(newObj),
            })
              .then((resp) => resp.json())
              .then((data) => {
                dogName.innerText = data.name;
                dogBreed.innerText = data.breed;
                dogSex.innerHTML = data.sex;
              });

            // .then(fetch("http://localhost:3000/dogs"));
          });
        });

        //console.log(editButtons);
      });
    });
});
