$(document).ready(function () {
    $('#ageTable').hide();
    getUsers().then(data => {
        $('#usersTable').bootstrapTable({
            data
        });
    });

    getItems().then(data => {
        var dropdown = $("#item-dropdown-menu");
        $.each(data, function (index, value) {
            dropdown.append($("<a class='dropdown-item'> </a>").val(value).text(value).on('click', () => {
                $("#selectedItem").text(value);
                getUsersAge(value).then(rows => {
                    const ageTable = $('#ageTable');
                    if(ageTable.is(":hidden")) ageTable.show();
                    $('#ageTable').bootstrapTable('load',rows);
                });
            }));
        });
    });
});

async function getUsers() {
    let response = await fetch("http://localhost:3000/users");
    let data = await response.json();
    return data;
}

async function getItems() {
    let response = await fetch("http://localhost:3000/items");
    let data = await response.json();
    return data;
}

async function getUsersAge(item) {
    let response = await fetch("http://localhost:3000/users/age?item=" + item);
    let data = await response.json();
    return data;
}