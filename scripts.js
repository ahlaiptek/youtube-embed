document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchButton = document.getElementById("searchButton");
    const videoContainer = document.getElementById("videoContainer");

    let videosData = []; // Menyimpan data video sementara

    // Lakukan Fetch pada file JSON
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            videosData = data.videos;
            displayVideos(videosData); // Tampilkan semua video saat aplikasi dimuat
            populateCategories(data.videos);
        })
        .catch(error => {
            console.error('Error fetching JSON: ', error);
        });

    categoryFilter.addEventListener("change", function(event) {
        filterVideos();
    });

    searchButton.addEventListener("click", function(event) {
        performSearch();
    });

    // Fungsi untuk menampilkan video sesuai data yang diberikan
    function displayVideos(videos) {
        videos = shuffleArray(videos);
        videoContainer.innerHTML = ''; // Bersihkan kontainer sebelum menampilkan video baru
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
                <h3>${video.title}</h3>
                <p>Kategori: ${video.category}</p>
            `;
            videoContainer.appendChild(videoElement);
        });
    }

    // Fungsi untuk mengisi pilihan kategori
    function populateCategories(videos) {
        const categories = Array.from(new Set(videos.map(video => video.category)));
        categories.unshift("Semua Kategori");

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.toLowerCase().replace(/\s+/g, '-');
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Fungsi untuk melakukan pencarian berdasarkan judul
    function performSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredVideos = videosData.filter(video => video.title.toLowerCase().includes(searchTerm));
        displayVideos(filteredVideos);
    }

    // Fungsi untuk melakukan filter berdasarkan kategori
    function filterVideos() {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === "semua-kategori") {
            displayVideos(videosData); // Tampilkan semua video jika kategori "Semua Kategori" dipilih
        } else {
            const filteredVideos = videosData.filter(video => video.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
            displayVideos(filteredVideos);
        }
    }

    function shuffleArray(array) {
        const shuffledArray = array.slice(); // Duplikat array agar tidak merusak urutan asli
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
});
