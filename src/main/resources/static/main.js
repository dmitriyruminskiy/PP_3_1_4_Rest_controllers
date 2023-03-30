let allUsers, allRoles
const infoBar = document.querySelector('.userDataBar')

adminTemp()
userTemp()

function getCurrentUser(){
    return  fetch('/api/user');
}

function bar(){
    getCurrentUser()
        .then(res => res.json())
        .then(data =>
            infoBar.innerHTML = `<span> ${data.email} with roles: ${data.roles.map(o => o.name.split("_")[1])}</span>`)
}
bar();

function userTemp() {
    fetch("/api/user")
        .then(response => {
            response.json().then(user => {
                $("#id").text(user.id);
                $("#username").text(user.username);
                $("#surname").text(user.surname);
                $("#age").text(user.age);
                $("#email").text(user.email);
                $("#roles").text(userRoleFormat(user));
            })
        })
}

function userRoleFormat(user) {
    let userRole = '';
    let tableRoles = user.roles;
    for (let role of tableRoles) {
        userRole += role.name.replace('ROLE_', '') + ' ';
    }
    return userRole;
}

function searchUser(id) {
    return allUsers.find(user => user.id === id);
}

function uModal(id) {
    let user = searchUser(id);
    $("#uID").val(user.id);
    $("#uUsername").val(user.username);
    $("#uSurname").val(user.surname);
    $("#uAge").val(user.age);
    $("#uEmail").val(user.email);
    $("#uPassword").val(user.password);
    $("#uRoles").empty();
    allRoles.forEach(role => {
        $("#uRoles").append(
            "<option value=".concat(role.id,
                (user.roles.some(r => r.id === role.id) ? " selected" : ""),
                ">", role.name.replace('ROLE_', '') + "</option>")
        );
    });
}

function updateSubmit() {
    let form = $("#uForm");
    $.ajax('api/admin/' + $("#uID").val(), {
        type: 'PATCH',
        data: form.serialize(),
        success: function () {
            form.submit()
        }
    })
}

function dModal(id) {
    let user = searchUser(id);
    $("#dID").val(user.id);
    $("#dUsername").val(user.username);
    $("#dSurname").val(user.surname);
    $("#dAge").val(user.age);
    $("#dEmail").val(user.email);
    $("#dRoles").empty();
    allRoles.forEach(role => {
        $("#dRoles").append(
            "<option value=".concat(role.role,
                (user.roles.some(r => r.id === role.id) ? " selected" : ""),
                ">", role.name.replace('ROLE_', '') + "</option>")
        );
    });
}

function adminTable() {
    $("#tbodyID").empty();
    allUsers.forEach(user => {
        $("#tbodyID").append("<tr>" +
            "<td>" + user.id + "</td>" +
            "<td>" + user.username + "</td>" +
            "<td>" + user.surname + "</td>" +
            "<td>" + user.age + "</td>" +
            "<td>" + user.email + "</td>" +
            "<td>" + userRoleFormat(user) + "</td>" +
            "<td><button style=\"background-color: #3cb7e8; border-color: #3cb7e8; font-size: smaller\"\n" +
            "                                            type=\"button\" class=\"btn btn-primary\" class='btn btn-info' data-bs-toggle='modal' data-bs-target='#Um' onclick='uModal(" + user.id + ")' style='color: white'>Edit</button></td>" +
            "<td><button style=\"font-size: smaller; background-color:#f05b6c; border-color: #f05b6c\"\n" +
            "                                            type=\"button\" class=\"btn btn-primary\" class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#Dm' onclick='dModal(" + user.id + ")' >Delete</button></td>" +
            "</tr>");
    });
}

function deleteSubmit() {
    $.ajax({
        type: 'DELETE',
        url: "api/admin/" + $("#dID").val(),
        success: function () {
            allUsers = allUsers.filter(user => user.id !== $("#dID").val());
        }
    })
}

function addSubmit() {
    let form = $("#newForm");
    $.ajax({
        type: 'POST',
        url: 'api/admin/create',
        data: form.serialize(),
        success: function () {
            form.submit()
        }
    })
}

function adminTemp() {
    fetch("/api/admin/roles").then(response => {
        response.json().then(roles => {
            allRoles = roles;
        })
    })
    fetch("/api/admin").then(response => {
        response.json().then(users => {
            allUsers = users;
            adminTable()
        })
    })
}

