const APIURL="https://api.github.com/users/";

const main=document.getElementById("main");

const searchBox=document.getElementById('search');


// function getError(){
//     searchBox.value("USERNAME NOT FOUND");
//     return;
// }

const getUser= async(username)=>{

    let data;

    try{

        const response=await fetch(APIURL+username);

        if(!response.ok){
            getError();
            return;
        }
    
        data=await response.json();

    }
    catch(error){
        console.log("error");
    }

    // console.log(data);

    const card=`
        <div class="card">
                <div class="img-box">
                    <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
                </div>
    
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p><i>${data.bio}</i></p>
            
                    <ul class="info">
                        <li>${data.followers} <strong>Followers</strong></li>
                        <li>${data.following} <strong>Following</strong></li>
                        <li>${data.public_repos} <strong>Repos</strong></li>
                    </ul>
            
                    <div id="repos">
                        
                    </div>
            
                </div>
        </div>
    `;

    main.innerHTML=card;

    getRepos(username);
}

async function getRepos(username){

    const repos=document.getElementById("repos");
    const response=await fetch(APIURL+username+"/repos")

    const data=await response.json();

    // if(data===[]){
    //     searchBox.value="USERNAME NOT FOUND";
    //     return;
    // }

    data.forEach(

        (item)=>{
            // console.log(item);
            const elem=document.createElement("a");
            elem.href=item.html_url;
            elem.innerText=item.name;
            elem.target="_blank";
            repos.appendChild(elem);

        }
    )
}

function formSubmit(){
    if(searchBox){
        getUser(searchBox.value);
    }

    return false;
}

getUser("Ashutoshbot1");

