async function searchData(userName, callback) {
    try{
    const api = `https://codeforces.com/api/user.info?handles=${userName}`;
    const response = await fetch(api);
    const jsonResponse = await response.json();
    const user = jsonResponse.result[0];
    callback(user);
    }
    catch(e){
        alert(e.message);
    }
}

function showUserDetails(user){
    const innerHtml = generateInnerHTML(user);
    const main = document.getElementById("main");
    main.innerHTML += innerHtml;
    
}

function generateInnerHTML(user){
    return `
    <div id="userData" class="userData">
        <div id="userDetails" class="userDetails">
            <div id="rank" class="red">${user.rank??""}</div>
            <div id="userName" class="red">${user.handle}</div>
            <div id="userPersonalData">
                ${user.firstName} ${user.lastName}, ${user.city}, ${user.country}
                From ${user.organization}
            </div>
            ${(user.rating)?`
                    <div>
                    <img src="./images/rating-24x24.png" alt="rating">
                    Contest rating: <span id="rating" class="red">${user.rating}</span> (max. <span id="maxRank" class="red">${user.maxRank}, ${user.maxRating}</span>)
                </div>`
                :``
            }

            <div>
                <img src="./images/star_blue_24.png" alt="blue star">
                Contribution: <span id="contribution"> +${user.contribution} </span>
            </div>
            <div>
                <img src="./images/star_yellow_24.png" alt="yellow star">
                Friend of: ${user.friendOfCount} users 
            </div>
            <div>Last visit: ${user.lastOnlineTimeSeconds} minutes ago</div>
            <div>Registered: ${user.registrationTimeSeconds} years ago</div>
            <div>
                <img src="./images/blog.png" alt="yellow star">
                <a href="#">Blog entries (34)</a>, 
                <a href="#">comments</a> 
            </div>
            <div>
                <img src="./images/mail_generic.png" alt="yellow star">
                <a href="#">Talks</a> | <a href="#">Send message</a>
            </div>
        </div>
        <div id="userPhoto" class="userPhoto">
            <img src="${user.titlePhoto}" class="titlePhoto" alt="Picture of ${user.firstName} ${user.lastName}">
        </div>
    </div>
    `;
}

const searchButton = document.getElementById("btn_searchButton");
const userName = document.getElementById("txt_userName");
searchButton.addEventListener("click",()=> searchData(userName.value, showUserDetails));