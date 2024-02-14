const form = document.querySelector('form')
const url = "https://crudcrud.com/api/8ac05bd715b44a79bcedb6abc73bc6eb/notes"

form.addEventListener('submit',(e) =>{
    e.preventDefault();


    const noteTitle = e.target.title.value;
    const noteDesc = e.target.desc.value;

    const notes = {
        noteTitle,
        noteDesc
    }

    axios.post(`${url}`,notes)
    .then((res) =>{
        // console.log(res);
        e.target.reset();
        display();
    })
    .catch((err) => console.log(err));

})

function display(){
    axios.get(`${url}`)
    .then((res) =>{
        const notesData = res.data;
        const totalNotes = document.querySelector('#total-notes');
        totalNotes.innerHTML = `Total Notes: ${notesData.length}`;

        const totalShowingNotes = document.querySelector('#showing');
        totalShowingNotes.innerText =`Showing: ${notesData.length}`
        const noteList = document.querySelector('#note-list');
        // console.log(notesData);
        noteList.innerHTML = '';
        notesData.forEach((element) => {
            const li = document.createElement('li');
            li.className = 'note-list'
            li.style.paddingLeft = '20px'
            const titleHeading = document.createElement('h1');
            titleHeading.innerHTML = `${element.noteTitle}`
            li.appendChild(titleHeading);

            const descPara = document.createElement('p');
            descPara.innerHTML = `${element.noteDesc}`;
            li.appendChild(descPara);

            const dltBtn = document.createElement('button');
            dltBtn.innerHTML = 'Delete';
            dltBtn.className = 'btn'
            li.appendChild(dltBtn);
            dltBtn.addEventListener('click',()=>{
                axios.delete(`${url}/${element._id}`)
                .then(()=>{
                    li.remove();
                    totalNotes.innerHTML = `Total Notes: ${notesData.length}`;
                    totalShowingNotes.innerText =`Showing: ${notesData.length}`;
                })
                .catch((err) => console.log(err))
                
            });

            noteList.appendChild(li);
            // console.log(noteList)
        });


    })
    .catch((err) => console.log(err))
}
display();


    const filterNote = document.getElementById('search-notes');
    filterNote.addEventListener('keyup',(e)=>{
        e.preventDefault();
        const userSearch = e.target.value.toLowerCase();
        const allDatalist = document.querySelectorAll('.note-list')
        let count = 0;
        const showList = document.getElementById('showing')

        for(let i=0;i<allDatalist.length;i++){
            const isNotePresent = allDatalist[i].firstChild.textContent.toLowerCase();
            if(isNotePresent.includes(userSearch)){
                allDatalist[i].style.display = ''
                count += 1;
                showList.innerHTML = `Showing: ${count}`
                
            }else{
                allDatalist[i].style.display = 'none';
                showList.innerHTML = `Showing: ${count}`
            }
        }

    })

