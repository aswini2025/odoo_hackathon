
export function renderNotificationBell() {
  const unread = JSON.parse(localStorage.getItem("notifications") || "[]").filter(n => !n.read);
  const bell = document.getElementById("notif-bell");
  bell.innerHTML = `🔔 <span class="badge">${unread.length}</span>`;

  bell.addEventListener("click", () => {
    const dropdown = document.getElementById("notif-dropdown");
    dropdown.innerHTML = unread.map(n => `<div>${n.message}</div>`).join("");
   
    const all = JSON.parse(localStorage.getItem("notifications") || "[]");
    all.forEach(n => (n.read = true));
    localStorage.setItem("notifications", JSON.stringify(all));
    renderNotificationBell(); 
  });
}
