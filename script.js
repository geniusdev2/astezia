'use strict';



// --- Oyun Verisi ---
const games = [
  { id: 1, title: "Counter Strike 1.6", genre: "Aksiyon", size: 1, rating: 4.8, color: "#1a0a2e", accent: "#a78bfa", accentLight: "rgba(167,139,250,0.15)", accentBorder: "rgba(167,139,250,0.3)", link: "https://drive.google.com/file/d/1SCJfTe3sVfnGp7NiaXrnHkMVDqGlqFny/view",
  image: "resim/cs.jpg" },
  { id: 2, title: "Euro Truck Sim 2", genre: "Simülasyon", size: 1, rating: 4.9, color: "#0a1a2e", accent: "#38bdf8", accentLight: "rgba(56,189,248,0.15)", accentBorder: "rgba(56,189,248,0.3)", link: "https://drive.google.com/file/d/13MAnp3_fCTP9ujfAxRI7uvqWMgIqMvJ/view",
  image: "resim/ets.png" },
  { id: 3, title: "Poly Bridge 3", genre: "Yarış", size: 1, rating: 4.5, color: "#0f1a0a", accent: "#86efac", accentLight: "rgba(134,239,172,0.15)", accentBorder: "rgba(134,239,172,0.3)", link: "https://drive.google.com/file/d/1uNW3RjVbTm4_sPw7mISjdP4kzRjyzVnP/view",
  image: "resim/pb.jpg" },
  { id: 4, title: "Live For Speed", genre: "Yarış", size: 1, rating: 4.3, color: "#2e0a0a", accent: "#fca5a5", accentLight: "rgba(252,165,165,0.15)", accentBorder: "rgba(252,165,165,0.3)", link: "https://drive.google.com/file/d/1Q4EIxiUTWiL4wihAeXOumm5KVIKxGXRE/view",
  image: "resim/lfs.jpg" },
  { id: 5, title: "NFS Most Wanted", genre: "Yarış", size: 1, rating: 4.6, color: "#111111", accent: "#d1d5db", accentLight: "rgba(209,213,219,0.12)", accentBorder: "rgba(209,213,219,0.25)", link: "https://drive.google.com/drive/folders/1aZJjoQJ20F0YpvCZ7kmu-0f6b3LK_alX",
  image: "resim/mw.jpg" },

{
  id: 6,
  title: "Human Fall Flat",
  genre: "Eğlence",
  size: 1,
  rating: 4.4,
  color: "#0a2e1a",
  accent: "#6ee7b7",
  accentLight: "rgba(110,231,183,0.15)",
  accentBorder: "rgba(110,231,183,0.3)",
  link: "https://drive.google.com/file/d/13MAnp3_fCTP9ujfAxRI7uvqWMgIqMvJ/view",
  image: "resim/hmf.jpg"
},

  { id: 7, title: "Getting Over İt", genre: "Aksiyon", size: 19, rating: 4.7, color: "#1a0a1a", accent: "#f0abfc", accentLight: "rgba(240,171,252,0.15)", accentBorder: "rgba(240,171,252,0.3)",  link: "https://drive.google.com/file/d/1Q4aK_3UTGq_V3IPQy4zSaUyOqH1Uuzqn/view",
  image: "resim/got.jpg" },
  { id: 8, title: "Outlast", genre: "Korku", size: 68, rating: 4.9, color: "#1a0e00", accent: "#fcd34d", accentLight: "rgba(252,211,77,0.15)", accentBorder: "rgba(252,211,77,0.3)",  link: "https://drive.google.com/file/d/1QmkL1Z1IKLZi5FHJTYvQDmUHv2mRFhlO/view",
  image: "resim/o.jpg" },
  { id: 9, title: "GTA Sa", genre: "Açık Dünya", size: 9, rating: 4.2, color: "#0e1a1a", accent: "#67e8f9", accentLight: "rgba(103,232,249,0.15)", accentBorder: "rgba(103,232,249,0.3)", link: "https://drive.google.com/drive/folders/1mMlbLvtuEKZn-aBZ7Qq8FdB3NIipelHg",   image: "resim/gtasa.jpg" },
  { id: 10, title: "Speed Kings", genre: "Yarış", size: 14, rating: 4.1, color: "#1a1000", accent: "#fdba74", accentLight: "rgba(253,186,116,0.15)", accentBorder: "rgba(253,186,116,0.3)", icon: "🏁" },
  { id: 11, title: "Phantom Zone", genre: "Korku", size: 24, rating: 4.8, color: "#0a0a1a", accent: "#c4b5fd", accentLight: "rgba(196,181,253,0.15)", accentBorder: "rgba(196,181,253,0.3)", icon: "👻" },
  { id: 12, title: "World Cup 2025", genre: "Spor", size: 41, rating: 4.6, color: "#001a0a", accent: "#4ade80", accentLight: "rgba(74,222,128,0.15)", accentBorder: "rgba(74,222,128,0.3)", icon: "🏆" },
];

// --- State ---
let activeFilter = "Tümü";
let searchQuery  = "";
let sortMode     = "default";

// --- Filtreleme ---
function getFilteredGames() {
  let list = games.filter(g => {
    const matchFilter = activeFilter === "Tümü" || g.genre === activeFilter;
    const matchSearch = g.title.toLowerCase().includes(searchQuery) ||
                        g.genre.toLowerCase().includes(searchQuery);
    return matchFilter && matchSearch;
  });

  return list;
}

// --- Render ---
function renderGames() {
  const grid   = document.getElementById('games-grid');
  const count  = document.getElementById('result-count');
  const list   = getFilteredGames();

  count.textContent = list.length + " oyun";

  if (list.length === 0) {
    grid.innerHTML = `<p>Oyun bulunamadı</p>`;
    return;
  }

  grid.innerHTML = list.map((g, i) => `
    <div class="game-card" style="animation-delay:${i * 0.04}s">
      
      <div class="card-thumb" style="background:${g.color}">
        ${
          g.image
            ? `<img src="${g.image}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`
            : `<span style="filter:drop-shadow(0 0 14px ${g.accent})">${g.icon}</span>`
        }

        <div class="progress-overlay" id="prog-${g.id}">
          <div class="progress-track">
            <div class="progress-fill" id="fill-${g.id}"></div>
          </div>
          <div class="progress-pct" id="pct-${g.id}">0%</div>
        </div>
      </div>

      <div class="card-body">
        <div class="card-title">${g.title}</div>

        <div class="card-meta">
          <span class="card-genre"
            style="background:${g.accentLight};color:${g.accent};border:0.5px solid ${g.accentBorder}">
            ${g.genre}
          </span>
          <span class="card-rating">★ ${g.rating}</span>
        </div>

        <div class="card-bottom">
          <span class="card-size">${g.size} GB</span>
          <span class="card-free">ÜCRETSİZ</span>
        </div>

        <!-- 🔥 SENİN ORİJİNAL BUTON -->
        <button
          class="dl-btn"
          id="btn-${g.id}"
          style="background:${g.accentLight};color:${g.accent};border-color:${g.accentBorder}"
          onclick="startDownload(${g.id})"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          İndir
        </button>

      </div>
    </div>
  `).join('');
}

// --- İndirme ---
function startDownload(id) {
  const game = games.find(g => g.id === id);

  let percent = 0;

  const interval = setInterval(() => {
    percent += 10;

    if (percent >= 100) {
      clearInterval(interval);

      // 🔥 LINK AÇMA
      if (game.link) {
        window.open(game.link, "_blank");
      }

      return;
    }
  }, 200);
}

// --- Başlat ---
renderGames();