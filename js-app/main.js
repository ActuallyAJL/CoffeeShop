const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const beanButton = document.querySelector("#bean-button");
let page = document.querySelector("#content");
let htmlStr = "";
button.addEventListener("click", () => {
  renderPage();
});

beanButton.addEventListener("click", () => {
  page.innerHTML = `
    <h2>Add a new Bean</h2>
    <fieldset>
        <label for="beanName">Name of Bean</label>
        <input type="text" name="beanName" id ="new-bean-name" />
    </fieldset>
    <fieldset>
        <label for="beanRegion">Region of Bean</label>
        <input type="text" name="beanRegion" id ="new-bean-region" />
    </fieldset>
    <fieldset>
        <label for="beanNotes">Notes about Bean</label>
        <input type="text" name="beanNotes" id ="new-bean-notes" />
    </fieldset>
    <fieldset>
        <label for="beanSubmit"></label>
        <input
            type="submit"
            value="Save Bean"
            name="beanSubmit"
            id="beanSubmit"
        />
    </fieldset>
  `;
});

document.addEventListener("click", (event) => {
  if (event.target.id === "beanSubmit") {
    const beanObj = {
      name: document.querySelector("#new-bean-name").value,
      region: document.querySelector("#new-bean-region").value,
      notes: document.querySelector("#new-bean-notes").value,
    };
    createBean(beanObj);
    renderPage();
  }
});

function getAllBeanVarieties() {
  return fetch(url).then((resp) => resp.json());
}

function renderPage() {
  getAllBeanVarieties().then((beanVarieties) => {
    htmlStr = "";
    beanVarieties.forEach((bean) => {
      htmlStr += `
                <h2>${bean.name}</h2>
                <h3>${bean.region}</h3>
                <h3>${bean.notes}</h3>
                <br />
            `;
    });
  });
  page.innerHTML = htmlStr;
}

function createBean(beanObj) {
  console.log(JSON.stringify(beanObj));
  return fetch("https://localhost:5001/api/BeanVariety", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(beanObj),
  }).then((response) => response.json());
}
