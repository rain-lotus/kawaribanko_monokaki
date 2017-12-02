function request_path(key_word) {
    //リクエストURL
    var APIkey = "FaIbJpWONGvYVO3ea6FCaLf24dlNqeQM";
    var path = "https://api.a3rt.recruit-tech.co.jp/text_suggest/v2/predict";
    path += "?";
    path += "apikey=" + APIkey;
    path += "&previous_description=" + key_word;
    return path;
}

var button = document.getElementById("button");
button.addEventListener("click", function(){
    var next_sentence = "馬";
    if(next_sentence === ''){
        return;
    }
    fetch_new_sentence(next_sentence);
});

function fetch_new_sentence(next) {
    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load',function(){
        // JSON を JavaScript で使えるようにする
        var sentence = JSON.parse(xhr.responseText);
        $(".myArea").append(sentence.suggestion.join(' / ')+"<br>");
    });

    xhr.open("GET", request_path(next), true);
    xhr.send();
}

