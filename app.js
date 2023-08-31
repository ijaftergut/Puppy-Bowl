const nav = document.querySelector('nav')
const detail = document.querySelector('#detail')
let players
const fetchRecipes = async()=>{
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players')
    const json =  await response.json()
    players = json.data
    console.log(players)
    render()
}
const render = ()=>{
    const hash = window.location.hash.slice(1)*1
    const html = players.players.map((player)=> {
        return `<a href="#${player.id !== hash ? player.id : ''}" class='${player.id === hash ? 'selected': ''}'><div>Player: ${player.name}</div>
        <h6>Breed: ${player.breed}</h6></a>`
    }).join('')
    nav.innerHTML = html
    const player = players.players.find( player => {
        return player.id === hash;
    })
    let detailHTML = 'Welcome'
    if(player){
        const html2 = `<a href="#"><div>Back to all Puppies</div></a>`
        nav.innerHTML = html2
        detailHTML =`<div class='box'><div class="name" >Name: ${player.name}</div><hr/><div class="breed" >Breed : ${player.breed}</div><img src="${player.imageUrl}"/></div>`
    }
    detail.innerHTML = (detailHTML)
}

window.addEventListener('hashchange', ()=>{
    render()
})
fetchRecipes()