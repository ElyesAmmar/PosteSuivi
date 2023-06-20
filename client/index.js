
let input = document.getElementById('input');
let button = document.getElementById('btn');
let Num = 0;

input.addEventListener("change",(e)=>{
 Num=e.target.value ;
 console.log(Num)
}
 )

 
const fetchData = async()=>{
    
    try {
        let response = await axios.get(`http://localhost:7001/api/suivi/${Num}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
button.addEventListener('click', fetchData );

