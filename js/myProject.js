function request_path(previous_description) {
    //リクエストURL
    var APIkey = "FaIbJpWONGvYVO3ea6FCaLf24dlNqeQM";
    var path = "https://api.a3rt.recruit-tech.co.jp/text_suggest/v2/predict";
    path += "?";
    path += "apikey=" + APIkey;
    path += "&previous_description=" + previous_description;
    return path;
}

var button = document.getElementById("button");
button.addEventListener("click", function(){
    //APIに入れるテキストの値
    var next_sentence = $("#description").val();
    if(next_sentence === ''){
        //あとで文末に。がなければ勝手に。をつけるようにする
        return;
    }
    fetch_new_sentence(next_sentence);
});

function fetch_new_sentence(next_description) {
    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load',function(){
        // JSON を JavaScript で使えるようにする
        var sentence = JSON.parse(xhr.responseText);
        $(".myArea").append(next_description + sentence.suggestion.join(' / ')+"<br>");
    });

    //APIから読み込む
    xhr.open("GET", request_path(next_description), true);
    xhr.send();
}

