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
                <a href="https://ubertuberbe.nodemixaholic.com/download?url=${encodeURIComponent(video.url)}" download="${video.title}.webm" class="download-link" data-url="${video.url}">Download</a>
            `;
            resultsList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching videos:', error);
        alert('An error occurred while searching for videos.');
    }
});

