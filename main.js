document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('preview');
    const loadingSpinner = document.getElementById('loading');
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const resultImage = document.getElementById('resultImage');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            // Reset previous results
            resultContainer.style.display = 'none';
            resultImage.style.display = 'none';
            resultText.textContent = '';

            // Show image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);

            // Show loading spinner and simulate analysis
            loadingSpinner.style.display = 'block';
            
            setTimeout(() => {
                // Hide loading spinner
                loadingSpinner.style.display = 'none';

                // --- Mock AI Analysis ---
                // In a real application, you would send the 'file' to a server
                // which then calls a face recognition API.
                // Here, we just pick a random celebrity from a list.
                const celebrities = [
                    { name: '아이유', score: 92, imageUrl: 'https://i.namu.wiki/i/R01gB3p4tK3b5_1024.jpg' },
                    { name: '박보검', score: 88, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '공유', score: 85, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '김태희', score: 95, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '송강', score: 91, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '한소희', score: 89, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '차은우', score: 98, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                    { name: '제니', score: 93, imageUrl: 'https://i.namu.wiki/i/2h5p7h5d_1024.jpg' },
                ];
                
                const randomChoice = celebrities[Math.floor(Math.random() * celebrities.length)];
                
                // Display result
                resultImage.src = randomChoice.imageUrl;
                resultImage.style.display = 'block';
                resultText.textContent = `분석 결과, 당신은 ${randomChoice.score}% 확률로 ${randomChoice.name}님을 닮았습니다!`;
                resultContainer.style.display = 'block';

            }, 2500); // Simulate a 2.5-second analysis
        }
    });
});