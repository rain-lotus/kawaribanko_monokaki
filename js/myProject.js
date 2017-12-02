function request_path(key_word) {
    //リクエストURL
    var APIkey = "FaIbJpWONGvYVO3ea6FCaLf24dlNqeQM";
    var path = "https://api.a3rt.recruit-tech.co.jp/text_suggest/v2/predict";
    path += "?";
    path += "apikey=" + APIkey;
    path += "&previous_description=" + key_word;
    return path;
}

// XMLHttpRequest
var xhr = new XMLHttpRequest();

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", function () {
        xhr.open("GET", request_path("馬"), true);
        xhr.send();

        //読み込んだあとの処理
        xhr.addEventListener("load", function () {
            var Area = document.querySelector('.myArea');
            //JSONをJSでつかえるように
            var sentence = JSON.parse(xhr.responseText);
            Area.textContent = sentence.suggestion.join(' / ');
        });
    }, false);
}, false);

