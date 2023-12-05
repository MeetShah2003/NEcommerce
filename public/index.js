const displayProduct=(product)=>{
    product.map((ele)=>{
        let image=document.createElement("img");
        image.innerHTML=ele.image;
    });
};

const getProducts = () => {
  fetch("http://localhost:8090/product/allPro")
    .then((res) => res.json())
    .then((data) => {
        displayProduct(data);
    });
};

getProducts();
