// manage.js
const dbName = "blogDatabase";
const storeName = "blogs";

let db;
let request = indexedDB.open(dbName, 1);

request.onsuccess = function(event) {
  db = event.target.result;
  loadReviews();
};

function loadReviews() {
  let transaction = db.transaction([storeName], "readonly");
  let objectStore = transaction.objectStore(storeName);
  let request = objectStore.getAll();

  request.onsuccess = function(event) {
    const blogs = event.target.result;
    let tableBody = document.querySelector('#reviewTable tbody');

    blogs.forEach(blog => {
      let row = document.createElement('tr');

      let contentCell = document.createElement('td');
      contentCell.innerHTML = blog.content.substring(0, 100) + '...';  // Truncate content for table
      row.appendChild(contentCell);

      let dateCell = document.createElement('td');
      dateCell.innerHTML = blog.date;
      row.appendChild(dateCell);

      let actionCell = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Delete';
      deleteButton.onclick = function() {
        deletePost(blog.id);
      };
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    });
  };
}

function deletePost(id) {
  let transaction = db.transaction([storeName], "readwrite");
  let objectStore = transaction.objectStore(storeName);
  let request = objectStore.delete(id);

  request.onsuccess = function(event) {
    alert("Post deleted successfully!");
    window.location.reload();  // Reload the page after deletion
  };

  request.onerror = function(event) {
    console.log("Error deleting post", event);
  };
}
