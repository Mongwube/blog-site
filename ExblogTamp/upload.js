// upload.js
const dbName = "blogDatabase";
const storeName = "blogs";

// Initialize IndexedDB
let db;
let request = indexedDB.open(dbName, 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  let objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("content", "content", { unique: false });
  objectStore.createIndex("image", "image", { unique: false });
  objectStore.createIndex("date", "date", { unique: false });
};

request.onsuccess = function(event) {
  db = event.target.result;
};

request.onerror = function(event) {
  console.log("Error opening database", event);
};

// Handle form submission
document.getElementById('blogForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get content from TinyMCE
  const content = tinymce.get('blogContent').getContent();

  // Validate text length
  if (content.length < 1000 || content.length > 60000) {
    alert("Text must be between 1000 and 60000 characters.");
    return;
  }

  // Handle image upload
  const imageFile = document.getElementById('imageUpload').files[0];
  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = function() {
      savePost(content, reader.result);  // Save with image
    };
    reader.readAsDataURL(imageFile);  // Convert image to Base64
  } else {
    savePost(content, null);  // No image
  }
});

// Function to save blog post in IndexedDB
function savePost(content, imageData) {
  const currentDate = new Date().toLocaleDateString();

  let transaction = db.transaction([storeName], "readwrite");
  let objectStore = transaction.objectStore(storeName);
  let request = objectStore.add({ content: content, image: imageData, date: currentDate });

  request.onsuccess = function(event) {
    alert("Blog post uploaded successfully!");
      // Redirect to explore page after upload
  };

  request.onerror = function(event) {
    console.log("Error saving blog post", event);
  };
}
