const { ipcRenderer } = require('electron')

const loadData  = () => ipcRenderer.send('load-data')

window.deletar = (id) => {
    ipcRenderer.send('delete-data',{id});
    ipcRenderer.on('delete-data',() => loadData())
}

var counter =0;

window.openToUpdate = (name) =>{

    $("#editModal").modal('show');
    $('#updateName').val(name);

}

function update(){

    console.log('listening update')

    $('#btnUpdate').on('click',(e)=>{
        console.log(e.target)
    });
}



const insert = () =>{

    $('#btnInsert').on('click',()=>{

        var name = $('#userName').val();
        var email = $('#userEmail').val();

        ipcRenderer.send('insert-data',{name,email});
    })

    ipcRenderer.on('insert-data',()=>{
 
        $('#userName').val('');
        $('#userEmail').val('');
        $("#exampleModal").modal('hide');
        loadData()
    });
}



function init(){

    loadData();

    ipcRenderer.on('load-data',(e,content) => {
        
        const { data } = content;
        
            var html = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Tasks</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
            <tbody>
            ${data.map((element,index) => {
                
                return`
                <tr> 
                    <th scope="row">${element.ID}</th>
                    <td>${element.NAME}</td>
                    <td><span class="badge rounded-pill text-bg-warning">Warning</span></td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" onclick="openToUpdate('${element.NAME}')">Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deletar(${element.ID})">Excluir</button>
                    </td>
                </tr>
                `
            }).join('')}
        </table>
        `
        $('#content').html(html);
    })
}

(async function(){

    await init();
    await insert();
    update();

})();