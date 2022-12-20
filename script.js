function nowcreatemytask() {

  let t = document.getElementById("tasktitle").value;
  let d = document.getElementById("taskdesc").value;
  let payloaddata = {
    id: '',
    todotitle: t,
    tododescription: d

  }
  let options = {
    method: 'POST',
    body: JSON.stringify(payloaddata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  postapicall(options);
  getapicall();
}

function deletetodo(indexxx) {
  console.log(indexxx);


  let deleteurl = "http://localhost:8080/deletetodo/" + indexxx;
  console.log(deleteurl);
  deleteapicall(deleteurl);
  getapicall();
}


function updatetodo(indec, index) {
  console.log("this is indec" + indec)
  let updateurl = "http://localhost:8080/updatetodo/" + indec
  fetch(geturl)
    .then((response) => response.json())
    .then((json) => {
      console.log(json[index])
      document.getElementById("tasktitle").value = json[index].todotitle;

      document.getElementById("taskdesc").value = json[index].tododescription;

    });
  document.getElementById("bone").style.display = 'none';
  document.getElementById("savechanges").style.display = 'block';

}

function saving(lo, index) {
  console.log("this is vvv" + lo)
  let newupdateapiurl = "http://localhost:8080/updatetodo/" + lo;
  let ft = document.getElementById("tasktitle").value;
  let fd = document.getElementById("taskdesc").value;
  console.log("new" + ft, fd)
  let payloadfornewdata = {
    id: lo,
    todotitle: ft,
    tododescription: fd
  }
  // document.getElementById("savechanges").style.display = 'none';
  document.getElementById("bone").style.display = 'block';
  fetch(newupdateapiurl, {
    method: 'PUT',
    body: JSON.stringify(payloadfornewdata),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      getapicall();
      document.getElementById("tasktitle").value = "";

      document.getElementById("taskdesc").value = "";
    });
}
const updateapicall = (updateurl) => {

}
let geturl = "http://localhost:8080/getalltodo";
let posturl = " http://localhost:8080/addtodo";
let updateurl = "";

const getapicall = () => {
  fetch(geturl)
    .then((response) => response.json())
    .then((json) => {
      console.log("running");
      let str = "";

      let geturl = "http://localhost:8080/getalltodo";
      fetch(geturl)
        .then((response) => response.json())
        .then((json) => {

          for (let index in json) {
            console.log("inside");
            str +=
              `
                        <tbody id="todobody">
                <tr>
                  <th scope="row">${+index + 1}</th>
                  <td>${json[index].todotitle}</td>
                  <td>${json[index].tododescription}</td>
                  <td>
                  <button
                  class="btn btn-success"
                  id="savechanges"
                  onclick="saving(${json[index].id},${index})"
                >
                  save
                </button>
                </td>
                  <td><button class="btn btn-secondary" onclick="updatetodo(${json[index].id},${index})">
                  Update
                </button></td>
    
                  <td>
                    <button class="btn btn-danger" onclick="deletetodo(${json[index].id})">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>`
          }
          document.getElementById("todobody").innerHTML = str;

        });

    });
}
getapicall();

const postapicall = (options) => {
  fetch(posturl, options)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      document.getElementById("tasktitle").value = "";

      document.getElementById("taskdesc").value = "";
    });
}

const deleteapicall = (deleteurl) => {
  console.log("in delte api call");

  fetch(deleteurl, {
    method: 'DELETE',
  })
};

