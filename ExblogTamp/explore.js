// explore.js
const dbName = "blogDatabase";
const storeName = "blogs";

let db;
let request = indexedDB.open(dbName, 1);

request.onsuccess = function(event) {
  db = event.target.result;
  displayBlogPosts();
};

function displayBlogPosts() {
  let transaction = db.transaction([storeName], "readonly");
  let objectStore = transaction.objectStore(storeName);
  let request = objectStore.getAll();

  request.onsuccess = function(event) {
    const blogs = event.target.result;
    let blogPostsDiv = document.getElementById('blogPosts');

    blogs.forEach(blog => {
      let post = document.createElement('div');
      post.innerHTML = `<p>${blog.content}</p>`;
      if (blog.image) {
        let img = document.createElement('img');
        img.src = blog.image;
        img.style.width = "300px";
        post.appendChild(img);
      }
      let date = document.createElement('p');
      date.innerHTML = `Posted on: ${blog.date}`;
      post.appendChild(date);

      blogPostsDiv.appendChild(post);
    });
  };

  request.onerror = function(event) {
    console.log("Error loading blog posts", event);
  };
}
