// side navbar
const hamburger = document.querySelector('#hamburger');
const sideNav = document.querySelector('.navbar-nav');

hamburger.onclick = (e) => {
    sideNav.classList.toggle('active');
    e.preventDefault()
};

// search-bar
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-button');
const searchInp = document.getElementById('search-input');

searchBtn.addEventListener('click', function(e){
    searchBar.classList.toggle('active');
    searchInp.focus();
    e.preventDefault();
});

// shopping cart
const cartBtn = document.querySelector('#shopping-cart-button');
const shpCart = document.querySelector('.shopping-cart');

cartBtn.onclick = (e) => {
    e.preventDefault();
    shpCart.classList.toggle('active');
};



// menghilangkan elemen
document.onclick = (e) => {
    if(!searchBar.contains(e.target) && !searchBtn.contains(e.target)){
        searchBar.classList.remove('active');
    };
    if(!hamburger.contains(e.target) && !sideNav.contains(e.target)){
        sideNav.classList.remove('active');
    }
    if(!cartBtn.contains(e.target) && !shpCart.contains(e.target)){
        shpCart.classList.remove('active');
    }
};


const form = document.querySelector('#checkout-form');
const checkoutBtn = document.querySelector('#checkout-btn');

checkoutBtn.disabled = true;

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0){
            checkoutBtn.classList.add('active');
            checkoutBtn.classList.remove('active');
        }else{
            checkoutBtn.classList.remove('active');
            return false;
            
        }
    }
    checkoutBtn.classList.add('active');
    checkoutBtn.disabled = false;

})

// mengirim data ketika checkout diklik
checkoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6282272457103?text=' + encodeURIComponent(message));
})



// format pesan ke Whatsapp
const formatMessage = (obj) => {
    return `Data Customer
        Nama: ${obj.name}
        Email: ${obj.email}
        No HP: ${obj.phone}
Data Pesanan
        ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.price)}) = ${rupiah(item.total)} \n`).join('        ')}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`
}






