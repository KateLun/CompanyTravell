import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"
const option = {
    locale: ru
}
const pattern = "dd.MM.yyy" //новый формат даты

async function makeTours() {
    const responce = await fetch(
        'https://www.bit-by-bit.ru/api/student-projects/tours'
    )
    const tours = await responce.json()
    console.log(tours)
    return tours
}

function checkCity(tours) {
    let noCity = ' '
    tours.forEach(tour => {
        if (tour.city === null || tour.city === undefined) {
            return tour.city = noCity
        }
    })
}

function renderTours(tours) {
    document.getElementById("container").style.display = "grid"
    document.getElementById('container').innerHTML = ''
    tours.forEach(tour => {
        const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
        checkCity(tours)
        document.getElementById('container').innerHTML += `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
            <img class="h-72 w-full" src="${tour.image}" />
           
            <div class="p-6">
                <div>
           
                    <p class="text-gray-800 opacity-80 font-semibold mt-3 text-xl">${tour.country}</p>
        
                    <p class="text-grey-500 mt-3">${tour.city}</p>

                    <div class="mt-3 text-grey-500 text-sm flex items-start">
                        <p class="text-grey-600 font-medium hover:underline">
                             <a href="#">${tour.hotelName}</a>
                        </p>
                        <span class="mx-2" aria-hidden="true">&ndash;</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <span class="ml-1">${tour.rating}</span>
                    </div>

                    <div class="flex-blockmini text-grey-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        <span class="ml-1">${tour.price}</span>
                    </div>

                    <div class="flex-blockmini text-grey-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        <span class="ml-1">${format(new Date(tour.startTime), pattern, option)}-${format(new Date(tour.endTime), pattern, option)} (${duration} дней)</span>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col justify-center px-6 pb-6">
                <button class="btn-primary mt-4">Подробнее</button>
                <button id="favAdd-${tour.id}" class="flex btn-primary mt-4 justify-center">Добавить в избранное</button>
                <button id="favDelete-${tour.id}" class="hidden btn-primary mt-4 justify-center">Удалить из избранного</button>
            </div>

        </div>
    `
    });

    tours.forEach((tour) => {
        document.getElementById(`favAdd-${tour.id}`).addEventListener("click", () => favourites(tour.id))
    })
    tours.forEach((tour) => {
        document.getElementById(`favDelete-${tour.id}`).addEventListener("click", () => favourites(tour.id))
    })
}

function checkFav() {
    if (favTours.length != 0) {
        renderFavs(favTours)
        workJson()
    } else {

        document.getElementById("container").style.display = "flex"
        document.getElementById('container').innerHTML = ''
        document.getElementById('container').innerHTML += `
            <div class="flex justify-center flex-col items-center m-auto">
            <img src="https://www.pngplay.com/wp-content/uploads/12/Sad-Cat-Meme-Transparent-PNG.png">
      <p class="text-slate-600 text-2xl">Пока что тут пусто :( </p>
            </div>
        `
        workJson()
    }
}

function renderFavs(tours) {
    document.getElementById("container").style.display = "grid"
    document.getElementById('container').innerHTML = ''
    tours.forEach(tour => {
        const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
        checkCity(tours)
        document.getElementById('container').innerHTML += `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
            <img class="h-72 w-full" src="${tour.image}" />
           
            <div class="p-6">
                <div>
           
                    <p class="text-gray-800 opacity-80 font-semibold mt-3 text-xl">${tour.country}</p>
        
                    <p class="text-grey-500 mt-3">${tour.city}</p>

                    <div class="mt-3 text-grey-500 text-sm flex items-start">
                        <p class="text-grey-600 font-medium hover:underline">
                             <a href="#">${tour.hotelName}</a>
                        </p>
                        <span class="mx-2" aria-hidden="true">&ndash;</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <span class="ml-1">${tour.rating}</span>
                    </div>

                    <div class="flex-blockmini text-grey-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        <span class="ml-1">${tour.price}</span>
                    </div>

                    <div class="flex-blockmini text-grey-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        <span class="ml-1">${format(new Date(tour.startTime), pattern, option)}-${format(new Date(tour.endTime), pattern, option)} (${duration} дней)</span>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col justify-center px-6 pb-6">
                <button class="btn-primary mt-4">Подробнее</button>
                <button id="favDel-${tour.id}" class="flex btn-primary mt-4 justify-center">Удалить из избранного</button>
            </div>

        </div>
    `
    });

    tours.forEach((tour) => {
        document.getElementById(`favDel-${tour.id}`).addEventListener("click", () => favDel(tour.id))
    })
}

// избранные туры
let favTours = [];

function workJson() {
    const toursJson = JSON.stringify(favTours)
    localStorage.setItem('favTours', toursJson)
}

async function favourites(id) {
    const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours');
    const tours = await response.json();

    document.getElementById(`favAdd-` + id).style.display = "none"
    document.getElementById(`favDelete-` + id).style.display = "flex"

    if (favTours.length != 0) {
        let result = favTours.find(res => res.id === id)
        if (!result) {
            tours.forEach((tour) => {
                if (id === tour.id) {
                    favTours.push(tour);
                    workJson()
                }
            })
        } else {
            let index = favTours.indexOf(result);
            favTours.splice(index, 1);
            document.getElementById(`favDelete-` + id).style.display = "none"
            document.getElementById(`favAdd-` + id).style.display = "flex"
            workJson()
        }

    } else {
        tours.forEach((tour) => {
            if (id === tour.id) {
                favTours.push(tour);
                workJson()
            }
        })
    }
    console.log(favTours)
    workJson()
}

function favDel(id) {
    let result = favTours.find(res => res.id === id)
    let index = favTours.indexOf(result);
    favTours.splice(index, 1);
    renderFavs(favTours)

    if (favTours.length == 0) {
        document.getElementById("container").style.display = "flex"
        document.getElementById('container').innerHTML = ''
        document.getElementById('container').innerHTML += `
        <div class="flex justify-center flex-col items-center m-auto">
        <img src="https://www.pngplay.com/wp-content/uploads/12/Sad-Cat-Meme-Transparent-PNG.png">
  <p class="text-slate-600 text-2xl">Пока что тут пусто :( </p>
        </div>
    `
    }
    workJson()
}

function filterByCountry(tours, country) {
    if (country) {
        const filteredTours = tours.filter((tour) => {
            return tour.country === country
        })
        renderTours(filteredTours)
        console.log(filteredTours)
    } else {
        renderTours(tours)
    }
    closeDropdownCountry()
}

function filterByRating(tours, rating) {
    if (rating) {
        const filteredTours = tours.filter((tour) => {
            return tour.rating >= rating
        })
        renderTours(filteredTours)
    } else {
        renderTours(tours)
    }
    closeDropdownRating()
}

function filterByPrice(tours) {
    const minPrice = document.getElementById('minPrice').value
    const maxPrice = document.getElementById('maxPrice').value

    const filteredTours = tours.filter((tour) => {
        if (minPrice && maxPrice) {
            return tour.price <= maxPrice && tour.price >= minPrice
        } else if (maxPrice) {
            return tour.price <= maxPrice
        } else if (minPrice) {
            return tour.price >= minPrice
        } else {
            renderTours(tours)
        }
    })
    console.log(filteredTours)
    renderTours(filteredTours)

    document.getElementById('minPrice').value = ""
    document.getElementById('maxPrice').value = ""
    closeDropdownPrice()
}

function filterByDuration(tours) {
    const minDay = document.getElementById('minDay').value
    const maxDay = document.getElementById('maxDay').value

    const filteredTours = tours.filter((tour) => {
        const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
        if (minDay && maxDay) {
            return duration <= maxDay && duration >= minDay
        } else if (maxDay) {
            return duration <= maxDay
        } else if (minDay) {
            return duration >= minDay
        } else {
            renderTours(tours)
        }
    })
    console.log(filteredTours)
    renderTours(filteredTours)

    document.getElementById('minDay').value = ""
    document.getElementById('maxDay').value = ""
    closeDropdowDuration()
}

// Для блока фильтр по стране (index or id??? html-коллекции)
function openDropdownCountry() {
    let dropdown = document.getElementById('myDropdownCountry')
    if (dropdown.style.display = "none") {
        dropdown.style.display = "flex"
    }
}

function closeDropdownCountry() {
    let dropdown = document.getElementById('myDropdownCountry')
    if (dropdown.style.display = "flex") {
        dropdown.style.display = "none"
    }
}
window.onclick = closeDropdownCountry() // чтобы дропдаун закрывался при клике на страницуdate-fns, а не только при повторном клике на кнопку

// Для блока фильтр по рейтингу
function openDropdownRating() {
    let dropdown = document.getElementById('myDropdownRating')
    if (dropdown.style.display = "none") {
        dropdown.style.display = "flex"
    }
}

function closeDropdownRating() {
    let dropdown = document.getElementById('myDropdownRating')
    if (dropdown.style.display = "flex") {
        dropdown.style.display = "none"
    }
}

// Для блока фильтр по цене
function openDropdownPrice() {
    let dropdown = document.getElementById('myDropdownPrice')
    if (dropdown.style.display = "none") {
        dropdown.style.display = "flex"
    }
}

function closeDropdownPrice() {
    let dropdown = document.getElementById('myDropdownPrice')
    if (dropdown.style.display = "flex") {
        dropdown.style.display = "none"
    }
}

// Для блока фильтр по продолжительности
function openDropdownDuration() {
    let dropdown = document.getElementById('myDropdownDuration')
    if (dropdown.style.display = "none") {
        dropdown.style.display = "flex"
    }
}

function closeDropdowDuration() {
    let dropdown = document.getElementById('myDropdownDuration')
    if (dropdown.style.display = "flex") {
        dropdown.style.display = "none"
    }
}

const toursJson = localStorage.getItem('favTours')
if (toursJson) {
    favTours = JSON.parse(toursJson)
}

async function init() {
    const tours = await makeTours()
    renderTours(tours)

    document.getElementById('btn-country').addEventListener('click', () => openDropdownCountry())
    document.getElementById('btn-rating').addEventListener('click', () => openDropdownRating())
    document.getElementById('btn-price').addEventListener('click', () => openDropdownPrice())
    document.getElementById('btn-duration').addEventListener('click', () => openDropdownDuration())

    document.getElementById('all').addEventListener('click', () => filterByCountry(tours))
    document.getElementById('thailand').addEventListener('click', () => filterByCountry(tours, 'Тайланд'))
    document.getElementById('egypt').addEventListener('click', () => filterByCountry(tours, 'Египет'))
    document.getElementById('cyprus').addEventListener('click', () => filterByCountry(tours, 'Кипр'))
    document.getElementById('maldives').addEventListener('click', () => filterByCountry(tours, 'Мальдивы'))
    document.getElementById('indonesia').addEventListener('click', () => filterByCountry(tours, 'Индонезия'))
    document.getElementById('mexico').addEventListener('click', () => filterByCountry(tours, 'Мексика'))
    document.getElementById('tanzania').addEventListener('click', () => filterByCountry(tours, 'Танзания'))

    document.getElementById('rating7').addEventListener('click', () => filterByRating(tours, 7))
    document.getElementById('rating8').addEventListener('click', () => filterByRating(tours, 8))
    document.getElementById('rating9').addEventListener('click', () => filterByRating(tours, 9))

    document.getElementById('btnPrice').addEventListener('click', () => filterByPrice(tours))

    document.getElementById('btnDuration').addEventListener('click', () => filterByDuration(tours))

    document.getElementById("showAll").addEventListener("click", () => renderTours(tours))
    document.getElementById("favs").addEventListener("click", () => checkFav())
}

init()