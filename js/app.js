class ShoppingCart {
    constructor(){
        this.cards = document.querySelectorAll(".card");
        this.btnBuy = document.querySelectorAll(".add-to-cart");
        this.cursos = JSON.parse(localStorage.getItem('cursos'));
        this.cart_content = document.querySelector("#cart-content tbody");
        this.submenu = document.querySelector(".submenu #shopping-cart");
        this.clearCartBtn = document.querySelector("#clear-cart");
        this.totalvalue = document.querySelector("#totalvalue");
        this.priceTotal;
        this.courseInfo;
        this.monitoring();
    }

    monitoring(){
        this.render()
        this.add()
    }

    render(){
            this.cart_content.innerHTML = '';
            for(var i = 0; i < this.cursos.length; i++){
                this.cart_content.innerHTML += `
                <tr>
                    <td>
                        <img src="${this.cursos[i].image}" width=100>
                    </td>
                    <td>${this.cursos[i].title}</td>
                    <td>${this.cursos[i].price}</td>
                    <td>
                        <a href="#" class="remove" data-id="${this.cursos[i].id}">X</a>
                    </td>
                </tr>
                `;
            }

            this.remove()
            this.clearCart()
            this.totalPrice();
    }

    remove(){
        let removeItens = this.cart_content.querySelectorAll(".remove");

        removeItens.forEach((item,index) => {
            
            item.addEventListener('click', () => {
                this.cursos.splice(index, 1);
                localStorage.setItem('cursos', JSON.stringify(this.cursos));
                this.render();
            })
    
        })   
    }

    add(){
        this.cards.forEach((item) => {

            item.children[1].children[4].addEventListener('click', (event) => {
        
                event.preventDefault();
        
                this.courseInfo = {
                    image: item.querySelector('img').src,
                    title: item.querySelector('h4').textContent,
                    price: item.querySelector('.price span').textContent,
                    id: item.querySelector('a').getAttribute('data-id')
                };
                
                this.pushCourse();
                
                
            })
        
        })
    }

    pushCourse(){
        this.cursos.push(this.courseInfo);

        this.submenu.style.display = 'block'

        localStorage.setItem('cursos', JSON.stringify(this.cursos));

        this.render();
    }

    clearCart(){
        this.clearCartBtn.addEventListener('click', () => {
            this.cursos.splice(0, this.cursos.length);
            localStorage.setItem('cursos', JSON.stringify(this.cursos));
            this.render();
            this.submenu.style.display = 'none'
        })
    }

    totalPrice(){
      let arrPrices = [];

      if(this.cursos.length > 0){

        this.cursos.forEach((item,index) => {
        
            let formatPrice = parseInt(item.price.replace('$',''));
            arrPrices.push(formatPrice);
    
           this.priceTotal = arrPrices.reduce((a,b) => {
           return a + b;
           })
    
          })
    
          this.totalvalue.innerHTML = `Valor total: ${this.priceTotal}`;

      }else {
        this.totalvalue.innerHTML = `Valor total: 00.00`;
      }

      console.log(this.priceTotal);
      console.log(this.cursos.length);
      
    }

}

new ShoppingCart();