let userList = [];

let mainForm = document.getElementById("mainForm")
mainForm.addEventListener("submit", (e) => e.preventDefault());


let date1 = new Date();
document.getElementById("date").max = date1.toISOString().split('T')[0];

function getRadioValue() {
    let radios = document.getElementsByName("gridRadios");
    let radiochecked = Array.from(radios).find(radio => radio.checked);
    return radiochecked.value;
}

function setRadioValue(gender) {
    document.getElementById(gender).checked = true;
}

function validateForm() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("inputAddress").value;
    let email = document.getElementById("inputEmail").value;
    let gender = document.forms["myForm"]["gridRadios"];
    let date = document.getElementById("date").value;


    if (name == "") {
        document.getElementById("nameFeedback").innerHTML = "Enter your Name Please!!";
    }
    else if (name.length <= 2 || name.length > 20) {
        document.getElementById("nameFeedback").innerHTML = "Name should be 2 to 20 letters!!";
    }
    else if (!isNaN(name)) {
        document.getElementById("nameFeedback").innerHTML = "name contain only characters!";
    }
    else {
        document.getElementById("nameFeedback").innerHTML = "";
    }

    if (address == "") {
        document.getElementById("addressFeedback").innerHTML = "Enter your Address Please!!";
    }
    else {
        document.getElementById("addressFeedback").innerHTML = "";
    }

    if (email == "") {
        document.getElementById("emailFeedback").innerHTML = "Enter your Valid Email Please!!";
    }
    else if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email))) {
        document.getElementById("emailFeedback").innerHTML = "Please enter email in this format(name1@any.com) !!";
    }
    else {
        document.getElementById("emailFeedback").innerHTML = "";
    }

    if (gender[0].checked == false && gender[1].checked == false) {
        document.getElementById("genderFeedback").innerHTML = "Please choose gender!";
    }
    else {
        document.getElementById("genderFeedback").innerHTML = "";
    }

    if (date == "") {
        document.getElementById("dateFeedback").innerHTML = "Please select date-of-birth!!";
    }
    else {
        document.getElementById("dateFeedback").innerHTML = "";
    }

    return false;

}


function showData() {

    if (localStorage.getItem("userList") == null) {
        userList = [];
    }
    else {
        userList = JSON.parse(localStorage.getItem("userList"))
    }

    for (let i = 0; i < userList.length; i++) {
        document.getElementById("tbody").innerHTML += `<tr>
        
        <td>${userList[i].name}</td>
        <td>${userList[i].address}</td>
        <td>${userList[i].email}</td>
        <td>${userList[i].date}</td>
        <td>${userList[i].gender}</td>
        <td>
            <button onclick="updateData(${i})"
        class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">update</button>

            <button onclick="deleteData(${i})"
                class="btn btn-danger">Delete</button></td> 
        </tr>`;
    }

};

document.onload = showData();

function submitData() {
    if (validateForm()) {
        return false;
    }

    if (localStorage.getItem("userList") == null) {
        userList = [];
    }
    else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    let name = document.getElementById("name").value;
    let address = document.getElementById("inputAddress").value;
    let email = document.getElementById("inputEmail").value;
    let date = document.getElementById("date").value;
    let gender = getRadioValue();

    // for(let i=0; i<=gender.length; i++){
    //     // console.log(gender[i].checked);
    //     if(gender[i].checked) {
    //      console.log(gender[i].value);
    //     }
    // }
    userList.push({
        name: name,
        address: address,
        email: email,
        date: date,
        gender: gender
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    location.reload()
    showData();
    document.getElementById("name").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("date").value = "";
    document.getElementById("gender").value = "";
    return false;
}

function updateData(i) {
    console.log("function running");
    let submitBtn = document.getElementById("submit")
    let updateBtn = document.getElementById("update")
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }
    console.log("function running 1");


    document.getElementById("name").value = userList[i].name;
    document.getElementById("inputAddress").value = userList[i].address;
    document.getElementById("inputEmail").value = userList[i].email;
    document.getElementById("date").value = userList[i].date;
    setRadioValue(userList[i].gender);
    console.log("function running 2");


    document.querySelector("#update").onclick = function () {
        console.log("function running 3");

        userList[i].name = document.getElementById("name").value
        userList[i].address = document.getElementById("inputAddress").value
        userList[i].email = document.getElementById("inputEmail").value
        userList[i].date = document.getElementById("date").value
        userList[i].gender = getRadioValue();

        localStorage.setItem("userList", JSON.stringify(userList));
        location.reload();
    }

}

function deleteData(i) {
    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    userList.splice(i, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
    location.reload();
}

    // localStorage.clear()

