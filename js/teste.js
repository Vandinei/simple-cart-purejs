class Teste {
    constructor(){
        this.list = document.querySelectorAll("li"),
        this.arr = [1,"q"]
    }

    pushArr(){
        this.list.forEach((item,index) => {

            item.addEventListener('click', () => {
                this.arr.push(index);
                this.showArr();
            })

        })
    }

    showArr(){
        console.log(this.arr);
    }

}

let teste = new Teste();
teste.pushArr("olá");