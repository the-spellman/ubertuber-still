document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const resultsList = document.getElementById('video-results');
    resultsList.innerHTML = ''; // Clear previous results

    if (!query) {
        alert('Please enter a search query.');
        return;
    }
    function getRandomHex() {
        const randomNumber = Math.floor(Math.random() * 0xFFFF); // Generates a number between 0 and 65535
        return randomNumber.toString(16).padStart(4, '0'); // Converts to hex and pads to ensure it's 4 digits
    }

    try {
        const response = await fetch(`https://ubertuberbe.nodemixaholic.com/search?q=${encodeURIComponent(query)}`);
        const videos = await response.json();

        videos.forEach(video => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${video.title}</strong> (${video.views} views) by ${video.author}
                <br>
                <a href="#" class="download-link" data-url="${video.url}">Download</a>
            `;
            resultsList.appendChild(listItem);
        });

        // Add event listeners to download links
        document.querySelectorAll('.download-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const videoUrl = e.target.dataset.url;
                const downloadResponse = await fetch(`https://ubertuberbe.nodemixaholic.com/download?url=${encodeURIComponent(videoUrl)}`);
                const blob = await downloadResponse.blob();

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${getRandomHex}.webm`; // You might want to set this dynamically
                document.body.appendChild(a);
                window.URL.revokeObjectURL(url);
            });
        });

    } catch (error) {
        console.error('Error fetching videos:', error);
        alert('An error occurred while searching for videos.');
    }
});

