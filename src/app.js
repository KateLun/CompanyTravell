import { format, differenceInDays} from "date-fns"
import { ru } from "date-fns/locale"
//import { doc } from "prettier"
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

function checkCity(tour) {
    let city
    if (tour.city && tour.city.length > 0) {
        city = tour.city
    } else {
        city = ''
    }
    return city
}

function renderTours(tours) {
    document.getElementById('container').innerHTML = ' '
    if (tours.length === 0) {
        document.getElementById('container').innerHTML = 'Нет туров'
    } else {
        tours.forEach(tour => {
                const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
                const city = checkCity(tour)
                document.getElementById('container').innerHTML += `
                <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
                    <img class="h-72 w-full" src="${tour.image}" />

                    <div class="p-6">
                        <div>
                        <div class="flex row justify-between">
                            <p class="text-gray-800 opacity-80 font-semibold mt-3 text-xl">${tour.country}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                            <p class="text-grey-500 mt-3">${city}</p>

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
                                <span class="ml-1">${tour.price} руб.</span>
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
                        <button id='booking-button-${tour.id}' class="btn-primary mt-4">Забронировать</button>
                    </div>

                </div>
            `});

            tours.forEach((tour) => {
            document.getElementById(`booking-button-${tour.id}`).addEventListener('click', () => {
                    openModal(tour.id)
               });
            });
    }
    
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
    closeDropdow('myDropdownCountry')
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
    closeDropdow('myDropdownRating')
}

function filterByPrice(tours) {
    const minPrice = document.getElementById('minPrice').value
    const maxPrice = document.getElementById('maxPrice').value
    
    if (minPrice || maxPrice) {
        const filteredTours = tours.filter((tour) => {
            if (minPrice && maxPrice) {
                return tour.price <= maxPrice && tour.price >= minPrice
            } else if (maxPrice) {
                return tour.price <= maxPrice
            } else if (minPrice) {
                return tour.price >= minPrice
            } 
        })
            renderTours(filteredTours)
    } else {
        renderTours(tours)
    }

        document.getElementById('minPrice').value = ""
        document.getElementById('maxPrice').value = ""
        closeDropdow('myDropdownPrice')
} 

function filterByDuration(tours) {
    const minDay = document.getElementById('minDay').value
    const maxDay = document.getElementById('maxDay').value
    
    if (minDay || maxDay) {
        const filteredTours = tours.filter((tour) => {
            const duration = differenceInDays(new Date(tour.endTime), new Date(tour.startTime))
            if (minDay && maxDay) {
                return duration <= maxDay && duration >= minDay
            } else if (maxDay) {
                return duration <= maxDay
            } else if (minDay) {
                return duration >= minDay
            }
        })
            renderTours(filteredTours)
    } else {
        renderTours(tours)
    }

        document.getElementById('minDay').value = ""
        document.getElementById('maxDay').value = ""
        closeDropdow('myDropdownDuration')
} 

function closeDropdow(id) {
    let dropdown = document.getElementById(id)
    if (dropdown.style.display = "flex") {
        dropdown.style.display = "none"
    } 
}

function switchDropdown(id) {
    let dropdown = document.getElementById(id)
    if (dropdown.style.display === "flex") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "flex"
    }
}

document.getElementById('close-modal-button').addEventListener('click', closeModal)

function closeModal() {
    document.getElementById('booking-modal').style.display = 'none'
}
document.getElementById('close-modal-button').addEventListener('click', closeModal) //закрытие модального окна

let currentTourId; //чтобы передать на сервер id тура и информацию от пользователя

async function openModal(id) { 
    const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours');
    const tours = await response.json();

    document.getElementById('booking-modal').style.display = 'flex'

    const tour = tours.find(b => b.id === id) //находим тур: проходимся по массиву и ищем тур, у которой id = id что мы передали при нажатии
   
        document.getElementById('tour-info').innerHTML = ' '

                document.getElementById('tour-info').innerHTML += `
                
                <div class="flex flex-col justify-between py-2 px-4">
                    <img class="h-52 w-full rounded-lg" src="${tour.image}" />
                    <div class="p-6">
                        <div>
                            <p><span class="text-gray-800 opacity-80 font-semibold mt-2 text-xl">${tour.country}</span>, <span class="text-gray-500 mt-1">${city}</span></p>
                        </div>
                        
                        <div class="mt-2 text-grey-500 text-sm flex items-start">
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
                            <span class="ml-1">${tour.price} руб.</span>
                        </div>

                        <div class="flex-blockmini text-grey-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            <span class="ml-1">${format(new Date(tour.startTime), pattern, option)}-${format(new Date(tour.endTime), pattern, option)} (${duration} дней)</span>
                        </div>
                    </div>
                </div>`
                let currentTourId = id
        
     
}

document.getElementById('booking-tour').addEventListener('click', sendForm);

async function sendForm(ev) {
    ev.preventDefault(); //предотвращаем обновление

    let name = document.getElementById('name') //получаем поля
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    let comment = document.getElementById('comment')

    const params = {
        customerName: name.value, //объект для данных формы
        phone: phone.value,
        email: email.value,
        description: comment.value
    };

    const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${currentTourId}` // адрес, по которому нужно отправить запрос НЕ РАБОТАЕТ ID!!!!!!!!!!!!!!!!!!!!

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params)
    })
    let data = await response.json()
    console.log(data)
    
};



async function init() {
    const tours = await makeTours()
    renderTours(tours)

    document.getElementById('btn-country').addEventListener('click', () => switchDropdown('myDropdownCountry'))
    document.getElementById('btn-rating').addEventListener('click', () => switchDropdown('myDropdownRating'))
    document.getElementById('btn-price').addEventListener('click', () => switchDropdown('myDropdownPrice'))
    document.getElementById('btn-duration').addEventListener('click', () => switchDropdown('myDropdownDuration'))

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
    
}

init()