let o = console.log;

function nowcreatemytask() {

  let t = document.getElementById("tasktitle").value;
  let d = document.getElementById("taskdesc").value;
  if (localStorage.getItem('items') == null) {
    itemsjson = []
    itemsjson.push([t, d])
    // o(itemsjson) // ARAAY
    localStorage.setItem('items', JSON.stringify(itemsjson)); // STRING

  }
  else {
    let getfromitems = localStorage.getItem('items')
    o(getfromitems)
    itemsjson = JSON.parse(getfromitems); // 
    itemsjson.push([t, d]);
    localStorage.setItem('items', JSON.stringify(itemsjson));

  }
  up();
}

function up() {
  let str = "";

  if (localStorage.getItem('items') == null) {
    itemsjson = []
    // localStorage.setItem('items', JSON.stringify(itemsjson));

  }
  else {
    let getfromitems = localStorage.getItem('items')
    itemsjson = JSON.parse(getfromitems);
    localStorage.setItem('items', JSON.stringify(itemsjson));

  }
  for (let index in itemsjson) {
    str +=
      `
                <tbody id="todobody">
        <tr>
          <th scope="row">${index}</th>
          <td>${itemsjson[index][0]}</td>
          <td>${itemsjson[index][1]}</td>
          <td>
          <button
          class="btn btn-success"
          id="savechanges"
          onclick="saving(${index})"
        >
          save
        </button>
        </td>
          <td><button class="btn btn-secondary" onclick="updatetodo(${index})">
          Update
        </button></td>
       
          <td>
            <button class="btn btn-danger" onclick="deletetodo(${index})">
              Delete
            </button>
          </td>
        </tr>
      </tbody>`
  }
  document.getElementById("todobody").innerHTML = str;
}
up();

function deletetodo(indexxx) {
  let getfromitems = localStorage.getItem('items')
  itemsjson = JSON.parse(getfromitems);
  o(itemsjson)
  itemsjson.splice(indexxx, 1)
  localStorage.setItem('items', JSON.stringify(itemsjson));
  up();

}
function updatetodo(indec) {
  o("this is indec" + indec)

  let getfromitems = localStorage.getItem('items')
  itemsjson = JSON.parse(getfromitems);
  o(itemsjson)
  document.getElementById("bone").style.display = 'none';
  document.getElementById("savechanges").style.display = 'block';
  document.getElementById("tasktitle").value = itemsjson[indec][0];

  document.getElementById("taskdesc").value = itemsjson[indec][1];
}

function saving(lo) {
  o("this is vvv" + lo)
  let getfromitems = localStorage.getItem('items')
  itemsjson = JSON.parse(getfromitems);
  let ft = document.getElementById("tasktitle").value;
  let fd = document.getElementById("taskdesc").value;
  o(ft, fd)

  deletetodo(lo)

  itemsjson.push([ft, fd])

  localStorage.setItem('items', JSON.stringify(itemsjson));
  up();

  // document.getElementById("savechanges").style.display = 'none';
  document.getElementById("bone").style.display = 'block';

}

