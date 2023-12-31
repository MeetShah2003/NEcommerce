const displayProduct = (data) => {
  console.log(data);
  document.getElementById("product").innerHTML = "";
  data.map((ele) => {
    let image = document.createElement("img");
    image.src = ele.image;
    let title = document.createElement("h2");
    title.innerHTML = ele.title;
    title.setAttribute("id","title");
    let price = document.createElement("h4");
    price.innerHTML = ele.price;
    price.setAttribute("id","price");
    let description = document.createElement("p");
    description.innerHTML = ele.description;
    description.setAttribute("id","description");
    let category = document.createElement("h3");
    category.innerHTML = ele.category;
    category.setAttribute("id","category");
    let stock = document.createElement("h4");
    stock.innerHTML = ele.stock;
    stock.setAttribute("id","stock");
    let color = document.createElement("h4");
    color.innerHTML = ele.color;
    color.setAttribute("id","color");
    let size = document.createElement("h3");
    size.innerHTML = ele.size;
    size.setAttribute("id","size");
    let div = document.createElement("div");
    div.append(image, title, price, description, category, stock, size, color);
    document.getElementById("product").append(div);
  });
};

const getProducts = async () => {
  fetch("http://localhost:8090/product/allpro")
    .then((res) => res.json())
    .then((data) => displayProduct(data))
    .catch((error) => console.log(error.message));
};

getProducts();
