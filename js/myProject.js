function request_path(previous_description) {
    //リクエストURL
    var APIkey = "FaIbJpWONGvYVO3ea6FCaLf24dlNqeQM";
    var path = "https://api.a3rt.recruit-tech.co.jp/text_suggest/v2/predict";
    path += "?";
    path += "apikey=" + APIkey;
    path += "&previous_description=" + previous_description;
    return path;
}

//テキストフィールドに描き終わったら実行
$("#description").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#button").click();
    }
});

//ボタンを押したら発火させる
$("#button").click(function () {
    //APIに入れるテキストの値
    var next_sentence = $("#description").val();
    if (next_sentence === '') {
        //あとで文末に。がなければ勝手に。をつけるようにする
        return;
    }
    fetch_new_sentence(next_sentence);
});

//めでたしめでたしを挿入
$("#end").click(function () {
    $(".myArea").append("<p class='end'>めでたしめでたし。</p>");
})

//文をAPIから取ってくる
function fetch_new_sentence(next_description) {
    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
        // JSON を JavaScript で使えるようにする
        var sentence = JSON.parse(xhr.responseText).suggestion;

        $(".myArea").append(next_sentence(sentence,next_description));
        //テキストボックスの中をリセットする
        $("#description").val("");
    });

    //APIから読み込む
    xhr.open("GET", request_path(next_description), true);
    xhr.send();
}

//返ってきた結果に合わせて入力する文章を変更
function next_sentence(sentence,next_description) {
    //取ってきた結果の中から文章を1つ選ぶ
    var result = sentence[Math.floor(Math.random() * sentence.length)];
    if (result === "。") return "<p class='your_text'>"+ next_description + result + "</p>";
    else return "<p class='your_text'>" + next_description + "</p><p class='apis_text'>" + result + "</p>";
}


