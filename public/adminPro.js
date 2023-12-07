const displayProducts = (data) => {
  document.getElementById("products").innerHTML = "";
  data.map((ele) => {
    let image = document.createElement("img");
    image.src = ele.image;
    let title = document.createElement("h2");
    title.innerHTML = ele.title;
    title.setAttribute("id", "title");
    let price = document.createElement("h4");
    price.innerHTML = ele.price;
    price.setAttribute("id", "price");
    let description = document.createElement("p");
    description.innerHTML = ele.description;
    description.setAttribute("id", "description");
    let category = document.createElement("h3");
    category.innerHTML = ele.category;
    category.setAttribute("id", "category");
    let stock = document.createElement("h4");
    stock.innerHTML = ele.stock;
    stock.setAttribute("id", "stock");
    let color = document.createElement("h4");
    color.innerHTML = ele.color;
    color.setAttribute("id", "color");
    let size = document.createElement("h3");
    size.innerHTML = ele.size;
    size.setAttribute("id", "size");
    let div = document.createElement("div");
    div.append(image, title, price, description, category, stock, size, color);
    document.getElementById("products").append(div);
  });
};

const getProducts = async () => {
  fetch("http://127.0.0.1:8090/product/adminPro")
    .then((res) => res.json())
    .then((data) => displayProducts(data))
    .catch((err)=>console.log(err.message))
};

getProducts();
