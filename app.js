const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;
const products = document.getElementById("products");
const count = document.querySelector(".count");

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);
  sonHesap();
});
products.addEventListener("click", (e) => {
  const count = e.target.closest(".product").querySelector("input")

  if (e.target.classList.contains("decrease")) {
    if (count.value > 1) {
      count.value--;      
    } else {
      const x= e.target.parentElement.parentElement.parentElement.querySelector(".productName").innerText
      if (
        confirm(`${x} silinsinmi bu `)
      ) 
      {
        e.target.closest(".product").remove()
      }
    }
    ilkHesap(e.target);
    sonHesap();
  }else if (e.target.classList.contains("increase")){
    count.value++
    ilkHesap(e.target);
    sonHesap();
  }else if (e.target.classList.contains("btn")) {
    e.target.closest(".product").remove();
     sonHesap();
  }
 
});
const ilkHesap=(target)=>{
  const disDiv=target.closest(".dis")
  const x=disDiv.querySelector(".price").innerText;
   const input =disDiv.querySelector(".count").value  
 disDiv.querySelector(".asd .proTotal").innerText= (x*input).toFixed(2)
}
const sonHesap=()=>{
  const hepsi=document.querySelectorAll(".proTotal")

  const subtotal=[...hepsi].reduce((acc,price)=>acc+Number(price.innerText),0)
  document.getElementById("Subtotal").innerText=subtotal.toFixed(2)

  const taxt = subtotal * localStorage.getItem("taxRate");
  document.getElementById("Tax(%18)").innerText=taxt.toFixed(2)

  const belesKargo =
    parseFloat(subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")?localStorage.getItem("shippingPrice"):0)
    document.getElementById("Shipping").innerText=belesKargo.toFixed(2)

    const TotalCard=subtotal+taxt+belesKargo
    document.getElementById("Total").innerText=TotalCard.toFixed(2)
}