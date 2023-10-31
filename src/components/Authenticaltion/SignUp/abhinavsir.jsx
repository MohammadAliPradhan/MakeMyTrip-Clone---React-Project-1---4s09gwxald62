
const config = {
    method: "POST",
    body: JSON.stringify(userDetails),
    header: {
        "Content-Type": "application/json",
    }
}

fetch("https://academics.newtonschool.co/api/v1/bookingportals.signup", config)
    .then((data) => {
        console.log(data);
    })
    .catch(() => {
        console.log(err);
    })