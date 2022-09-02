let students=[]
let correntId=null
$("#addButton").on("click", function(){
    let firstname = $("#firstname").val()
    let lastname = $("#lastname").val()
    let username = $("#username").val()
    let phoneNumber = $("#phoneNumber").val()
    console.log(firstname,lastname,username,phoneNumber);
    $.ajax({
        url:"https://studentcrudforlesson.herokuapp.com/api/student/add",
        method:"post",
        data:JSON.stringify({firstname ,lastname,username,phoneNumber}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        succes:function(response){
            console.log(response)
        },
        error:function(err){
            console.log(err);
        }
    })  
    getData()
    $("#firstname").val("")
    $("#lastname").val("")
    $("#username").val("")
    $("#phoneNumber").val("")
})
const getData = () =>{
    $.ajax({
        url:"https://studentcrudforlesson.herokuapp.com/api/student/get",
        method:"get",
        success:function(javob){
            students=javob
            chiz()
        },
        error:function(error){
            console.log(error);
        }
    })
}
getData()
    
const chiz=()=>{
    let myTexts=""
    students.forEach((student,index) =>{
        myTexts+= `                
        <tr>
        <th scope="row">${index+1}</th>
        <td>${student.firstname}</td>
        <td>${student.lastname}</td>
        <td>${student.username}</td>
        <td>${student.phoneNumber}</td>
        <td><img class="img1" style="width: 30px;" onclick="editId(${student.id})" id="#editId" src="images/edit.png" alt="edit"></img><img style="width: 30px;" onclick="deleteId(${student.id})" id="#deleteId" src="images/delete.png" alt="delete"></img></td>
        </tr>`
    })
    $(".tbody").html(myTexts);
}
const deleteId=(id)=>{
    console.log(id);
    $.ajax({
        url:`https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`,
        method:"delete",  
        success:function(response){
            console.log("responsive");
            getData()
        },
        error:function(err){
            console.log("err");
        },
    })
}
const editId=(id)=>{
    let student=students.find(item=> item.id===id)
    console.log(student);
    let firstname = $("#firstname").val(student.firstname)
    let lastname = $("#lastname").val(student.lastname)
    let username = $("#username").val(student.username)
    let phoneNumber = $("#phoneNumber").val(student.phoneNumber)
    $("#addButton").hide()
    $("#editButton").show()
    correntId=id
}
const upDate=(correntId)=>{
    let firstname = $("#firstname").val()
    let lastname = $("#lastname").val()
    let username = $("#username").val()
    let phoneNumber = $("#phoneNumber").val()
    $.ajax({
        url:`https://studentcrudforlesson.herokuapp.com/api/student/update/${correntId}`,
        method:"post",
        data:JSON.stringify({firstname ,lastname,username,phoneNumber}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        succes:function(response){
            console.log(response)
            getData()
        },
        error:function(err){
            getData()
            console.log(err);
        }
    })
    $("#addButton").show()
    $("#editButton").hide()
    $("#firstname").val("")
    $("#lastname").val("")
    $("#username").val("")
    $("#phoneNumber").val("")
}