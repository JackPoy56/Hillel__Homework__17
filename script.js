const productBlockEl = document.querySelector('#product');
const cartBlockEl = document.querySelector('#cart');
const myOrdersListEl = document.querySelector('.main__list');
const checkoutEl = document.querySelector('#checkout');

const currentData = new Date();


const products = [
    {
        name: 'Macbook',
        price: 3000
    },
    {
        name: 'IPhone',
        price: 1000
    },
    {
        name: 'Samsung',
        price: 1200
    },
    {
        name: 'PlayStation',
        price: 900
    }
];

const cart = [];

let prodId = localStorage.length + 1;

products.forEach((product) => {
    const liEl = document.createElement('li');
    const pEl = document.createElement('p');
    const firstSpanEl = document.createElement('span');
    const secondSpanEl = document.createElement('span');
    const btnEl = document.createElement('button'); 
    
    productBlockEl.append(liEl);   
    liEl.append(pEl, btnEl);

    pEl.append(firstSpanEl, secondSpanEl);  
    firstSpanEl.classList.add('product__name');
    secondSpanEl.classList.add('product__price');

    btnEl.innerText = 'ПРИДБАТИ';
    firstSpanEl.innerText = `${product.name} - `;
    secondSpanEl.innerText = `${product.price} $`;
    
    btnEl.addEventListener('click', () => {
        myOrdersListEl.classList.add('display__none');

        const liEl = document.createElement('li');       
        const pEl = document.createElement('p');
        const firstSpanEl = document.createElement('span');
        const secondSpanEl = document.createElement('span');

        const productName =  btnEl.closest('li').querySelector('.product__name').innerText.replace('-','');  
         
        let amount = 1;

        if (cart.find(obj => obj.name === productName)) {
            const obj = cart.find(obj => obj.name === productName);
            obj.amount =  obj.amount + 1;
            obj.totalPrice = obj.price * obj.amount;
  
            const prodNameEl = document.querySelector(`#prodName-${product.name}`);
            const prodAmount = prodNameEl.querySelector('.prod__amount');
            const prodTotalPriceEl = prodNameEl.querySelector('span  ~  span');

            prodAmount.innerText = obj.amount;
            prodTotalPriceEl.innerText = `${obj.totalPrice} $`;

        } else {
            cartBlockEl.append(liEl);

            liEl.setAttribute('id', `prodName-${product.name}`);
            liEl.append(pEl, firstSpanEl, secondSpanEl);
            firstSpanEl.classList.add('prod__amount');             
                   
            const productPrice = btnEl.closest('li').querySelector('.product__price').innerText.replace('$','');

            pEl.innerText = productName; 
            firstSpanEl.innerText = amount;
            secondSpanEl.innerText = `${productPrice} $`;
    
            cart.push({
                id: `prodId-${prodId}`,
                data: `${currentData.getDate()} ${month()}`,
                name: `${productName}`,
                price:  Number(`${productPrice}`),
                amount: Number(`${amount}`),
                totalPrice: Number(`${productPrice}`)
            });

            return prodId  = prodId  + 1;
        }   
    }); 
});

const myOrdersEl = document.querySelector('#myOrders');

let orderNum = localStorage.length + 1;

checkoutEl.addEventListener('click', () => {
    if (cart.length === 0) return ;

    const jsonValue = JSON.stringify(cart);
    localStorage.setItem(`order ${orderNum}`, jsonValue);
    cart.splice(0, cart.length);
    
    cartBlockEl.innerHTML = '';

    return orderNum = localStorage.length + 1; 
});

myOrdersEl.addEventListener('click', () => {
    myOrdersListEl.classList.remove('display__none');
    myOrdersListEl.innerHTML = '';
   
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);        
        const arrLocStor = JSON.parse(localStorage.getItem(`${key}`));

        arrLocStor.forEach((obj) => {
            const liEl = document.createElement('li');
            
            const btnEl = document.createElement('button');
            btnEl.innerText = 'ВИДАЛИТИ';
           
            liEl.setAttribute('id', `${obj.id}`);
          
            myOrdersListEl.append(liEl);
            
            liEl.innerText = ` * ${obj.data}: ${obj.name} - ${obj.amount}шт. (ціна за од. ${obj.price}$) загальна сума: ${obj.totalPrice}$   `; 

            liEl.append(btnEl);
            
            btnEl.addEventListener('click', event => {
                const elementId = event.target.closest('li').id;
                
                for(let i = 0; i < localStorage.length; i++) {                    
                    let key = localStorage.key(i);                            
                    let arrLocStor = JSON.parse(localStorage.getItem(`${key}`));
                                      
                    arrLocStor.forEach((obj) => {
                        if (obj.id == elementId) {                          
                            const indexObj = arrLocStor.indexOf(obj);
                            
                            arrLocStor.splice(indexObj, 1);

                            const jsonValue = JSON.stringify(arrLocStor);
                            localStorage.setItem(key, jsonValue);

                            event.target.closest('li').remove();
                        }
                    });
                }
            });
        });    
    }
});                          

function month() {
    let month = currentData.getMonth() + 1;
   
    switch (month) {
        case 1:
            return "Січня"
        case 2:
            return "Лютого"
        case 3:
            return "Березня"
        case 4:
            return "Квітня" 
        case 5:
            return "Травня"
        case 6:
            return "Червня"
        case 7:
            return "Липня"
        case 8:
            return "Серпня"
        case 9:
            return "Вересня"
        case 10:
            return "Жовтня"
        case 11:
            return "Листопада"
        case 12:
            return "Грудня"
    } 
} 