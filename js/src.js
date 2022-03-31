const Region  = {
    name:'name',
    region:'region',
    capital:'capital',
    getAll: 'all',
}


const $out = document.querySelector('.card_main')
const $search = document.querySelector('.search')
const $select = document.querySelector('.select')

function fethData(end,cb){
    fetch(`https://restcountries.com/v3.1/${end}`)
        .then(res=> res.json())
        .then(r=> cb(r))

}

window.addEventListener('load',()=>{
    fethData(Region.getAll, res => {
        const data = res.map(item => cardTemplate(item))
        $out.innerHTML = data.sort()
    })

})

function cardTemplate(res){
    return `
        <div class="card">
            <div class="card-name">
                <h4>${res.name.common}</h4>

            </div>
            <div class="card_img">
                <img src=${res.flags.png}>
            </div>
            <div class="card_footer">
                <h4>Capital:${res.capital}</h4>
                <h4>Region:${res.region}</h4>
                <button onclick ='more("${res.name.common}")'>info</button>
            </div>
        </div>  
    `
}

$select.addEventListener('change' , e =>{
    var value  = e.target.value

    if (value === 'capital') {
        $search.setAttribute('placeholder' ,'enter capital')
    } else {
        $search.setAttribute('placeholder','enter counrey')
    }
})

$search.addEventListener('input', e => {
    var value = e.target.value.toUpperCase()

    if (!value) {
        fethData(Region.getAll,res => {
            $out.innerHTML = res.map(item => cardTemplate(item))
        })
    }

    if ($select.value === 'capital') {
        fethData(`${Region.capital}/${value}`, res =>{
            $out.innerHTML = res.map(country => cardTemplate(country)).join('')

        })

    } 
    
    if ($select.value === 'name') {
        fethData(`${Region.name}/${value}`, res => {
            $out.innerHTML = res.map(country => cardTemplate(country)).join('')

            

        })

    }
})

function more(name){
    fethData(`${Region.name}/${name}`,res=>{
        const card = res.map(item =>{
            return infCard(item)
        }).join('')

        $out.innerHTML = card
    })

}

function infCard(res){
    return `
        <div class="card">
            <div class="card-name">
                <h4>${res.name.common}</h4>

            </div>
            <div class="card_img">
                <img src=${res.flags.png}>
            </div>
            <div class="card_footer">
                <h4>Capital:${res.capital}</h4>
                <h4>Region:${res.region}</h4>
                <h4>Continent:${res.continents}</h4>
                <h4>population:${res.population}</h4>
                <h4>status:${res.status}</h4>
            </div>

          </div>

    `

}




