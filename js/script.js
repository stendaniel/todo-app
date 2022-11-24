
window.addEventListener("load", () => {
  if(localStorage.getItem("isAuth") === "false") {
    window.open("../register.html", "_self")
  }
})

const singOut = document.querySelector(".singOut")

singOut.addEventListener("click", () => {
  localStorage.setItem("isAuth", "false") 
  window.open("../register.html", "_self")
})

const title = document.querySelector(".title")
const discription = document.querySelector(".discription")
const image = document.querySelector(".image")
const addTodo = document.querySelector(".addTodo")
const error = document.querySelector(".error")
const row = document.querySelector(".row")

window.addEventListener("load", () => {
  if(!localStorage .getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify([]))
  } else {
    const todo = JSON.parse(localStorage.getItem("todo"))

    const todosWithID = todo.map((item, index) => {
      return {...item, id: index }
    })

    localStorage.setItem("todo", JSON.stringify(todosWithID))
    
    const newTodo = JSON.parse(localStorage.getItem("todo"))

    card(newTodo)
  }
})

addTodo.addEventListener("click", (event) => {
  event.preventDefault();

  if(title.value !== "" &&  discription.value !== "" && image.value !== "") {
    const data = {
      title: title.value,
      discription: discription.value,
      image: image.value
    }
    const todo = JSON.parse(localStorage.getItem("todo"))

    localStorage.setItem("todo", JSON.stringify(
      [
        ...todo,
        data
      ]
    ))
    window.location.reload()

  } else {
    error.innerHTML = "Все поля должны быть заполнены"
  }
})

function card(base) {
  const template = base.map(({title, discription, image, id}) => {
    return`
    <div class="boxes">
    <h4>${title}</h4>
    <img src=${image} alt="">
    <p>${discription}</p>

    <div class="btn_inline">
     <button onclick="deleteTodo(${id})">
       Delete     
     </button>
     <button onclick="editTodo(${id})">
       Edit     
     </button>
    </div>
  </div>
    `
  }).join("")

  row.innerHTML = template
}


function deleteTodo(id) {
  const todo = JSON.parse(localStorage.getItem("todo"))

  const filtered = todo.filter(item => item.id !== id)

  localStorage.setItem('todo', JSON.stringify(filtered))

  window.location.reload()
}


function editTodo(id) {
  const todo = JSON.parse(localStorage.getItem("todo"))

  const changes = todo.map(item => {
    if(item.id === id) {
      return {
        title: prompt("Title", item.title),
        discription: prompt("Description", item.discription),
        image: prompt("Image", item.image)
      } 
    } else {
      return item
    }
  })

  localStorage.setItem("todo", JSON.stringify(changes))
  window.location.reload()
}