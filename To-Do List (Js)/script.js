let input = document.querySelector('#input');
let add = document.querySelector('#add');
let addnew1 = document.querySelector('.edit');
let change = document.querySelector('.theme');
let bands = document.querySelector('.res');


add.addEventListener('click', (event) => {
    event.preventDefault();
    addlist();
});

function addlist(){
    let text = input.value.trim();
    if (text !== '') {
        let addnew = document.createElement('div');
        addnew.className = 'inside';

        let ol = document.createElement('ol');
        ol.textContent = text;

        let del = document.createElement('button');
        del.className = 'btn-hover';
        del.innerHTML = '<i class="fa-solid fa-trash" id="Delete"></i></i>';
        del.addEventListener('click',()=>{
            addnew.remove();
        })

        let edit = document.createElement('button');
        edit.className = 'btn-hover';
        edit.id = 'Edit';
        edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        edit.style.borderTopRightRadius = '1rem';
        edit.style.borderBottomRightRadius = '1rem';
        edit.addEventListener('click',()=>{
            let edit = prompt('Enter The edit')
            ol.innerText = edit.trim('');
        });

        addnew.appendChild(ol);
        addnew.appendChild(del);
        addnew.appendChild(edit);

        addnew1.appendChild(addnew);
        input.value = '';
    }
    else{
        alert('Please enter a task');
    }
}

let deFault = document.querySelector('#default');
let light = document.querySelector('#light');
let dark = document.querySelector('#dark');

deFault.addEventListener('click',()=>{
    change.removeAttribute('class');
    change.className = 'theme';
    bands.removeAttribute('class');
    bands.className = 'res';

})
light.addEventListener('click',()=>{
    change.removeAttribute('class');
    change.className = 'theme1';
    bands.removeAttribute('class');
    bands.className = 'res1';

})
dark.addEventListener('click',()=>{
    change.removeAttribute('class');
    change.className = 'theme2';
    bands.removeAttribute('class');
    bands.className = 'res2';
})