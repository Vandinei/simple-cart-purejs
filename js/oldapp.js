var cards = document.querySelectorAll(".card");
var btnBuy = document.querySelectorAll(".add-to-cart");
var cursos = [];
var cart_content = document.querySelector("#cart-content tbody");
var submenu = document.querySelector(".submenu #shopping-cart");
var clearCartBtn = document.querySelector("#clear-cart");

cards.forEach(function(item,index){

    item.addEventListener('click', function(event){

        event.preventDefault();

        courseInfo = {
            image: item.querySelector('img').src,
            title: item.querySelector('h4').textContent,
            price: item.querySelector('.price span').textContent,
            id: item.querySelector('a').getAttribute('data-id')
        }

        add();

    })

})

var add = function(){

    cursos.push(courseInfo);

    submenu.style.display = 'block'

    carrinho();

}

var carrinho = function(){
    cart_content.innerHTML = '';
    for(i = 0; i < cursos.length; i++){
        cart_content.innerHTML += `
        <tr>
             <td>
                  <img src="${cursos[i].image}" width=100>
             </td>
             <td>${cursos[i].title}</td>
             <td>${cursos[i].price}</td>
             <td>
                  <a href="#" class="remove" data-id="${cursos[i].id}">X</a>
             </td>
        </tr>
        `;

    }
    
    remove(); //escopo da função de remover precisa ser depois do carrinho aparecer, pois vamos remover os elementos do carrinho.
    clearCart(); //mesma coisa
}

var remove = function(){

    var removeItens = cart_content.querySelectorAll(".remove");

    console.log(removeItens);

    removeItens.forEach(function(item,index){
        
        item.addEventListener('click', function(){
            cursos.splice(index, 1);
            carrinho();
        })

    })   

    console.log(cursos);

}

var clearCart = function(){
    clearCartBtn.addEventListener('click', function(){
        cursos.splice(0, cursos.length);
        carrinho();
    })
}
