const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const beanButton = document.querySelector("#bean-button");
let page = document.querySelector("#content");
let htmlStr = "";
button.addEventListener("click", () => {
  getAllBeanVarieties().then((beanVarieties) => {
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
});

beanButton.addEventListener("click", () => {});

function getAllBeanVarieties() {
  return fetch(url).then((resp) => resp.json());
}
