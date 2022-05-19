import {
    arr
} from './module/module.js'

let form = document.forms.to_do
let form2 = document.forms.modal_2
let inp = document.querySelector('.inp_age')
let edite_inp = document.querySelector('.edite_inp')
let edite_btn = document.querySelector('.edite_btn')

form.onsubmit = (e) => {
    e.preventDefault();

    let task = {
        age: inp.value,
    }
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        task[key] = value
    })
    arr.push(task);
    reload(arr)
}


let item_bottom = document.querySelector('.item_bottom')
let modal_bg = document.querySelector('.modal_bg')
let modal_countainer = document.querySelector('.modal_countainer')
let modal_block = document.querySelector('.modal_block')

let old_year = 2022

function reload(arr) {
    item_bottom.innerHTML = ""
    for (let prodcut of arr) {
        let item_bottom_block = document.createElement('div')
        let div_item_bottom_No = document.createElement('div')
        let div_item_bottom_student = document.createElement('div')
        let div_year = document.createElement('div')

        let item_bottom_No = document.createElement('span')
        let item_bottom_student = document.createElement('span')
        let year = document.createElement('span')
        let div_img = document.createElement('div')
        let img_edite = document.createElement('img')
        let img_delete = document.createElement('img')


        item_bottom_block.classList.add('item_bottom_block')
        div_item_bottom_No.classList.add('div_item_bottom_No')
        div_item_bottom_student.classList.add('div_item_bottom_student')
        div_year.classList.add('div_year')
        div_img.classList.add('div_img')
        img_edite.classList.add('img_edite')
        img_delete.classList.add('img_delete')

        item_bottom_No.style.fontWeight = "600"
        item_bottom_student.style.fontWeight = "600"
        year.style.fontWeight = "600"
        item_bottom_No.innerHTML = "1"
        item_bottom_student.innerHTML = prodcut.task
        year.innerHTML = old_year - prodcut.age

        img_edite.setAttribute('src', './assets/img/383148_edit_icon.svg')
        img_delete.setAttribute('src', './assets/img/icons8-delete.svg')

        item_bottom.append(item_bottom_block)
        item_bottom_block.append(div_item_bottom_No, div_item_bottom_student, div_year, div_img)
        div_item_bottom_No.append(item_bottom_No)
        div_item_bottom_student.append(item_bottom_student)
        div_year.append(year)
        div_img.append(img_edite, img_delete)

        img_delete.onclick = () => {
            arr.splice(arr.indexOf(prodcut), 1)
            reload(arr)
        }

        img_edite.onclick = () => {
            setTimeout(() => {
                modal_countainer.style.display = "block"
                modal_bg.style.display = "block"
                modal_block.style.top = "50%"
            }, 300);
            },


        edite_btn.onclick = () => {
            div_item_bottom_student.innerHTML = ""

            form2.onsubmit = (e) => {
                e.preventDefault();

                let task = {
                    age: edite_inp.value,
                }
                arr.splice(arr.indexOf(prodcut), 1)

                let fm = new FormData(form2)
                fm.forEach((value, key) => {
                    task[key] = value
                })
                arr.push(task);
                reload(arr)
            }

            setTimeout(() => {
                modal_countainer.style.display = "none"
                modal_bg.style.display = "none"
                modal_block.style.top = "-150%"
            }, 200);
        }
    }
}

reload(arr)