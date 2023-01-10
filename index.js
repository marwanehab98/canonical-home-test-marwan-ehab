var blog_data = [];
var author = "";

function createCard(cell, data) {
  card = document.createElement("div");

  //   console.log(card.style);
  card.classList.add("p-card");

  card.appendChild(createText(data._embedded["wp:term"][1][0].name.toUpperCase(), "h5"));
  card.appendChild(createDivider());

  card_data = document.createElement("div");
  card_data.id = "card_data";

  card_data.appendChild(createCardImage(data));
  card_data.appendChild(createLink(data).header);
  card_data.appendChild(createLink(data).info);

  card.appendChild(card_data);

  card.appendChild(createDivider());
  card.appendChild(createText(data._embedded["wp:term"][0][0].name, "h5"));

  border = document.createElement("div");
  border.id = "card_border";

  border.appendChild(card);
  cell.appendChild(border);
}

function createDivider() {
  divider = document.createElement("hr");
  divider.classList.add("u-sv1");

  return divider;
}

function createLink(data) {
  header = document.createElement("h4");
  info = document.createElement("h6");
  author = document.createElement("a");

  author.href = data._embedded.author[0].link;
  author.innerHTML = data._embedded.author[0].name;

  info.innerHTML = "By " + author.outerHTML + " on " + data.date.split("T")[0];

  link = document.createElement("a");
  link.href = data.link;
  link.innerHTML = data.title.rendered;

  header.appendChild(link);

  return { header: header, info: info };
}

function createCardImage(data) {
  card_inside = document.createElement("div");
  card_inside.classList.add("p-card__content");

  img = document.createElement("img");
  img.classList.add("p-card__image");
  img.src = data.featured_media;

  card_inside.appendChild(img);

  return card_inside;
}

function createText(text, elementType) {
  source = document.createElement(elementType);
  source.innerHTML = text;

  return source;
}

function getBlogData() {
  fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
    .then((response) => response.json())
    .then((data) => {
      //   var row = document.createElement("div");
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        container = document.getElementById("articles");
        if (
          container.lastChild.childNodes.length == 3 ||
          container.lastChild.childNodes.length == 0
        ) {
          console.log("new Row");
          row = document.createElement("div");
          row.classList.add("row");
          container.appendChild(row);
        }
        row = container.lastElementChild;
        column = document.createElement("div");
        column.classList.add("col-small-2", "col-medium-2", "col-4");
        row.appendChild(column);
        createCard(column, item);
      }
    });
}
