let currentJob = 1;
const totalJobs = 7;

function showJob(next = true) {
    document.getElementById(`job${currentJob}`).style.display = 'none';
    if (next) {
        currentJob = (currentJob % totalJobs) + 1;
    } else {
        currentJob = (currentJob - 2 + totalJobs) % totalJobs + 1;
    }
    document.getElementById(`job${currentJob}`).style.display = 'block';
}
async function showCertificate(pdfUrl) {
    const pdfViewer = document.getElementById('pdfViewer');
    const canvas = document.getElementById('pdfCanvas');
    const ctx = canvas.getContext('2d');

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        // احصل على الصفحة الأولى
        const page = await pdf.getPage(1);

        // احصل على الأبعاد الطبيعية للصفحة
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        pdfViewer.style.display = 'flex';
    } catch (error) {
        console.error('Error loading PDF:', error);
    }
}

function closePdfViewer() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.style.display = 'none';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('visible');
    });
    document.getElementById(sectionId).classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('about');
});