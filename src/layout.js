async function include(id, path) {
    const response = await fetch(path);
    document.getElementById(id).innerHTML = await response.text();
}

include("header", "./components/header.html");
include("footer", "./components/footer.html");