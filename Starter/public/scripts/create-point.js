//https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
//1 = : é para atribuir valor
//2 ==: é para comparar valor
function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
            .then( states => {

                for( const  state of states ){
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
                }
            } );
}

function getCities(){
    const citiesSelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citiesSelect.disabled = true;

    fetch(url)
        .then( res => res.json() )
            .then( cities => {

                for( const  city of cities ){
                    citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                }

                citiesSelect.disabled = false;
            } );
}

populateUfs();

document.querySelector("select[name=uf")
            .addEventListener("change", getCities);

//Items de Coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li");

//VAriavel array para armazenar os items de coleta selecionados
let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

for( const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}

function handleSelectedItem(event){
    const itemLi = event.target;
    //Adicionar ou remover uma classe com Java Script
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    
    //Verificar se existem itens selecionados
    //se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId; //Isso será true ou false
        return itemFound;
    });

    //Se ja estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemsIsDifferent = item != itemId; //false
            return itemsIsDifferent;
        });

        selectedItems = filteredItems
    }
    //Se não estiver selecionado, adicionar a seleção
    else{
        //adicionar a seleção
        selectedItems.push(itemId);
    }
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
}