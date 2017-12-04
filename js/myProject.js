function request_path(previous_description) {
    //リクエストURL
    var APIkey = "FaIbJpWONGvYVO3ea6FCaLf24dlNqeQM";
    var path = "https://api.a3rt.recruit-tech.co.jp/text_suggest/v2/predict";
    path += "?";
    path += "apikey=" + APIkey;
    path += "&previous_description=" + (previous_description);
    return path;
}

function h(text){
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

//テキストフィールドに描き終わったら実行
$("#description").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#button").click();
    }
});

//ボタンを押したら発火させる
$("#button").click(function () {
    //APIに入れるテキストの値/たぐは文字にしておく
    var previous_description = h($("#description").val());
    if (previous_description === '') {
        //なにも書いていなかったのなら何もなかった。
        return;
    }
    fetch_new_sentence(previous_description);
});

//めでたしめでたしを挿入
$("#end").click(function () {
    $(".myArea").append("<p class='end'>めでたしめでたし。</p>");
})

//文をAPIから取ってくる
function fetch_new_sentence(previous_description) {
    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
        // JSON を JavaScript で使えるようにする
        var sentence = JSON.parse(xhr.responseText).suggestion;

        $(".myArea").append(next_sentence(sentence,previous_description));
        //テキストボックスの中をリセットする
        $("#description").val("");
    });

    //APIから読み込む
    xhr.open("GET", request_path(previous_description), true);
    xhr.send();
}

//返ってきた結果に合わせて入力する文章を変更
function next_sentence(sentence,previous_description) {
    //取ってきた結果の中から文章を1つ選ぶ
    var result = sentence[Math.floor(Math.random() * sentence.length)];
    if (result === "。") return "<p class='your_text'>"+ previous_description + result + "</p>";
    else return "<p class='your_text'>" + previous_description + "</p><p class='apis_text'>" + result + "</p>";
}


