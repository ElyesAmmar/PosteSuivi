const component = document.getElementById('suivi');
let input = document.getElementById('input');
let button = document.getElementById('btn');
let Num = 0;
let table = document.createElement('table');

const TableMap = (data) =>{
    console.log(data)
    data.map((item)=>{
        let row = document.createElement('tr');
        Object.values(item).map(value => {
            let cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    })
    component.appendChild(table);
}

input.addEventListener("change",(e)=>{
 Num=e.target.value ;
 console.log(Num)
}
)

const fetchData = async()=>{
    try {
        let response = await axios.get(`http://localhost:7001/api/suivi/${Num}`)
        console.log(response)
        TableMap(response.data)
    } catch (error) {
        console.log(error)
    }
}
button.addEventListener('click', fetchData );


