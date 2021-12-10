var counter = 60;

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

document.getElementById("myButton").onclick = function () {
    location.href = "connect";
};


    // The countdown method.
    window.setInterval(function () {
        counter--;
        if (counter >= 0) {
            var span;
            span = document.getElementById("cnt");
            span.innerHTML = counter;
        }
        if (counter === 0) {
            clearInterval(counter);
        }

    }, 1000);

    window.setInterval('refresh()', 60000);

    // Refresh or reload page.
    function refresh() {
        window  .location.reload();
    }
