function check(){
  const posts = document.querySelectorAll(".post")

  posts.forEach (function(post){
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click" , function(){
      const postId = post.getAttribute("data-id")
      const XHR = new XMLHttpRequest()
      XHR.open("GET" , `/posts/${postId}` , true)
      XHR.responseType = "json"
      XHR.send()
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    }) 
  })
}
setInterval(check , 1000)

function memo() {
const submit = document.getElementById("submit")

submit.addEventListener('click' , function(e){
  const formData = new FormData(document.getElementById("form"))
  const XHR = new XMLHttpRequest()
  XHR.open("Post" , "/posts" , true)
  XHR.responseType = "json"
  XHR.send(formData)
  XHR.onload = () => {
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    const item = XHR.response.post;
    const list = document.getElementById("list");
    const formText = document.getElementById("content");
    const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
    list.insertAdjacentHTML("afterend", HTML);
    formText.value = "";
  };
  e.preventDefault()
})
}
window.addEventListener('load' , memo)