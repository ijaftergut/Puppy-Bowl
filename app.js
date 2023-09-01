const nav = document.querySelector('nav')
const detail = document.querySelector('#detail')
let players
const fetchRecipes = async()=>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const json =  await response.json()
    players = json.results
    console.log(players)
    render()
}
const render = ()=>{
    const hash = window.location.hash.slice(1)*1
    console.log(hash)
    const html = players.map((player)=> {
        return `<a href="#${player}" ><div>Pokemon Name: ${player.name}</div>
        </a>`
    }).join('')
    nav.innerHTML = html
    const player = players.find( player => {
        return player.id === hash;
    })
    let detailHTML = ''
    if(player){
        const html2 = `<a class='extra' href="#"><div>Back to all Puppies</div></a>`
        nav.innerHTML = html2
        detailHTML =`<div class='box'><div class="name" >Name: ${player.name}</div><hr/><div class="breed" >Breed : ${player.breed}</div><img class='img' src="${player.imageUrl}"/></div>`
    }
    detail.innerHTML = (detailHTML)
}
window.addEventListener('hashchange', ()=>{
    render()
})
fetchRecipes()