// عرض بيانات الهوية
document.getElementById("profileName").textContent = profile.name;
document.getElementById("profileTitle").textContent = profile.title;
document.getElementById("profileAbout").textContent = profile.about;

if (profile.type === "company") {
  document.getElementById("profileImage").src = profile.logo;
} else {
  document.getElementById("profileImage").src = profile.photo;
}

// أزرار التواصل
document.getElementById("callBtn").href = `tel:${profile.phone}`;
document.getElementById("whatsappBtn").href = `https://wa.me/${profile.whatsapp}`;
document.getElementById("emailBtn").href = `mailto:${profile.email}`;
document.getElementById("websiteBtn").href = profile.website;
document.getElementById("locationBtn").href = profile.location;
document.getElementById("vcardBtn").href = profile.vcard;

// روابط السوشيال ميديا
const socialLabels = {
  facebook: "فيسبوك",
  instagram: "إنستغرام",
  linkedin: "لينكدإن",
  x: "X",
  tiktok: "تيك توك",
  youtube: "يوتيوب"
};

const socialContainer = document.getElementById("socialLinks");

for (const key in profile.social) {
  if (profile.social[key]) {
    const link = document.createElement("a");
    link.href = profile.social[key];
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = socialLabels[key];
    socialContainer.appendChild(link);
  }
}

// توليد QR Code لرابط الصفحة الحالية
const pageUrl = window.location.href;

new QRCode(document.getElementById("qrcode"), {
  text: pageUrl,
  width: 220,
  height: 220,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

// مشاركة الرابط
document.getElementById("shareLink").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: profile.name,
        text: "ملفي الرقمي",
        url: pageUrl
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    await navigator.clipboard.writeText(pageUrl);
    alert("تم نسخ الرابط");
  }
});

// تحميل QR
document.getElementById("downloadQr").addEventListener("click", () => {
  const qrImage = document.querySelector("#qrcode img") || document.querySelector("#qrcode canvas");

  if (!qrImage) return;

  const link = document.createElement("a");
  link.download = "digital-profile-qr.png";

  if (qrImage.tagName === "CANVAS") {
    link.href = qrImage.toDataURL("image/png");
  } else {
    link.href = qrImage.src;
  }

  link.click();
});
async function loadProducts() {
  const response = await fetch("products.json");
  const data = await response.json();

  const categoryButtons = document.getElementById("categoryButtons");
  const productsList = document.getElementById("productsList");

  function showCategory(categoryId) {
    productsList.innerHTML = "";

    const category = data.categories.find(
      item => item.id === categoryId
    );

    category.items.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-card-content">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
        </div>
      `;

      productsList.appendChild(card);
    });
  }

  data.categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = category.name;

    if (index === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");
      showCategory(category.id);
    });

    categoryButtons.appendChild(button);
  });

  showCategory(data.categories[0].id);
}

loadProducts();
async function loadArticles() {
  const response = await fetch("articles.json");
  const data = await response.json();

  const articlesList = document.getElementById("articlesList");

  data.articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="product-card-content">
        <h3>${article.title}</h3>
        <p>${article.date}</p>
        <p>${article.content}</p>
      </div>
    `;

    articlesList.appendChild(card);
  });
}

loadArticles();