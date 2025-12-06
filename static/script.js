const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const previewSection = document.getElementById("preview-section");
const previewImg = document.getElementById("preview-img");
const fileInfo = document.getElementById("file-info");
const removeBtn = document.getElementById("removeBtn");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", handleFile);

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#9f9fff";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#555";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#555";
    const file = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files;
    handleFile();
});

function handleFile() {
    const file = fileInput.files[0];
    if (!file) return;

    // Tampilkan preview
    previewImg.src = URL.createObjectURL(file);
    previewSection.classList.remove("hidden");

    // Tampilkan info file
    fileInfo.textContent = `${file.name} • ${(file.size / 1024).toFixed(1)} KB`;

    // Tampilkan tombol
    removeBtn.classList.remove("hidden");

    // Ganti teks drag area
    document.getElementById("drop-text").innerHTML =
        "<strong>Image Loaded ✅</strong><br>Replace by dropping another file";
}