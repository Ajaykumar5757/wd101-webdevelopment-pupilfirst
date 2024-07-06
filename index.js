const job = document.getElementById("job");
const information= retrieveEntries();
const details = document.getElementById("information");


function retrieveEntries() {
  return JSON.parse(localStorage.getItem("information") || "[]");
}

function displayENtries() {
  const tableEntries = information
    .map(({ name, email, password, dob, acceptTerms }) => `<tr>
        <td class="border px-5 py-4">${name}</td>
        <td class="border px-5 py-4">${email}</td>
        <td class="border px-5 py-4">${password}</td>
        <td class="border px-5 py-4">${dob}</td>
        <td class="border px-5 py-4">${acceptTerms}</td>
      </tr>`).join("\n");
  const table = ` <table class="table-auto w-full"><thead>
        <tr>
          <th class="px-5 py-4">Name</th>
          <th class="px-5 py-4">Email</th>
          <th class="px-5 py-4">Password</th>
          <th class="px-5 py-4">Dob</th>
          <th class="px-5 py-4">Accepted terms?</th>
        </tr></thead><tbody>
        ${tableEntries}
      </tbody>
    </table>`;

  details.innerHTML = table;
}

function savejob(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const currentYear = new Date().getFullYear();
  const birthYear = dob.split("-");
  const year = birthYear[0];
  const age = currentYear - year;


  if (age < 18 || age > 55) {
    document.getElementById("dob").style.border = "1px solid red";
    return alert("You must be between 18 and 55 years old to register");
  }

  document.getElementById("dob").style.border = "none";

  const entry = { name, email, password, dob, acceptTerms };
  information.push(entry);

  localStorage.setItem("information", JSON.stringify(information));
  displayENtries();
  job.reset();
}

job.addEventListener("submit", savejob);
displayENtries();