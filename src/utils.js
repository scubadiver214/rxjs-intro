import $ from 'jquery';

export function printf(x, interpolate){
    if(interpolate){
        console.log(x + `: ${interpolate}`);    
    } else {
        console.log(x);
    }
}
export function getGitHubUser(userName){
    return $.ajax({
        url: 'https://api.github.com/users/' + userName,
        dataType: 'jsonp'
    }).promise();
}

export function print(val){
    let el = document.createElement('p');
    el.innerText = val;
    document.body.appendChild(el);
}